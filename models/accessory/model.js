const { query } = require('../../lib/mysql');

exports.get = async (id) => {
  const results = await query('SELECT * from accessories WHERE id = ?', [id]);
  return results[0];
};

exports.update = async (id, accessory) => {
  const results = query('UPDATE accessories SET ? WHERE id = ?', [accessory, id]);
  return results.affectedRows === 1;
};
