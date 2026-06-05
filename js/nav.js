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

  // ELIMINAR

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
