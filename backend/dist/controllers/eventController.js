"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.createEvent = exports.getEventById = exports.getAllEvents = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const getAllEvents = async (_req, res) => {
    try {
        const events = await client_1.default.event.findMany({
            include: {
                category: true,
                pembicara: true,
            },
            orderBy: { date: 'asc' },
        });
        return res.json(events);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.getAllEvents = getAllEvents;
const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await client_1.default.event.findUnique({
            where: { id: Number(id) },
            include: { category: true, pembicara: true },
        });
        if (!event)
            return res.status(404).json({ message: 'Event tidak ditemukan.' });
        return res.json(event);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.getEventById = getEventById;
const createEvent = async (req, res) => {
    try {
        const { title, description, date, time, location, capacity, status, imageUrl, categoryId, pembicaraId } = req.body;
        if (!title || !date || !time || !location || !categoryId || !pembicaraId) {
            return res.status(400).json({ message: 'Field wajib: title, date, time, location, category, pembicara.' });
        }
        const event = await client_1.default.event.create({
            data: {
                title,
                description,
                date: new Date(date),
                time,
                location,
                capacity: Number(capacity) || 0,
                status: status || 'upcoming',
                imageUrl,
                categoryId: Number(categoryId),
                pembicaraId: Number(pembicaraId),
            },
            include: { category: true, pembicara: true },
        });
        return res.status(201).json(event);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.createEvent = createEvent;
const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, time, location, capacity, status, imageUrl, categoryId, pembicaraId } = req.body;
        const event = await client_1.default.event.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                date: date ? new Date(date) : undefined,
                time,
                location,
                capacity: capacity ? Number(capacity) : undefined,
                status,
                imageUrl,
                categoryId: categoryId ? Number(categoryId) : undefined,
                pembicaraId: pembicaraId ? Number(pembicaraId) : undefined,
            },
            include: { category: true, pembicara: true },
        });
        return res.json(event);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateEvent = updateEvent;
const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await client_1.default.event.delete({ where: { id: Number(id) } });
        return res.json({ message: 'Event berhasil dihapus.' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};
exports.deleteEvent = deleteEvent;
