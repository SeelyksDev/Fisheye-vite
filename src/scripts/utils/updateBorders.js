
export function updateBorders() {
    const visibleOptions = [...document.querySelectorAll(".options li:not(.hidden)")];

    visibleOptions.forEach(option => {
        option.style.borderTop = "none";
        option.style.borderBottom = "none";
    });

    if (visibleOptions.length > 0) {
        visibleOptions[0].style.borderTop = "1px solid white";
        visibleOptions[0].style.borderBottom = "1px solid white";
    }
}