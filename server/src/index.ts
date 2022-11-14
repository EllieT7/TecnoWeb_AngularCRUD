import express, {Application} from 'express';
import morgan from 'morgan';
import cors from 'cors';

import productsRoutes from './routes/productsRoutes';
import indexRoutes from './routes/indexRoutes';
import artistsRoutes from './routes/artistsRoutes';
import productTypesRoutes from './routes/productTypesRoutes';

class Server{
    public app : Application;
    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    
    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json()); //Acepta formato json 
        this.app.use(express.urlencoded({extended: false})); 
    }

    routes(): void{
        this.app.use('/', indexRoutes);
        this.app.use('/api/productos', productsRoutes);
        this.app.use('/api/artistas', artistsRoutes);
        this.app.use('/api/tipos', productTypesRoutes);
        
    }
    start(): void{
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();