/* =========================================================
   SUPABASE CONFIGURATION
   ========================================================= */

const SUPABASE_URL = "https://fxdappjsoaeastrcwrbv.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_zgAdFixqII98_VtHCIdyDQ_WLTrfoPm";

let supabaseClient = null;

if (typeof window !== "undefined" && window.supabase && typeof window.supabase.createClient === "function") {
    try {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (e) {
        console.warn("Supabase client initialization warning:", e);
    }
}


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
   (populated from Supabase - see fetchProductsFromDatabase)
   ========================================================= */

let priceListProducts = [];


/* =========================================================
   LOCAL CACHE (offline fallback only - used if the database
   cannot be reached, not as a source of truth)
   ========================================================= */

function getLocalProducts() {
    try {
        const saved = localStorage.getItem("nkhungudzuProducts");
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error("Error reading cached products:", e);
    }
    return null;
}

function saveLocalProducts(products) {
    try {
        localStorage.setItem("nkhungudzuProducts", JSON.stringify(products));
    } catch (e) {
        console.error("Error caching products locally:", e);
    }
}


/* =========================================================
   FETCH PRODUCTS FROM DATABASE (SUPABASE)
   ========================================================= */

async function fetchProductsFromDatabase() {
    // 1. Try fetching via Supabase JS client
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from("products")
                .select("*")
                .eq("available", true)
                .order("category", { ascending: true })
                .order("name", { ascending: true });

            if (!error && Array.isArray(data) && data.length > 0) {
                saveLocalProducts(data);
                return data;
            }
        } catch (err) {
            console.warn("Supabase client query failed, falling back to REST API:", err);
        }
    }

    // 2. Direct Supabase REST API fetch
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/products?available=eq.true&order=category.asc,name.asc`,
            {
                headers: {
                    apikey: SUPABASE_ANON_KEY,
                    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                saveLocalProducts(data);
                return data;
            }
        }
    } catch (err) {
        console.warn("Supabase REST query failed, using local cached products:", err);
    }

    // 3. Fallback to last-known cached products if network is unreachable
    return getLocalProducts();
}


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

    spiritual: "Spiritual Literature",

    stationery: "Stationery"

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
         * Supabase/Postgres NUMERIC columns are serialized as
         * plain numeric strings (e.g. "35000.00"). Format those
         * the same way as a real number, dropping decimals.
         */
        if (
            cleanPrice !== "" &&
            !cleanPrice.toUpperCase().startsWith("K") &&
            !cleanPrice.includes("-") &&
            !isNaN(Number(cleanPrice))
        ) {

            return "K" + Number(cleanPrice).toLocaleString();

        }

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
                (product.brand || "") +
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

            noPriceResults.style.display =
                priceListProducts.length === 0 ? "none" : "block";

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

                    ${product.brand || "Various"}

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

    primaryStandards.forEach(function (standard) {

        const card =
            document.createElement("article");


        card.className =
            "primary-standard-card";


        const subjectCount =
            standard.subjects.length;


        /* =================================================
           SUBJECT ROWS
           ================================================= */

        let subjectsHTML = "";

        standard.subjects.forEach(function (subject) {

            subjectsHTML += `

                <div class="subject-row">

                    <span>
                        ${subject.name}
                    </span>

                    <strong>
                        ${formatPrice(subject.price)}
                    </strong>

                </div>

            `;

        });


        /* =================================================
           CORE PACKAGE
           ================================================= */

        let packageHTML = `

            <div class="package core-package">

                <span>
                    CORE PACKAGE
                </span>

                <strong>
                    ${formatPrice(standard.coreTotal)}
                </strong>

                <p>
                    ${standard.coreNote || ""}
                </p>

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

                <div class="package complete-package">

                    <span>
                        COMPLETE PACKAGE
                    </span>

                    <strong>
                        ${formatPrice(standard.completeTotal)}
                    </strong>

                    <p>
                        ${standard.completeNote || ""}
                    </p>

                </div>

            `;

        }


        /* =================================================
           CREATE CARD
           ================================================= */

        card.innerHTML = `

            <div class="standard-header">

                <span class="standard-label">
                    PRIMARY
                </span>

                <h3>
                    ${standard.standard}
                </h3>

                <p>
                    ${subjectCount} textbook${subjectCount === 1 ? "" : "s"}
                </p>

            </div>


            <div class="package-container">

                ${packageHTML}

            </div>


            <button
                type="button"
                class="subjects-toggle"
                aria-expanded="false"
            >

                View Subjects

                <span>▼</span>

            </button>


            <div class="subjects-list" style="display: none;">

                ${subjectsHTML}

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
                        ".primary-standard-card"
                    );


                if (!card) {
                    return;
                }


                const subjectsList =
                    card.querySelector(".subjects-list");


                if (!subjectsList) {
                    return;
                }


                /* Open / close subject list */

                const isOpen =
                    subjectsList.style.display === "block";

                subjectsList.style.display =
                    isOpen ? "none" : "block";


                /* Update accessibility */

                button.setAttribute(
                    "aria-expanded",
                    String(!isOpen)
                );


                /* Change button text */

                button.innerHTML =
                    isOpen
                        ? "View Subjects <span>▼</span>"
                        : "Hide Subjects <span>▲</span>";

            }
        );

    });

}


/* =========================================================
   LOCAL CACHE FOR PRIMARY STANDARDS (offline fallback)
   ========================================================= */

function getLocalPrimaryStandards() {
    try {
        const saved = localStorage.getItem("nkhungudzuPrimaryStandards");
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error("Error reading cached primary standards:", e);
    }
    return null;
}

function saveLocalPrimaryStandards(standards) {
    try {
        localStorage.setItem("nkhungudzuPrimaryStandards", JSON.stringify(standards));
    } catch (e) {
        console.error("Error caching primary standards locally:", e);
    }
}


/* =========================================================
   FETCH PRIMARY STANDARDS FROM DATABASE (SUPABASE)
   ========================================================= */

async function fetchPrimaryStandardsFromDatabase() {

    // 1. Try fetching via Supabase JS client, with subjects embedded
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from("primary_standards")
                .select("*, primary_subjects(*)")
                .order("sort_order", { ascending: true })
                .order("sort_order", { ascending: true, foreignTable: "primary_subjects" });

            if (!error && Array.isArray(data) && data.length > 0) {
                saveLocalPrimaryStandards(data);
                return data;
            }
        } catch (err) {
            console.warn("Supabase client query failed, falling back to REST API:", err);
        }
    }

    // 2. Direct Supabase REST API fetch (embedded resource + nested order)
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/primary_standards?select=*,primary_subjects(*)&order=sort_order.asc&primary_subjects.order=sort_order.asc`,
            {
                headers: {
                    apikey: SUPABASE_ANON_KEY,
                    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                saveLocalPrimaryStandards(data);
                return data;
            }
        }
    } catch (err) {
        console.warn("Supabase REST query failed, using local cached primary standards:", err);
    }

    // 3. Fallback to last-known cached primary standards if network is unreachable
    return getLocalPrimaryStandards();
}


/* =========================================================
   NORMALISE DATABASE ROWS INTO DISPLAY SHAPE
   ========================================================= */

function normalizePrimaryStandards(rows) {

    return rows.map(function (row) {

        const subjects = (row.primary_subjects || [])
            .slice()
            .sort(function (a, b) {
                return (a.sort_order || 0) - (b.sort_order || 0);
            })
            .map(function (subject) {
                return {
                    name: subject.name,
                    price: Number(subject.price)
                };
            });

        return {
            standard: row.standard,
            coreTotal: Number(row.core_total),
            coreNote: row.core_note || "",
            completeTotal:
                row.complete_total !== null && row.complete_total !== undefined
                    ? Number(row.complete_total)
                    : null,
            completeNote: row.complete_note || "",
            subjects: subjects
        };

    });

}

/* =========================================================
   INITIALISE PRICE LIST FROM DATABASE
   ========================================================= */

async function initializePriceList() {

    if (!priceListContainer) {
        return;
    }

    priceListContainer.innerHTML = `
        <div class="price-list-loading" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
            <p>Loading products...</p>
        </div>
    `;

    if (priceResultsCount) {
        priceResultsCount.textContent = "Loading products...";
    }

    if (noPriceResults) {
        noPriceResults.style.display = "none";
    }

    const products = await fetchProductsFromDatabase();

    if (!products || products.length === 0) {

        priceListProducts = [];

        priceListContainer.innerHTML = `
            <div class="price-list-error" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                <p>We couldn't load products right now. Please check your internet connection.</p>
                <button type="button" id="retryPriceListLoad" class="btn btn-secondary" style="margin-top: 12px;">
                    Try Again
                </button>
            </div>
        `;

        if (priceResultsCount) {
            priceResultsCount.textContent = "0 products found";
        }

        const retryButton = document.querySelector("#retryPriceListLoad");

        if (retryButton) {
            retryButton.addEventListener("click", initializePriceList);
        }

        return;
    }

    priceListProducts = products;

    displayPriceProducts();

}


if (priceListContainer) {

    initializePriceList();

}


/* =========================================================
   INITIALISE PRIMARY BOOKS FROM DATABASE
   ========================================================= */

let primaryStandards = [];

async function initializePrimaryBooks() {

    if (!primaryBooksContainer) {
        return;
    }

    primaryBooksContainer.innerHTML = `
        <div class="primary-books-loading" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
            <p>Loading primary textbook packages...</p>
        </div>
    `;

    const rawStandards = await fetchPrimaryStandardsFromDatabase();

    if (!rawStandards || rawStandards.length === 0) {

        primaryStandards = [];

        primaryBooksContainer.innerHTML = `
            <div class="primary-books-error" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                <p>We couldn't load primary textbook packages right now. Please check your internet connection.</p>
                <button type="button" id="retryPrimaryBooksLoad" class="btn btn-secondary" style="margin-top: 12px;">
                    Try Again
                </button>
            </div>
        `;

        const retryButton = document.querySelector("#retryPrimaryBooksLoad");

        if (retryButton) {
            retryButton.addEventListener("click", initializePrimaryBooks);
        }

        return;
    }

    primaryStandards = normalizePrimaryStandards(rawStandards);

    displayPrimaryBooks();

}


if (primaryBooksContainer) {

    initializePrimaryBooks();

}


/* =========================================================
   SYSTEM CONFIRMATION
   ========================================================= */

console.log(
    "Nkhungudzu Bookshop 2026 Price List loaded successfully."
);