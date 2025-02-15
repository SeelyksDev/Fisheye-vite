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

    const firstname = document.getElementById("firstname");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const firstnameError = document.getElementById("firstnameError");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    const firstnameInput = document.getElementById("firstname").value.trim();
    const nameInput = document.getElementById("name").value.trim();
    const emailInput = document.getElementById("email").value.trim();
    const messageInput = document.getElementById("message").value.trim();

    [firstname, name, email, message].forEach((input) => {
        input.style.border = "none"; 
    });

    [firstnameError, nameError, emailError, messageError].forEach((error) => {
        error.textContent = "";
        error.style.display = "none";
    });

    const nameRegex = /[^A-Za-z\s]/;

    if (firstnameInput.length < 2 || nameRegex.test(firstnameInput)) {
        firstnameError.textContent = "Le prénom est requis. Il doit contenir uniquement des lettres.";
        firstnameError.style.display = "flex";
        firstname.style.border = "3px solid red";
        isValid = false;
    }

    if (nameInput.length < 2 || nameRegex.test(nameInput)) {
        nameError.textContent = "Le nom est requis. Il doit contenir uniquement des lettres.";
        nameError.style.display = "flex";
        name.style.border = "3px solid red";
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput)) {
        emailError.textContent = "L'email n'est pas valide.";
        emailError.style.display = "flex";
        email.style.border = "3px solid red";
        isValid = false;
    }

    if (messageInput.length < 10) {
        messageError.textContent = "Le message doit contenir au moins 10 caractères.";
        messageError.style.display = "flex";
        message.style.border = "3px solid red";
        isValid = false;
    }

    if (isValid) {
        console.log({ firstnameInput, nameInput, emailInput, messageInput });
    }
});

displayName();
