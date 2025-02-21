import { AppDataSource } from "../config/data-source";
import { Producto } from "../models/Producto";

export class ProductoRepository {
  async obtenerProductos(): Promise<Producto[]> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    
    try {
      const productos = await queryRunner.query(`
        EXEC dbo.sp_ObtenerProductosParaEcommerce
      `);

      const imagePath = process.env.IMAGE_FOLDER || 'http://localhost:3000/images';
      // Agregar la ruta de la imagen a cada producto
      return productos.map((producto: Producto) => ({
        ...producto,
        imagen: `${imagePath}/${producto.idproducto}.jpg`
      }));
     
    } finally {
      await queryRunner.release();
    }
  }
}
