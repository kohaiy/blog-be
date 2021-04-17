import * as fs from 'fs';
import * as path from 'path';

interface RequireAllConfig {
    dirname: string;
    fileFilter?: (filename: string) => boolean;
}

export default function requireAll<T>(config: RequireAllConfig): T[] {
    const dirs = path.join(config.dirname).replace(path.resolve(), '').split(path.sep).filter(d => d);

    let paths = [path.join(__dirname, '..')];
    dirs.forEach(dir => {
        if (dir === '**') {
            const paths2: string[] = [];
            paths.forEach(p => {
                if (fs.statSync(p).isDirectory()) {
                    const subDirs = fs.readdirSync(p);
                    paths2.push(...subDirs.map(d => path.join(p, d)).filter(d => fs.existsSync(d)));
                }
            });
            paths = paths2;
        } else {
            paths = paths.map(p => path.join(p, dir)).filter(p => fs.existsSync(p));
        }
    });

    const files: string[] = [];
    const fileFilter = config.fileFilter || (() => true);
    paths.forEach(p => {
        if (fs.statSync(p).isDirectory()) {
            files.push(
                ...fs.readdirSync(p)
                    // 过滤出 js ts 结尾，排除 d.ts 声明文件
                    .filter((filename) => /\.[jt]s$/.test(filename) && !/\.d\.ts$/.test(filename))
                    .filter(fileFilter)
                    .map(f => path.join(p, f))
            );
        }
    });

    return files.map(f => require(f).default);
}
