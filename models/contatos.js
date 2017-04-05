class Contatos {
  constructor(connection) {
    this._connection = connection;
  }

  findAll(callback) {
    this._connection.query('SELECT * FROM contatos', callback);
  }

  findByNome(nome, callback) {
    this._connection.query('SELECT * FROM contatos WHERE nome LIKE ?', ['%'+nome+'%'], callback);
  }

  findByApelido(apelido, callback) {
    this._connection.query('SELECT * FROM contatos WHERE apelido LIKE ?', ['%'+apelido+'%'], callback);
  }

  findByDate(de, ate, callback) {
    this._connection.query('SELECT * FROM contatos WHERE aniversario BETWEEN date ? AND date ?', [de, ate], callback);
  }

  findOne(id, callback) {
    this._connection.query('SELECT * FROM contatos WHERE id = ?', id, callback);
  }

  update(id, obj, callback) {
    this._connection.query('UPDATE contatos SET ? WHERE id = ?', [obj, id], callback);
  }

  create(obj, callback) {
    this._connection.query('INSERT INTO contatos SET ?', obj, callback);
  }

  remove(id, callback) {
    this._connection.query('DELETE FROM contatos WHERE id = ?', id, callback);
  }
}

module.exports = Contatos;
