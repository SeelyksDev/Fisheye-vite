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
        const { photographerProfils } = await getPhotographerById(toNumberId);

        if (photographerProfils) {
            const modalTitle = document.querySelector(".modal-title");
            const span = document.createElement("span");
            span.classList.add("modal-title-name");
            span.textContent = photographerProfils.name;
            modalTitle.appendChild(span);
        }
    }
}

function handleFormSubmit(event) {
    event.preventDefault();
    let isValid = true;

    const firstname = document.getElementById("firstname");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");

    const firstnameError = document.getElementById("firstnameError");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const messageError = document.getElementById("messageError");

    const firstnameInput = firstname.value.trim();
    const nameInput = name.value.trim();
    const emailInput = email.value.trim();
    const messageInput = message.value.trim();

    clearFormErrors(
        [firstname, name, email, message],
        [firstnameError, nameError, emailError, messageError]
    );

    if (!validateName(firstnameInput)) {
        showError(
            firstname,
            firstnameError,
            "Le prénom est requis. Il doit contenir uniquement des lettres."
        );
        isValid = false;
    }

    if (!validateName(nameInput)) {
        showError(
            name,
            nameError,
            "Le nom est requis. Il doit contenir uniquement des lettres."
        );
        isValid = false;
    }

    if (!validateEmail(emailInput)) {
        showError(email, emailError, "L'email n'est pas valide.");
        isValid = false;
    }

    if (!validateMessage(messageInput)) {
        showError(
            message,
            messageError,
            "Le message doit contenir au moins 10 caractères."
        );
        isValid = false;
    }

    if (isValid) {
        console.log({ firstnameInput, nameInput, emailInput, messageInput });
        clearFormFields(firstname, name, email, message);
    }
}

function clearFormFields(firstname, name, email, message) {
    firstname.value = "";
    name.value = "";
    email.value = "";
    message.value = "";
}

function clearFormErrors(inputs, errors) {
    inputs.forEach((input) => (input.style.border = "none"));
    errors.forEach((error) => {
        error.textContent = "";
        error.style.display = "none";
    });
}

function validateName(value) {
    return value.length >= 2 && /^[A-Za-z\s]+$/.test(value);
}

function validateEmail(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
}

function validateMessage(value) {
    return value.length >= 10;
}

function showError(input, errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = "flex";
    input.style.border = "3px solid red";
}

const form = document.querySelector(".modal-form");
form?.addEventListener("submit", handleFormSubmit);

displayName();
