const express = require('express')
const cors = require('cors')
const mysql = require('mysql');

const PORT = 5000;

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('Listening on port 3000')
})

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root@123",
    database: "GAPFILLING"
})

con.connect((err) => {
    if (err) throw err;
    console.log('Database Connection Success');
})

app.get('/tasks', (req, res) => {
    const query = "SELECT * FROM TASKS;"
    con.query(query, (err, result) => {
        if (err) {
            res.status(400)
        }
        res.status(200).json({ result })
    })
})

app.post('/tasks', (req, res) => {
    const taskName = req.body.task;
    const sql = "INSERT INTO TASKS (task, completed) VALUES ('" + taskName + "',0)"
    con.query(sql, (err, result) => {
        if (err) {
            res.status(400)
        }
        res.status(200).json({ result })
    })
})

app.patch('/edittask/:id', (req, res) => {
    const id = req.params.id;
    const newTask = req.body.newTask;
    const sql = "UPDATE TASKS SET task='" + newTask + "' WHERE id='" + id + "'";
    con.query(sql, (err, result) => {
        if (err) {
            res.status(400)
        }
        res.status(200).json({ result });
    })
})

app.patch('/toggledone/:id', (req, res) => {
    const id = req.params.id;
    const value = req.body.value;
    const sql = "UPDATE TASKS SET completed='" + value + "' WHERE id='" + id + "'";
    con.query(sql, (err, result) => {
        if (err) {
            res.status(400)
        }
        res.status(200).json({ result });
    })
})

app.delete('/deleteTask/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM TASKS WHERE id = ${id}`
    con.query(sql, (err, result) => {
        if (err) {
            res.status(400);
        }
        res.status(200).json(result);
    })
})
