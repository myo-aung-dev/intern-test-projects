document.addEventListener("DOMContentLoaded", () => {
    const addForm = document.getElementById("add-form");

    if (addForm) {
        addForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("item-name").value;
            const price = document.getElementById("item-price").value;

            console.log("New Item Added:", { name, price });
            alert(`Successfully added ${name} for $${price}!`);
            addForm.reset();
        });
    }
});