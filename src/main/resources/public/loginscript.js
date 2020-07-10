const URL = 'http://localhost:8081';

document.addEventListener('DOMContentLoaded', function(){
    const loginButton = document.getElementById('loginButton');
    const signButton = document.getElementById('signupButton');

    loginButton.addEventListener('click', loginUser);
    signButton.addEventListener('click', createUser);
});

const createUser = () => {
    let credentials = {}
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
        /*localStorage.setItem("JWT", result.headers.get("Authorization"));
        alert(localStorage.getItem("JWT"));
        window.location.href = "http://localhost:8081/index.html";*/
    });
};

const loginUser = () => {
    let credentials = {}
    let usernameField = document.getElementById("username").value;
    let passwordField = document.getElementById("userpassword").value;

    /*fetch(`${URL}/users/s`,{

    });*/
}