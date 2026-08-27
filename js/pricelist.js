/* =========================================================
   PRICE LIST ELEMENTS
   ========================================================= */

const priceListContainer =
    document.querySelector("#priceListContainer");

const priceSearchInput =
    document.querySelector("#priceSearch");

const priceSearchButton =
    document.querySelector("#priceSearchButton");

const priceResultsCount =
    document.querySelector("#priceResultsCount");

const noPriceResults =
    document.querySelector("#noPriceResults");

const priceFilterButtons =
    document.querySelectorAll(".price-filter");


/* =========================================================
   PRIMARY BOOK ELEMENT
   ========================================================= */

const primaryBooksContainer =
    document.querySelector("#primaryBooksContainer");


/* =========================================================
   CURRENT CATEGORY
   ========================================================= */

let currentPriceCategory = "all";


/* =========================================================
   PRICE LIST PRODUCTS
   ========================================================= */

const priceListProducts = [];


/* =========================================================
   CATEGORY NAMES
   ========================================================= */

const categoryNames = {

    all: "All",

    secondary: "Secondary Books",

    "made-simple": "Made Simple",

    literature: "Literature",

    dictionaries: "Dictionaries",

    "secondary-teacher": "Secondary Teacher's Guide",

    "primary-teacher": "Primary Teacher's Guide",

    spiritual: "Spiritual Literature"

};


/* =========================================================
   FORMAT PRICE
   ========================================================= */

function formatPrice(price) {

    /* Numeric prices */
    if (typeof price === "number") {

        return "K" + price.toLocaleString();

    }


    /* Text prices */
    if (typeof price === "string") {

        const cleanPrice = price.trim();

        /*
         * If the price already contains K,
         * do not add another K.
         */
        if (cleanPrice.toUpperCase().startsWith("K")) {

            return cleanPrice;

        }

        /*
         * Handle price ranges such as:
         * 30,000 - 47,500
         */
        if (cleanPrice.includes("-")) {

            const parts = cleanPrice
                .split("-")
                .map(function (part) {

                    return part.trim();

                });

            return "K" + parts[0] + " – K" + parts[1];

        }

        return "K" + cleanPrice;

    }


    return "Price unavailable";

}


/* =========================================================
   GET CATEGORY NAME
   ========================================================= */

function getCategoryName(category) {

    return categoryNames[category] || "Books";

}


/* =========================================================
   DISPLAY PRICE PRODUCTS
   ========================================================= */

function displayPriceProducts() {

    if (!priceListContainer) {

        console.warn(
            "Price list container #priceListContainer was not found."
        );

        return;

    }


    /* Get search term */

    const searchTerm = priceSearchInput
        ? priceSearchInput.value.trim().toLowerCase()
        : "";


    /* Filter products */

    const filteredProducts =
        priceListProducts.filter(function (product) {

            /* Category filter */

            const matchesCategory =
                currentPriceCategory === "all" ||
                product.category === currentPriceCategory;


            /*
             * Create searchable text.
             * This allows users to search by:
             * - Product name
             * - Description
             * - Publisher
             * - Category
             */

            const searchableText = (

                (product.name || "") +
                " " +
                (product.description || "") +
                " " +
                (product.publisher || "") +
                " " +
                getCategoryName(product.category)

            ).toLowerCase();


            const matchesSearch =
                searchableText.includes(searchTerm);


            return matchesCategory && matchesSearch;

        });


    /* Clear previous results */

    priceListContainer.innerHTML = "";


    /* Update result count */

    if (priceResultsCount) {

        priceResultsCount.textContent =
            filteredProducts.length +
            " product" +
            (filteredProducts.length === 1 ? "" : "s") +
            " found";

    }


    /* No results */

    if (filteredProducts.length === 0) {

        if (noPriceResults) {

            noPriceResults.style.display = "block";

        }

        return;

    }


    /* Results found */

    if (noPriceResults) {

        noPriceResults.style.display = "none";

    }


    /* Create product cards */

    filteredProducts.forEach(function (product) {

        const card =
            document.createElement("article");


        card.className = "price-card";


        card.innerHTML = `

            <div class="price-card-top">

                <span class="price-category">

                    ${getCategoryName(product.category)}

                </span>

            </div>


            <div class="price-card-content">

                <h3>
                    ${product.name}
                </h3>


                <p class="price-description">

                    ${product.description || "Book"}

                </p>


                <p class="price-publisher">

                    <strong>Publisher:</strong>

                    ${product.publisher || "Various"}

                </p>

            </div>


            <div class="price-card-bottom">

                <span class="price-label">
                    Price
                </span>


                <span class="product-price">

                    ${formatPrice(product.price)}

                </span>

            </div>

        `;


        priceListContainer.appendChild(card);

    });

}


/* =========================================================
   SEARCH BUTTON
   ========================================================= */

if (priceSearchButton) {

    priceSearchButton.addEventListener(
        "click",
        function () {

            displayPriceProducts();

        }
    );

}


/* =========================================================
   SEARCH WHILE TYPING
   ========================================================= */

if (priceSearchInput) {

    priceSearchInput.addEventListener(
        "input",
        function () {

            displayPriceProducts();

        }
    );


    /* Search using ENTER */

    priceSearchInput.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                displayPriceProducts();

            }

        }
    );

}


/* =========================================================
   CATEGORY FILTERS
   ========================================================= */

priceFilterButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                /* Remove active class */

                priceFilterButtons.forEach(
                    function (filterButton) {

                        filterButton.classList.remove(
                            "active"
                        );

                    }
                );


                /* Activate selected button */

                button.classList.add("active");


                /* Get selected category */

                currentPriceCategory =
                    button.dataset.category || "all";


                /* Display filtered products */

                displayPriceProducts();

            }
        );

    }
);


/* =========================================================
   SEARCH FROM URL
   ========================================================= */

const urlParams =
    new URLSearchParams(window.location.search);


const searchTermFromUrl =
    urlParams.get("search");


if (searchTermFromUrl && priceSearchInput) {

    priceSearchInput.value =
        searchTermFromUrl;

}

/* =========================================================
   DISPLAY PRIMARY LEARNER TEXTBOOKS
   ========================================================= */

function displayPrimaryBooks() {

    if (!primaryBooksContainer) {

        console.warn(
            "Primary books container #primaryBooksContainer was not found."
        );

        return;
    }


    /* Clear existing cards */

    primaryBooksContainer.innerHTML = "";


    /* Create a card for every standard */

    primaryBooks.forEach(function (standard) {

        const card =
            document.createElement("article");


        card.className =
            "primary-book-card";


        let subjectsHTML = "";


        /* =================================================
           CREATE SUBJECT LIST
           ================================================= */

        standard.subjects.forEach(function (subject) {

            subjectsHTML += `

                <div class="primary-subject">

                    <span>
                        ${subject.name}
                    </span>

                    <strong>
                        K${subject.price.toLocaleString()}
                    </strong>

                </div>

            `;

        });


        /* =================================================
           CORE PACKAGE
           ================================================= */

        let packageHTML = `

            <div class="primary-package core-package">

                <span>
                    Core Package
                </span>

                <strong>
                    K${standard.coreTotal.toLocaleString()}
                </strong>

                <small>
                    Includes Bible Knowledge
                </small>

            </div>

        `;


        /* =================================================
           COMPLETE PACKAGE
           ================================================= */

        if (
            standard.completeTotal !== null &&
            standard.completeTotal !== undefined
        ) {

            packageHTML += `

                <div class="primary-package complete-package">

                    <span>
                        Complete Package
                    </span>

                    <strong>
                        K${standard.completeTotal.toLocaleString()}
                    </strong>

                    <small>
                        Includes Religious Education
                    </small>

                </div>

            `;

        }


        /* =================================================
           CREATE CARD
           ================================================= */

        card.innerHTML = `

            <div class="primary-card-header">

                <span>
                    PRIMARY TEXTBOOKS
                </span>

                <h3>
                    ${standard.standard}
                </h3>

            </div>


            <div class="primary-card-body">

                <button
                    type="button"
                    class="subjects-toggle"
                    aria-expanded="false"
                >

                    View Subjects

                    <span class="toggle-icon">
                        +
                    </span>

                </button>


                <div class="primary-subjects">

                    ${subjectsHTML}

                </div>


                <div class="primary-packages">

                    ${packageHTML}

                </div>


                <p class="primary-book-note">

                    ${standard.note}

                </p>

            </div>

        `;


        primaryBooksContainer.appendChild(card);

    });


    /* =========================================================
       SUBJECT DROPDOWN FUNCTIONALITY
       ========================================================= */

    const toggleButtons =
        primaryBooksContainer.querySelectorAll(
            ".subjects-toggle"
        );


    toggleButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const card =
                    button.closest(
                        ".primary-book-card"
                    );


                if (!card) {
                    return;
                }


                /* Open / close card */

                card.classList.toggle("open");


                const isOpen =
                    card.classList.contains("open");


                /* Update accessibility */

                button.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );


                /* Change button text */

                if (isOpen) {

                    button.innerHTML =
                        `
                        Hide Subjects

                        <span class="toggle-icon">
                            −
                        </span>
                        `;

                } else {

                    button.innerHTML =
                        `
                        View Subjects

                        <span class="toggle-icon">
                            +
                        </span>
                        `;

                }

            }
        );

    });

}

/* =========================================================
   INITIALISE PRICE LIST
   ========================================================= */

if (priceListContainer) {

    displayPriceProducts();

}


/* =========================================================
   INITIALISE PRIMARY BOOKS
   ========================================================= */

if (primaryBooksContainer) {

    displayPrimaryBooks();

}


/* =========================================================
   SYSTEM CONFIRMATION
   ========================================================= */

console.log(
    "Nkhungudzu Bookshop 2026 Price List loaded successfully."
);