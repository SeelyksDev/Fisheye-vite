import { getPhotographerById } from "../pages/photographer.js";

function handleKeyDownEscape(event) {
    if (event.key === "Escape") {
        closeModal();
    }
}

function handleEnterPress(event) {
    if (event.key === "Enter") {
        closeModal();
    }
}

let lastFocusedElement;

export function displayModal() {
    lastFocusedElement = document.activeElement;
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    const modal = document.getElementById("contact_modal");
    const backgroundTransparent = document.querySelector(".background-modal");
    const closeModalForm = document.querySelector(".close_modal_form");
    const headerPhotograph = document.querySelector(".header-photograph");
    const main = document.getElementById("main");

    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    backgroundTransparent.style.display = "block";
    closeModalForm.setAttribute("tabIndex", "0");
    closeModalForm.addEventListener("click", closeModal);
    closeModalForm.addEventListener("keydown", handleEnterPress);
    closeModalForm.focus();

    window.addEventListener("keydown", handleKeyDownEscape);
    headerPhotograph.setAttribute("aria-hidden", "true");
    headerPhotograph.setAttribute("inert", "");
    main.setAttribute("aria-hidden", "true");
    main.setAttribute("inert", "");
}

function closeModal() {
    document.body.style.overflow = "";
    document.body.style.height = "";
    const modal = document.getElementById("contact_modal");
    const backgroundTransparent = document.querySelector(".background-modal");
    const closeModalForm = document.querySelector(".close_modal_form");
    const headerPhotograph = document.querySelector(".header-photograph");
    const main = document.getElementById("main");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    backgroundTransparent.style.display = "none";
    closeModalForm.removeEventListener("click", closeModal);
    closeModalForm.removeEventListener("keydown", handleEnterPress);
    window.removeEventListener("keydown", handleKeyDownEscape);
    headerPhotograph.removeAttribute("aria-hidden");
    headerPhotograph.removeAttribute("inert");
    main.removeAttribute("aria-hidden");
    main.removeAttribute("inert");
    document.getElementById("firstnameError").style.display = "none";
    document.getElementById("nameError").style.display = "none";
    document.getElementById("emailError").style.display = "none";
    document.getElementById("messageError").style.display = "none";
    document.getElementById("firstname").style.border = "none";
    document.getElementById("name").style.border = "none";
    document.getElementById("email").style.border = "none";
    document.getElementById("message").style.border = "none";

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

async function displayName() {
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get("id");
    const toNumberId = Number(photographerId);

    if (photographerId) {
        const { photographerDetails } = await getPhotographerById(toNumberId);

        if (photographerDetails) {
            const modalTitle = document.querySelector(".modal-title");
            const span = document.createElement("span");
            span.classList.add("modal-title-name");
            span.textContent = photographerDetails.name;
            modalTitle.appendChild(span);
        }
    }
}

const form = document.querySelector(".modal-form");

form?.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    const firstnameInput = document.getElementById("firstname").value.trim();
    const nameInput = document.getElementById("name").value.trim();
    const emailInput = document.getElementById("email").value.trim();
    const messageInput = document.getElementById("message").value.trim();

    if (firstnameInput.length < 2) {
        document.getElementById("firstnameError").textContent =
            "Le prénom est requis.";
        document.getElementById("firstnameError").style.display = "flex";
        document.getElementById("firstname").style.border = "3px solid red";
        isValid = false;
    }

    if (nameInput.length < 2) {
        document.getElementById("nameError").textContent = "Le nom est requis.";
        document.getElementById("nameError").style.display = "flex";
        document.getElementById("name").style.border = "3px solid red";
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput)) {
        document.getElementById("emailError").textContent =
            "L'email n'est pas valide.";
        document.getElementById("emailError").style.display = "flex";
        document.getElementById("email").style.border = "3px solid red";
        isValid = false;
    }

    if (messageInput.length < 10) {
        document.getElementById("messageError").textContent =
            "Le message doit contenir au moins 10 caractères.";
        document.getElementById("messageError").style.display = "flex";
        document.getElementById("message").style.border = "3px solid red";
        isValid = false;
    }

    if (isValid) {
        console.log({ firstnameInput, nameInput, emailInput, messageInput });
    }
});

displayName();
