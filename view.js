const sqlite3 = require('sqlite3').verbose();

// school.db ဖိုင်ကို ချိတ်ဆက်ခြင်း (မရှိသေးပါက အလိုအလျောက် အသစ်ဆောက်ပေးမည်)
const db = new sqlite3.Database('./school.db', (err) => {
    if (err) {
        console.error('Database ချိတ်ဆက်ရာတွင် အမှားရှိသည်:', err.message);
        return;
    }
    console.log('--- 🏫 school.db သို့ အောင်မြင်စွာ ချိတ်ဆက်ပြီးပါပြီ ---');
});

// students Table ထဲမှ Data အားလုံးကို ဖတ်ယူခြင်း
db.all(`SELECT * FROM students`, [], (err, rows) => {
    if (err) {
        console.error('Data ဖတ်ရှုရာတွင် အမှားရှိသည် (Table မရှိသေးခြင်း ဖြစ်နိုင်သည်):', err.message);
    } else {
        if (rows.length === 0) {
            console.log('⚠️ (Table ထဲတွင် ကျောင်းသားစာရင်း မရှိသေးပါ။ ကျေးဇူးပြု၍ Data အရင်သွင်းပါ။)');
        } else {
            console.log('\nလက်ရှိ ကျောင်းသားစာရင်းများ:');
            console.table(rows);
        }
    }
    
    // Database ချိတ်ဆက်မှုကို ပိတ်ခြင်း
    db.close();
});