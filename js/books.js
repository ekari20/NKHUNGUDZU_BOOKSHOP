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
   BOOKS PAGE ELEMENTS
   ========================================================= */

const bookFilters =
    document.querySelectorAll(".book-filter");

const booksContainer =
    document.querySelector("#booksContainer");

const booksResultsCount =
    document.querySelector("#booksResultsCount");

const noBooksResults =
    document.querySelector("#noBooksResults");


/* =========================================================
   Check whether the Books page exists
   ========================================================= */

if (bookFilters.length > 0 && booksContainer) {


    /* =========================================================
       CURRENT FILTER
       ========================================================= */

    let currentBookCategory = "all";


    /* =========================================================
       ALL BOOK ITEMS (populated from Supabase)
       ========================================================= */

    let allBookItems = [];


    /* =========================================================
       LOCAL CACHE (offline fallback only)
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
       FETCH PRODUCTS FROM DATABASE (SUPABASE)
       ========================================================= */

    async function fetchProductsFromDatabase() {

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

        return getLocalProducts();
    }


    /* =========================================================
       FETCH PRIMARY STANDARDS FROM DATABASE (SUPABASE)
       ========================================================= */

    async function fetchPrimaryStandardsFromDatabase() {

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

        return getLocalPrimaryStandards();
    }


    /* =========================================================
       CATEGORY → FILTER BUCKET MAPPING
       Books, Bibles & stationery all share the "products" table,
       so we only keep the categories relevant to this page and
       group them under the same buckets as the filter buttons.
       ========================================================= */

    function mapCategoryToBucket(category) {

        switch (category) {

            case "primary":
                return "primary";

            case "secondary":
            case "made-simple":
                return "secondary";

            case "literature":
                return "literature";

            case "dictionaries":
                return "dictionaries";

            case "primary-teacher":
            case "secondary-teacher":
                return "teachers";

            default:
                return null; // spiritual / stationery live on their own pages

        }

    }


    /* =========================================================
       CATEGORY DISPLAY LABELS
       ========================================================= */

    const bookCategoryLabels = {

        primary: "Primary Books",

        secondary: "Secondary Books",

        "made-simple": "Made Simple",

        literature: "Literature",

        dictionaries: "Dictionaries",

        "primary-teacher": "Primary Teacher's Guide",

        "secondary-teacher": "Secondary Teacher's Guide"

    };

    function getBookCategoryLabel(category) {
        return bookCategoryLabels[category] || "Books";
    }


    /* =========================================================
       FORMAT PRICE
       ========================================================= */

    function formatPrice(price) {

        if (typeof price === "number") {
            return "K" + price.toLocaleString();
        }

        if (typeof price === "string") {

            const cleanPrice = price.trim();

            if (
                cleanPrice !== "" &&
                !cleanPrice.toUpperCase().startsWith("K") &&
                !cleanPrice.includes("-") &&
                !isNaN(Number(cleanPrice))
            ) {
                return "K" + Number(cleanPrice).toLocaleString();
            }

            if (cleanPrice.toUpperCase().startsWith("K")) {
                return cleanPrice;
            }

            if (cleanPrice.includes("-")) {
                const parts = cleanPrice.split("-").map(function (part) {
                    return part.trim();
                });
                return "K" + parts[0] + " – K" + parts[1];
            }

            return "K" + cleanPrice;

        }

        return "Price unavailable";

    }


    /* =========================================================
       FLATTEN PRIMARY STANDARDS INTO BOOK ITEMS
       Each subject becomes its own "book" entry so it can share
       the same card renderer and filter logic as products.
       ========================================================= */

    function flattenPrimaryStandards(rawStandards) {

        const items = [];

        rawStandards.forEach(function (row) {

            const subjects = (row.primary_subjects || [])
                .slice()
                .sort(function (a, b) {
                    return (a.sort_order || 0) - (b.sort_order || 0);
                });

            subjects.forEach(function (subject) {

                items.push({
                    name: row.standard + " — " + subject.name,
                    category: "primary",
                    brand: "Nkhungudzu Bookshop",
                    description: "Primary school textbook for " + row.standard + ".",
                    price: Number(subject.price)
                });

            });

        });

        return items;

    }


    /* =========================================================
       DISPLAY BOOKS
       ========================================================= */

    function displayBooks() {

        const filteredBooks = allBookItems.filter(function (item) {

            const bucket = mapCategoryToBucket(item.category);

            return (
                bucket !== null &&
                (currentBookCategory === "all" || bucket === currentBookCategory)
            );

        });

        booksContainer.innerHTML = "";

        if (booksResultsCount) {
            booksResultsCount.textContent =
                filteredBooks.length +
                " book" +
                (filteredBooks.length === 1 ? "" : "s") +
                " found";
        }

        if (filteredBooks.length === 0) {
            if (noBooksResults) {
                noBooksResults.style.display =
                    allBookItems.length === 0 ? "none" : "block";
            }
            return;
        }

        if (noBooksResults) {
            noBooksResults.style.display = "none";
        }

        filteredBooks.forEach(function (item) {

            const card = document.createElement("article");
            card.className = "price-card";

            card.innerHTML = `

                <div class="price-card-top">
                    <span class="price-category">
                        ${getBookCategoryLabel(item.category)}
                    </span>
                </div>

                <div class="price-card-content">
                    <h3>${item.name}</h3>
                    <p class="price-description">${item.description || "Book"}</p>
                    <p class="price-publisher">
                        <strong>Publisher:</strong> ${item.brand || "Various"}
                    </p>
                </div>

                <div class="price-card-bottom">
                    <span class="price-label">Price</span>
                    <span class="product-price">${formatPrice(item.price)}</span>
                </div>

            `;

            booksContainer.appendChild(card);

        });

    }


    /* =========================================================
       FILTER BUTTONS
       ========================================================= */

    bookFilters.forEach(function (filterButton) {

        filterButton.addEventListener("click", function () {

            bookFilters.forEach(function (button) {
                button.classList.remove("active");
            });

            filterButton.classList.add("active");

            currentBookCategory = filterButton.getAttribute("data-category") || "all";

            displayBooks();

        });

    });


    /* =========================================================
       INITIALISE BOOKS FROM DATABASE
       ========================================================= */

    async function initializeBooks() {

        booksContainer.innerHTML = `
            <div class="books-loading" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                <p>Loading books...</p>
            </div>
        `;

        if (booksResultsCount) {
            booksResultsCount.textContent = "Loading books...";
        }

        if (noBooksResults) {
            noBooksResults.style.display = "none";
        }

        const [products, rawPrimaryStandards] = await Promise.all([
            fetchProductsFromDatabase(),
            fetchPrimaryStandardsFromDatabase()
        ]);

        const primaryItems = rawPrimaryStandards
            ? flattenPrimaryStandards(rawPrimaryStandards)
            : [];

        allBookItems = (products || []).concat(primaryItems);

        if (allBookItems.length === 0) {

            booksContainer.innerHTML = `
                <div class="books-error" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                    <p>We couldn't load books right now. Please check your internet connection.</p>
                    <button type="button" id="retryBooksLoad" class="btn btn-secondary" style="margin-top: 12px;">
                        Try Again
                    </button>
                </div>
            `;

            if (booksResultsCount) {
                booksResultsCount.textContent = "0 books found";
            }

            const retryButton = document.querySelector("#retryBooksLoad");

            if (retryButton) {
                retryButton.addEventListener("click", initializeBooks);
            }

            return;

        }

        displayBooks();

    }

    initializeBooks();

}
