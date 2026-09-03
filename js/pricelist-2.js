/* =========================================================
   NKHUNGUDZU BOOKSHOP
   PHASE 6.9B
   2026 PRICE LIST DATABASE
   ========================================================= */

/* =========================================================
   1. SECONDARY TEXTBOOKS BY PUBLISHER
   ========================================================= */

const secondaryTextbooks = [
  {
    publisher: "Target",
    price: "K28,000",
    notes: "Senior Geography: K32,500",
  },

  {
    publisher: "Arise",
    price: "K25,000",
    notes: "Senior Social & Geography: K30,000",
  },

  {
    publisher: "Comprehensive Atlas",
    price: "K25,000",
    notes: "",
  },

  {
    publisher: "Excel / Succeed",
    price: "K25,000",
    notes:
      "Complete Geography B1 & B2: K25,000 | Complete Geography B3 & B4: K30,000 | Senior Physics: K30,000",
  },

  {
    publisher: "Achievers",
    price: "K25,000",
    notes: "Geography B3 & B4: K30,000",
  },

  {
    publisher: "Jhango",
    price: "K24,000",
    notes: "Chemistry JCE: K22,000",
  },

  {
    publisher: "Strides",
    price: "K18,000",
    notes: "Senior Agriculture: K21,000",
  },

  {
    publisher: "Chanco",
    price: "K17,500",
    notes: "Additional Maths: K25,000 | Note Making: K15,000",
  },

  {
    publisher: "Better Future",
    price: "K19,000",
    notes: "Better Future Geography F4: K21,000",
  },

  {
    publisher: "Kalea & Chirwa",
    price: "K22,000",
    notes: "All titles",
  },

  {
    publisher: "Giant",
    price: "K23,000",
    notes: "All titles",
  },
];

/* =========================================================
   2. MADE SIMPLE BOOKS
   ========================================================= */

const madeSimpleBooks = [
  {
    title: "JCE Maths Q & A",
    price: "K28,000",
  },

  {
    title: "JCE Chemistry",
    price: "K22,000",
  },

  {
    title: "MSCE Biology",
    price: "K28,000",
  },

  {
    title: "MSCE Agriculture",
    price: "K32,500",
  },

  {
    title: "8 in 1 English Study Guide",
    price: "K32,500",
  },

  {
    title: "Human Geography",
    price: "K28,000",
  },

  {
    title: "Physical Geography",
    price: "K32,500",
  },

  {
    title: "Complete Social MSCE",
    price: "K28,000",
  },

  {
    title: "Complete History",
    price: "K28,000",
  },

  {
    title: "Complete B/K",
    price: "K28,000",
  },

  {
    title: "MSCE Maths Q & A",
    price: "K32,500",
  },

  {
    title: "Complete Physics MSCE",
    price: "K32,500",
  },

  {
    title: "MSCE Chemistry",
    price: "K28,000",
  },
];

/* =========================================================
   3. ENGLISH LITERATURE
   ========================================================= */

const englishLiterature = [
  {
    title: "The Pearl",
    price: "K20,000",
  },

  {
    title: "The Tale of Tamari",
    price: "K18,000",
  },

  {
    title: "African Short Stories",
    price: "K18,000",
  },

  {
    title: "Stories From Africa",
    price: "K18,000",
  },

  {
    title: "Macbeth",
    price: "K25,000",
  },

  {
    title: "African Thunderstorm",
    price: "K6,500",
  },

  {
    title: "The Play of the Little Soldier H/C",
    price: "K22,000",
  },

  {
    title: "The Play of the Little Soldier S/C",
    price: "K16,500",
  },

  {
    title: "The Familiar Stranger",
    price: "K25,000",
  },
];

/* =========================================================
   4. CHICHEWA LITERATURE
   ========================================================= */

const chichewaLiterature = [
  {
    title: "Bwampini",
    price: "K12,500",
  },

  {
    title: "Nthondo",
    price: "K18,000",
  },

  {
    title: "Kwalimba Uta",
    price: "K15,000",
  },

  {
    title: "Chamdothe",
    price: "K25,000",
  },

  {
    title: "Kusintha Maganizo",
    price: "K22,000",
  },

  {
    title: "Kuyimba Mlakatuli",
    price: "K18,000",
  },
];

/* =========================================================
   5. DICTIONARIES & OTHER BOOKS
   ========================================================= */

const dictionaries = [
  {
    title: "Oxford Mini Dictionary",
    price: "K20,000",
  },

  {
    title: "English-Chichewa Dictionary",
    price: "K20,000",
  },

  {
    title: "Oxford Basic Dictionary",
    price: "K18,900",
  },

  {
    title: "Oxford Student Dictionary",
    price: "K40,000",
  },

  {
    title: "Oxford English Dictionary",
    price: "K40,000",
  },

  {
    title: "Oxford Primary Dictionary",
    price: "K30,000 - K47,500",
  },

  {
    title: "Oxford Advanced Dictionary 9th Edition",
    price: "K65,000",
  },

  {
    title: "Oxford Advanced Dictionary 10th Edition",
    price: "K70,000",
  },

  {
    title: "Cambridge Learners Dictionary",
    price: "K35,000",
  },

  {
    title: "Contemporary English Grammar",
    price: "K18,000",
  },

  {
    title: "Mastering English",
    price: "K25,000",
  },
];

/* =========================================================
   6. SECONDARY TEACHER'S GUIDES
   ========================================================= */

const secondaryTeacherGuides = {
  description: "All Secondary Teacher's Guides",

  price: "K15,000",
};

/* =========================================================
   7. PRIMARY TEACHER'S GUIDES
   STD 1 - STD 4
   ========================================================= */

const primaryGuidesOneToFour = [
  {
    subject: "English TG",
    std1: "K25,000",
    std2: "K25,000",
    std3: "K25,000",
    std4: "K23,000",
  },

  {
    subject: "Chichewa TG",
    std1: "K35,000",
    std2: "K35,000",
    std3: "K23,000",
    std4: "K23,500",
  },

  {
    subject: "Expressive Art TG",
    std1: "K8,500",
    std2: "K8,000",
    std3: "K8,000",
    std4: "K5,500",
  },

  {
    subject: "Mathematics TG",
    std1: "K20,000",
    std2: "K20,000",
    std3: "K20,000",
    std4: "K20,000",
  },

  {
    subject: "Bible Knowledge TG",
    std1: "K4,500",
    std2: "K5,000",
    std3: "K7,900",
    std4: "K4,500",
  },

  {
    subject: "Religious Education TG",
    std1: "K4,500",
    std2: "K4,500",
    std3: "K5,400",
    std4: "K5,400",
  },

  {
    subject: "Life Skills TG",
    std1: "K10,000",
    std2: "K7,900",
    std3: "K7,900",
    std4: "-",
  },

  {
    subject: "Social & Environmental TG",
    std1: "-",
    std2: "K8,100",
    std3: "K8,100",
    std4: "-",
  },

  {
    subject: "Agriculture TG",
    std1: "-",
    std2: "-",
    std3: "-",
    std4: "K6,000",
  },

  {
    subject: "Introduction to Schools",
    std1: "K6,500",
    std2: "-",
    std3: "-",
    std4: "-",
  },
];

/* =========================================================
   8. PRIMARY TEACHER'S GUIDES
   STD 5 - STD 8
   ========================================================= */

const primaryGuidesFiveToEight = [
  {
    subject: "English TG",
    std5: "K14,500",
    std6: "K15,000",
    std7: "K13,500",
    std8: "K14,000",
  },

  {
    subject: "Mathematics TG",
    std5: "K21,000",
    std6: "K22,000",
    std7: "K30,000",
    std8: "K31,000",
  },

  {
    subject: "Chichewa TG",
    std5: "K15,500",
    std6: "K15,500",
    std7: "K11,500",
    std8: "K12,000",
  },

  {
    subject: "Expressive Art TG",
    std5: "K5,500",
    std6: "K11,000",
    std7: "K10,000",
    std8: "K4,500",
  },

  {
    subject: "Science TG",
    std5: "K6,500",
    std6: "K11,500",
    std7: "K11,500",
    std8: "K10,000",
  },

  {
    subject: "Social TG",
    std5: "K6,000",
    std6: "K12,000",
    std7: "K15,500",
    std8: "K15,500",
  },

  {
    subject: "Agriculture TG",
    std5: "K6,800",
    std6: "K8,500",
    std7: "K11,000",
    std8: "K10,000",
  },

  {
    subject: "Bible Knowledge TG",
    std5: "K4,000",
    std6: "K6,500",
    std7: "K5,500",
    std8: "K4,000",
  },

  {
    subject: "Life Skills TG",
    std5: "K7,900",
    std6: "K9,500",
    std7: "K7,500",
    std8: "K10,000",
  },

  {
    subject: "Religious Education",
    std5: "K4,500",
    std6: "K7,900",
    std7: "K6,500",
    std8: "K6,000",
  },
];

/* =========================================================
   9. PRIMARY LEARNER BOOKS
   ========================================================= */

const primaryBooks = [
  {
    standard: "STD 1",

    totalWithoutRE: "K28,000",

    totalWithRE: "K30,500",

    subjects: [
      {
        subject: "Bible Knowledge",
        price: "K2,500",
      },

      {
        subject: "Expressive Arts",
        price: "K3,500",
      },

      {
        subject: "English",
        price: "K6,500",
      },

      {
        subject: "Chichewa",
        price: "K7,000",
      },

      {
        subject: "Kuyamba Sukulu",
        price: "K4,000",
      },

      {
        subject: "Mathematics",
        price: "K4,500",
      },

      {
        subject: "Religious Education",
        price: "K5,000",
      },
    ],
  },

  {
    standard: "STD 2",

    totalWithoutRE: "K37,500",

    totalWithRE: "K41,500",

    subjects: [
      {
        subject: "Bible Knowledge",
        price: "K4,000",
      },

      {
        subject: "English",
        price: "K10,000",
      },

      {
        subject: "Mathematics",
        price: "K4,500",
      },

      {
        subject: "Chichewa",
        price: "K9,000",
      },

      {
        subject: "Expressive Arts",
        price: "K4,500",
      },

      {
        subject: "Life Skills",
        price: "K5,500",
      },

      {
        subject: "Religious Education",
        price: "K4,000",
      },
    ],
  },

  {
    standard: "STD 3",

    totalWithoutRE: "K38,000",

    totalWithRE: "K43,500",

    subjects: [
      {
        subject: "Bible Knowledge",
        price: "K4,000",
      },

      {
        subject: "English",
        price: "K7,500",
      },

      {
        subject: "Mathematics",
        price: "K4,500",
      },

      {
        subject: "Chichewa",
        price: "K6,500",
      },

      {
        subject: "Social Studies",
        price: "K6,500",
      },

      {
        subject: "Expressive Arts",
        price: "K4,500",
      },

      {
        subject: "Life Skills",
        price: "K4,500",
      },

      {
        subject: "Religious Education",
        price: "K5,500",
      },
    ],
  },

  {
    standard: "STD 4",

    totalWithoutRE: "K43,500",

    totalWithRE: "K47,500",

    subjects: [
      {
        subject: "Bible Knowledge",
        price: "K4,500",
      },

      {
        subject: "English",
        price: "K8,000",
      },

      {
        subject: "Mathematics",
        price: "K4,500",
      },

      {
        subject: "Chichewa",
        price: "K6,500",
      },

      {
        subject: "Agriculture",
        price: "K5,000",
      },

      {
        subject: "Social & Environmental Studies",
        price: "K6,500",
      },

      {
        subject: "Expressive Arts",
        price: "K4,500",
      },

      {
        subject: "Life Skills",
        price: "K4,500",
      },

      {
        subject: "Religious Education",
        price: "K4,000",
      },
    ],
  },

  {
    standard: "STD 5",

    totalWithoutRE: "K51,400",

    totalWithRE: "K54,900",

    subjects: [
      {
        subject: "Bible Knowledge",
        price: "K3,500",
      },

      {
        subject: "English",
        price: "K8,500",
      },

      {
        subject: "Mathematics",
        price: "K8,000",
      },

      {
        subject: "Chichewa",
        price: "K8,500",
      },

      {
        subject: "Agriculture",
        price: "K5,400",
      },

      {
        subject: "Social & Environmental Studies",
        price: "K5,500",
      },

      {
        subject: "Expressive Arts",
        price: "K4,000",
      },

      {
        subject: "Life Skills",
        price: "K4,500",
      },

      {
        subject: "Science",
        price: "K3,500",
      },

      {
        subject: "Religious Education",
        price: "K3,500",
      },
    ],
  },

  {
    standard: "STD 6",

    totalWithoutRE: "K62,300",

    totalWithRE: "K65,800",

    subjects: [
      {
        subject: "Bible Knowledge",
        price: "K3,500",
      },

      {
        subject: "English",
        price: "K8,500",
      },

      {
        subject: "Mathematics",
        price: "K10,300",
      },

      {
        subject: "Chichewa",
        price: "K10,500",
      },

      {
        subject: "Agriculture",
        price: "K6,500",
      },

      {
        subject: "Social & Environmental Studies",
        price: "K7,500",
      },

      {
        subject: "Expressive Arts",
        price: "K4,500",
      },

      {
        subject: "Life Skills",
        price: "K5,500",
      },

      {
        subject: "Science",
        price: "K5,500",
      },

      {
        subject: "Religious Education",
        price: "K3,500",
      },
    ],
  },

  {
    standard: "STD 7",

    totalWithoutRE: "K63,000",

    totalWithRE: "K66,000",

    subjects: [
      {
        subject: "Bible Knowledge",
        price: "K3,500",
      },

      {
        subject: "English",
        price: "K6,500",
      },

      {
        subject: "Mathematics",
        price: "K12,500",
      },

      {
        subject: "Chichewa",
        price: "K8,500",
      },

      {
        subject: "Agriculture",
        price: "K6,500",
      },

      {
        subject: "Social & Environmental Studies",
        price: "K8,500",
      },

      {
        subject: "Expressive Arts",
        price: "K5,500",
      },

      {
        subject: "Life Skills",
        price: "K5,500",
      },

      {
        subject: "Science",
        price: "K6,000",
      },

      {
        subject: "Religious Education",
        price: "K3,000",
      },
    ],
  },

  {
    standard: "STD 8",

    totalWithoutRE: "K61,500",

    totalWithRE: "K65,500",

    subjects: [
      {
        subject: "Bible Knowledge",
        price: "K3,000",
      },

      {
        subject: "English",
        price: "K9,500",
      },

      {
        subject: "Mathematics",
        price: "K12,500",
      },

      {
        subject: "Chichewa",
        price: "K8,500",
      },

      {
        subject: "Agriculture",
        price: "K6,500",
      },

      {
        subject: "Social & Environmental Studies",
        price: "K8,000",
      },

      {
        subject: "Expressive Arts",
        price: "K4,500",
      },

      {
        subject: "Life Skills",
        price: "K4,500",
      },

      {
        subject: "Science",
        price: "K4,500",
      },

      {
        subject: "Religious Education",
        price: "K4,000",
      },
    ],
  },
];

/* =========================================================
   PRICE DATABASE LOADED
   ========================================================= */

console.log("Nkhungudzu 2026 price database loaded successfully.");

/* =========================================================
   PHASE 6.9C
   DISPLAY PRICE DATABASE
   ========================================================= */

/* =========================================================
   SECONDARY TEXTBOOKS
   ========================================================= */

const secondaryTable = document.querySelector("#secondaryTextbooksTable");

if (secondaryTable) {
  secondaryTable.innerHTML = "";

  secondaryTextbooks.forEach(function (book) {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${book.publisher}</td>

            <td>
                <strong>${book.price}</strong>
            </td>

            <td>
                ${book.notes || "—"}
            </td>
        `;

    secondaryTable.appendChild(row);
  });
}

/* =========================================================
   MADE SIMPLE BOOKS
   ========================================================= */

const madeSimpleTable = document.querySelector("#madeSimpleBooksTable");

if (madeSimpleTable) {
  madeSimpleTable.innerHTML = "";

  madeSimpleBooks.forEach(function (book) {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${book.title}</td>

            <td>
                <strong>${book.price}</strong>
            </td>
        `;

    madeSimpleTable.appendChild(row);
  });
}

/* =========================================================
   ENGLISH LITERATURE
   ========================================================= */

const englishTable = document.querySelector("#englishLiteratureTable");

if (englishTable) {
  englishTable.innerHTML = "";

  englishLiterature.forEach(function (book) {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${book.title}</td>

            <td>
                <strong>${book.price}</strong>
            </td>
        `;

    englishTable.appendChild(row);
  });
}

/* =========================================================
   CHICHEWA LITERATURE
   ========================================================= */

const chichewaTable = document.querySelector("#chichewaLiteratureTable");

if (chichewaTable) {
  chichewaTable.innerHTML = "";

  chichewaLiterature.forEach(function (book) {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${book.title}</td>

            <td>
                <strong>${book.price}</strong>
            </td>
        `;

    chichewaTable.appendChild(row);
  });
}

/* =========================================================
   DICTIONARIES
   ========================================================= */

const dictionariesTable = document.querySelector("#dictionariesTable");

if (dictionariesTable) {
  dictionariesTable.innerHTML = "";

  dictionaries.forEach(function (book) {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${book.title}</td>

            <td>
                <strong>${book.price}</strong>
            </td>
        `;

    dictionariesTable.appendChild(row);
  });
}

/* =========================================================
   SECONDARY TEACHER'S GUIDES
   ========================================================= */

const secondaryGuidePrice = document.querySelector(
  "#secondaryTeacherGuidePrice",
);

if (secondaryGuidePrice) {
  secondaryGuidePrice.textContent = secondaryTeacherGuides.price;
}

/* =========================================================
   PRIMARY TEACHER'S GUIDES
   STD 1 - 4
   ========================================================= */

const primaryGuides14Table = document.querySelector(
  "#primaryGuidesOneToFourTable",
);

if (primaryGuides14Table) {
  primaryGuides14Table.innerHTML = "";

  primaryGuidesOneToFour.forEach(function (guide) {
    const row = document.createElement("tr");

    row.innerHTML = `

            <td>
                ${guide.subject}
            </td>

            <td>${guide.std1}</td>

            <td>${guide.std2}</td>

            <td>${guide.std3}</td>

            <td>${guide.std4}</td>

        `;

    primaryGuides14Table.appendChild(row);
  });
}

/* =========================================================
   PRIMARY TEACHER'S GUIDES
   STD 5 - 8
   ========================================================= */

const primaryGuides58Table = document.querySelector(
  "#primaryGuidesFiveToEightTable",
);

if (primaryGuides58Table) {
  primaryGuides58Table.innerHTML = "";

  primaryGuidesFiveToEight.forEach(function (guide) {
    const row = document.createElement("tr");

    row.innerHTML = `

            <td>
                ${guide.subject}
            </td>

            <td>${guide.std5}</td>

            <td>${guide.std6}</td>

            <td>${guide.std7}</td>

            <td>${guide.std8}</td>

        `;

    primaryGuides58Table.appendChild(row);
  });
}

/* =========================================================
   PRIMARY LEARNER BOOKS
   ========================================================= */

const primaryBooksContainer = document.querySelector("#primaryBooksContainer");

if (primaryBooksContainer) {
  primaryBooksContainer.innerHTML = "";

  primaryBooks.forEach(function (standard) {
    const standardCard = document.createElement("div");

    standardCard.classList.add("primary-standard-card");

    let subjectsHTML = "";

    standard.subjects.forEach(function (item) {
      subjectsHTML += `

                <div class="primary-book-row">

                    <span>
                        ${item.subject}
                    </span>

                    <strong>
                        ${item.price}
                    </strong>

                </div>

            `;
    });

    standardCard.innerHTML = `

            <div class="primary-standard-header">

                <h3>
                    ${standard.standard}
                </h3>

            </div>


            <div class="primary-book-subjects">

                ${subjectsHTML}

            </div>


            <div class="primary-book-totals">

                <div>

                    <span>
                        Standard Total
                        <small>
                            excluding Religious Education
                        </small>
                    </span>

                    <strong>
                        ${standard.totalWithoutRE}
                    </strong>

                </div>


                <div>

                    <span>
                        Total Including Religious Education
                    </span>

                    <strong>
                        ${standard.totalWithRE}
                    </strong>

                </div>

            </div>

        `;

    primaryBooksContainer.appendChild(standardCard);
  });
}

console.log("Phase 6.9C price tables loaded successfully.");

/* =========================================================
   PHASE 6.9D
   PRICE LIST SEARCH SYSTEM
   ========================================================= */

/* =========================================================
   SEARCH ELEMENTS
   ========================================================= */

const priceSearch = document.querySelector("#priceSearch");

const priceSearchButton = document.querySelector("#priceSearchButton");

const searchResultsMessage = document.querySelector("#searchResultsMessage");

/* =========================================================
   ALL PRICE DATA
   ========================================================= */

function getAllPriceItems() {
  const results = [];

  /* -----------------------------------------------------
       SECONDARY TEXTBOOKS
       ----------------------------------------------------- */

  secondaryTextbooks.forEach(function (book) {
    results.push({
      name: book.publisher,

      category: "Secondary Textbooks",

      price: book.price,

      notes: book.notes,
    });
  });

  /* -----------------------------------------------------
       MADE SIMPLE BOOKS
       ----------------------------------------------------- */

  madeSimpleBooks.forEach(function (book) {
    results.push({
      name: book.title,

      category: "Made Simple Books",

      price: book.price,

      notes: "",
    });
  });

  /* -----------------------------------------------------
       ENGLISH LITERATURE
       ----------------------------------------------------- */

  englishLiterature.forEach(function (book) {
    results.push({
      name: book.title,

      category: "English Literature",

      price: book.price,

      notes: "",
    });
  });

  /* -----------------------------------------------------
       CHICHEWA LITERATURE
       ----------------------------------------------------- */

  chichewaLiterature.forEach(function (book) {
    results.push({
      name: book.title,

      category: "Chichewa Literature",

      price: book.price,

      notes: "",
    });
  });

  /* -----------------------------------------------------
       DICTIONARIES
       ----------------------------------------------------- */

  dictionaries.forEach(function (book) {
    results.push({
      name: book.title,

      category: "Dictionaries & Other Books",

      price: book.price,

      notes: "",
    });
  });

  /* -----------------------------------------------------
       SECONDARY TEACHER GUIDES
       ----------------------------------------------------- */

  results.push({
    name: "Secondary Teacher's Guides",

    category: "Teacher Resources",

    price: secondaryTeacherGuides.price,

    notes: "All Secondary Teacher's Guides",
  });

  /* -----------------------------------------------------
       PRIMARY TEACHER GUIDES
       ----------------------------------------------------- */

  primaryGuidesOneToFour.forEach(function (guide) {
    results.push({
      name: guide.subject,

      category: "Primary Teacher's Guides STD 1-4",

      price:
        "STD 1: " +
        guide.std1 +
        " | STD 2: " +
        guide.std2 +
        " | STD 3: " +
        guide.std3 +
        " | STD 4: " +
        guide.std4,

      notes: "",
    });
  });

  primaryGuidesFiveToEight.forEach(function (guide) {
    results.push({
      name: guide.subject,

      category: "Primary Teacher's Guides STD 5-8",

      price:
        "STD 5: " +
        guide.std5 +
        " | STD 6: " +
        guide.std6 +
        " | STD 7: " +
        guide.std7 +
        " | STD 8: " +
        guide.std8,

      notes: "",
    });
  });

  /* -----------------------------------------------------
       PRIMARY LEARNER BOOKS
       ----------------------------------------------------- */

  primaryBooks.forEach(function (standard) {
    standard.subjects.forEach(function (book) {
      results.push({
        name: book.subject,

        category: "Primary Learner Books " + standard.standard,

        price: book.price,

        notes:
          "Standard total excluding Religious Education: " +
          standard.totalWithoutRE +
          " | Including Religious Education: " +
          standard.totalWithRE,
      });
    });
  });

  return results;
}

/* =========================================================
   DISPLAY SEARCH RESULTS
   ========================================================= */

function displaySearchResults(results) {
  /* Remove old results */

  const oldResults = document.querySelector("#priceSearchResults");

  if (oldResults) {
    oldResults.remove();
  }

  /* If there are no results */

  if (results.length === 0) {
    if (searchResultsMessage) {
      searchResultsMessage.textContent =
        "No matching products were found. Please try another search.";
    }

    return;
  }

  /* Update result message */

  if (searchResultsMessage) {
    searchResultsMessage.textContent =
      results.length + " matching result(s) found.";
  }

  /* Create results container */

  const resultsContainer = document.createElement("section");

  resultsContainer.id = "priceSearchResults";

  resultsContainer.classList.add("price-search-results");

  const container = document.createElement("div");

  container.classList.add("container");

  /* Heading */

  const heading = document.createElement("div");

  heading.classList.add("search-results-heading");

  heading.innerHTML = `

        <span class="section-label">
            SEARCH RESULTS
        </span>

        <h2>
            Matching Products
        </h2>

    `;

  container.appendChild(heading);

  /* Results grid */

  const resultsGrid = document.createElement("div");

  resultsGrid.classList.add("search-results-grid");

  results.forEach(function (item) {
    const card = document.createElement("article");

    card.classList.add("search-result-card");

    card.innerHTML = `

            <span class="search-result-category">
                ${item.category}
            </span>

            <h3>
                ${item.name}
            </h3>

            <p class="search-result-price">
                ${item.price}
            </p>

            ${
              item.notes
                ? `<p class="search-result-notes">
                    ${item.notes}
                </p>`
                : ""
            }

        `;

    resultsGrid.appendChild(card);
  });

  container.appendChild(resultsGrid);

  resultsContainer.appendChild(container);

  /* Put results underneath the search section */

  const searchSection = document.querySelector(".price-search-section");

  if (searchSection) {
    searchSection.after(resultsContainer);
  }
}

/* =========================================================
   PERFORM PRICE SEARCH
   ========================================================= */

function performPriceSearch() {
  if (!priceSearch) {
    return;
  }

  const searchTerm = priceSearch.value.trim().toLowerCase();

  /* -----------------------------------------------------
       Empty search
       ----------------------------------------------------- */

  if (searchTerm === "") {
    const oldResults = document.querySelector("#priceSearchResults");

    if (oldResults) {
      oldResults.remove();
    }

    if (searchResultsMessage) {
      searchResultsMessage.textContent = "";
    }

    return;
  }

  /* -----------------------------------------------------
       Get all products
       ----------------------------------------------------- */

  const allItems = getAllPriceItems();

  /* -----------------------------------------------------
       Search products
       ----------------------------------------------------- */

  const matchingItems = allItems.filter(function (item) {
    const searchableText = (
      item.name +
      " " +
      item.category +
      " " +
      item.price +
      " " +
      item.notes
    ).toLowerCase();

    return searchableText.includes(searchTerm);
  });

  /* -----------------------------------------------------
       Display results
       ----------------------------------------------------- */

  displaySearchResults(matchingItems);
}

/* =========================================================
   SEARCH BUTTON
   ========================================================= */

if (priceSearchButton) {
  priceSearchButton.addEventListener("click", performPriceSearch);
}

/* =========================================================
   SEARCH WITH ENTER KEY
   ========================================================= */

if (priceSearch) {
  priceSearch.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      performPriceSearch();
    }
  });
}

console.log("Phase 6.9D price search system loaded successfully.");
