const products = require('../data/products');


const getAllProducts = (req, res) => {
  res.status(200).json(products);
};

const getProductById = (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
};
