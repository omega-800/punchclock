const URL = 'http://localhost:8081';
let wrong = 0;

document.addEventListener('DOMContentLoaded', function(){
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', loginUser);
});

const loginUser = () => {
    if(wrong<3) {
        let credentials = {};
        //let roleField = document.getElementById("roleL").value;
        let usernameField = document.getElementById("usernameL").value;
        let passwordField = document.getElementById("userpasswordL").value;

        credentials['username'] = usernameField;
        credentials['password'] = passwordField;

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
    }else{
       // document.getElementById("roleL").setAttribute("readonly", "readonly");
        document.getElementById("usernameL").setAttribute("readonly", "readonly");
        document.getElementById("userpasswordL").setAttribute("readonly", "readonly");
        document.getElementById("loginButton").setAttribute("disabled","disabled")
    }
}