"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ProductsControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query('SELECT * FROM producto');
            res.json(products);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query('SELECT * FROM producto WHERE id_producto = ?', [req.params.id]);
            if (products.length > 0) {
                return res.json(products[0]);
            }
            res.status(404).json({ text: 'el producto no existe' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO producto set ?', [req.body]);
            res.json({ message: 'Producto guardado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM product WHERE id_producto = ?', [req.params.id]);
            res.json({ message: 'El producto fue eliminado' });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('UPDATE producto set ? WHERE id_producto = ?', [req.body, req.params.id]);
            res.json({ message: 'El producto fue actualizado' });
        });
    }
}
const productsController = new ProductsControllers();
exports.default = productsController;
