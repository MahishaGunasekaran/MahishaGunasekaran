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

    });
});

function setDarkMode(truth) {
    if (truth) {
        document.body.classList.add('dark-mode');
        document.documentElement.style.setProperty('--theme-color', localStorage.getItem("themeColor"));
        document.documentElement.style.setProperty('--active-bg-color', localStorage.getItem("themeDColor"));
        document.documentElement.style.setProperty('--dropdown-color', 'white');
        document.documentElement.style.setProperty('--theme-color-border', 'black');
        darkModeBtn.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        document.documentElement.style.setProperty('--theme-color', localStorage.getItem("themeColor"));
        document.documentElement.style.setProperty('--theme-d-color', localStorage.getItem("themeDColor"));
        document.documentElement.style.setProperty('--active-bg-color', "white");
        document.documentElement.style.setProperty('--dropdown-color', localStorage.getItem("dropdownColor"));
        document.documentElement.style.setProperty('--theme-color-border', 'white');
        darkModeBtn.checked = false;
    }
}

function setColors() {
    document.documentElement.style.setProperty('--theme-color', localStorage.getItem("themeColor"));
    document.documentElement.style.setProperty('--theme-d-color', localStorage.getItem("themeDColor"));
    document.documentElement.style.setProperty('--dropdown-color', localStorage.getItem("dropdownColor"));
    setDarkMode(localStorage.getItem("darkMode") == "true");
}

const darkModeBtn = document.querySelector('#darkModeToggle input[type="checkbox"]');
// const icons = darkModeBtn.querySelector("i");

darkModeBtn.addEventListener('change', (e) => {
    console.log("Inside dark mode toggle button");
    if (e.target.checked) {
        console.log("If llopp");
        document.body.classList.add('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        // darkModeBtn.checked = true;
    } else {
        console.log("EKse loop");
        document.body.classList.remove('dark-mode');
        localStorage.setItem("darkMode", false);
        // darkModeBtn.checked = false;
    }
    setDarkMode(localStorage.getItem("darkMode") == "true");
});



const swatches = document.querySelectorAll(".color-swatch");
const colorsList = [];
const dColorsList = [];
const dropdownColorsList = [];
let countDown = 5;
let colorChange;

swatches.forEach(swatch => {

    swatch.addEventListener("click", () => {
        swatches.forEach(s => s.classList.remove("activeicon"));
        swatch.classList.add("activeicon");

        const color = swatch.dataset.color;
        const dcolor = swatch.dataset.dcolor;
        const dropdownColor = swatch.dataset.dropdowncolor;

        document.documentElement.style.setProperty('--theme-color', color);
        document.documentElement.style.setProperty('--theme-d-color', dcolor);
        document.documentElement.style.setProperty('--dropdown-color', dropdownColor);
        localStorage.setItem("themeColor", color);
        localStorage.setItem("themeDColor", dcolor);
        localStorage.setItem("dropdownColor", dropdownColor);
        localStorage.setItem("iconId", color);
        if (document.body.classList.contains("dark-mode")) {
            document.documentElement.style.setProperty('--theme-color', color);
            document.documentElement.style.setProperty('--active-bg-color', dcolor);
            document.documentElement.style.setProperty('--dropdown-color', "white");
        }
    })
})

const hamburger = document.querySelector(".hamburger");
const profileCard = document.querySelector(".profile-card");

hamburger.addEventListener("click", () => {
    profileCard.classList.toggle("show");
    if (profileCard.classList.contains("show")) {
        hamburger.style.setProperty("color", "white");
        hamburger.style.setProperty("margin-bottom", "10px");
    } else {
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
    console.log("I am called")
    const colorIconId = localStorage.getItem("iconId");
    const iconElement = document.getElementById(colorIconId);
    swatches.forEach(swatch => {
        swatch.classList.remove("activeicon");
        const color = swatch.dataset.color;
        const dcolor = swatch.dataset.dcolor;
        const dropdownColor = swatch.dataset.dropdowncolor;

        colorsList.push(color);
        dColorsList.push(dcolor);
        dropdownColorsList.push(dropdownColor);
    });
    if (iconElement) {
        iconElement.classList.add("activeicon");
    } else {
        document.getElementById("teal").classList.add("activeicon");
    }
    setColors();
    setDarkMode(localStorage.getItem("darkMode") == "true");
});

const btn = document.getElementById("dropdownDefaultButton");
const box = document.getElementById("dropdown");
const stop = document.getElementById("stopColorCycle");
const play = document.getElementById("resumeColorCycle");

btn.addEventListener("click", () => {
    const currHeight = window.getComputedStyle(box).maxHeight;

    if (currHeight !== "0px") {
        box.style.maxHeight = "0px"; // collapse
        box.style.display = "none";
    } else {
        box.style.display = "block";
        box.style.maxHeight = box.scrollHeight + "px"; // expand dynamically
    }
});

function rotateColors() {
    var randomIndex = Math.floor(Math.random() * colorsList.length);
    swatches.forEach(swatch => {
        swatch.classList.remove("activeicon");
    });
    swatches[randomIndex].classList.add("activeicon");
    document.documentElement.style.setProperty('--theme-color', colorsList[randomIndex]);
    document.documentElement.style.setProperty('--theme-d-color', dColorsList[randomIndex]);
    document.documentElement.style.setProperty('--dropdown-color', dropdownColorsList[randomIndex]);
    localStorage.setItem("themeColor", colorsList[randomIndex]);
    localStorage.setItem("themeDColor", dColorsList[randomIndex]);
    localStorage.setItem("dropdownColor", dropdownColorsList[randomIndex]);
    localStorage.setItem("iconId", colorsList[randomIndex]);
    // swatch.setAttribute("id", color);
    if (document.body.classList.contains("dark-mode")) {
        document.documentElement.style.setProperty('--theme-color', colorsList[randomIndex]);
        document.documentElement.style.setProperty('--active-bg-color', dColorsList[randomIndex]);
        document.documentElement.style.setProperty('--dropdown-color', "white");
    }
    countDown = 5;
}

function startTimer() {
    colorChange = setInterval(() => {
        countDown--;
        if (countDown < 0) {
            rotateColors();
        }
        document.getElementById("timer").textContent = countDown < 0 ? 0 : countDown;
    }, 1000);
}

function stopButtonSimulation() {
    clearInterval(colorChange);
    document.getElementById("stopColorCycle").classList.remove("showBtn");
    document.getElementById("stopColorCycle").classList.add("hideBtn");
    document.getElementById("resumeColorCycle").classList.remove("hideBtn");
    document.getElementById("resumeColorCycle").classList.add("showBtn");
    document.getElementsByClassName("colorCycleText")[0].textContent = "Color cycle Paused!";
    document.getElementsByClassName("fa-clock")[0].classList.remove("clock-pulse");
    localStorage.setItem("colorChange", "pause");
    console.log("Iam acllas")
    setColors();
    setDarkMode(localStorage.getItem("darkMode") == "true");
}

function playButtonSimulation() {
    document.getElementById("stopColorCycle").classList.add("showBtn");
    document.getElementById("stopColorCycle").classList.remove("hideBtn");
    document.getElementById("resumeColorCycle").classList.add("hideBtn");
    document.getElementById("resumeColorCycle").classList.remove("showBtn");
    document.getElementsByClassName("colorCycleText")[0].textContent = "Fresh Look in";
    document.getElementsByClassName("fa-clock")[0].classList.add("clock-pulse");
    localStorage.setItem("colorChange", "resume");
    setColors();
    console.log("Iam acllas")
    setDarkMode(localStorage.getItem("darkMode") == "true");
    startTimer();
}

stop.addEventListener("click", () => {
    stopButtonSimulation();
});

play.addEventListener("click", () => {
    playButtonSimulation();
})

if (localStorage.getItem("colorChange") == "pause") {
    stopButtonSimulation();
} else {
    playButtonSimulation();
}