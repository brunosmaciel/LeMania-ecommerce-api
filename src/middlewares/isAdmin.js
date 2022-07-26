import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['login needes'],
    });
  }
  const [, token] = authorization.split(' ');
  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await Admin.findOne({ email });
    if (!user) {
      return res.status(401).json({
        errors: ['Usuario invalido'],
      });
    }
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    return res.status(401).json({
      errors: ['token expirado ou invalido'],
    });
  }
};
