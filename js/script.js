/* =========================================================
   NKHUNGUDZU BOOKSHOP
   MAIN JAVASCRIPT
   ========================================================= */

/* =========================================================
   1. MOBILE NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.querySelector(".mobile-menu-button");

    const navMenu = document.querySelector(".nav-menu");

    /* Inline SVG icons (Lucide) so the menu toggle works fully offline */
    const menuIconSVG =
        '<svg class="icon" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/></svg>';

    const closeIconSVG =
        '<svg class="icon" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

    console.log("Mobile button:", mobileMenuButton);

    console.log("Navigation menu:", navMenu);

    if (!mobileMenuButton || !navMenu) {
        console.log("Mobile navigation elements were not found.");

        return;
    }

    mobileMenuButton.addEventListener("click", function () {
        navMenu.classList.toggle("show");

        if (navMenu.classList.contains("show")) {
            mobileMenuButton.innerHTML = closeIconSVG;

            mobileMenuButton.setAttribute("aria-expanded", "true");
        } else {
            mobileMenuButton.innerHTML = menuIconSVG;

            mobileMenuButton.setAttribute("aria-expanded", "false");
        }
    });
});

/* =========================================================
   2. HERO SLIDESHOW
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".hero-slide");

    const nextButton = document.querySelector(".next-slide");

    const previousButton = document.querySelector(".previous-slide");

    const dots = document.querySelectorAll(".slide-dot");

    const slideshow = document.querySelector(".hero-slideshow");

    let currentSlide = 0;

    let slideshowTimer;

    let slideshowPaused = false;

    console.log("Number of slides found:", slides.length);

    console.log("Number of dots found:", dots.length);

    /* ---------------------------------------------------------
         SHOW SELECTED SLIDE
         --------------------------------------------------------- */

    function showSlide(index) {
        if (slides.length === 0) {
            console.log("No slideshow slides were found.");

            return;
        }

        /* Keep slide number within range */

        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        /* Hide all slides */

        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        /* Reset all dots */

        dots.forEach(function (dot) {
            dot.classList.remove("active");
        });

        /* Show current slide */

        slides[currentSlide].classList.add("active");

        /* Activate matching dot */

        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }

        console.log("Showing slide:", currentSlide + 1);
    }

    /* ---------------------------------------------------------
         NEXT SLIDE
         --------------------------------------------------------- */

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    /* ---------------------------------------------------------
         PREVIOUS SLIDE
         --------------------------------------------------------- */

    function previousSlide() {
        showSlide(currentSlide - 1);
    }

    /* ---------------------------------------------------------
         NEXT BUTTON
         --------------------------------------------------------- */

    if (nextButton) {
        nextButton.addEventListener("click", nextSlide);
    }

    /* ---------------------------------------------------------
         PREVIOUS BUTTON
         --------------------------------------------------------- */

    if (previousButton) {
        previousButton.addEventListener("click", previousSlide);
    }

    /* ---------------------------------------------------------
         SLIDESHOW DOTS
         --------------------------------------------------------- */

    dots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showSlide(index);
        });
    });

    /* ---------------------------------------------------------
         AUTOMATIC SLIDESHOW
         --------------------------------------------------------- */

    function startSlideshow() {
        clearInterval(slideshowTimer);

        slideshowTimer = setInterval(function () {
            if (!slideshowPaused) {
                nextSlide();
            }
        }, 5500);
    }

    /* ---------------------------------------------------------
         PAUSE WHEN MOUSE IS OVER SLIDESHOW
         --------------------------------------------------------- */

    if (slideshow) {
        slideshow.addEventListener("mouseenter", function () {
            slideshowPaused = true;
        });

        slideshow.addEventListener("mouseleave", function () {
            slideshowPaused = false;
        });
    }

    /* ---------------------------------------------------------
         START SLIDESHOW
         --------------------------------------------------------- */

    showSlide(0);

    startSlideshow();
});

/* =========================================================
   3. PUBLISHING SERVICES POPUP
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const publishingPopup = document.querySelector("#publishingPopup");

    const popupClose = document.querySelector(".popup-close");

    /* ---------------------------------------------------------
         CLOSE POPUP
         --------------------------------------------------------- */

    if (popupClose && publishingPopup) {
        popupClose.addEventListener("click", function () {
            publishingPopup.style.display = "none";
        });
    }

    /* ---------------------------------------------------------
         SHOW POPUP AFTER 3 SECONDS
         --------------------------------------------------------- */

    if (publishingPopup) {
        publishingPopup.style.display = "none";

        setTimeout(function () {
            publishingPopup.style.display = "flex";
        }, 3000);
    }
});

/* =========================================================
   4. FEATURED PRODUCTS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const featuredProducts = document.querySelector("#featuredProducts");

    const products = [
        {
            name: "Excel & Succeed Books",
            category: "Secondary Textbooks",
            brand: "Excel / Succeed",
            image: "images/books.jpeg",
        },

        {
            name: "Primary School Textbooks",
            category: "Primary Books",
            brand: "Nkhungudzu Bookshop",
            image: "images/books.jpeg",
        },

        {
            name: "Bibles",
            category: "Spiritual Literature",
            brand: "NIV / KJV / NKJV",
            image: "images/bibles.jpeg",
        },

        {
            name: "School & Office Stationery",
            category: "Stationery",
            brand: "Various Products",
            image: "images/stationary.jpeg",
        },
    ];

    function displayProducts() {
        if (!featuredProducts) {
            return;
        }

        featuredProducts.innerHTML = "";

        products.forEach(function (product) {
            const productCard = document.createElement("article");

            productCard.classList.add("product-card");

            productCard.innerHTML = `

                    <div class="product-image">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                            loading="lazy"
                        >

                    </div>


                    <div class="product-info">

                        <span class="product-category">
                            ${product.category}
                        </span>


                        <h3>
                            ${product.name}
                        </h3>


                        <p class="product-brand">
                            ${product.brand}
                        </p>

                    </div>

                `;

            featuredProducts.appendChild(productCard);
        });
    }

    displayProducts();
});

/* =========================================================
   5. BASIC SEARCH
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.querySelector(".header-search input");

    const searchButton = document.querySelector(".header-search button");

    function performSearch() {
        if (!searchInput) {
            return;
        }

        const searchTerm = searchInput.value.trim();

        if (searchTerm === "") {
            alert("Please enter something to search for.");

            return;
        }

        window.location.href =
            "/pages/pricelist.html?search=" + encodeURIComponent(searchTerm);
    }

    if (searchButton) {
        searchButton.addEventListener("click", performSearch);
    }

    if (searchInput) {
        searchInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                performSearch();
            }
        });
    }
});

/* =========================================================
   6. INITIALISE WEBSITE
   ========================================================= */

console.log("Nkhungudzu Bookshop website loaded successfully.");