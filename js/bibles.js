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
   BIBLES PAGE ELEMENTS
   ========================================================= */

const bibleFiltersContainer =
    document.querySelector("#bibleFilters");

const biblesContainer =
    document.querySelector("#biblesContainer");

const biblesResultsCount =
    document.querySelector("#biblesResultsCount");

const noBiblesResults =
    document.querySelector("#noBiblesResults");


/* =========================================================
   Check whether the Bibles page exists
   ========================================================= */

if (biblesContainer) {


    /* =========================================================
       STATE
       ========================================================= */

    let currentBibleSubcategory = "all";

    let allSpiritualItems = [];


    /* =========================================================
       LOCAL CACHE (offline fallback only - shared with the rest
       of the site, since it's the same underlying products data)
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

        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient
                    .from("products")
                    .select("*")
                    .eq("available", true)
                    .order("subcategory", { ascending: true })
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
                `${SUPABASE_URL}/rest/v1/products?available=eq.true&order=subcategory.asc,name.asc`,
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
       BUILD SUBCATEGORY FILTER BUTTONS
       Built from whatever subcategory values actually exist in
       the database, rather than a hardcoded guess, so this stays
       correct no matter how the spiritual literature is grouped.
       ========================================================= */

    function buildBibleFilters(items) {

        if (!bibleFiltersContainer) {
            return;
        }

        const subcategories = [];

        items.forEach(function (item) {
            const label = item.subcategory && item.subcategory.trim()
                ? item.subcategory.trim()
                : "Other";

            if (subcategories.indexOf(label) === -1) {
                subcategories.push(label);
            }
        });

        subcategories.sort();

        bibleFiltersContainer.innerHTML = "";

        const allButton = document.createElement("button");
        allButton.type = "button";
        allButton.className = "price-filter active";
        allButton.dataset.subcategory = "all";
        allButton.textContent = "All";
        bibleFiltersContainer.appendChild(allButton);

        subcategories.forEach(function (label) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "price-filter";
            button.dataset.subcategory = label;
            button.textContent = label;
            bibleFiltersContainer.appendChild(button);
        });

        bibleFiltersContainer.querySelectorAll(".price-filter").forEach(function (button) {
            button.addEventListener("click", function () {

                bibleFiltersContainer.querySelectorAll(".price-filter").forEach(function (btn) {
                    btn.classList.remove("active");
                });

                button.classList.add("active");

                currentBibleSubcategory = button.dataset.subcategory || "all";

                displayBibles();

            });
        });

    }


    /* =========================================================
       DISPLAY BIBLES / SPIRITUAL LITERATURE
       ========================================================= */

    function displayBibles() {

        const filteredItems = allSpiritualItems.filter(function (item) {

            const label = item.subcategory && item.subcategory.trim()
                ? item.subcategory.trim()
                : "Other";

            return (
                currentBibleSubcategory === "all" ||
                label === currentBibleSubcategory
            );

        });

        biblesContainer.innerHTML = "";

        if (biblesResultsCount) {
            biblesResultsCount.textContent =
                filteredItems.length +
                " item" +
                (filteredItems.length === 1 ? "" : "s") +
                " found";
        }

        if (filteredItems.length === 0) {
            if (noBiblesResults) {
                noBiblesResults.style.display =
                    allSpiritualItems.length === 0 ? "none" : "block";
            }
            return;
        }

        if (noBiblesResults) {
            noBiblesResults.style.display = "none";
        }

        filteredItems.forEach(function (item) {

            const card = document.createElement("article");
            card.className = "price-card";

            card.innerHTML = `

                <div class="price-card-top">
                    <span class="price-category">
                        ${item.subcategory || "Spiritual Literature"}
                    </span>
                </div>

                <div class="price-card-content">
                    <h3>${item.name}</h3>
                    <p class="price-description">${item.description || ""}</p>
                    <p class="price-publisher">
                        <strong>Publisher:</strong> ${item.brand || "Various"}
                    </p>
                </div>

                <div class="price-card-bottom">
                    <span class="price-label">Price</span>
                    <span class="product-price">${formatPrice(item.price)}</span>
                </div>

            `;

            biblesContainer.appendChild(card);

        });

    }


    /* =========================================================
       INITIALISE BIBLES FROM DATABASE
       ========================================================= */

    async function initializeBibles() {

        biblesContainer.innerHTML = `
            <div class="bibles-loading" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                <p>Loading Bibles and spiritual literature...</p>
            </div>
        `;

        if (biblesResultsCount) {
            biblesResultsCount.textContent = "Loading...";
        }

        if (noBiblesResults) {
            noBiblesResults.style.display = "none";
        }

        const products = await fetchProductsFromDatabase();

        allSpiritualItems = (products || []).filter(function (product) {
            return product.category === "spiritual";
        });

        if (allSpiritualItems.length === 0) {

            biblesContainer.innerHTML = `
                <div class="bibles-error" style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                    <p>We couldn't load Bibles and spiritual literature right now. Please check your internet connection.</p>
                    <button type="button" id="retryBiblesLoad" class="btn btn-secondary" style="margin-top: 12px;">
                        Try Again
                    </button>
                </div>
            `;

            if (biblesResultsCount) {
                biblesResultsCount.textContent = "0 items found";
            }

            const retryButton = document.querySelector("#retryBiblesLoad");

            if (retryButton) {
                retryButton.addEventListener("click", initializeBibles);
            }

            return;

        }

        buildBibleFilters(allSpiritualItems);

        displayBibles();

    }

    initializeBibles();

}