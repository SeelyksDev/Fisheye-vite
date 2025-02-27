export function handleKeyboardNavigation(event, details) {
    const visibleOptions = [...document.querySelectorAll(".options li:not(.hidden)")];
    const currentIndex = visibleOptions.findIndex(opt => opt === document.activeElement);

    if (event.key === "ArrowDown") {
        event.preventDefault();
        if (currentIndex < visibleOptions.length - 1) {
            visibleOptions[currentIndex + 1].focus();
        }
    } else if (event.key === "ArrowUp") {
        event.preventDefault();
        if (currentIndex > 0) {
            visibleOptions[currentIndex - 1].focus();
        }
    } else if (event.key === "Enter") {
        event.preventDefault();
        if (currentIndex !== -1) {
            visibleOptions[currentIndex].click();
        }
    } else if (event.key === "Escape") {    
        details.removeAttribute("open");
    }
}