(async () => {
    const db = require("./db")
    console.log("comecou")

    console.log('INSERT INTO POLLS')
    const result = await db.insertCustomer({title: "Test", start_date: "2022-07-13", termination_date: "2022-08-14"})
    console.log(result)

    console.log('update')
    const result2 = await db.updateCustomer(2, {title: "modified", start_date: "2023-04-05", termination_date: "2023-04-05"})
    console.log(result2)

    console.log("delete from client")
    const result3 = await db.deleteCustomer(4)
    console.log(result3)

    console.log('SELECT * FROM polls')
    const polls = await db.selectCustomers()
    console.log(polls)
})()