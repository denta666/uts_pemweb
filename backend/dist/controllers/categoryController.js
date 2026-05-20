"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const getAllCategories = async (_req, res) => {
    try {
        const categories = await client_1.default.categoryEvent.findMany({
            include: { _count: { select: { events: true } } },
            orderBy: { createdAt: 'desc' },
        });
        return res.json(categories);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.getAllCategories = getAllCategories;
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await client_1.default.categoryEvent.findUnique({
            where: { id: Number(id) },
            include: { events: true },
        });
        if (!category)
            return res.status(404).json({ message: 'Kategori tidak ditemukan.' });
        return res.json(category);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.getCategoryById = getCategoryById;
const createCategory = async (req, res) => {
    try {
        const { name, description, color } = req.body;
        if (!name)
            return res.status(400).json({ message: 'Nama kategori wajib diisi.' });
        const category = await client_1.default.categoryEvent.create({
            data: { name, description, color: color || '#6366f1' },
        });
        return res.status(201).json(category);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, color } = req.body;
        const category = await client_1.default.categoryEvent.update({
            where: { id: Number(id) },
            data: { name, description, color },
        });
        return res.json(category);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await client_1.default.categoryEvent.delete({ where: { id: Number(id) } });
        return res.json({ message: 'Kategori berhasil dihapus.' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.deleteCategory = deleteCategory;
