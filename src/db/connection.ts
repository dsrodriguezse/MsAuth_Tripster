import mysql from 'mysql';

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '12345678',
    database : 'restaurante'
});

export default connection;
