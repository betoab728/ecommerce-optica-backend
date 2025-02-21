import express , {Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import  productoRoutes  from './routes/ProductoRoutes';

dotenv.config();

class Server {
    private app: express.Application;
    private port: number;
    //variable para la carpeta de fotos
    private imageFolder : string;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;
        this.imageFolder = process.env.IMAGE_FOLDER || 'images';

        this.middleware();
        this.routes();
        this.database();
        this.listen();
    }

    listen() {
        this.app.listen(Number(this.port), '0.0.0.0', () => {
            console.log(`Server running on port ${this.port}`);
        });
    }

    middleware() {
        // Indicar a Express que confíe en el proxy (Nginx en este caso)
       this.app.set('trust proxy', true);
       // Parseando el body de la petición
       this.app.use(express.json());
       // Habilitar CORS
       this.app.use(cors());
   }

    routes() {
         this.app.get('/', (req: Request, res: Response) => {
            res.json({
                message: 'Servidor corriendo correctamente'
            });
         });
         //Uso de rutas

            this.app.use('/productos', productoRoutes);
    }

    async database() {
        try {
            await AppDataSource.initialize(); 
            console.log('Database online');
        } catch (error) {
          console.error('Error connecting to database:', error);
        }
    }
}

export default Server;