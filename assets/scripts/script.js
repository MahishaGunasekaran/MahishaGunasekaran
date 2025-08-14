let navbar = document.getElementsByClassName("tabs");
let navLinks = document.querySelectorAll(".tabs a");
const sections = document.querySelectorAll('section');

// Intersection Observer for both animation and active nav
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");

        if (entry.isIntersecting) {
            // Animate on scroll for elements that have this class
            if (entry.target.classList.contains('animate-on-scroll')) {
                entry.target.classList.add("visible");
            }

            // Highlight nav tab only for sections with an id
            if (id) {
                // Remove active from all nav links
                navLinks.forEach(link => link.classList.remove("active"));

                // Add active to the matching link
                const activeLink = document.querySelector(`.tabs a[href="#${id}"]`);
                if (activeLink) activeLink.classList.add("active");
            }
        } else {
            // Optional: remove animation if element scrolls out
            if (entry.target.classList.contains('animate-on-scroll')) {
                entry.target.classList.remove("visible");
            }
        }
    });
}, { threshold: 0.7 }); // adjust threshold for when section counts as "in view"

// Observe all sections for nav highlighting
sections.forEach(section => observer.observe(section));

// Observe all elements with animate-on-scroll class for animation
document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Click event for nav links
navLinks.forEach(item => {
    item.addEventListener("click", () => {
        navLinks.forEach(node => node.classList.remove("active"));
        item.classList.add("active");
    });
});

Array.from(navbar[0].children).forEach((item) => {
    item.addEventListener("click", function () {
        Array.from(navbar[0].children).forEach(node => {
            node.classList.remove("active");
        });
        item.classList.add("active");
        console.log("I am clicked");
    });
});
