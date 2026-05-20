"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../prisma/client"));
const login = async (req, res) => {
    try {
        const { nim, password } = req.body;
        if (!nim || !password) {
            return res.status(400).json({ message: 'NIM dan Password wajib diisi.' });
        }
        const user = await client_1.default.user.findUnique({ where: { nim } });
        if (!user) {
            return res.status(401).json({ message: 'NIM atau Password salah.' });
        }
        const isValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isValid) {
            return res.status(401).json({ message: 'NIM atau Password salah.' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, nim: user.nim, name: user.name }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        return res.json({ token, user: { id: user.id, nim: user.nim, name: user.name } });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { nim, name, password } = req.body;
        if (!nim || !name || !password) {
            return res.status(400).json({ message: 'Semua field wajib diisi.' });
        }
        const existing = await client_1.default.user.findUnique({ where: { nim } });
        if (existing) {
            return res.status(400).json({ message: 'NIM sudah terdaftar.' });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await client_1.default.user.create({
            data: { nim, name, password: hashedPassword },
        });
        return res.status(201).json({ message: 'User berhasil dibuat.', user: { id: user.id, nim: user.nim, name: user.name } });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.register = register;
