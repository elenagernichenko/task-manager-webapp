const mysql = require('mysql');
let instance = null;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo'
});

connection.connect((err) => {
    if (err) {
        console.log(err.message)
    } else {
        console.log('db ' + connection.state);
    }
});

class DbService {
    static getDbService() {
        return instance ? instance : new DbService();
    };

    async getAllData() {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tasks', (err, result) => {
              if (err) {
                reject(err);
                return;
              }
              console.log(result)
              resolve(result);
            });
          });
    }

    async insertNewTask(task) {
      /*var date = new Date();
      var dateAdded = date.toISOString().slice(0, 19).replace('T', ' ');
      console.log(dateAdded)*/
      var status = 0
      const insertId = await new Promise((resolve, reject) => {
        const query = 'INSERT INTO tasks (task) VALUES (?)';

        connection.query(query, [task], (err, result) => {
          if (err) {
            reject(new Error(err.message));
            return;
          }
          resolve(result.insertId);
        })
        })
    }
  }
module.exports = DbService;
