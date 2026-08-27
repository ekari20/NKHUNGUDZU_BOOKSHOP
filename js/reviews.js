/* =========================================================
   NKHUNGUDZU BOOKSHOP - REVIEWS & RATINGS (SUPABASE INTEGRATED)
   ========================================================= */

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
   REVIEW DOM ELEMENTS
   ========================================================= */

const reviewForm =
    document.querySelector("#reviewForm");

const reviewName =
    document.querySelector("#reviewName");

const reviewComment =
    document.querySelector("#reviewComment");

const selectedRating =
    document.querySelector("#selectedRating");

const ratingStars =
    document.querySelectorAll(".rating-star");

const ratingMessage =
    document.querySelector("#ratingMessage");

const reviewsContainer =
    document.querySelector("#reviewsContainer");

const averageRating =
    document.querySelector("#averageRating");

const averageStars =
    document.querySelector("#averageStars");

const reviewCount =
    document.querySelector("#reviewCount");

const reviewFormMessage =
    document.querySelector("#reviewFormMessage");


/* =========================================================
   FALLBACK / CACHED REVIEWS
   ========================================================= */

const defaultFallbackReviews = [
    {
        customer_name: "Limbani Phiri",
        rating: 5,
        comment: "Best bookshop in Blantyre! I found all the Made Simple MSCE revision books and secondary textbooks for my children. The prices match the official 2026 price list."
    },
    {
        customer_name: "Chisomo Banda",
        rating: 5,
        comment: "Very helpful customer service at the Limbe branch. Got all the Bibles, hymn books, and stationery items in one quick visit. Highly recommended!"
    },
    {
        customer_name: "Grace Mwale",
        rating: 5,
        comment: "Affordable prices for school stationery and genuine textbooks. Fast and reliable service opposite Zomba Private Primary School."
    },
    {
        customer_name: "Patrick Gondwe",
        rating: 4,
        comment: "Convenient location in Lilongwe Area 3 opposite Game Complex. Good stock of English literature and dictionaries."
    },
    {
        customer_name: "Tadala Kamanga",
        rating: 5,
        comment: "Nkhungudzu Bookshop makes education truly simple. Their 2026 price list is transparent and fair. Excellent stationery selection!"
    }
];

function getLocalReviews() {
    try {
        const saved = localStorage.getItem("nkhungudzuReviews");
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.error("Error reading cached reviews:", e);
    }
    return defaultFallbackReviews;
}

function saveLocalReviews(reviews) {
    try {
        localStorage.setItem("nkhungudzuReviews", JSON.stringify(reviews));
    } catch (e) {
        console.error("Error caching reviews locally:", e);
    }
}


/* =========================================================
   HELPER UTILITIES
   ========================================================= */

function createStars(rating) {
    let stars = "";
    const numericRating = Math.max(0, Math.min(5, Math.round(rating || 0)));

    for (let i = 1; i <= 5; i++) {
        if (i <= numericRating) {
            stars += "★";
        } else {
            stars += "☆";
        }
    }

    return stars;
}

function escapeHTML(text) {
    if (!text) return "";
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function formatReviewDate(dateString) {
    if (!dateString) return "Verified Customer";
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "Verified Customer";
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    } catch (e) {
        return "Verified Customer";
    }
}


/* =========================================================
   UPDATE RATING SUMMARY STATS
   ========================================================= */

function updateRatingSummary(reviews) {
    if (!averageRating || !averageStars || !reviewCount) {
        return;
    }

    if (!reviews || reviews.length === 0) {
        averageRating.textContent = "0.0";
        averageStars.textContent = "☆☆☆☆☆";
        reviewCount.textContent = "Based on 0 reviews";
        return;
    }

    let totalRating = 0;
    reviews.forEach(function (review) {
        totalRating += Number(review.rating || 0);
    });

    const average = totalRating / reviews.length;

    averageRating.textContent = average.toFixed(1);
    averageStars.textContent = createStars(average);
    reviewCount.textContent = `Based on ${reviews.length} ${
        reviews.length === 1 ? "review" : "reviews"
    }`;
}


/* =========================================================
   FETCH REVIEWS FROM DATABASE (SUPABASE)
   ========================================================= */

async function fetchReviewsFromDatabase() {
    // 1. Try fetching via Supabase JS client
    if (supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from("reviews")
                .select("*")
                .eq("approved", true)
                .order("created_at", { ascending: false });

            if (!error && Array.isArray(data) && data.length > 0) {
                saveLocalReviews(data);
                return data;
            }
        } catch (err) {
            console.warn("Supabase client query failed, falling back to REST API:", err);
        }
    }

    // 2. Direct Supabase REST API fetch
    try {
        const response = await fetch(
            `${SUPABASE_URL}/rest/v1/reviews?approved=eq.true&order=created_at.desc`,
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
                saveLocalReviews(data);
                return data;
            }
        }
    } catch (err) {
        console.warn("Supabase REST query failed, using local cached reviews:", err);
    }

    // 3. Fallback to cached/default reviews if network is unreachable
    return getLocalReviews();
}


/* =========================================================
   DISPLAY REVIEWS IN THE DOM
   ========================================================= */

async function displayReviews() {
    if (!reviewsContainer) {
        return;
    }

    reviewsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
            <p>Loading customer reviews...</p>
        </div>
    `;

    const reviews = await fetchReviewsFromDatabase();

    reviewsContainer.innerHTML = "";

    if (!reviews || reviews.length === 0) {
        reviewsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #666;">
                <p>No reviews yet. Be the first to share your experience!</p>
            </div>
        `;
        updateRatingSummary([]);
        return;
    }

    reviews.forEach(function (review) {
        const reviewCard = document.createElement("article");
        reviewCard.classList.add("review-card");

        const displayName = review.customer_name || review.name || "Nkhungudzu Customer";
        const displayRating = Number(review.rating) || 5;
        const displayComment = review.comment || "";
        const displayDate = formatReviewDate(review.created_at);

        reviewCard.innerHTML = `
            <div class="review-card-stars" aria-label="${displayRating} out of 5 stars">
                ${createStars(displayRating)}
            </div>
            <h3>${escapeHTML(displayName)}</h3>
            <p>${escapeHTML(displayComment)}</p>
            <span class="review-card-author">${escapeHTML(displayDate)}</span>
        `;

        reviewsContainer.appendChild(reviewCard);
    });

    updateRatingSummary(reviews);
}


/* =========================================================
   STAR INTERACTIVITY (SELECTION & HOVER)
   ========================================================= */

if (ratingStars && ratingStars.length > 0) {
    ratingStars.forEach(function (star) {
        star.addEventListener("click", function () {
            const rating = Number(star.dataset.rating);
            if (selectedRating) {
                selectedRating.value = rating;
            }

            ratingStars.forEach(function (currentStar) {
                const currentRating = Number(currentStar.dataset.rating);
                if (currentRating <= rating) {
                    currentStar.classList.add("selected");
                } else {
                    currentStar.classList.remove("selected");
                }
            });

            if (ratingMessage) {
                ratingMessage.textContent = `You selected ${rating} ${
                    rating === 1 ? "star" : "stars"
                }.`;
            }
        });

        star.addEventListener("mouseenter", function () {
            const hoverRating = Number(star.dataset.rating);
            ratingStars.forEach(function (currentStar) {
                const currentRating = Number(currentStar.dataset.rating);
                if (currentRating <= hoverRating) {
                    currentStar.style.color = "#f2b01e";
                } else {
                    currentStar.style.color = "";
                }
            });
        });

        star.addEventListener("mouseleave", function () {
            ratingStars.forEach(function (currentStar) {
                currentStar.style.color = "";
            });
        });
    });
}


/* =========================================================
   SUBMIT REVIEW TO SUPABASE DATABASE
   ========================================================= */

if (reviewForm) {
    reviewForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = reviewName ? reviewName.value.trim() : "";
        const comment = reviewComment ? reviewComment.value.trim() : "";
        const rating = selectedRating ? Number(selectedRating.value) : 0;
        const submitButton = reviewForm.querySelector("button[type='submit']");

        /* Validate inputs */
        if (name === "") {
            if (reviewFormMessage) {
                reviewFormMessage.textContent = "Please enter your name.";
                reviewFormMessage.style.color = "#b51f2a";
            }
            if (reviewName) reviewName.focus();
            return;
        }

        if (!rating || rating < 1 || rating > 5) {
            if (reviewFormMessage) {
                reviewFormMessage.textContent = "Please select a star rating.";
                reviewFormMessage.style.color = "#b51f2a";
            }
            return;
        }

        if (comment === "") {
            if (reviewFormMessage) {
                reviewFormMessage.textContent = "Please write a review.";
                reviewFormMessage.style.color = "#b51f2a";
            }
            if (reviewComment) reviewComment.focus();
            return;
        }

        /* Show loading state on submit button */
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting Review...";
        }

        if (reviewFormMessage) {
            reviewFormMessage.textContent = "Submitting your review...";
            reviewFormMessage.style.color = "#176b45";
        }

        const newReviewPayload = {
            customer_name: name,
            rating: rating,
            comment: comment,
            approved: true
        };

        let insertSuccess = false;

        // 1. Try Supabase client insert
        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient
                    .from("reviews")
                    .insert([newReviewPayload])
                    .select();

                if (!error && data && data.length > 0) {
                    insertSuccess = true;
                }
            } catch (err) {
                console.warn("Supabase client insert failed, trying REST API:", err);
            }
        }

        // 2. Try REST API insert if Supabase client did not succeed
        if (!insertSuccess) {
            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
                    method: "POST",
                    headers: {
                        apikey: SUPABASE_ANON_KEY,
                        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                        "Content-Type": "application/json",
                        Prefer: "return=representation"
                    },
                    body: JSON.stringify(newReviewPayload)
                });

                if (response.ok) {
                    insertSuccess = true;
                }
            } catch (err) {
                console.error("REST API insert failed:", err);
            }
        }

        // Reset submit button state
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Submit Review";
        }

        if (insertSuccess) {
            if (reviewFormMessage) {
                reviewFormMessage.textContent = "Thank you! Your review has been submitted successfully.";
                reviewFormMessage.style.color = "#087443";
            }

            // Reset form fields
            reviewForm.reset();
            if (selectedRating) selectedRating.value = "";
            if (ratingMessage) ratingMessage.textContent = "Select a rating";

            if (ratingStars) {
                ratingStars.forEach(function (star) {
                    star.classList.remove("selected");
                });
            }

            // Reload reviews from the database to show updated dynamic reviews
            await displayReviews();

            // Clear success message after 6 seconds
            setTimeout(function () {
                if (reviewFormMessage) {
                    reviewFormMessage.textContent = "";
                }
            }, 6000);
        } else {
            // In case of network errors, save locally as fallback
            const cachedReviews = getLocalReviews();
            cachedReviews.unshift({
                customer_name: name,
                rating: rating,
                comment: comment,
                created_at: new Date().toISOString()
            });
            saveLocalReviews(cachedReviews);
            await displayReviews();

            if (reviewFormMessage) {
                reviewFormMessage.textContent = "Your review was saved locally (offline mode).";
                reviewFormMessage.style.color = "#d4a72c";
            }
        }
    });
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", displayReviews);
} else {
    displayReviews();
}