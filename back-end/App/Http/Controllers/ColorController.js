const ColorCollection = require('../../models/ColorModel');

// Criar uma nova coleção de cores
exports.createColorCollection = async (req, res) => {
    try {
        const newColorCollection = new ColorCollection(req.body);
        await newColorCollection.save();
        res.status(201).json(newColorCollection);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obter todas as coleções de cores
exports.getAllColorCollections = async (req, res) => {
    try {
        const colorCollections = await ColorCollection.find();
        res.status(200).json(colorCollections);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obter uma coleção de cores específica pelo ID
exports.getColorCollectionById = async (req, res) => {
    try {
        const colorCollection = await ColorCollection.findById(req.params.id);
        if (!colorCollection) return res.status(404).json({ error: 'Color Collection not found' });
        res.status(200).json(colorCollection);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar uma coleção de cores específica pelo ID
exports.updateColorCollection = async (req, res) => {
    try {
        const colorCollection = await ColorCollection.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!colorCollection) return res.status(404).json({ error: 'Color Collection not found' });
        res.status(200).json(colorCollection);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Deletar uma coleção de cores específica pelo ID
exports.deleteColorCollection = async (req, res) => {
    try {
        const colorCollection = await ColorCollection.findByIdAndDelete(req.params.id);
        if (!colorCollection) return res.status(404).json({ error: 'Color Collection not found' });
        res.status(200).json({ message: 'Color Collection deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Deletar uma cor específica de uma coleção
exports.deleteColorFromCollection = async (req, res) => {
    try {
        const { brandName, colorCode } = req.params;
        
        // Encontrar a coleção de cores pela marca
        const colorCollection = await ColorCollection.findOne({ 'brands.brandName': brandName });

        if (!colorCollection) {
            return res.status(404).json({ error: 'Color Collection not found for the specified brand' });
        }

        // Encontrar a marca dentro da coleção
        const brand = colorCollection.brands.id(brandName);

        if (!brand) {
            return res.status(404).json({ error: 'Brand not found in the collection' });
        }

        // Remover a cor da marca
        brand.colors.pull({ code: colorCode });

        // Salvar as alterações
        await colorCollection.save();

        res.status(200).json({ message: 'Color removed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};