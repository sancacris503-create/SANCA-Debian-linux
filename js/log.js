// ======================
// ANIMACIÓN LOGIN
// ======================

const container = document.querySelector(".container");

const btnSignIn = document.getElementById("btn-sign-in");
const btnSignUp = document.getElementById("btn-sign-up");

btnSignUp.addEventListener("click", () => {
  container.classList.add("toggle");
});

btnSignIn.addEventListener("click", () => {
  container.classList.remove("toggle");
});

// ======================
// FORMULARIOS
// ======================

const signUpForm = document.querySelector(".sign-up");
const signInForm = document.querySelector(".sign-in");

// ======================
// REGISTRO
// ======================

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = signUpForm
    .querySelector('input[placeholder="Nombre"]')
    .value.trim();

  const email = signUpForm
    .querySelector('input[placeholder="Email"]')
    .value.trim();

  const password = signUpForm.querySelector(
    'input[placeholder="Contraseña"]',
  ).value;

  // VALIDACIÓN SIMPLE

  if (!nombre || !email || !password) {
    alert("Complete todos los campos");
    return;
  }

  // REGISTRAR EN AUTH

  const { data, error } = await db.auth.signUp({
    email,
    password,
  });

  console.log("Usuario:", data?.user);
  console.log("Sesion:", data?.session);

  if (error) {
    alert(error.message);
    return;
  }

  const user = data.user;

  // CREAR PERFIL

 if (user) {

  let rol = "cliente";

  if (email.toLowerCase().endsWith("@salsaivasacea.com")) {
    rol = "admin";
  }

  const { error: perfilError } = await db.from("perfiles").insert([
    {
      id: user.id,
      nombre,
      email,
      rol,
    },
  ]);

  if (perfilError) {
    console.log(perfilError);
  }
}
  // LOGIN AUTOMÁTICO

  const { error: loginError } = await db.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    alert(loginError.message);
    return;
  }

  alert("Registro exitoso 😄");

  window.location.href = "nav.html";
});

// ======================
// LOGIN
// ======================

signInForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = signInForm
    .querySelector('input[placeholder="Email"]')
    .value.trim();

  const password = signInForm.querySelector(
    'input[placeholder="Contraseña"]',
  ).value;

  if (!email || !password) {
    alert("Complete los campos");
    return;
  }

  const { data, error } = await db.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert("Correo o contraseña incorrectos");
    return;
  }

  alert("Bienvenido 😄");

  window.location.href = "nav.html";
});