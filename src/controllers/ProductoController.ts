import { Request, Response } from "express";
import { ProductoService } from "../services/ProductoService";

export class ProductoController {
  private productoService: ProductoService;

  constructor(productoService: ProductoService) {
    this.productoService = productoService;
  }

  async obtenerProductos(req: Request, res: Response): Promise<void> {
    try {
      const productos = await this.productoService.listarProductos();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ mensaje: "Error al obtener productos", error });
    }
  }
}
