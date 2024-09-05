const Border = require('../../models/BorderModel')


//Criar uma CHAPA
const createBorder = async (req, res) => {
    try {
        const { rotulo, descricao, codigo_saef } = req.body;

        // Verificação para garantir que os campos necessários estão presentes
        if (!rotulo || !descricao || !codigo_saef) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const borderData = {
            rotulo,
            descricao,
            codigo_saef,
        };

        const border = new Border(borderData);
        await border.save();

        res.status(201).json(border);
    } catch (error) {
        console.error('Erro ao salvar chapa:', error);
        res.status(400).json({ error: error.message });
    }
};

const getAllBorder = async (req, res) => {
    try {
        const border = await Border.find().exec();
        res.status(200).json(border);
    } catch (error) {
        console.error('Erro ao buscar solicitações:', error);
        res.status(500).json({ error: error.message });
    }
}

const getBorderById = async (req, res) => {
    try {
        const { id } = req.params;
        const border = await Border.findById(id);

        if (!border) {
            return res.status(404).json({ error: 'Solicitação não encontrada' });
        }

        res.json(border);
    } catch (error) {
        console.error('Erro ao buscar solicitação:', error);
        res.status(500).json({ error: 'Erro ao buscar solicitação' });
    }
}

const updateBorder = async (req, res) => {
    try {
        const { id } = req.params; // Pega o ID da chapa da URL
        const updatedData = req.body; // Pega os dados atualizados do corpo da requisição

        // Atualiza a chapa no banco de dados
        const border = await Border.findByIdAndUpdate(id, updatedData, {
            new: true, // Retorna o documento atualizado
            runValidators: true // Executa validações do schema
        });

        // Verifica se a chapa foi encontrada e atualizada
        if (!border) {
            return res.status(404).json({ message: 'Chapa não encontrada!' });
        }

        // Retorna o documento atualizado
        res.status(200).json(border);
    } catch (error) {
        console.error('Erro ao atualizar chapa:', error);
        res.status(500).json({ message: 'Erro ao atualizar chapa', error });
    }
};


const deleteBorderById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBorder = await Border.findByIdAndDelete(id);

        if (!deletedBorder) {
            return res.status(404).json({ message: 'Chapa não encontrada!' });
        }

        res.status(200).json({ message: 'Chapa deletada com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar Chapa:', error);
        res.status(500).json({ message: 'Erro ao deletar Chapa', error: error.message });
    }
};

module.exports = {
    createBorder,
    getAllBorder,
    deleteBorderById,
    getBorderById,
    updateBorder
}