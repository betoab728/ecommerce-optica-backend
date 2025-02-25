import { AppDataSource } from "../config/data-source";
import { Producto } from "../models/Producto";
import { EntityManager } from 'typeorm';


export class ProductoRepository {
  async obtenerProductos(): Promise<Producto[]> {
    const imagePath = process.env.IMAGE_FOLDER || 'https://grupoctc.ddns.net:8443/fotos';

    try {
      const entityManager: EntityManager = AppDataSource.manager;
      const productos = await entityManager.query(`
        EXEC dbo.sp_ObtenerProductosParaEcommerce
      `);

      return productos.map((producto: Producto) => ({
        ...producto,
        imagen: producto.idproducto ? `${imagePath}/${producto.idproducto}.jpg` : null
      }));

    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Could not fetch products from database');
    }
  }
}
