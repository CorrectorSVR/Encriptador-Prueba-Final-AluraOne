const ingresoTexto = document.getElementById("ingresoTexto");
const botonEncriptar = document.getElementById("boton__encriptar");
const botonDesencriptar = document.getElementById("botonDesencriptar");
const botonCopiar = document.getElementById("botonCopiar");
const mensajeFinal = document.getElementById("mensajeFinal");
const munheco = document.getElementById("munheco");
const rightInfo = document.getElementById("rightInfo");
const right = document.getElementById("right");
const mensajeExito = document.getElementById("mensajeExito");
const imagenChica = document.getElementById("imagenChica");
const imagenChico = document.getElementById("imagenChico");
const contenedorMensajeImagen = document.getElementById("contenedorMensajeImagen");

const remplazar = [
    ["e", "enter"],
    ["o", "ober"],
    ["i", "imes"],
    ["a", "ai"],
    ["u", "ufat"],
];

const mostrarMensajeExito = (tipo) => {
   //mensajeExito.innerHTML = `Texto ${tipo} con éxito`;
    //mensajeExito.style.display = "block";
    contenedorMensajeImagen.classList.remove("oculto");

    if (tipo === "encriptado") {
        imagenChica.classList.remove("oculto");
        imagenChico.classList.add("oculto");
    } else if (tipo === "desencriptado") {
        imagenChica.classList.add("oculto");
        imagenChico.classList.remove("oculto");
    }
};

const remplace = (nuevoValor) => {
    mensajeFinal.innerHTML = nuevoValor;
    munheco.classList.add("oculto");
    ingresoTexto.value = "";
    rightInfo.style.display = "none";
    botonCopiar.style.display = "block";
    right.classList.add("ajustar");
    mensajeFinal.classList.add("ajustar");
};

const reset = () => {
    mensajeFinal.innerHTML = "";
    munheco.classList.remove("oculto");
    contenedorMensajeImagen.classList.add("oculto");
    imagenChica.classList.add("oculto");
    imagenChico.classList.add("oculto");
    rightInfo.style.display = "block";
    botonCopiar.style.display = "none";
    right.classList.remove("ajustar");
    mensajeFinal.classList.remove("ajustar");
    ingresoTexto.value = "";
    ingresoTexto.focus();
    mensajeExito.style.display = "none";
};

const validarTexto = (texto) => {
    const regex = /^[a-z\s]+$/;
    if (!regex.test(texto)) {
        swal("Advertencia","Caracteres no válidos: solo letras minúsculas sin acentos ni caracteres especiales.");
        reset();
        return false;
    }
    return true;
};

botonEncriptar.addEventListener("click", () => {
    const texto = ingresoTexto.value;
    if (texto !== "") {
        if (!validarTexto(texto)) {
            return;
        }
        const encriptar = (newText) => {
            for (let i = 0; i < remplazar.length; i++) {
                if (newText.includes(remplazar[i][0])) {
                    newText = newText.replaceAll(remplazar[i][0], remplazar[i][1]);
                }
            }
            return newText;
        };
        remplace(encriptar(texto));
        mostrarMensajeExito("encriptado");
        swal("Texto encriptado con éxito");
    } else {
        swal("Error","Ingrese texto a encriptar");
        reset();
    }
});

botonDesencriptar.addEventListener("click", () => {
    const texto = ingresoTexto.value;
    if (texto !== "") {
        if (!validarTexto(texto)) {
            return;
        }
        const desencriptar = (newText) => {
            for (let i = 0; i < remplazar.length; i++) {
                if (newText.includes(remplazar[i][1])) {
                    newText = newText.replaceAll(remplazar[i][1], remplazar[i][0]);
                }
            }
            return newText;
        };
        remplace(desencriptar(texto));
        mostrarMensajeExito("desencriptado");
        swal("Texto desencriptado con éxito");
    } else {
        swal("Error","Ingrese texto a desencriptar");
        reset();
    }
});

botonCopiar.addEventListener("click", () => {
    let texto = mensajeFinal;
    texto.select();
    document.execCommand('copy');
    swal("Texto Copiado","¡!");
    reset();
});