const mysql = require("mysql2/promise");

// // RDS 연결 정보 입력
// const pool = mysql.createPool({
//     host: "mydb.c2tu80kqge3i.us-east-1.rds.amazonaws.com",  // RDS 엔드포인트
//     user: "admin",             // 사용자 이름
//     password: "union2025_*",  // 비밀번호
//     database: "musinsa",      // 사용할 DB 이름
//     port: 3306,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

//sadong의 db
const pool = mysql.createPool({
    host: "localhost",  // RDS 엔드포인트
    user: "root",             // 사용자 이름
    password: "1234",  // 비밀번호
    database: "musinsa",      // 사용할 DB 이름
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;
