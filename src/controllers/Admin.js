/* eslint-disable camelcase */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin';

class AdminToken {
  async create(req, res) {
    try {
      const { email, password, adminSecret } = req.body;
      const admin_secret = process.env.ADMIN_SECRET;
      if (adminSecret !== admin_secret) {
        return res.status(401).json({
          errors: ['Unauthorazed, invalid admin secret'],
        });
      }
      const passwordHash = bcrypt.hashSync(password, 8);
      const newAdminUser = await Admin.create({ email, passwordHash });
      return res.status(200).json(newAdminUser);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        errors: ['Bad request'],
      });
    }
  }

  async show(req, res) {
    try {
      const { adminSecret } = req.body;
      const { id } = req.params;
      const admin_secret = process.env.ADMIN_SECRET;
      if (adminSecret !== admin_secret) {
        return res.status(401).json({
          errors: ['Unauthorazed, invalid admin secret'],
        });
      }
      const adminUser = await Admin.findById(id);

      return res.status(200).json(adminUser);
    } catch (err) {
      return res.status(400).json({
        errors: ['Bad request'],
      });
    }
  }

  async update(req, res) {
    try {
      const { email, password, adminSecret } = req.body;
      const { id } = req.params;
      const admin_secret = process.env.ADMIN_SECRET;
      if (adminSecret !== admin_secret) {
        return res.status(401).json({
          errors: ['Unauthorazed, invalid admin secret'],
        });
      }
      if (!password) {
        const updatedAdminUser = await Admin.findByIdAndUpdate(id, { email });
        return res.status(200).json(updatedAdminUser);
      }
      const passwordHash = bcrypt.hashSync(password, 8);
      const updatedAdminUser = await Admin.findByIdAndUpdate(id, { email, passwordHash });
      return res.status(200).json(updatedAdminUser);
    } catch (err) {
      return res.status(400).json({
        errors: ['Bad request'],
      });
    }
  }

  async delete(req, res) {
    try {
      const { adminSecret } = req.body;
      const { id } = req.params;
      const admin_secret = process.env.ADMIN_SECRET;
      if (adminSecret !== admin_secret) {
        return res.status(401).json({
          errors: ['Unauthorazed, invalid admin secret'],
        });
      }
      const deletedUser = await Admin.findByIdAndDelete(id);
      return res.status(200).json(deletedUser);
    } catch (err) {
      return res.status(400).json({
        errors: ['Bad request'],
      });
    }
  }

  async getToken(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Invalid Credentials'],
      });
    }

    const adminUser = await Admin.findOne({ email });

    if (!adminUser) {
      return res.status(401).json({
        errors: ['Email invalido'],
      });
    }

    const { passwordHash } = adminUser;

    const isPasswordValid = await bcrypt.compare(password, passwordHash);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({
        errors: ['senha invalida'],
      });
    }
    const { id } = adminUser;
    const token = jwt.sign(
      { id, email },
      process.env.TOKEN_SECRET,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      },
    );

    return res.status(200).json({
      token,
      user: {
        id,
        email,
      },
    });
  }
}

export default new AdminToken();
