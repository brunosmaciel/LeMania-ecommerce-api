import bcryptjs from 'bcryptjs';
import Customers from '../models/Customer';

class Customer {
  async create(req, res) {
    try {
      const { password } = req.body;
      delete req.body.password;
      const passwordHash = bcryptjs.hashSync(password, 10);
      req.body.password = passwordHash;
      const {
        fullName, cpf, birthDate, email,
      } = req.body;

      const newCustomer = await Customers.create(req.body);
      const { _id } = newCustomer;
      res.status(200).json({
        _id, fullName, cpf, birthDate, email,
      });
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async index(req, res) {
    try {
      const allCustomers = await Customers.find();
      res.json(allCustomers);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const singleCustomer = await Customers.findById(id);

      res.status(200).json(singleCustomer);

      return;
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async update(req, res) {
    try {
      const { password } = req.body;
      const { id } = req.params;
      if (password) {
        delete req.body.password;
        const passwordHash = bcryptjs.hashSync(password, 10);
        req.body.password = passwordHash;

        const updatedCustomer = await Customers.findByIdAndUpdate(id, req.body);
        const { fullName } = updatedCustomer;

        res.status(200).json(`O cliente ${fullName} foi atualizado com sucesso`);
        return;
      }

      const updatedCustomer = await Customers.findByIdAndUpdate(id, req.body);
      const { fullName } = updatedCustomer;

      res.status(200).json(`O cliente ${fullName} foi atualizado com sucesso`);

      return;
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const deletedCustomer = await Customers.findByIdAndDelete(id);

      const { fullName } = deletedCustomer;

      res.status(200).json(`O cliente ${fullName} foi deletado com sucesso`);
    } catch (e) {
      res.status(400).json(e);
    }
  }
}

export default new Customer();
