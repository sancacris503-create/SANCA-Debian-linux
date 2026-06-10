// CARRITO

const cartIcon = document.getElementById("cartIcon");
const cart = document.getElementById("cart");
const closeCart = document.getElementById("closeCart");

const addButtons = document.querySelectorAll(".addCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");

let carrito = [];

// ABRIR / CERRAR CARRITO

cartIcon.addEventListener("click", () => {
  cart.classList.add("show");
});

closeCart.addEventListener("click", () => {
  cart.classList.remove("show");
});

// AGREGAR PRODUCTOS

addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    carrito.push({
      name,
      price,
    });

    actualizarCarrito();
  });
});

// ACTUALIZAR CARRITO

function actualizarCarrito() {
  cartItems.innerHTML = "";

  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.price;

    const div = document.createElement("div");

    div.classList.add("cart__item");

    div.innerHTML = `
      <div>
        <h4>${producto.name}</h4>
        <p>Bs ${producto.price}</p>
      </div>

      <button class="removeBtn" data-index="${index}">
        X
      </button>
    `;

    cartItems.appendChild(div);
  });

  cartTotal.textContent = total;
  cartCount.textContent = carrito.length;

  const removeButtons = document.querySelectorAll(".removeBtn");

  removeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = btn.dataset.index;

      carrito.splice(index, 1);

      actualizarCarrito();
    });
  });
}

// MODAL DETALLES

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

const detailButtons = document.querySelectorAll(".detailsBtn");

detailButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modalTitle.textContent = button.dataset.title;
    modalText.textContent = button.dataset.details;

    modal.classList.add("show");
  });
});

// CERRAR MODAL

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
  }
});

// FINALIZAR PEDIDO

const checkoutBtn = document.querySelector(".checkoutBtn");

checkoutBtn.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  alert("Pedido listo para conectar con Supabase 😄");
});

// ======================
// VERIFICAR ADMIN
// ======================

const adminButton = document.getElementById("adminButton");
const adminPanel = document.getElementById("adminPanel");
const closeAdmin = document.getElementById("closeAdmin");

if (adminButton) {
  adminButton.addEventListener("click", () => {
    adminPanel.classList.add("show");
  });
}

if (closeAdmin) {
  closeAdmin.addEventListener("click", () => {
    adminPanel.classList.remove("show");
  });
}

async function verificarAdmin() {
  const {
    data: { user },
  } = await db.auth.getUser();

  if (!user) return;

  const { data: perfil } = await db
    .from("perfiles")
    .select("rol")
    .eq("id", user.id)
    .single();

  if (perfil && perfil.rol === "admin") {
    adminButton.style.display = "flex";
  }
}

verificarAdmin();
activarEliminarProductos();
// ======================
// AGREGAR PRODUCTOS (DEMO)
// ======================

const addProductBtn = document.getElementById("addProductBtn");

if (addProductBtn) {
  addProductBtn.addEventListener("click", () => {
    const nombre = document.getElementById("productName").value;
    const precio = document.getElementById("productPrice").value;
    const tamaño = document.getElementById("productSize").value;
    const descripcion = document.getElementById("productDescription").value;

    if (!nombre || !precio || !descripcion) {
      alert("Complete todos los campos");
      return;
    }

    const productsGrid = document.querySelector(".products__grid");

    const nuevaCard = document.createElement("article");

    nuevaCard.classList.add("product__card");

    nuevaCard.innerHTML = `
      <img
        src="./images/Logos/favicon-32x32-removebg-preview.png"
        class="product__img"
      >

      <h3>${nombre}</h3>

      <p>${tamaño} • Bs ${precio}</p>

      <button
        class="btn addCart"
        data-name="${nombre}"
        data-price="${precio}"
      >
        Agregar al carrito
      </button>

      <button
        class="btn detailsBtn"
        data-title="${nombre}"
        data-details="${descripcion}"
      >
        Detalles
      </button>

      <button
        class="btn removeProductBtn"
        style="background:red;color:white;"
      >
        Eliminar
      </button>
    `;

    productsGrid.appendChild(nuevaCard);

    // CARRITO

    const addCartBtn = nuevaCard.querySelector(".addCart");

    addCartBtn.addEventListener("click", () => {
      carrito.push({
        name: nombre,
        price: Number(precio),
      });

      actualizarCarrito();
    });

    // DETALLES

    const detailBtn = nuevaCard.querySelector(".detailsBtn");

    detailBtn.addEventListener("click", () => {
      modalTitle.textContent = nombre;
      modalText.textContent = descripcion;

      modal.classList.add("show");
    });

    // ELIMINAR

    const removeBtn = nuevaCard.querySelector(".removeProductBtn");

    removeBtn.addEventListener("click", () => {
      nuevaCard.remove();
    });

    // LIMPIAR FORMULARIO

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productDescription").value = "";

    alert("Producto agregado 😄");
  });
}

// ======================
// ELIMINAR PRODUCTOS ADMIN
// ======================

function activarEliminarProductos() {
  const productos = document.querySelectorAll(".product__card");

  productos.forEach((producto) => {
    if (producto.querySelector(".deleteAdminBtn")) return;

    const btnEliminar = document.createElement("button");

    btnEliminar.classList.add("btn", "deleteAdminBtn");
    btnEliminar.textContent = "Eliminar Producto";

    btnEliminar.style.background = "red";
    btnEliminar.style.color = "white";

    btnEliminar.addEventListener("click", () => {
      if (confirm("¿Eliminar este producto?")) {
        producto.remove();
      }
    });

    producto.appendChild(btnEliminar);
  });
}