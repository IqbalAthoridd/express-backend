const mysql = require('mysql')

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce'
})

async function connect () {
  try {
    await new Promise((resolve, reject) => {
      conn.connect(err => {
        return err ? reject(err) : resolve()
      })
    })
  } catch (err) {
    console.log(err)
  }
}
connect()
module.exports = conn
