import Cart from '../models/Cart';
import Products from '../models/Products';

class CartController {
  async create(req, res) {
    try {
      const findProducts = await Products.find({ _id: req.body.products }, {
        productName: true,
        productImages: true,
        price: true,
        discountPrice: true,
        category: true,
      });

      const newCart = await Cart.create({
        products: findProducts,
        buyer: req.body.buyer,
      });
      res.status(200).json(newCart);
      return;
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async index(req, res) {
    try {
      const allCarts = await Cart.find({});
      res.status(200).json(allCarts);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async show(req, res) {
    try {
      const { cartId } = req.params;
      const allCarts = await Cart.findById(cartId);
      res.status(200).json(allCarts);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async update(req, res) {
    try {
      const { cartId } = req.params;
      const { mode, product } = req.body;
      if (!req.body) {
        res.json('erro');
      }
      if (mode === 'pull') {
        await Cart.updateOne({ _id: cartId }, { $pull: { products: product } });
        res.status(200).json(`O carrinho ${cartId} foi atualizado com sucesso`);
      }
      if (mode === 'push') {
        await Cart.updateOne({ _id: cartId }, { $push: { products: product } });
        res.status(200).json(`O carrinho ${cartId} foi atualizado com sucesso`);
      }
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { cartId } = req.params;
      await Cart.findByIdAndDelete(cartId);
      res.status(200).json(`O carrinho ${cartId} foi apagado`);
    } catch (e) {
      res.status(400).json(e);
    }
  }
}

export default new CartController();
