const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// SQLite Database ချိတ်ဆက်ခြင်း (ဖိုင်အသစ် အလိုအလျောက် ဆောက်ပေးပါလိမ့်မည်)
const db = new sqlite3.Database('./restaurant.db', (err) => {
    if (err) {
        console.error('Database error:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Reservations ဇယား (Table) ဖန်တီးခြင်း
db.run(`CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT NOT NULL,
    date TEXT NOT NULL,
    guests INTEGER NOT NULL,
    seating TEXT,
    message TEXT
)`);

// API Endpoint - ဖောင်မှ အချက်အလက်လက်ခံရန်
app.post('/api/reservations', (req, res) => {
    const { name, email, phone, date, guests, seating, message } = req.body;

    const query = `INSERT INTO reservations (name, email, phone, date, guests, seating, message) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    db.run(query, [name, email, phone, date, guests, seating, message], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Database ထဲသို့ သိမ်းဆည်း၍ မရပါ။' });
        }
        res.json({ success: true, message: 'စားပွဲကြိုတင်မှာယူမှု အောင်မြင်ပါသည်။', id: this.lastID });
    });
});

// ဆာဗာ စတင်ခြင်း
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

    // Database ထဲရှိ ဒေတာအားလုံးကို ပြန်လည်ကြည့်ရှုရန် API Endpoint
app.get('/api/reservations', (req, res) => {
    const query = `SELECT * FROM reservations`;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'ဒေတာများကို ဖတ်ရှု၍ မရပါ။' });
        }
        res.json({ success: true, data: rows });
    });
});

// ၁။ Reservations အားလုံးကို ဖတ်ရှုရန် (READ)
app.get('/api/reservations', (req, res) => {
    const query = `SELECT * FROM reservations ORDER BY date DESC`;
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'ဒေတာများကို ဖတ်ရှု၍ မရပါ။' });
        }
        res.json({ success: true, data: rows });
    });
});

// ၂။ Reservation တစ်ခုခုကို ပြင်ဆင်ရန် (UPDATE)
app.put('/api/reservations/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone, date, guests, seating, message } = req.body;

    const query = `UPDATE reservations SET name = ?, email = ?, phone = ?, date = ?, guests = ?, seating = ?, message = ? WHERE id = ?`;
    
    db.run(query, [name, email, phone, date, guests, seating, message, id], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'ပြင်ဆင်၍ မရပါ။' });
        }
        res.json({ success: true, message: 'အချက်အလက်များ အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ။' });
    });
});

// ၃။ Reservation တစ်ခုကို ဖျက်ပစ်ရန် (DELETE)
app.delete('/api/reservations/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM reservations WHERE id = ?`;

    db.run(query, [id], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'ဖျက်ဆီး၍ မရပါ။' });
        }
        res.json({ success: true, message: 'ကြိုတင်မှာယူမှုကို ဖျက်သိမ်းပြီးပါပြီ။' });
    });
});
});