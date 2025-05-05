document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll(".nav-link").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                const targetId = this.getAttribute("href").substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 50,
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // Customize Carousel Auto-slide interval
    let carousel = document.querySelector("#imageCarousel");
    if (carousel) {
        let carouselInstance = new bootstrap.Carousel(carousel, {
            interval: 3000, // Auto-slide every 3 seconds
            pause: "hover"
        });
    }

    // Back to top button functionality
    let backToTopBtn = document.createElement("button");
    backToTopBtn.innerHTML = "&#8679;";
    backToTopBtn.id = "backToTop";
    backToTopBtn.style.cssText = "position: fixed; bottom: 20px; right: 20px; display: none; padding: 10px 15px; font-size: 20px; background: black; color: white; border: none; border-radius: 5px; cursor: pointer; z-index: 1000;";
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });
    
    backToTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Form validation example (if a form is added)
    let form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            let name = document.querySelector("#name");
            let email = document.querySelector("#email");
            let message = document.querySelector("#message");
            
            if (!name.value || !email.value.includes("@") || !message.value) {
                event.preventDefault();
                alert("Please fill in all fields correctly.");
            }
        });
    }
});
