const Order = require('../../models/OrderModel')


//Criar uma solicitação
const createOrder = async (req, res) => {
    try {
        const { loja, dataDoPedido, cliente, montador, motivoGeral, itens } = req.body;

        // Se itens vier como string, parse para JSON
        const parsedItems = Array.isArray(itens) ? itens : JSON.parse(itens);

        // Associe os anexos corretamente
        const itemsWithAttachments = parsedItems.map((item, index) => {
            const itemAttachments = req.files
                .filter(file => file.originalname.startsWith(`item-${index + 1}`))
                .map(file => file.path);
            return {
                ...item,
                anexos: itemAttachments,
            };
        });

        const orderData = {
            loja,
            dataDoPedido,
            cliente,
            montador,
            motivoGeral,
            itens: itemsWithAttachments,
        };

        const orders = new Order(orderData);
        await orders.save();

        res.status(201).json(orders);
    } catch (error) {
        console.error('Erro ao salvar solicitação:', error);
        res.status(400).json({ error: error.message });
    }
};


const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().exec();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Erro ao buscar solicitações:', error);
        res.status(500).json({ error: error.message });
    }
};

const getOrderByID = async (req, res) => {
    try {
        const { id } = req.params;
        const orders = await Order.findById(id);

        if (!orders) {
            return res.status(404).json({ error: 'Solicitação não encontrada' });
        }

        res.json(orders);
    } catch (error) {
        console.error('Erro ao buscar solicitação:', error);
        res.status(500).json({ error: 'Erro ao buscar solicitação' });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const {loja, dataDoPedido, cliente, montador, motivoGeral, status, itens } = req.body;
        let parsedItems = [];
        if (itens) {
            parsedItems = typeof itens === 'string' ? JSON.parse(itens) : itens;
        }
        if (!Array.isArray(parsedItems)) {
            parsedItems = [];
        }
        const existingOrder = await Order.findById(id);

        if (!existingOrder) {
            return res.status(404).json({ error: 'Solicitação não encontrada' });
        }
        const orderData = {
            loja: loja || existingOrder.loja,
            dataDoPedido: dataDoPedido || existingOrder.dataDoPedido,
            cliente: cliente || existingOrder.cliente,
            montador: montador || existingOrder.montador,
            motivoGeral: motivoGeral || existingOrder.motivoGeral,
            status: status || existingOrder.status,
        };
        const updatedItems = existingOrder.itens.map(existingItem => {
            const updatedItem = parsedItems.find(item => item._id.toString() === existingItem._id.toString());
            if (updatedItem) {
                return {
                    ...existingItem,
                    ambiente: updatedItem.ambiente || existingItem.ambiente,
                    quantidade: updatedItem.quantidade || existingItem.quantidade,
                    descricao: updatedItem.descricao || existingItem.descricao,
                    dimensoes: updatedItem.dimensoes || existingItem.dimensoes,
                    cor: updatedItem.cor || existingItem.cor,
                    motivo: updatedItem.motivo || existingItem.motivo,
                    obs: updatedItem.obs || existingItem.obs,
                    anexos: updatedItem.anexos || existingItem.anexos,
                };
            }
            return existingItem;
        });
        orderData.itens = updatedItems;
        console.log('Dados a serem atualizados:', orderData);
        const orders = await Order.findByIdAndUpdate(id, orderData, { new: true });

        if (!orders) {
            return res.status(404).json({ error: 'Solicitação não encontrada' });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error('Erro ao atualizar solicitação:', error);
        res.status(400).json({ error: error.message });
    }
};


const deleteOrderByID = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteOrder = await Order.findByIdAndDelete(id);
        if(!deleteOrder) {
            return res.status(404).json({message: 'Solicitação não encontrada!'})
        }
        res.status(200).json({message: 'Solicitação apagada com sucesso!'})
    } catch (error) {
        console.error('Erro ao deletar solicitação:', error)
        res.status(500).json({message: 'Erro ao deletar solicitação', error});
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrderByID,
    updateOrder,
    deleteOrderByID
}