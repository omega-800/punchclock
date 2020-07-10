const URL = 'http://localhost:8081';
let users = [];
let mode = 'create';
let currentuser;

const dateAndTimeToDate = (dateString, timeString) => {
    return new Date(`${dateString}T${timeString}`).toISOString();
};

// API Requests
const createuser = (user) => {
    fetch(`${URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then((result) => {
        result.json().then((user) => {
            users.push(user);
            renderusers();
        });
    });
};

const indexusers = () => {
    fetch(`${URL}/users`, {
        method: 'GET'
    }).then((result) => {
        result.json().then((result) => {
            users = result;
            renderusers();
        });
    });
    renderusers();
};

const deleteuser = (id) => {
    fetch(`${URL}/users/${id}`, {
        method: 'DELETE'
    }).then((result) => {
        indexusers();
    });
};

const updateuser = (user) => {
    fetch(`${URL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then((result) => {
        result.json().then((user) => {
            users = users.map((e) => e.id === user.id ? user : e);
            renderusers();
        });
    });
}

// Rendering
const resetForm = () => {
    const userForm = document.querySelector('#userForm');
    userForm.reset();
    mode = 'create';
    currentuser = null;
}

const edituser = (user) => {
    mode = 'edit';
    currentuser = user;

    const userForm = document.querySelector('#userForm');
    const nameField = userForm.querySelector('[name="nameU"]');
    nameField.value = user.name;
    const descField = userForm.querySelector('[name="passU"]');
    descField.value = user.password;
}

const createCell = (text) => {
    const cell = document.createElement('td');
    cell.innerText = text;
    return cell;
};

const createActions = (user) => {
    const cell = document.createElement('td');

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteuser(user.id));
    cell.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => edituser(user));
    cell.appendChild(editButton);

    return cell;
}

const renderusers = () => {
    const display = document.querySelector('#userDisplay');
    display.innerHTML = '';
    users.forEach((user) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(user.id));
        row.appendChild(createCell(user.name));
        row.appendChild(createCell(user.password));
        row.appendChild(createActions(user));
        display.appendChild(row);
    });
};

document.addEventListener('DOMContentLoaded', function(){
    const userForm = document.querySelector('#userForm');
    userForm.addEventListener('submit', createUser);
    userForm.addEventListener('reset', resetForm);
    indexusers();
});

const createUser = (e) => {
    //let roleField = document.getElementById("role");
    e.preventDefault();
    let usernameField =document.getElementById("nameU");
    let passwordField =document.getElementById("passU");

    if (usernameField.value != "" && passwordField.value != "") {

        const user = {};
    if (mode === 'create') {
        const formData = new FormData(e.target);
        user['username'] = formData.get('nameU');
        user['password'] = formData.get('passU');


        fetch(`${URL}/users/sign-up`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((result) => {
            users.push(user);
            alert("Success");
            window.location.href = "http://localhost:8081/login.html";
        });
    } else{
        user.id = currentuser.id;
        updateuser(user);
        }
        resetForm();
    }else{
        usernameField.style.backgroundColor="tomato";
        passwordField.style.backgroundColor="tomato";
    }
};
