const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // observer.unobserve(entry.target);
        } else {
            entry.target.classList.remove("visible");
        }
    });
});

document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
});

let navbar = document.getElementsByClassName("tabs");
Array.from(navbar[0].children).forEach((item) => {
    item.addEventListener("click", function () {
        Array.from(navbar[0].children).forEach(node => {
            node.classList.remove("active");
        });
        item.classList.add("active");
        console.log("I am clicked");
    });
});
