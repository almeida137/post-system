const Plate = require('../../models/PlateModel')


//Criar uma CHAPA
const createPlate = async (req, res) => {
    try {
        const { rotulo, descricao, codigo_saef } = req.body;

        // Verificação para garantir que os campos necessários estão presentes
        if (!rotulo || !descricao || !codigo_saef) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const plateData = {
            rotulo,
            descricao,
            codigo_saef,
        };

        const plate = new Plate(plateData);
        await plate.save();

        res.status(201).json(plate);
    } catch (error) {
        console.error('Erro ao salvar chapa:', error);
        res.status(400).json({ error: error.message });
    }
};

const getAllPlates = async (req, res) => {
    try {
        const plates = await Plate.find().exec();
        res.status(200).json(plates);
    } catch (error) {
        console.error('Erro ao buscar solicitações:', error);
        res.status(500).json({ error: error.message });
    }
}

const getPlateById = async (req, res) => {
    try {
        const { id } = req.params;
        const plates = await Plate.findById(id);

        if (!plates) {
            return res.status(404).json({ error: 'Solicitação não encontrada' });
        }

        res.json(plates);
    } catch (error) {
        console.error('Erro ao buscar solicitação:', error);
        res.status(500).json({ error: 'Erro ao buscar solicitação' });
    }
}

const updatePlate = async (req, res) => {
    try {
        const { id } = req.params; // Pega o ID da chapa da URL
        const updatedData = req.body; // Pega os dados atualizados do corpo da requisição

        // Atualiza a chapa no banco de dados
        const plate = await Plate.findByIdAndUpdate(id, updatedData, {
            new: true, // Retorna o documento atualizado
            runValidators: true // Executa validações do schema
        });

        // Verifica se a chapa foi encontrada e atualizada
        if (!plate) {
            return res.status(404).json({ message: 'Chapa não encontrada!' });
        }

        // Retorna o documento atualizado
        res.status(200).json(plate);
    } catch (error) {
        console.error('Erro ao atualizar chapa:', error);
        res.status(500).json({ message: 'Erro ao atualizar chapa', error });
    }
};


const deletePlateById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPlate = await Plate.findByIdAndDelete(id);

        if (!deletedPlate) {
            return res.status(404).json({ message: 'Chapa não encontrada!' });
        }

        res.status(200).json({ message: 'Chapa deletada com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar Chapa:', error);
        res.status(500).json({ message: 'Erro ao deletar Chapa', error: error.message });
    }
};

module.exports = {
    createPlate,
    getAllPlates,
    deletePlateById,
    getPlateById,
    updatePlate
}