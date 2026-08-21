
/* =========================================================
   7. BOOK PAGE FILTERS
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  const bookFilters = document.querySelectorAll(".book-filter");

  const bookCards = document.querySelectorAll(".book-category-card");

  /* ---------------------------------------------------------
       Check whether the Books page exists
       --------------------------------------------------------- */

  if (bookFilters.length === 0 || bookCards.length === 0) {
    return;
  }

  /* ---------------------------------------------------------
       Filter books
       --------------------------------------------------------- */

  bookFilters.forEach(function (filterButton) {
    filterButton.addEventListener("click", function () {
      /* Remove active class from every button */

      bookFilters.forEach(function (button) {
        button.classList.remove("active");
      });

      /* Make clicked button active */

      filterButton.classList.add("active");

      /* Get selected category */

      const selectedCategory = filterButton.getAttribute("data-category");

      /* Show / hide cards */

      bookCards.forEach(function (card) {
        const cardCategory = card.getAttribute("data-category");

        if (selectedCategory === "all" || cardCategory === selectedCategory) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
