// ===============================
// MENU MOBILE
// ===============================

function toggleMenu() {

    const nav = document.getElementById("nav");

    nav.classList.toggle("show");

}


// Fermer le menu après un clic

const links = document.querySelectorAll("#nav a");

links.forEach(link => {

    link.addEventListener("click", () => {

        document
            .getElementById("nav")
            .classList.remove("show");

    });

});



// ===============================
// ANIMATION AU SCROLL
// ===============================

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },

    {

        threshold: 0.15

    }

);


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        observer.observe(element);

    });



// ===============================
// HEADER AU SCROLL
// ===============================

window.addEventListener("scroll", () => {

    const header =
        document.querySelector(".header");

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 5px 30px rgba(0,0,0,.3)";

    } else {

        header.style.boxShadow = "none";

    }

});



// ===============================
// ANIMATION COMPTEURS
// ===============================

const stats =
    document.querySelectorAll(".stat-box strong");

let started = false;


function animateStats() {

    if (started) return;

    if (window.scrollY > 300) {

        started = true;

        stats.forEach(stat => {

            const target =
                parseInt(
                    stat.innerText
                );

            let current = 0;

            const increment =
                target / 50;

            const timer =
                setInterval(() => {

                    current += increment;

                    if (current >= target) {

                        current = target;

                        clearInterval(timer);

                    }

                    stat.innerText =
                        Math.floor(current) +
                        (target >= 100 ? "+" : "");

                }, 30);

        });

    }

}


window.addEventListener(
    "scroll",
    animateStats
);