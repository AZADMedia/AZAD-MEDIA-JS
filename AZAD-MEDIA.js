// Pre-fetch all items during initialization
const pages = [
    "https://media-azad.blogspot.com/p/item-page-0-9_31.html",
    "https://media-azad.blogspot.com/p/item-page-a_1.html",
    "https://media-azad.blogspot.com/p/item-page-b.html",
    "https://media-azad.blogspot.com/p/item-page-c.html",
    "https://media-azad.blogspot.com/p/item-page-d.html",
    "https://media-azad.blogspot.com/p/item-page-e.html",
    "https://media-azad.blogspot.com/p/item-page-f.html",
    "https://media-azad.blogspot.com/p/item-page-g.html",
    "https://media-azad.blogspot.com/p/item-page-h.html",
    "https://media-azad.blogspot.com/p/item-page-i.html",
    "https://media-azad.blogspot.com/p/item-page-j.html",
    "https://media-azad.blogspot.com/p/item-page-k.html",
    "https://media-azad.blogspot.com/p/item-page-l.html",
    "https://media-azad.blogspot.com/p/item-page-m.html",
    "https://media-azad.blogspot.com/p/item-page-n.html",
    "https://media-azad.blogspot.com/p/item-page-o.html",
    "https://media-azad.blogspot.com/p/item-page-p.html",
    "https://media-azad.blogspot.com/p/item-page-q.html",
    "https://media-azad.blogspot.com/p/item-page-r.html",
    "https://media-azad.blogspot.com/p/item-page-s.html",
    "https://media-azad.blogspot.com/p/item-page-t.html",
    "https://media-azad.blogspot.com/p/item-page-u.html",
    "https://media-azad.blogspot.com/p/item-page-v.html",
    "https://media-azad.blogspot.com/p/item-page-w.html",
    "https://media-azad.blogspot.com/p/item-page-x.html",
    "https://media-azad.blogspot.com/p/item-page-y.html",
    "https://media-azad.blogspot.com/p/item-page-z.html"
];

const allItems = [];
const resultsContainer = document.getElementById("results");
const searchInput = document.getElementById("search");
const contentBox = document.getElementById("content-box");

// Function to fetch and parse items from pages
async function fetchItems() {
    const fetchPromises = pages.map(async (page) => {
        try {
            const response = await fetch(page);
            const html = await response.text();
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = html;
            const items = tempDiv.querySelectorAll(".items");
            items.forEach((item) => {
                allItems.push(item.cloneNode(true).outerHTML);
            });
        } catch (error) {
            console.error(`Error fetching ${page}:`, error);
        }
    });

    // Wait for all pages to be fetched
    await Promise.all(fetchPromises);
    console.log("All items fetched:", allItems.length);
}

// Render search results
function renderResults(query) {
    const filteredItems = allItems.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
    );

    if (filteredItems.length) {
        resultsContainer.innerHTML = filteredItems.join("");
        resultsContainer.style.visibility = "visible";
        contentBox.style.display = "none";
    } else {
        resultsContainer.innerHTML = "<p>No results found</p>";
        resultsContainer.style.visibility = "visible";
        resultsContainer.style.backgroundColor = "#0f0f0f";
        resultsContainer.style.color = "white";
        resultsContainer.style.fontFamily = "Lobster, sans-serif";
        resultsContainer.style.fontSize = "50px";
        resultsContainer.style.textAlign = "center";
        contentBox.style.display = "none";
    }
}

// Load CSS dynamically
function loadCSS(cssFile) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = cssFile;
    document.head.appendChild(link);
}

// Event listener for search input
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") { // Trigger search on Enter key press
        const query = searchInput.value.trim();
        if (query) {
            renderResults(query); // Render results
        } else {
            resultsContainer.innerHTML = ""; // Clear results if query is empty
            contentBox.style.display = "flex"; // Show main content box
        }
    }
});

// Initial fetching of items
fetchItems().then(() => {
    console.log("Items ready for search.");
});

// Navigation controls
function openNav() {
    document.getElementById("myNav").style.width = "75%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
