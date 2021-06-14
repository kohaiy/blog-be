import * as fs from 'fs';
import * as sysPath from 'path';
import * as puppeteer from 'puppeteer';
import * as Dotenv from 'dotenv';

Dotenv.config();

const output = sysPath.join(sysPath.resolve(), process.env.PUBLIC_PATH || 'public');
if (!fs.existsSync(output)) {
    fs.mkdirSync(output);
}

const baseUrl = process.env.BASE_URL || '/';
const publishUrl = process.env.PUBLISH_URL || baseUrl;
const fileMap = new Map<string, string>();

/**
 * join urls
 * @param  {...string} urls
 * @returns {string}
 */
const joinUrls = (...urls: string[]): string => {
    return urls.reduce((a, b) => {
        return a.replace(/\/+$/, '') + '/' + b.replace(/^\/+/, '');
    });
};

/**
 * trim a path with hash or query params
 * @param {string} path
 * @returns {string}
 */
const trimPath = (path: string): string => {
    return path.replace(/\/?[#?].*$/g, '');
};

/**
 * filter
 * @param {string} url
 * @returns {string}
 */
const selfUrlFilter = (url: string): string => {
    if (url.startsWith(baseUrl)) {
        return url.replace(baseUrl, '');
    }
    return '';
};

const fetchPage = async (browser: puppeteer.Browser, path: string) => {
    path = trimPath(path);
    if (fileMap.has(path)) {
        return;
    }
    fileMap.set(path, 'fetching');
    const page = await browser.newPage();
    await page.goto(joinUrls(baseUrl, path), {
        waitUntil: 'networkidle2',
    });
    await page.waitForTimeout(3000);
    const { links: lns, htmlContent } = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a'))
            .map(el => el.href);

        return {
            links,
            htmlContent: document.documentElement.outerHTML,
        };
    });
    let links = lns
        .map(it => trimPath(selfUrlFilter(it)))
        .filter(i => i && i !== path);
    links = [...new Set(links)];
    fileMap.set(path, htmlContent);
    await Promise.all(
        links.map(link => fetchPage(browser, link)),
    );
};

/**
 * 循环创建目录
 * @param {string} dirPath
 * @returns {void}
 */
const mkDir = (dirPath: string): void => {
    if (fs.existsSync(dirPath)) { return; }
    const { dir } = sysPath.parse(dirPath);
    mkDir(dir);
    fs.mkdirSync(dirPath);
};

const generatePage = (filePath: string, content: string) => {
    console.log(filePath);
    const dirPath = sysPath.join(output, filePath);
    mkDir(dirPath);
    const fullPath = sysPath.join(dirPath, 'index.html');
    fs.writeFileSync(fullPath, content, { encoding: 'utf-8' });
};

const startFetch = async () => {
    console.log('[fetch page] start', baseUrl);
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.time('fetch page');
    await fetchPage(browser, '/');
    console.timeEnd('fetch page');
    const files = [...fileMap.keys()];
    files.forEach((filePath) => generatePage(
        filePath, fileMap.get(filePath) || ''));

    console.log(files);
    const sitemapContent = files.map(f => joinUrls(publishUrl, f)).join('\n');
    const sitemapPath = sysPath.join(output, 'sitemap.txt');
    fs.writeFileSync(sitemapPath, sitemapContent, { encoding: 'utf8' });
    console.log('[fetch page] finished.');

    fileMap.clear();
    await browser.close();

    return files;
};

export default startFetch;
