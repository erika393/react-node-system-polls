async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection
    
    const mysql = require('mysql2/promise')
    const connection = await mysql.createConnection("mysql://root:root123@localhost:3306/systempolldb");

    console.log("conectou")
    global.connection = connection
    return connection
}

async function selectCustomers(){
    const conn = await connect()
    const [rows] = await conn.query('SELECT * FROM polls;')
    return await rows
}

async function insertCustomer(customer){
    const conn = await connect()
    const sql = 'INSERT INTO polls(title, start_date, termination_date) VALUES (?,?,?)'
    const values = [customer.title, customer.start_date, customer.termination_date]
    return await conn.query(sql, values)
}

async function updateCustomer(id, customer){
    const conn = await connect()
    const sql = 'UPDATE polls SET title=?, start_date=?, termination_date=? WHERE id=?'
    const values = [customer.title, customer.start_date, customer.termination_date, id]
    return await conn.query(sql, values)
}

async function deleteCustomer(id){
    const conn = await connect()
    const sql = 'DELETE FROM polls WHERE id=?'
    return await conn.query(sql, [id])
}

module.exports = {selectCustomers, insertCustomer, updateCustomer, deleteCustomer}