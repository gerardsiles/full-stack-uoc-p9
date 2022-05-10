const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  /* socket.emit*/
  checkInputs();
});

// comprobar los inputs del registro de usuario
function checkInputs() {
  // recibir los valores de los inputs
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  var validEmail = 0;
  var validPasword = 0;

  if (emailValue === "") {
    setErrorFor(email, "El email no puede estar vacio");
  } else if (!isEmailValid(emailValue)) {
    setErrorFor(email, "El email introducido no es valido");
  } else {
    setSuccessFor(email, "El email es valido");
    validEmail = 1;
  }
  if (passwordValue === "") {
    setErrorFor(password, "La contraseña no puede estar vacia");
  } else {
    setSuccessFor(password, "La contraseña es válida. ");
    validPasword = 1;
  }

  if (validEmail === 1 && validPasword === 1) {
    sendUser(emailValue, passwordValue);
  }
}

async function sendUser(uEmail, uPassword) {
  var json = { email: uEmail, password: uPassword };

  const response = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success === false) {
        setErrorFor(email, "Credenciales incorrectas");
        setErrorFor(password, "Revisa la informacion");
      } else {
        document.cookie = `username=${data.username}`;
        localStorage.setItem("username", data.username);
        //         localStorage.setItem("JWT_TOKEN", data.token);
        window.location.replace("http://localhost:5000/rooms");
      }
    })
    .catch((err) => {
      console.log(err);
    });
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
