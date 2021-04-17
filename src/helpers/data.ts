import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export default class DataHelper {
    static md5(value: string): string {
        const hash = crypto.createHash('md5');
        hash.update(value);
        return hash.digest('hex').toLowerCase();
    }

    static generatePassword(password: string, slat: string): string {
        return this.md5(`${this.md5(password)}${slat}`);
    }

    static generateSlat() {
        return `${Date.now()}${Math.floor(Math.random() * 5000 + 4000)}`
    }

    static generateToken(payload: Record<string, any>): string {
        const { TOKEN_SECRET = '', TOKEN_EXPIRY } = process.env;
        return jwt.sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRY });
    }

    static verifyToken(token: string) {
        const { TOKEN_SECRET = '' } = process.env;
        return jwt.verify(token, TOKEN_SECRET);
    }
}