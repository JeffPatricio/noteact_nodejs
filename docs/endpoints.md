# POST (/users) (JSON)
* Cadastrar usuários

Entrada (body):
- name (*): nome do usuário
- email (*): email do usuário
- password (*): senha do usuário
- confirmPassword (*): confirmação de senha do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- userName: nome do usuário
- auth: token de autenticação do usuário

============================================================

# PUT (/users) (Multipart form)
* Atualizar os dados do usuário

Entrada (body):
- user_id (*): id do usuário
- name (*): nome do usuário
- email (*): email do usuário
- file: imagem do usuário
- removePhoto: flag para definir se é pra remover a foto ou não
- currentPassword: senha atual do usuário
- newPassword: nova senha do usuário
- confirmNewPassword: confirmação de nova senha do usuário

Entrada (headers):
- Authorization (*): token de acesso do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- userName: nome do usuário

============================================================

# GET (/users)
* Buscar os detalhes do usuário

Entrada (headers):
- Authorization (*): token de acesso do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- user: detalhes do usuário

============================================================

# POST (/sessions) (JSON)
* Fazer login

Entrada (body):
- email (*): email do usuário
- password (*): senha do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- userName: nome do usuário
- auth: token de autenticação do usuário

============================================================

# GET (/notes)
* Buscar a lista de anotações

Entrada (headers):
- Authorization (*): token de acesso do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- notes [] : lista de notas

============================================================

# POST (/notes) (JSON)
* Cadastrar anotações

Entrada (body):
- title (*): título da anotação
- content (*): conteúdo da anotação

Entrada (headers):
- Authorization (*): token de acesso do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação

============================================================

# PUT (/notes) (JSON)
* atualizar anotações

Entrada (body):
- noteId (*): id da anotação
- title (*): título da anotação
- content (*): conteúdo da anotação

Entrada (headers):
- Authorization (*): token de acesso do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação

============================================================

# DELETE (/notes/:id) (JSON)
* excluir anotações

Entrada (URL):
- id (*): id da anotação

Entrada (headers):
- Authorization (*): token de acesso do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação

============================================================

# GET (/notes/:id) (JSON)
* visualizar anotações

Entrada (URL):
- id (*): id da anotação

Entrada (headers):
- Authorization (*): token de acesso do usuário

Saída:
- success: informa se a operação ocorreu com sucesso
- message: mensagem informativa da operação
- note : dados da anotação

============================================================