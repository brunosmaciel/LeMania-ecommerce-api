import mongoose from 'mongoose';
import { isEmail } from 'validator';

const Schema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'É obrigatorio enviar um nome'],
  },
  cpf: {
    type: String,
    required: true,
    unique: [true, 'É obrigatorio informar um CPF valido'],
  },
  birthDate: {
    type: String,
  },
  genre: {
    type: String,
    required: [true, 'Voce precisa preencher o genero'],
  },
  email: {
    type: String,
    required: [true, 'É obrigatorio enviar um email'],
    unique: true,
    validade: [isEmail, 'email invalido'],
  },
  password: {
    type: String,
    required: [true, 'Voce precisa enviar uma senha'],
  },
  purchases: [{
    type: mongoose.Schema.Types.ObjectId,
  }],
}, {
  versionKey: false,

});

const Customer = mongoose.model('Customer', Schema);

export default Customer;
