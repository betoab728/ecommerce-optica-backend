import { Router } from "express";
import { ProductoRepository } from "../repositories/ProductoRepository";
import { ProductoService } from "../services/ProductoService";
import { ProductoController } from "../controllers/ProductoController";

const router = Router();

// Inyección de dependencias manual
const productoRepository = new ProductoRepository();
const productoService = new ProductoService(productoRepository);
const productoController = new ProductoController(productoService);

router.get("/", (req, res) => productoController.obtenerProductos(req, res));

export default router; 
