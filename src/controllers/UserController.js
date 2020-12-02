const multer = require('multer');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require('../database/connection');
const multerConfig = require('../config/multer');
const { isEmail, isEmpty } = require('../utils');

module.exports = {
  create: async (req, res) => {

    const { password, email, name, confirmPassword } = req.body;

    if (isEmpty(password, email, name, confirmPassword)) return res.json({
      success: false,
      message: 'Os campos e-mail, nome, senha e confirmação de senha são obrigatórios',
    });

    if (!isEmail(email)) return res.json({
      success: false,
      message: 'O e-mail informado é inválido'
    });

    if (password.length < 6) return res.json({
      success: false,
      message: 'A senha deve conter no mínimo 6 caracteres'
    });

    if (password !== confirmPassword) return res.json({
      success: false,
      message: 'As senhas inseridas não combinam'
    });

    const userExists = await database('users')
      .where('email', email)
      .first();

    if (userExists) return res.json({
      success: false,
      message: 'O e-mail informado já está em uso'
    });

    const passCrypt = await bcryptjs.hashSync(password, 10);

    const [id] = await database('users').insert({ name, email, password: passCrypt });

    if (!!id) {

      const auth = jwt.sign({ id }, 'aaa4aaec565f47aa32525a2b8a8ee8f9', { expiresIn: '100d' });

      return res.json({
        success: true,
        message: 'Usuário criado com sucesso.',
        userName: name,
        auth
      });
    }

    return res.json({
      success: false,
      message: 'Ocorreu um erro ao criar usuário'
    });
  },

  update: async (req, res) => {

    const upload = multer(multerConfig).single('file');

    return upload(req, res, async err => {

      if (err) return res.json({
        success: false,
        message: 'Erro ao fazer upload de arquivo'
      });

      const { email, name, currentPassword, newPassword, confirmNewPassword } = req.body;
      const { userId } = req;

      const userUpdate = {};

      if (isEmpty(email, name)) return res.json({
        success: false,
        message: 'Os campos e-mail e nome são obrigatórios',
      });

      if (!isEmail(email)) return res.json({
        success: false,
        message: 'O e-mail informado é inválido'
      });

      if ((currentPassword || newPassword || confirmNewPassword) &&
        isEmpty(currentPassword, newPassword, confirmNewPassword)
      ) return res.json({
        success: false,
        message: 'Para alterar senha é necessário inserir os campos senha antiga, nova senha e confirmar nova senha',
      });

      if ((newPassword || confirmNewPassword) && (confirmNewPassword !== newPassword)) return res.json({
        success: false,
        message: 'As novas senhas inseridas não combinam'
      });

      if (currentPassword) {

        const userConfirmPassword = await database('users')
          .select('password')
          .where({ id: userId })
          .first();

        const passwordMatch = bcryptjs.compareSync(currentPassword, userConfirmPassword.password);

        if (!passwordMatch) return res.json({
          success: false,
          message: 'A senha antiga inserida é inválida'
        });

        const newPassCrypt = await bcryptjs.hashSync(newPassword, 10);

        userUpdate.password = newPassCrypt;
      }

      const emailExists = await database('users')
        .where({ email })
        .whereNot({ id: userId })
        .first();

      if (emailExists) return res.json({
        success: false,
        message: 'O e-mail informado já está em uso'
      });

      if (req.body.removePhoto) userUpdate.image = null;
      if (req.file) userUpdate.image = `http://localhost:3001/images/${req.file.filename}`;

      userUpdate.name = name;
      userUpdate.email = email;

      const updated = await database('users')
        .where({ id: userId })
        .update(userUpdate);

      if (updated === 1) return res.json({
        success: true,
        message: 'Usuário atualizado com sucesso',
        userName: name
      });

      return res.json({
        success: false,
        message: 'Ocorreu um erro ao atualizar o usuário'
      });
    });
  },

  read: async (req, res) => {

    const { userId } = req;

    const user = await database('users')
      .select(['*'])
      .where({ id: userId })
      .first();

    if (!!user) {
      delete user.password;
      return res.json({
        success: true,
        message: 'OK',
        user: { ...user }
      });
    }

    return res.json({
      success: false,
      message: 'Usuário não encontrado'
    });
  }
}