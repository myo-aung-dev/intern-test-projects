// Button နှိပ်ရင် modal ပေါ်အောင်လုပ်ခြင်း
const button = document.getElementById('myButton');
const modal = document.getElementById('myModal');

button.addEventListener('click', function() {
    modal.style.display = 'block';
});

// API ကနေ data ယူပြီးပြသခြင်း
async function loadUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        
        const list = document.getElementById('userList');
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.name;
            list.appendChild(li);
        });
    } catch (error) {
        console.error('Failed to load users:', error);
    }
}

loadUsers();