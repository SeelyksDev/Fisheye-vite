import "../../css/style.css";
import { PhotographerFactory } from "../factories/photographerFactory.js";

// Fonction asynchrone pour récupérer la liste des photographes.
// Pour le moment la data se trouve dans un fichier JSON.
// Elle retourne soit les données soit une erreur.
export async function getPhotographers() {
    const url = "/Fisheye-vite/photographers.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`reponse : ${response.status}`);
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error.message);
    }
}

// Fonction asynchrone pour afficher les photographes sur la page d'accueil.
// Elle prends en paramètre les données renvoyées par la fonction getPhotographers();
async function displayData(photographers) {
    const photographersSection = document.querySelector(
        ".photographer_section"
    );

    if (photographersSection) {
        photographers.forEach((photographer) => {
            const photographerTemplate = new PhotographerFactory(photographer);
            photographersSection.appendChild(
                photographerTemplate.getPhotographerPreviewDOM()
            );
        });
    }
}

// Fonction pour initialiser la page
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
