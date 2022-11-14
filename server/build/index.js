"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const productsRoutes_1 = __importDefault(require("./routes/productsRoutes"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const artistsRoutes_1 = __importDefault(require("./routes/artistsRoutes"));
const productTypesRoutes_1 = __importDefault(require("./routes/productTypesRoutes"));
const photosRoutes_1 = __importDefault(require("./routes/photosRoutes"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json()); //Acepta formato json 
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use('/uploads', express_1.default.static(path_1.default.resolve('uploads')));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/productos', productsRoutes_1.default);
        this.app.use('/api/artistas', artistsRoutes_1.default);
        this.app.use('/api/tipos', productTypesRoutes_1.default);
        this.app.use('/api/fotos', photosRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
