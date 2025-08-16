const tableBody = document.querySelector('#customer-table tbody');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addBtn = document.getElementById('add-customer');
const rowTemplate = document.getElementById('row-template');

function loadCustomers() {
    const customers = JSON.parse(localStorage.getItem('customers') || '[]');
    customers.forEach(c => addCustomer(c));
}

function saveCustomers() {
    const customers = Array.from(tableBody.children).map(row => ({
        name: row.querySelector('.cust-name').textContent,
        email: row.querySelector('.cust-email').textContent,
        phone: row.querySelector('.cust-phone').textContent
    }));
    localStorage.setItem('customers', JSON.stringify(customers));
}

function addCustomer({name, email, phone}) {
    const clone = rowTemplate.content.cloneNode(true);
    const tr = clone.querySelector('tr');
    const nameCell = tr.querySelector('.cust-name');
    const emailCell = tr.querySelector('.cust-email');
    const phoneCell = tr.querySelector('.cust-phone');
    const editBtn = tr.querySelector('.edit-btn');
    const deleteBtn = tr.querySelector('.delete-btn');

    nameCell.textContent = name;
    emailCell.textContent = email;
    phoneCell.textContent = phone;

    editBtn.addEventListener('click', () => {
        const newName = prompt('Name:', nameCell.textContent) || nameCell.textContent;
        const newEmail = prompt('Email:', emailCell.textContent) || emailCell.textContent;
        const newPhone = prompt('Phone:', phoneCell.textContent) || phoneCell.textContent;
        nameCell.textContent = newName.trim();
        emailCell.textContent = newEmail.trim();
        phoneCell.textContent = newPhone.trim();
        saveCustomers();
    });

    deleteBtn.addEventListener('click', () => {
        tr.remove();
        saveCustomers();
    });

    tableBody.appendChild(tr);
    saveCustomers();
}

addBtn.addEventListener('click', () => {
    const customer = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim()
    };
    if (customer.name && customer.email && customer.phone) {
        addCustomer(customer);
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
    }
});

loadCustomers();
