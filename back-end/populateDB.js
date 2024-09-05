const mongoose = require('mongoose');
const OrderModel = require('./App/models/OrderModel')

// Conexão com o banco de dados
mongoose.connect('mongodb://localhost:27017/post', {
});

const gerarSolicitacaoAleatoria = () => {
  const clientes = ['Cliente A', 'Cliente B', 'Cliente C', 'Cliente D', 'Cliente E'];
  const montadores = ['Montador 1', 'Montador 2', 'Montador 3', 'Montador 4'];
  const motivosGerais = ['Instalação de novo equipamento', 'Reparo de equipamento', 'Manutenção preventiva', 'Ajuste de componentes'];
  const cores = ['Vermelho', 'Azul', 'Verde', 'Amarelo', 'Branco'];
  const motivos = ['Motivo 1', 'Motivo 2', 'Motivo 3', 'Motivo 4'];
  const statusOpcoes = ['Pendente', 'Aprovado', 'Rejeitado', 'Em Andamento', 'Concluído', 'Cancelado'];

  const gerarItemAleatorio = () => {
    return {
      pedido: `Pedido ${Math.floor(Math.random() * 1000)}`,
      quantidade: Math.floor(Math.random() * 10) + 1,
      dimensoes: `${Math.floor(Math.random() * 100) + 1}x${Math.floor(Math.random() * 100) + 1}`,
      cor: cores[Math.floor(Math.random() * cores.length)],
      motivo: motivos[Math.floor(Math.random() * motivos.length)],
      obs: 'Observação do item',
      anexos: [`/caminho/para/anexo${Math.floor(Math.random() * 100)}.pdf`]
    };
  };

  return {
    dataDoPedido: new Date(),
    cliente: clientes[Math.floor(Math.random() * clientes.length)],
    montador: montadores[Math.floor(Math.random() * montadores.length)],
    motivoGeral: motivosGerais[Math.floor(Math.random() * motivosGerais.length)],
    itens: [gerarItemAleatorio(), gerarItemAleatorio(), gerarItemAleatorio()],
    status: statusOpcoes[Math.floor(Math.random() * statusOpcoes.length)]
  };
};

const popularBancoDeDados = async () => {
  try {
    const solicitacoes = Array.from({ length: 20 }, gerarSolicitacaoAleatoria);
    await OrderModel.insertMany(solicitacoes);
    console.log('Banco de dados populado com sucesso!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Erro ao popular banco de dados:', error);
  }
};

// Executa a função para popular o banco de dados
popularBancoDeDados();
