const sqlite3 = require('sqlite3').verbose();
const readline = require('readline');

// Terminal မှ အပြန်အလှန် စာရိုက်/မေးမြန်းရန် Setup လုပ်ခြင်း
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 1. Database ချိတ်ဆက်ခြင်း (school.db ဖိုင် အလိုအလျောက် ဆောက်ပေးလိမ့်မည်)
const db = new sqlite3.Database('./school.db', (err) => {
    if (err) {
        console.error('Database ချိတ်ဆက်ရာတွင် အမှားရှိသည်:', err.message);
    } else {
        // Table ဆောက်ရန် လုပ်ဆောင်ချက်ကို စတင်ခြင်း
        createTable();
    }
});

// 2. Table တည်ဆောက်ခြင်း
function createTable() {
    const query = `CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        age INTEGER,
        major TEXT
    )`;
    
    db.run(query, (err) => {
        if (err) {
            console.error('Table ဆောက်ရာတွင် အမှားရှိသည်:', err.message);
        } else {
            // Table အဆင်သင့်ဖြစ်ပြီဆိုပါက မီနူးကို စတင်ပြသမည်
            showMenu();
        }
    });
}

// 3. ပင်မ မီနူးပြသသည့် Function (Main Menu)
function showMenu() {
    console.log('\n========================================');
    console.log('       STUDENT DATABASE MANAGEMENT      ');
    console.log('========================================');
    console.log('1. ကျောင်းသားစာရင်းများအားလုံး ကြည့်ရန် (SELECT)');
    console.log('2. ကျောင်းသား အသစ်ထည့်ရန် (INSERT)');
    console.log('3. ကျောင်းသား Major ပြင်ဆင်ရန် (UPDATE)');
    console.log('4. ကျောင်းသား ဖျက်ရန် (DELETE)');
    console.log('5. ပိတ်ရန် (Exit)');
    console.log('----------------------------------------');

    rl.question('လုပ်ဆောင်လိုသည့် နံပါတ်ကို ရိုက်ပါ (1-5): ', (choice) => {
        switch (choice.trim()) {
            case '1':
                viewStudents();
                break;
            case '2':
                addStudent();
                break;
            case '3':
                updateStudent();
                break;
            case '4':
                deleteStudent();
                break;
            case '5':
                console.log('ကျေးဇူးတင်ပါသည်။ Program ကို ပိတ်လိုက်ပါပြီ။');
                rl.close();
                db.close();
                break;
            default:
                console.log('⚠️ မှားယွင်းနေပါသည်။ 1 နှင့် 5 ကြားသာ ရိုက်ထည့်ပါ။');
                showMenu();
                break;
        }
    });
}

// 4. SELECT (ကျောင်းသားစာရင်းများ ကြည့်ရန်)
function viewStudents() {
    db.all(`SELECT * FROM students`, [], (err, rows) => {
        if (err) {
            console.error('Error:', err.message);
        } else {
            console.log('\n--- ကျောင်းသား စာရင်းများ ---');
            if (rows.length === 0) {
                console.log('(ဒေတာ မရှိသေးပါ)');
            } else {
                console.table(rows);
            }
        }
        showMenu(); // မီနူးသို့ ပြန်သွားမည်
    });
}

// 5. INSERT (ကျောင်းသား အသစ်ထည့်ရန်)
function addStudent() {
    console.log('\n--- ကျောင်းသား အချက်အလက် အသစ်ထည့်သွင်းရန် ---');
    rl.question('ကျောင်းသား နာမည်: ', (name) => {
        rl.question('အသက်: ', (age) => {
            rl.question('Major: ', (major) => {
                const query = `INSERT INTO students (name, age, major) VALUES (?, ?, ?)`;
                db.run(query, [name, age, major], function(err) {
                    if (err) {
                        console.error('Error:', err.message);
                    } else {
                        console.log(`✨ အောင်မြင်ပါပြီ! ကျောင်းသားအသစ် (ID: ${this.lastID}) ကို ထည့်သွင်းပြီးပါပြီ။`);
                    }
                    showMenu();
                });
            });
        });
    });
}

// 6. UPDATE (Major ပြင်ဆင်ရန်)
function updateStudent() {
    console.log('\n--- ကျောင်းသား အချက်အလက် ပြင်ဆင်ရန် ---');
    rl.question('ပြင်ဆင်လိုသည့် ကျောင်းသား၏ ID နံပါတ်: ', (id) => {
        rl.question('Major အသစ်: ', (newMajor) => {
            const query = `UPDATE students SET major = ? WHERE id = ?`;
            db.run(query, [newMajor, id], function(err) {
                if (err) {
                    console.error('Error:', err.message);
                } else if (this.changes === 0) {
                    console.log(`⚠️ ထို ID (${id}) နှင့် ကိုက်ညီသော ကျောင်းသား မရှိပါ။`);
                } else {
                    console.log(`✏️ ID ${id} ၏ Major ကို '${newMajor}' သို့ အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ။`);
                }
                showMenu();
            });
        });
    });
}

// 7. DELETE (ကျောင်းသား ဖျက်ရန်)
function deleteStudent() {
    console.log('\n--- ကျောင်းသား အချက်အလက် ဖျက်ရန် ---');
    rl.question('ဖျက်လိုသည့် ကျောင်းသား၏ ID နံပါတ်: ', (id) => {
        const query = `DELETE FROM students WHERE id = ?`;
        db.run(query, [id], function(err) {
            if (err) {
                console.error('Error:', err.message);
            } else if (this.changes === 0) {
                console.log(`⚠️ ထို ID (${id}) နှင့် ကိုက်ညီသော ကျောင်းသား မရှိပါ။`);
            } else {
                console.log(`🗑️ ID ${id} ရှိ ကျောင်းသားကို အောင်မြင်စွာ ဖျက်လိုက်ပါပြီ။`);
            }
            showMenu();
        });
    });
}