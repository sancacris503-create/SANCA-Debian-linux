// ======================
// PANEL ADMIN
// ======================

const adminButton = document.getElementById("adminButton");
const adminPanel = document.getElementById("adminPanel");
const closeAdmin = document.getElementById("closeAdmin");

// Abrir panel admin
if (adminButton) {
  adminButton.addEventListener("click", () => {
    adminPanel.classList.add("show");
  });
}

// Cerrar panel admin
if (closeAdmin) {
  closeAdmin.addEventListener("click", () => {
    adminPanel.classList.remove("show");
  });
}

// Verificar si el usuario es admin
async function verificarAdmin() {
  try {
    const {
      data: { user },
    } = await db.auth.getUser();

    if (!user) return;

    const { data: perfil, error } = await db
      .from("perfiles")
      .select("rol")
      .eq("id", user.id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    // Mostrar botón Admin solo a administradores
    if (perfil.rol === "admin") {
      adminButton.style.display = "flex";
    }
  } catch (error) {
    console.log("Error verificando admin:", error);
  }
}

verificarAdmin();
