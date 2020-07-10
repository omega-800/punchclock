const URL = 'http://localhost:8081';
let users = [];

document.addEventListener('DOMContentLoaded', function(){
    const signButton = document.getElementById('signupButton');

    signButton.addEventListener('click', createUser);
});

const createUser = () => {
    //let roleField = document.getElementById("role");
    let usernameField = document.getElementById("username");
    let passwordField = document.getElementById("userpassword");

    if (usernameField.value != "" && passwordField.value != "") {
    let credentials = {}

    credentials['username'] = usernameField.value;
    credentials['password'] = passwordField.value;

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
}else{
    usernameField.style.backgroundColor="tomato";
    passwordField.style.backgroundColor="tomato";
}
};

