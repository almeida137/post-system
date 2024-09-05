const mongoose = require('mongoose');
const Product = require('../../App/models/ProductModel'); // Ajuste o caminho conforme a estrutura do seu projeto

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/mavidb')

const products = [
  {
    name: 'Smartphone XYZ',
    description: 'Smartphone com tela de 6.5" e câmera de 48MP.',
    price: 699.99,
    category: 'Electronics',
    stock: 25,
    sku: 'XYZ-001',
    images: ['https://example.com/images/smartphone-xyz.jpg']
  },
  {
    name: 'Laptop ABC',
    description: 'Laptop com processador Intel i7 e 16GB de RAM.',
    price: 1199.99,
    category: 'Electronics',
    stock: 15,
    sku: 'ABC-002',
    images: ['https://example.com/images/laptop-abc.jpg']
  },
  {
    name: 'Headphones Pro',
    description: 'Headphones com cancelamento de ruído ativo.',
    price: 299.99,
    category: 'Accessories',
    stock: 40,
    sku: 'HEAD-003',
    images: ['https://example.com/images/headphones-pro.jpg']
  },
  {
    name: 'Smartwatch 2',
    description: 'Smartwatch com monitoramento de saúde e GPS.',
    price: 199.99,
    category: 'Wearables',
    stock: 30,
    sku: 'WATCH-004',
    images: ['https://example.com/images/smartwatch-2.jpg']
  },
  {
    name: 'Keyboard Mechanical',
    description: 'Teclado mecânico com retroiluminação RGB.',
    price: 89.99,
    category: 'Accessories',
    stock: 50,
    sku: 'KEY-005',
    images: ['https://example.com/images/keyboard-mechanical.jpg']
  },
  {
    name: 'Gaming Mouse Elite',
    description: 'Mouse gamer com 16.000 DPI e iluminação RGB.',
    price: 79.99,
    category: 'Accessories',
    stock: 60,
    sku: 'MOUSE-006',
    images: ['https://example.com/images/gaming-mouse-elite.jpg']
  },
  {
    name: 'Monitor 27" 4K',
    description: 'Monitor 27" com resolução 4K e painel IPS.',
    price: 499.99,
    category: 'Electronics',
    stock: 20,
    sku: 'MON-007',
    images: ['https://example.com/images/monitor-27-4k.jpg']
  },
  {
    name: 'External Hard Drive 1TB',
    description: 'Disco rígido externo com capacidade de 1TB.',
    price: 109.99,
    category: 'Accessories',
    stock: 35,
    sku: 'HDD-008',
    images: ['https://example.com/images/external-hard-drive-1tb.jpg']
  },
  {
    name: 'Wireless Charger',
    description: 'Carregador sem fio com suporte para carregamento rápido.',
    price: 39.99,
    category: 'Accessories',
    stock: 45,
    sku: 'CHARGER-009',
    images: ['https://example.com/images/wireless-charger.jpg']
  },
  {
    name: 'Bluetooth Speaker',
    description: 'Caixa de som Bluetooth com som de alta qualidade.',
    price: 89.99,
    category: 'Accessories',
    stock: 50,
    sku: 'SPEAKER-010',
    images: ['https://example.com/images/bluetooth-speaker.jpg']
  },
  {
    name: 'Gaming Chair',
    description: 'Cadeira gamer com ajuste ergonômico.',
    price: 249.99,
    category: 'Furniture',
    stock: 20,
    sku: 'CHAIR-011',
    images: ['https://example.com/images/gaming-chair.jpg']
  },
  {
    name: 'Action Camera',
    description: 'Câmera de ação resistente à água e choque.',
    price: 149.99,
    category: 'Electronics',
    stock: 30,
    sku: 'CAMERA-012',
    images: ['https://example.com/images/action-camera.jpg']
  },
  {
    name: 'Tablet Pro',
    description: 'Tablet com tela de 10.5" e suporte a caneta.',
    price: 399.99,
    category: 'Electronics',
    stock: 25,
    sku: 'TABLET-013',
    images: ['https://example.com/images/tablet-pro.jpg']
  },
  {
    name: 'Digital Camera',
    description: 'Câmera digital com lente de 24MP.',
    price: 599.99,
    category: 'Electronics',
    stock: 10,
    sku: 'DIGCAM-014',
    images: ['https://example.com/images/digital-camera.jpg']
  },
  {
    name: 'Drone Mini',
    description: 'Drone compacto com câmera HD.',
    price: 129.99,
    category: 'Electronics',
    stock: 40,
    sku: 'DRONE-015',
    images: ['https://example.com/images/drone-mini.jpg']
  },
  {
    name: 'Portable SSD 500GB',
    description: 'SSD portátil com capacidade de 500GB.',
    price: 159.99,
    category: 'Accessories',
    stock: 30,
    sku: 'SSD-016',
    images: ['https://example.com/images/portable-ssd-500gb.jpg']
  },
  {
    name: 'Electric Scooter',
    description: 'Scooter elétrico com autonomia de 30km.',
    price: 399.99,
    category: 'Transportation',
    stock: 15,
    sku: 'SCOOTER-017',
    images: ['https://example.com/images/electric-scooter.jpg']
  },
  {
    name: 'Smart Home Hub',
    description: 'Hub para automação residencial compatível com vários dispositivos.',
    price: 89.99,
    category: 'Electronics',
    stock: 50,
    sku: 'HUB-018',
    images: ['https://example.com/images/smart-home-hub.jpg']
  },
  {
    name: 'Electric Kettle',
    description: 'Chaleira elétrica com controle de temperatura.',
    price: 49.99,
    category: 'Home Appliances',
    stock: 40,
    sku: 'KETTLE-019',
    images: ['https://example.com/images/electric-kettle.jpg']
  },
  {
    name: 'Vacuum Cleaner',
    description: 'Aspirador de pó com potência de 1500W.',
    price: 229.99,
    category: 'Home Appliances',
    stock: 25,
    sku: 'VACUUM-020',
    images: ['https://example.com/images/vacuum-cleaner.jpg']
  },
];

async function seedDatabase() {
  try {
    await mongoose.connection.dropDatabase(); // Remove todos os dados existentes
    await Product.insertMany(products);
    console.log('Produtos inseridos com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir produtos:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
