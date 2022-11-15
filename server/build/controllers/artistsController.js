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
class ArtistControllers {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const artists = yield database_1.default.query('SELECT * FROM artista');
            res.json(artists);
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const artists = yield database_1.default.query('SELECT * FROM artista WHERE id_artista = ?', [req.params.id]);
            if (artists.length > 0) {
                return res.json(artists[0]);
            }
            res.status(404).json({ text: 'el artista no existe' });
        });
    }
    create(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, descripcion } = req.body;
            const newArtist = { nombre, descripcion, img: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path };
            yield database_1.default.query('INSERT INTO artista set ?', newArtist);
            res.json({ message: 'artista guardado' });
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('DELETE FROM artista WHERE id_artista = ?', [req.params.id]);
            res.json({ message: 'El artista fue eliminado' });
        });
    }
    update(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, descripcion } = req.body;
            var updatedArtist;
            if (((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) == undefined) {
                updatedArtist = { nombre, descripcion, img: req.body.img };
            }
            else {
                updatedArtist = { nombre, descripcion, img: (_b = req.file) === null || _b === void 0 ? void 0 : _b.path };
            }
            yield database_1.default.query('UPDATE artista set ? WHERE id_artista = ?', [updatedArtist, req.params.id]);
            res.json({ message: 'El artista fue actualizado' });
        });
    }
}
const artistsController = new ArtistControllers();
exports.default = artistsController;
