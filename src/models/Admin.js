import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, 'É necessário enviar um email'],
    unique: true,
  },
  passwordHash: {
    type: String,
    require: [true, 'É necessário enviar uma senha'],
  },
}, {
  versionKey: false,

});

const Admin = mongoose.model('Admin', Schema);

export default Admin;
