const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

form.addEventListener("submit", e => {
    e.preventDefault();
    checkInputs();
});

// comprobar los inputs del registro de usuario
function checkInputs() {
    // recibir los valores de los inputs
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if (usernameValue === "") {
        // mostrar error
        // agregar clase danger
        setErrorFor(username, "El campo de usuario no puede estar vacio");
    }

    if (emailValue === "") {
        setErrorFor(email, "El email no puede estar vacio");
    } else if (!isEmailValid(emailValue)) {
        setErrorFor(email, "El email introducido no es valido");
    } else {
        setSuccessFor(email, "El email es valido");
    }
    if (passwordValue === "") {
        setErrorFor(password, "la contrasena no puede estar vacia");
    } else {
        setSuccessFor(password, "contraseña valida");
    }

    if (password2Value === "") {
        setErrorFor(password2, "confirma la contrasena");
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, "las contrasenas no son iguales");
    } else {
        setSuccessFor(password2);
    }
}

function setErrorFor(input, message) {
    //Seleccionar la clase padre del elemento, .form-control
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    // agregar el mensage de error
    small.innerText = message;

    // agregar la clase de error
    formControl.className = "form-control btn-danger";
}

function setSuccessFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    // agregar el mensage de exito
    small.innerText = message;

    formControl.className = "form-control btn-success";
}

function isEmailValid(email) {
    // encontrado en stack overflow
    //https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}