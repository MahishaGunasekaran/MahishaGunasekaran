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
}, { threshold: 0.5 }); // adjust threshold for when section counts as "in view"

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

const darkModeBtn = document.querySelector('#darkModeToggle input[type="checkbox"]');
// const icons = darkModeBtn.querySelector("i");
// console.log(icons);

darkModeBtn.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        document.documentElement.style.setProperty('--theme-color', localStorage.getItem("themeColor"));
        document.documentElement.style.setProperty('--active-bg-color', localStorage.getItem("themeDColor"));
        document.documentElement.style.setProperty('--dropdown-color', 'white');
        document.documentElement.style.setProperty('--theme-color-border', 'black');
        darkModeBtn.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem("darkMode", false);
        document.documentElement.style.setProperty('--theme-color', localStorage.getItem("themeColor"));
        document.documentElement.style.setProperty('--theme-d-color', localStorage.getItem("themeDColor"));
        document.documentElement.style.setProperty('--active-bg-color', "white");
        document.documentElement.style.setProperty('--dropdown-color', localStorage.getItem("dropdownColor"));
        document.documentElement.style.setProperty('--theme-color-border', 'white');
        darkModeBtn.checked = false;
    }
    // document.body.classList.toggle('dark-mode');
    // localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    // if (document.body.classList.contains("dark-mode")) {
    //     // icons.classList.remove("fa-moon");
    //     // icons.classList.add("fa-sun");
    //     document.documentElement.style.setProperty('--theme-color', localStorage.getItem("themeColor"));
    //     document.documentElement.style.setProperty('--active-bg-color', localStorage.getItem("themeDColor"));
    //     // console.log(localStorage.getItem("themeDColor"));
    // } else {
    //     // icons.classList.remove("fa-sun");
    //     // icons.classList.add("fa-moon");
    //     document.documentElement.style.setProperty('--theme-color', localStorage.getItem("themeColor"));
    //     document.documentElement.style.setProperty('--theme-d-color', localStorage.getItem("themeDColor"));
    //     document.documentElement.style.setProperty('--active-bg-color', "white");
    // }
});

// Apply on page load
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.documentElement.style.setProperty('--theme-color', localStorage.getItem("themeColor"));
    document.documentElement.style.setProperty('--active-bg-color', localStorage.getItem("themeDColor"));
    document.documentElement.style.setProperty('--dropdown-color', "white");
    darkModeBtn.checked = true;
} else {
    document.documentElement.style.setProperty('--theme-color', localStorage.getItem("themeColor"));
    document.documentElement.style.setProperty('--theme-d-color', localStorage.getItem("themeDColor"));
    document.documentElement.style.setProperty('--dropdown-color', localStorage.getItem("dropdownColor"));
    const colorIconId = localStorage.getItem("iconId");
    const iconElement = document.getElementById(colorIconId);
    console.log(iconElement);
}

const swatches = document.querySelectorAll(".color-swatch");

swatches.forEach(swatch => {
    swatch.addEventListener("click", () => {
        swatches.forEach(s => s.classList.remove("activeicon"));
        swatch.classList.add("activeicon");

        const color = swatch.dataset.color;
        const dcolor = swatch.dataset.dcolor;
        const dropdownColor = swatch.dataset.dropdowncolor;
        // console.log(swatch);
        // console.log(dropdownColor);
        document.documentElement.style.setProperty('--theme-color', color);
        document.documentElement.style.setProperty('--theme-d-color', dcolor);
        document.documentElement.style.setProperty('--dropdown-color', dropdownColor);
        localStorage.setItem("themeColor", color);
        localStorage.setItem("themeDColor", dcolor);
        localStorage.setItem("dropdownColor", dropdownColor);
        localStorage.setItem("iconId", color);
        // swatch.setAttribute("id", color);
        if (document.body.classList.contains("dark-mode")) {
            document.documentElement.style.setProperty('--theme-color', color);
            document.documentElement.style.setProperty('--active-bg-color', dcolor);
            document.documentElement.style.setProperty('--dropdown-color', "white");
            // console.log(localStorage.getItem("themeDColor"));
        }
    })
})

const hamburger = document.querySelector(".hamburger");
const profileCard = document.querySelector(".profile-card");

hamburger.addEventListener("click", () => {
    profileCard.classList.toggle("show");
    console.log(profileCard.classList);
    if (profileCard.classList.contains("show")) {
        console.log("inside if loop");
        hamburger.style.setProperty("color", "white");
        hamburger.style.setProperty("margin-bottom", "10px");
    } else {
        console.log("inside if loop");
        hamburger.style.setProperty("color", localStorage.getItem("themeColor"));
    }
});

document.addEventListener("click", (event) => {
    if (
        profileCard.classList.contains("show") &&
        !profileCard.contains(event.target) &&
        !hamburger.contains(event.target)
    ) {
        profileCard.classList.remove("show");
        hamburger.style.setProperty("color", localStorage.getItem("themeColor"));
    }
});

window.addEventListener("DOMContentLoaded", () => {
    const colorIconId = localStorage.getItem("iconId");
    console.log(colorIconId);
    const iconElement = document.getElementById(colorIconId);
    console.log(iconElement);
    swatches.forEach(swatch => {
        swatch.classList.remove("activeicon");
    });
    if (iconElement) {
        iconElement.classList.add("activeicon");
    } else {
        document.getElementById("teal").classList.add("activeicon");
    }
    console.log("Helloooo");
});

// const button = document.querySelector('#dropdownDefaultButton');
// const menu = document.querySelector('#dropdown');
// popperInstance.setOptions({
//   placement: 'top', // New placement
// });

// // Update the Popper instance to reflect changes
// popperInstance.update();
// const dropdown = document.getElementById('dropdown');
// document.body.appendChild(dropdown);

// const btn = document.getElementById("dropdownDefaultButton");
// // const placement = btn.dataset.dropdown - placement;
// // helper: set placement explicitly
// function setDropdownPlacement() {
// if (window.innerWidth < 1215) {  // breakpoint: adjust as needed
//     btn.setAttribute("data-dropdown-placement", "right");
// } else {
//     btn.setAttribute("data-dropdown-placement", "bottom");
// }
// }

// // run on load + resize
// setDropdownPlacement();
// window.addEventListener("resize", setDropdownPlacement);

const btn = document.getElementById("dropdownDefaultButton");
// const dropdown = document.getElementById("dropdown");

btn.addEventListener("click", () => {
    console.log(dropdown.style.maxHeight);
    console.log(dropdown.scrollHeight);
    if (dropdown.style.maxHeight != "0px") {
        dropdown.style.maxHeight = "0px"; // collapse
        document.getElementById("dropdown").style.display = "none"
    } else {
        dropdown.style.maxHeight = 509 + "px"; // expand to full content
        document.getElementById("dropdown").style.display = "block"
    }
});

// console.log(document.getElementsByClassName("profile-card")[0].classList);
// if (document.getElementsByClassName("profile-card")[0].classList.contains("show")) {
//     document.getElementsByClassName("hamburger").style.color("white");
// }
