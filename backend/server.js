"use strict"

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2')

const app =express();
const port = 3000;

app.use(cors());

// MySql kapcsolat létrehozása
const database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'konyvekdb'
});

// Kapcsolat ellenőrzése
database.connect(err => {
    if(err)
    {
        console.error('Hiba az adatbázishoz való csatlakozás közben: ', err);
        return;
    }

    console.log('Sikeres csatlakozás az adatbázishoz.')
})

// Alapértelmezett endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Könyvek lekérdezése az adatbázisból
app.get('/books', (req, res) => {
    database.query('SELECT konyvcime FROM konyvek', (err, results) => {
        if(err)
        {
            console.error('Hiba a fetchelés közben: ', err);
            res.status(500).send('Belső szerver hiba');
            return;
        }
        const konyvCimek = results.map(row => row.konyvcime);
        res.json(konyvCimek);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})