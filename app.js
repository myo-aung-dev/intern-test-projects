document.addEventListener('DOMContentLoaded', () => {
    // ၁။ ယနေ့ရက်စွဲကို YYYY-MM-DD ပုံစံဖြင့် ရယူခြင်း
    const today = new Date().toISOString().split('T')[0];
    
    // ၂။ date input တွင် min attribute သတ်မှတ်ပေးခြင်း (ယခင်ရက်များကို ရွေးမရအောင်)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.min = today;
    }

    const form = document.getElementById('reservation-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                date: dateInput.value,
                guests: document.getElementById('guests').value,
                seating: document.getElementById('seating').value,
                message: document.getElementById('message').value.trim()
            };

            // ရက်စွဲ ရွေးချယ်ထားခြင်း ရှိမရှိနှင့် အတိတ်ရက် ဟုတ်မဟုတ် ထပ်မံစစ်ဆေးခြင်း
            if (!formData.name || !formData.phone || !formData.date) {
                alert('ကျေးဇူးပြု၍ မဖြစ်မနေဖြည့်ရမည့် အချက်အလက်များကို ဖြည့်စွက်ပါ။');
                return;
            }

            // if (formData.date < today) {
            //     alert('အတိတ်ရက်များကို ရွေးချယ်၍ မရပါ။ ကျေးဇူးပြု၍ မှန်ကန်သော ရက်စွဲကို ရွေးချယ်ပါ။');
            //     return;
            // }

            try {
                const response = await fetch('http://localhost:3000/api/reservations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (result.success) {
                    alert(`ကျေးဇူးတင်ပါတယ် ${formData.name} ခင်ဗျာ။ စားပွဲကြိုတင်မှာယူမှု အောင်မြင်ပါသည်။`);
                    form.reset();
                    
                    // Form reset ပြီးပါက min ကို ပြန်လည်သတ်မှတ်ရန်
                    dateInput.min = new Date().toISOString().split('T')[0];
                } else {
                    alert('မှားယွင်းမှု ရှိနေပါသည်။ ကျေးဇူးပြု၍ ထပ်ကြိုးစားပါ။');
                }
            } catch (error) {
                console.error('Fetch Error:', error);
                alert('ဆာဗာသို့ ချိတ်ဆက်၍ မရပါ။');
            }
        });
    }
});