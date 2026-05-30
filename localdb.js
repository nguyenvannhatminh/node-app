const mysql = require('mysql2');
require('dotenv').config({ quiet: true }); // Load biến môi trường

// 1. Configure the connection
const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',      
    password: '123456',      // Mật khẩu của bạn
    database: 'studentreg' // Tên database
});

// 2. Establish connection
const establishConnection = () => {  
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected to the database!');
    });
};

// 3.1 Execute a query (Dùng Promise để dễ dùng async/await)
const query = (sql, values = []) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

// 4. End the connection when done
const endConnection = () => {
    connection.end((err) => {
        if (err) {
            console.error('Error ending the connection: ' + err.stack);
            return;
        }
        console.log('Connection ended successfully.');
    });
};

// Export the functions
module.exports = {
    connection,
    establishConnection,
    query,
    endConnection,
};