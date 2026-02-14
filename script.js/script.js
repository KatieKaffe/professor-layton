document.addEventListener("DOMContentLoaded", () => {
    const returnToTopBtn = document.getElementById("returnToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            returnToTopBtn.style.display = "flex";
        } else {
            returnToTopBtn.style.display = "none";
        }
    });

    returnToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});