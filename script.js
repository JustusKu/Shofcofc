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



let currentTab = "goals";

const players = [
  { name: "Glen Juma", goals: 3, assists: 0, yellow: 0, red: 0, img: "https://via.placeholder.com/50" },
  { name: "Wilfred Oganda", goals: 2, assists: 0, yellow: 0, red: 0, img: "https://via.placeholder.com/50" },
  { name: "Apollo Ambani", goals: 2, assists: 0, yellow: 0, red: 0, img: "https://via.placeholder.com/50" },
  { name: "Michael Lugalia", goals: 2, assists: 0, yellow: 0, red: 0, img: "https://via.placeholder.com/50" },
  { name: "Yusuf Adebowale", goals: 1, assists: 0, yellow: 0, red: 0, img: "https://via.placeholder.com/50" },
  { name: "Felix Kisanya", goals: 1, assists: 1, yellow: 0, red: 0, img: "https://via.placeholder.com/50" },
  { name: "Brayan Obare", goals: 1, assists: 0, yellow: 0, red: 0, img: "https://via.placeholder.com/50" },
  { name: "John Bulimo", goals: 1, assists: 1, yellow: 0, red: 0, img: "https://via.placeholder.com/50" },
  { name: "Charles Mbaga", goals: 1, assists: 0, yellow: 0, red: 0, img: "https://via.placeholder.com/50" },
  { name: "Moses Waweru", goals: 1, assists: 2, yellow: 0, red: 0, img: "https://via.placeholder.com/50" }
];

const tableBody = document.getElementById("table-body");
const statTitle = document.getElementById("stat-title");

function renderTable() {
  const titles = {
    goals: "Goals ⚽",
    assists: "Assists 🎯",
    yellow: "Yellow Cards 🟨",
    red: "Red Cards 🟥"
  };

  statTitle.textContent = titles[currentTab];

  players.sort((a, b) => b[currentTab] - a[currentTab]);

  tableBody.innerHTML = "";

  players.forEach((player, index) => {
    tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>
          <div class="player">
            <img src="${player.img}" alt="${player.name}">
            <span>${player.name}</span>
          </div>
        </td>
        <td class="editable" contenteditable data-name="${player.name}">
          ${player[currentTab]}
        </td>
      </tr>
    `;
  });
}

function switchTab(tab, btn) {
  currentTab = tab;
  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  renderTable();
}

/* Auto-update when editing */
tableBody.addEventListener("input", (e) => {
  if (!e.target.classList.contains("editable")) return;

  const name = e.target.dataset.name;
  const value = Number(e.target.innerText) || 0;

  const player = players.find(p => p.name === name);
  if (player) {
    player[currentTab] = value;
    renderTable();
  }
});

/* Initial load */
renderTable();