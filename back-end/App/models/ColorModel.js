const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define o esquema para cores
const colorSchema = new Schema({
    code: { type: String, required: true },
    name: { type: String, required: true }
});

// Define o esquema para marcas e suas cores
const brandSchema = new Schema({
    brandName: { type: String, required: true },
    colors: [colorSchema] // Array de objetos de cor
});

// Define o modelo principal que contém várias marcas
const colorCollectionSchema = new Schema({
    brands: [brandSchema] // Array de objetos de marca
});

const ColorCollection = mongoose.model('ColorCollection', colorCollectionSchema);

module.exports = ColorCollection;
