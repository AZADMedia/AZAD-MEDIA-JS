// List of pages to search from
const pages = ["https://media-azad.blogspot.com/p/item-page-0-9_31.html", 
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
    "https://media-azad.blogspot.com/p/item-page-z.html"];

// Array to hold all items from all pages
const allItems = [];

// Get the results container and search input element
const resultsContainer = document.getElementById("results");
const searchInput = document.getElementById("search");
const contentBox = document.getElementById("content-box"); // Main content box

// Function to fetch and parse items from pages
async function fetchItems() {
for (const page of pages) {
try {
  const response = await fetch(page);
  const html = await response.text();

  // Create a temporary DOM element to parse the HTML content
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Extract items from the fetched page
  const items = tempDiv.querySelectorAll(".items");
  items.forEach((item) => {
      allItems.push(item.cloneNode(true).outerHTML); // Clone nodes to retain styles
      // Add the item HTML to allItems array
  });
} catch (error) {
  console.error(`Error fetching ${page}:`, error);
}
}
}

function renderResults(query) {
// Filter items based on the search query
const filteredItems = allItems.filter(item =>
item.toLowerCase().includes(query.toLowerCase())
);

if (filteredItems.length) {
resultsContainer.innerHTML = filteredItems.join(""); // Display the filtered items
resultsContainer.style.visibility = "visible"; // Show results
contentBox.style.display = "none"; // Hide the main content box
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
function loadCSS(cssFile) {
const link = document.createElement("link");
link.rel = "stylesheet";
link.href = cssFile;
document.head.appendChild(link);
}

// Example usage:
loadCSS("path-to-your-stylesheet.css");

// Event listener for the Enter key in the search input field
searchInput.addEventListener("keydown", function (event) {
if (event.key === "Enter") {
const query = searchInput.value.trim(); // Get the search query
if (query) {
  renderResults(query); // Render filtered results
} else {
  resultsContainer.innerHTML = ""; // Clear results if search is empty
  contentBox.style.display = "flex"; // Show the main content box
}
}
});

// Initial fetching of items
fetchItems();
function openNav() {
document.getElementById("myNav").style.width = "75%";
}

function closeNav() {
document.getElementById("myNav").style.width = "0%";
}