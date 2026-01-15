const navbarToggle = document.querySelector('.navbar-toggle')
const navbarMenu = document.querySelector('.navbar-menu')

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

// table section

const table = document.getElementById("leagueTable");
const tbody = table.tBodies[0];

// Calculate points (W*3 + D)
function calculatePoints() {
  [...tbody.rows].forEach(row => {
    const wins = +row.cells[3].innerText;
    const draws = +row.cells[4].innerText;
    row.querySelector(".pts").innerText = (wins * 3) + draws;
  });
}

// Sort table
function sortTable(col) {
  const rows = [...tbody.rows];
  const asc = table.dataset.sort !== "asc";

  rows.sort((a, b) => {
    const A = Number(a.cells[col].innerText);
    const B = Number(b.cells[col].innerText);
    return asc ? B - A : A - B;
  });

  rows.forEach(row => tbody.appendChild(row));
  table.dataset.sort = asc ? "asc" : "desc";

  updatePositions();
  applyZones();
}

// Update position numbers
function updatePositions() {
  [...tbody.rows].forEach((row, index) => {
    row.cells[0].innerText = index + 1;
  });
}

// Apply champion & relegation zones
function applyZones() {
  [...tbody.rows].forEach((row, index) => {
    row.classList.remove("champion", "relegation");

    if (index === 0) {
      row.classList.add("champion"); // Top 1
    }

    if (index >= tbody.rows.length - 4) {
      row.classList.add("relegation"); // Bottom 4
    }
  });
}

// Initial load
calculatePoints();
sortTable(9); // Sort by points
applyZones();