import { ProductoRepository } from "../repositories/ProductoRepository";
import { Producto } from "../models/Producto";

export class ProductoService {

  private productoRepository: ProductoRepository;

  constructor(productoRepository: ProductoRepository) {
    this.productoRepository = productoRepository;
  }

  async listarProductos(): Promise<Producto[]> {
    return await this.productoRepository.obtenerProductos();
  }
}
