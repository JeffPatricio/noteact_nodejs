const connection = require('../database/connection');

module.exports = {
  async create(req, res) {

    const { userId } = req;
    const { title, content } = req.body;

    if (!title || !content) return res.json({
      success: false,
      message: 'Necessário informar o título e o conteúdo da anotação'
    });

    const [id] = await connection('notes').insert({ title, content, userId: userId });

    if (id) return res.json({
      success: true,
      message: 'Anotação cadastrada com sucesso'
    });

    return res.json({
      success: false,
      message: 'Ocorreu um erro ao criar a anotação'
    });
  },

  async index(req, res) {
    const { userId } = req;
    const notes = await connection('notes')
      .where('userId', userId)
      .select(['*']);

    return res.json({
      success: true,
      message: 'OK',
      notes
    });
  },

  async update(req, res) {
    const { userId } = req;
    const { title, content, noteId } = req.body;

    if (!title || !content) return res.json({
      success: false,
      message: 'Necessário informar o título e o conteúdo da anotação'
    });

    const note = await connection('notes')
      .where('id', noteId)
      .select(['userId'])
      .first();

    if (note) {
      if (note.userId == userId) {
        const updated = await connection('notes')
          .where('id', noteId)
          .update({
            title,
            content
          });

        if (updated) return res.json({
          success: true,
          message: 'Anotação atualizada com sucesso'
        });

        return res.json({
          success: false,
          message: 'Não foi possível atualizar anotação'
        });
      }
      return res.json({
        success: false,
        message: 'Usuário não autorizado para atualizar a anotação'
      });
    }
    return res.json({
      success: false,
      message: 'Não foi possível encontrar a anotação'
    });
  },

  async delete(req, res) {

    const { userId } = req;
    const { id } = req.params;

    const note = await connection('notes')
      .where('id', id)
      .select(['userId'])
      .first();

    if (note) {
      if (note.userId == userId) {
        const deleted = await connection('notes').where('id', id).delete();

        if (deleted === 1) return res.json({
          success: true,
          message: 'Anotação excluida'
        });

        return res.json({
          success: false,
          message: 'Não foi possível excluir anotação'
        });
      }
      return res.json({
        success: false,
        message: 'Usuário não autorizado para excluir a anotação'
      });
    }
    return res.json({
      success: false,
      message: 'Não foi possível encontrar a anotação'
    });
  },

  read: async (req, res) => {

    const { userId } = req;
    const { id } = req.params;

    const note = await connection('notes')
      .where({ id, userId })
      .select(['*'])
      .first();

    if (note) {
      return res.json({
        success: true,
        message: 'OK',
        note
      });
    }
    return res.json({
      success: false,
      message: 'Não foi possível encontrar a anotação'
    });
  }
}