const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require('../database/connection');
const { isEmail, isEmpty } = require('../utils');

module.exports = {
  create: async (req, res) => {

    const { email, password } = req.body;

    if (isEmpty(password, email)) return res.json({
      success: false,
      message: 'E-mail ou senha inválidos',
    });

    if (!isEmail(email)) return res.json({
      success: false,
      message: 'E-mail ou senha inválidos',
    });

    if (password.length < 6) return res.json({
      success: false,
      message: 'E-mail ou senha inválidos',
    });

    const user = await database('users').where('email', email).first();

    if (!user) {
      return res.json({
        success: false,
        message: 'E-mail ou senha inválidos'
      });
    }

    const passwordMatch = bcryptjs.compareSync(password, user.password);

    if (!passwordMatch) {
      return res.json({
        success: false,
        message: 'E-mail ou senha inválidos'
      });
    }

    const auth = jwt.sign({ id: user.id }, 'aaa4aaec565f47aa32525a2b8a8ee8f9', { expiresIn: '100d' });

    return res.json({
      success: true,
      message: 'Bem vindo(a) ' + user.name,
      userName: user.name,
      auth
    });

  }
}