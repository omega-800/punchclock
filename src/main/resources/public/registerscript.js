const URL = 'http://localhost:8081';
let users = [];

document.addEventListener('DOMContentLoaded', function(){
    const signButton = document.getElementById('signupButton');

    signButton.addEventListener('click', createUser);
});

const createUser = () => {
    let credentials = {}
    //let roleField = document.getElementById("role").value;
    let usernameField = document.getElementById("username").value;
    let passwordField = document.getElementById("userpassword").value;

    credentials['username'] = usernameField;
    credentials['password'] = passwordField;

    fetch(`${URL}/users/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then((result) => {
        users.push(credentials);
        alert("Success");
        window.location.href = "http://localhost:8081/login.html";
    });
};