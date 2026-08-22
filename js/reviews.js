/* =========================================================
   PHASE 6.12C
   REVIEWS & RATINGS JAVASCRIPT
   ========================================================= */


/* =========================================================
   REVIEW ELEMENTS
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
   DEFAULT REVIEWS
   ========================================================= */

const defaultReviews = [
    {
        name: "Nkhungudzu Customer",
        rating: 5,
        comment:
            "Great selection of educational books and helpful service."
    },

    {
        name: "Happy Customer",
        rating: 5,
        comment:
            "I was able to find the books and stationery I needed."
    },

    {
        name: "Nkhungudzu Customer",
        rating: 4,
        comment:
            "A convenient place to find educational and spiritual literature."
    }
];


/* =========================================================
   LOAD SAVED REVIEWS
   ========================================================= */

function getReviews() {

    const savedReviews =
        localStorage.getItem(
            "nkhungudzuReviews"
        );


    if (savedReviews) {

        return JSON.parse(savedReviews);

    }


    return defaultReviews;

}


/* =========================================================
   SAVE REVIEWS
   ========================================================= */

function saveReviews(reviews) {

    localStorage.setItem(
        "nkhungudzuReviews",
        JSON.stringify(reviews)
    );

}


/* =========================================================
   CREATE STAR DISPLAY
   ========================================================= */

function createStars(rating) {

    let stars = "";


    for (let i = 1; i <= 5; i++) {

        if (i <= rating) {

            stars += "★";

        }

        else {

            stars += "☆";

        }

    }


    return stars;

}


/* =========================================================
   DISPLAY REVIEWS
   ========================================================= */

function displayReviews() {

    if (!reviewsContainer) {

        return;

    }


    const reviews =
        getReviews();


    reviewsContainer.innerHTML = "";


    reviews.forEach(function (review) {


        const reviewCard =
            document.createElement("article");


        reviewCard.classList.add(
            "review-card"
        );


        reviewCard.innerHTML = `

            <div class="review-card-stars">
                ${createStars(review.rating)}
            </div>

            <h3>
                ${escapeHTML(review.name)}
            </h3>

            <p>
                ${escapeHTML(review.comment)}
            </p>

            <span class="review-card-author">
                Customer Review
            </span>

        `;


        reviewsContainer.appendChild(
            reviewCard
        );

    });


    updateRatingSummary(reviews);

}


/* =========================================================
   PROTECT REVIEW TEXT
   ========================================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent = text;


    return div.innerHTML;

}


/* =========================================================
   UPDATE RATING SUMMARY
   ========================================================= */

function updateRatingSummary(reviews) {

    if (!averageRating ||
        !averageStars ||
        !reviewCount) {

        return;

    }


    if (reviews.length === 0) {

        averageRating.textContent = "0.0";

        averageStars.textContent = "☆☆☆☆☆";

        reviewCount.textContent =
            "Based on 0 reviews";

        return;

    }


    let totalRating = 0;


    reviews.forEach(function (review) {

        totalRating += Number(
            review.rating
        );

    });


    const average =
        totalRating / reviews.length;


    averageRating.textContent =
        average.toFixed(1);


    averageStars.textContent =
        createStars(
            Math.round(average)
        );


    reviewCount.textContent =
        `Based on ${reviews.length} ${
            reviews.length === 1
                ? "review"
                : "reviews"
        }`;

}


/* =========================================================
   STAR SELECTION
   ========================================================= */

ratingStars.forEach(function (star) {

    star.addEventListener(
        "click",
        function () {

            const rating =
                Number(
                    star.dataset.rating
                );


            selectedRating.value =
                rating;


            ratingStars.forEach(
                function (currentStar) {

                    const currentRating =
                        Number(
                            currentStar.dataset.rating
                        );


                    if (
                        currentRating <= rating
                    ) {

                        currentStar.classList.add(
                            "selected"
                        );

                    }

                    else {

                        currentStar.classList.remove(
                            "selected"
                        );

                    }

                }
            );


            ratingMessage.textContent =
                `You selected ${rating} ${
                    rating === 1
                        ? "star"
                        : "stars"
                }.`;

        }
    );

});


/* =========================================================
   STAR HOVER EFFECT
   ========================================================= */

ratingStars.forEach(function (star) {

    star.addEventListener(
        "mouseenter",
        function () {

            const hoverRating =
                Number(
                    star.dataset.rating
                );


            ratingStars.forEach(
                function (currentStar) {

                    const currentRating =
                        Number(
                            currentStar.dataset.rating
                        );


                    if (
                        currentRating <= hoverRating
                    ) {

                        currentStar.style.color =
                            "#f2b01e";

                    }

                    else {

                        currentStar.style.color =
                            "";

                    }

                }
            );

        }
    );


    star.addEventListener(
        "mouseleave",
        function () {

            ratingStars.forEach(
                function (currentStar) {

                    currentStar.style.color =
                        "";

                }
            );

        }
    );

});


/* =========================================================
   SUBMIT REVIEW
   ========================================================= */

if (reviewForm) {

    reviewForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                reviewName.value.trim();


            const comment =
                reviewComment.value.trim();


            const rating =
                Number(
                    selectedRating.value
                );


            /* -----------------------------------------
               VALIDATE NAME
               ----------------------------------------- */

            if (name === "") {

                reviewFormMessage.textContent =
                    "Please enter your name.";

                reviewName.focus();

                return;

            }


            /* -----------------------------------------
               VALIDATE RATING
               ----------------------------------------- */

            if (
                !rating ||
                rating < 1 ||
                rating > 5
            ) {

                reviewFormMessage.textContent =
                    "Please select a star rating.";

                return;

            }


            /* -----------------------------------------
               VALIDATE COMMENT
               ----------------------------------------- */

            if (comment === "") {

                reviewFormMessage.textContent =
                    "Please write a review.";

                reviewComment.focus();

                return;

            }


            /* -----------------------------------------
               CREATE NEW REVIEW
               ----------------------------------------- */

            const newReview = {

                name: name,

                rating: rating,

                comment: comment

            };


            const reviews =
                getReviews();


            reviews.push(newReview);


            saveReviews(reviews);


            /* -----------------------------------------
               DISPLAY UPDATED REVIEWS
               ----------------------------------------- */

            displayReviews();


            /* -----------------------------------------
               SUCCESS MESSAGE
               ----------------------------------------- */

            reviewFormMessage.textContent =
                "Thank you! Your review has been submitted successfully.";


            reviewFormMessage.style.color =
                "#087443";


            /* -----------------------------------------
               RESET FORM
               ----------------------------------------- */

            reviewForm.reset();


            selectedRating.value = "";


            ratingMessage.textContent =
                "Select a rating";


            ratingStars.forEach(
                function (star) {

                    star.classList.remove(
                        "selected"
                    );

                }
            );


            /* -----------------------------------------
               REMOVE MESSAGE AFTER A FEW SECONDS
               ----------------------------------------- */

            setTimeout(
                function () {

                    reviewFormMessage.textContent =
                        "";

                },
                5000
            );

        }
    );

}


/* =========================================================
   INITIALISE REVIEWS
   ========================================================= */

displayReviews();