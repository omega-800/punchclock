
document.addEventListener('DOMContentLoaded', function(){
    const loginButton = document.getElementById('loginButton');
    const signButton = document.getElementById('signupButton');

    // loginButton.addEventListener('click', loginUser);
    signButton.addEventListener('click', createUser);
});

const createUser = () => {
    let credentials = {}
    let usernameField = document.getElementById("username").innerText;
    let passwordField = document.getElementById("userpassword").innerText;

    credentials['username'] = usernameField;
    credentials['password'] = passwordField;

    fetch(`${URL}/users/sign-up`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then((result) => {
        alert("Success");
    });
};