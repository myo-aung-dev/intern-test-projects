document.addEventListener('DOMContentLoaded', () => {
    fetchReservations();
});

async function fetchReservations() {
    try {
        const response = await fetch('http://localhost:3000/api/reservations');
        const result = await response.json();

        if (result.success) {
            const tableBody = document.getElementById('reservation-table-body');
            tableBody.innerHTML = '';

            if (result.data.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="9" style="text-align: center;">ကြိုတင်မှာယူမှု အချက်အလက် မရှိသေးပါ။</td></tr>`;
                return;
            }

            result.data.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.phone}</td>
                    <td>${item.email || '-'}</td>
                    <td>${item.date}</td>
                    <td>${item.guests}</td>
                    <td>${item.seating || '-'}</td>
                    <td>${item.message || '-'}</td>
                    <td>
                        <button class="btn-delete" onclick="deleteReservation(${item.id})">ဖျက်ရန်</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching reservations:', error);
    }
}

async function deleteReservation(id) {
    if (confirm('ဤကြိုတင်မှာယူမှုကို ဖျက်ရန် သေချာပါသလား?')) {
        try {
            const response = await fetch(`http://localhost:3000/api/reservations/${id}`, {
                method: 'DELETE'
            });
            const result = await response.json();

            if (result.success) {
                alert(result.message);
                fetchReservations(); // ဇယားကို Refresh ပြန်လုပ်ရန်
            } else {
                alert('ဖျက်ဆီး၍ မရပါ။');
            }
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchReservations();

    // ၁။ ၅ စက္ကန့်တစ်ကြိမ် (5000 milliseconds) အလိုအလျောက် ဒေတာအသစ် လှမ်းယူစေခြင်း
    setInterval(fetchReservations, 5000);
});

async function fetchReservations() {
    try {
        const response = await fetch('http://localhost:3000/api/reservations');
        const result = await response.json();

        if (result.success) {
            const tableBody = document.getElementById('reservation-table-body');
            
            // Note: User တွေ စာရေးနေစဉ် (သို့) Edit လုပ်နေစဉ် ဇယားအလွတ်ဖြစ်သွားတာမျိုး 
            // မဖြစ်စေရန် လက်ရှိဒေတာ အရေအတွက် မတူမှသာ Table ကို ပြန်ဆွဲပေးခြင်းမျိုးလည်း လုပ်နိုင်ပါတယ်။
            tableBody.innerHTML = '';

            if (result.data.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="9" style="text-align: center;">ကြိုတင်မှာယူမှု အချက်အလက် မရှိသေးပါ။</td></tr>`;
                return;
            }

            result.data.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${item.name}</td>
                    <td>${item.phone}</td>
                    <td>${item.email || '-'}</td>
                    <td>${item.date}</td>
                    <td>${item.guests}</td>
                    <td>${item.seating || '-'}</td>
                    <td>${item.message || '-'}</td>
                    <td>
                        <button class="btn-delete" onclick="deleteReservation(${item.id})">ဖျက်ရန်</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Error fetching reservations:', error);
    }
}

async function deleteReservation(id) {
    if (confirm('ဤကြိုတင်မှာယူမှုကို ဖျက်ရန် သေချာပါသလား?')) {
        try {
            const response = await fetch(`http://localhost:3000/api/reservations/${id}`, {
                method: 'DELETE'
            });
            const result = await response.json();

            if (result.success) {
                fetchReservations(); // ဖျက်ပြီးတာနဲ့ ဇယားကို ချက်ချင်း Update လုပ်ရန်
            } else {
                alert('ဖျက်ဆီး၍ မရပါ။');
            }
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    }
}