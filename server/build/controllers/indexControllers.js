"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
class IndexControllers {
    index(req, res) {
        res.json({ text: 'API is /api/products' });
        // res.send('Hello World');
    }
}
exports.indexController = new IndexControllers();
