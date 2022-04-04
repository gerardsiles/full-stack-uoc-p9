const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function setErrorFor(input, message) {
    //Seleccionar la clase padre del elemento, .form-control
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");

    $("formControl").ready
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


form.addEventListener('submit', registerUser)

async function registerUser(event) {
     event.preventDefault();
     const usernameValue = username.value.trim();
     const emailValue = email.value.trim();
     const passwordValue = password.value.trim();
     const password2Value = password2.value.trim();
     let validUsername = false;
     let validEmail = false;
     let validPassword = false;

        if (usernameValue === "") {
            // mostrar error
            // agregar clase danger
            setErrorFor(username, "usuario no puede estar vacio");

        } else {
            // agregar clase succes
            setSuccessFor(username, "Este usuario esta disponible");
            validUsername = true;
        }

        if (emailValue === "") {
            setErrorFor(email, "El email no puede estar vacio");
        } else if (!isEmailValid(emailValue)) {
            setErrorFor(email, "El email introducido no es valido");
        } else {
            setSuccessFor(email, "El email es valido");
            validEmail = true;

        }
        if (passwordValue === "") {
            setErrorFor(password, "la contrasena no puede estar vacia");
        } else {
            setSuccessFor(password, "contraseña valida");
        }

        if (password2Value === "") {
            setErrorFor(password2, "confirma la contrasena");
        } else if (passwordValue !== password2Value) {
            setErrorFor(password2, "las contrasenas no son iguales");;
        } else {
            setSuccessFor(password2);
            validPassword = true;
        }
        if (validEmail && validUsername && validPassword) {
            var json = {
                        "username": usernameValue,
                        "email": emailValue,
                        "password": passwordValue
                        };


            await fetch("http://localhost:5000/register",{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(json)
            })

                .then(response => response.json())
                .then(result => {
                    console.log('Success:', result);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }

//          // si todo esta bien, enviar la informacion al servidor
//             const result = await fetch("/register", {
//             method:'POST',
//             headers:{
//                 'Content-Type':'application/json',
//             body: JSON.stringify({
//                 usernameValue, emailValue, passwordValue
//             })
//             },
//             }).then((result) => result.json())
//             .catch(error => console.error(error));
//                 console.log(response);
//             }
//         }
// });
}
// comprobar los inputs del registro de usuario
function checkInputs() {
    // recibir los valores de los inputs
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    var validated = 0;

    if (usernameValue === "") {
        // mostrar error
        // agregar clase danger
        setErrorFor(username, "usuario no puede estar vacio");

        // todo
        // comprobar si el nombre existe
    } else {
        // agregar clase succes
        setSuccessFor(username, "Este usuario esta disponible");
        validated++;
    }

    if (emailValue === "") {
        setErrorFor(email, "El email no puede estar vacio");
    } else if (!isEmailValid(emailValue)) {
        setErrorFor(email, "El email introducido no es valido");
    } else {
        setSuccessFor(email, "El email es valido");
        validated++;
    }
    if (passwordValue === "") {
        setErrorFor(password, "la contrasena no puede estar vacia");
    } else {
        setSuccessFor(password, "contraseña valida");
        validated++;
    }

    if (password2Value === "") {
        setErrorFor(password2, "confirma la contrasena");
    } else if (passwordValue !== password2Value) {
        setErrorFor(password2, "las contrasenas no son iguales");
    } else {
        setSuccessFor(password2);
        validated++;
    }

    if (validated === 4) {
        console.log(usernameValue);
        console.log(emailValue);
        console.log(passwordValue);
        sendInformation(usernameValue, emailValue, passwordValue);
}



function sendInformation() {
// const response = await fetch("localhost:5000/register/post/json", {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: `{
//        "username": username.value.trim(),
//        "email": email.value.trim(),
//        "password": password.value.trim()
//       }`,
//     });
//
//     response.json().then(data => {
//         console.log(data);
//     });
        post("/register",{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            body: JSON.stringify({
                "username": username.value.trim(),
                "email": email.value.trim(),
                "password": password.value.trim()
            })
            },
        })
            .then(data => data.json())
            .catch(error => console.error(error));
    }
}

