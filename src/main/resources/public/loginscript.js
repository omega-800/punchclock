const URL = 'http://localhost:8081';
let wrong = 0;

document.addEventListener('DOMContentLoaded', function(){
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', loginUser);
});

const loginUser = () => {
    let usernameField = document.getElementById("usernameL");
    let passwordField = document.getElementById("userpasswordL");
    if (usernameField.value != "" && passwordField.value != "") {
        if (wrong < 3) {
            let credentials = {};
            //let roleField = document.getElementById("roleL").value;

            credentials['username'] = usernameField.value;
            credentials['password'] = passwordField.value;

            fetch(`${URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            }).then((result) => {
                if (result.status === 200) {
                    localStorage.setItem("JWT", result.headers.get("Authorization"));
                    alert("Logged in");
                    window.location.href = "http://localhost:8081/index.html";
                } else {
                    alert("Wrong login");
                    wrong++;
                    let textW = "Wrong tries " + wrong;
                    document.getElementById("tries").innerHTML = textW;
                }
            });
        } else {
            // document.getElementById("roleL").setAttribute("readonly", "readonly");
            document.getElementById("usernameL").setAttribute("readonly", "readonly");
            document.getElementById("userpasswordL").setAttribute("readonly", "readonly");
            document.getElementById("loginButton").setAttribute("disabled", "disabled")
        }
    }else{
        usernameField.setAttribute("background-color", "red");
        passwordField.setAttribute("background-color", "red");
    }
}