"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const categoryController_1 = require("../controllers/categoryController");
const pembicaraController_1 = require("../controllers/pembicaraController");
const eventController_1 = require("../controllers/eventController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Auth
router.post('/auth/login', authController_1.login);
router.post('/auth/register', authController_1.register);
// Categories (protected)
router.get('/categories', auth_1.authMiddleware, categoryController_1.getAllCategories);
router.get('/categories/:id', auth_1.authMiddleware, categoryController_1.getCategoryById);
router.post('/categories', auth_1.authMiddleware, categoryController_1.createCategory);
router.put('/categories/:id', auth_1.authMiddleware, categoryController_1.updateCategory);
router.delete('/categories/:id', auth_1.authMiddleware, categoryController_1.deleteCategory);
// Pembicara (protected)
router.get('/pembicara', auth_1.authMiddleware, pembicaraController_1.getAllPembicara);
router.get('/pembicara/:id', auth_1.authMiddleware, pembicaraController_1.getPembicaraById);
router.post('/pembicara', auth_1.authMiddleware, pembicaraController_1.createPembicara);
router.put('/pembicara/:id', auth_1.authMiddleware, pembicaraController_1.updatePembicara);
router.delete('/pembicara/:id', auth_1.authMiddleware, pembicaraController_1.deletePembicara);
// Events (protected)
router.get('/events', auth_1.authMiddleware, eventController_1.getAllEvents);
router.get('/events/:id', auth_1.authMiddleware, eventController_1.getEventById);
router.post('/events', auth_1.authMiddleware, eventController_1.createEvent);
router.put('/events/:id', auth_1.authMiddleware, eventController_1.updateEvent);
router.delete('/events/:id', auth_1.authMiddleware, eventController_1.deleteEvent);
exports.default = router;
