import Products from '../models/Products';

class Product {
  async create(req, res) {
    try {
      const newProduct = await Products.create(req.body);
      res.status(200).json(newProduct);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async index(req, res) {
    try {
      const allProducts = await Products.find();
      res.status(200).json(allProducts);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const singleProduct = await Products.findById(id);

      res.status(200).json(singleProduct);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updatedProduct = await Products.findByIdAndUpdate(id, req.body);

      res.status(200).json(updatedProduct);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const singleProduct = await Products.findByIdAndDelete(id);

      const { productName } = singleProduct;

      res.status(200).json(`O produto ${productName} foi apagado com sucesso`);
    } catch (e) {
      res.status(400).json(e);
    }
  }
}

export default new Product();
