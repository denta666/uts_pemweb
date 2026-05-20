"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePembicara = exports.updatePembicara = exports.createPembicara = exports.getPembicaraById = exports.getAllPembicara = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const getAllPembicara = async (_req, res) => {
    try {
        const pembicara = await client_1.default.pembicara.findMany({
            include: { _count: { select: { events: true } } },
            orderBy: { createdAt: 'desc' },
        });
        return res.json(pembicara);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.getAllPembicara = getAllPembicara;
const getPembicaraById = async (req, res) => {
    try {
        const { id } = req.params;
        const pembicara = await client_1.default.pembicara.findUnique({
            where: { id: Number(id) },
            include: { events: true },
        });
        if (!pembicara)
            return res.status(404).json({ message: 'Pembicara tidak ditemukan.' });
        return res.json(pembicara);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.getPembicaraById = getPembicaraById;
const createPembicara = async (req, res) => {
    try {
        const { name, title, expertise, email, phone, bio, photoUrl } = req.body;
        if (!name || !title || !expertise) {
            return res.status(400).json({ message: 'Nama, jabatan, dan keahlian wajib diisi.' });
        }
        const pembicara = await client_1.default.pembicara.create({
            data: { name, title, expertise, email, phone, bio, photoUrl },
        });
        return res.status(201).json(pembicara);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.createPembicara = createPembicara;
const updatePembicara = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, title, expertise, email, phone, bio, photoUrl } = req.body;
        const pembicara = await client_1.default.pembicara.update({
            where: { id: Number(id) },
            data: { name, title, expertise, email, phone, bio, photoUrl },
        });
        return res.json(pembicara);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.updatePembicara = updatePembicara;
const deletePembicara = async (req, res) => {
    try {
        const { id } = req.params;
        await client_1.default.pembicara.delete({ where: { id: Number(id) } });
        return res.json({ message: 'Pembicara berhasil dihapus.' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.deletePembicara = deletePembicara;
