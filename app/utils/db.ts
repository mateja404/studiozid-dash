const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 's53.unlimited.rs',
  user: 'studiozi_developer',
  password: 'Vodopad123',
  database: 'studiozi_app',
  port: 3306
});

export default pool;