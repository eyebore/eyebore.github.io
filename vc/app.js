(function() {
  let currentFilter = "all";
  const app = document.getElementById("app");

  function render() {
    const filtered = currentFilter === "all"
      ? STATS
      : STATS.filter(s => s.category === currentFilter);

    app.innerHTML = `
      <div class="header">
        <div class="header-box">
          <div class="title">VAMPIRE CRAWLERS</div>
          <div class="subtitle">STATS REFERENCE</div>
        </div>
      </div>

      <div class="filters">
        ${Object.entries(CATEGORIES).map(([key, { label, color }]) => `
          <button
            class="filter-btn ${currentFilter === key ? 'active' : ''}"
            style="--cat-color: ${color}"
            data-filter="${key}"
          >${label}</button>
        `).join("")}
      </div>

      <div class="legend">
        <span class="perm">◆ PERM = lasts the run</span>
        <span class="temp">◆ TEMP = resets after battle</span>
      </div>

      <div class="grid">
        ${filtered.map(stat => {
          const cat = CATEGORIES[stat.category];
          return `
            <div class="stat-card" style="--cat-color: ${cat.color}">
              <div class="icon-box">
                <img src="${stat.icon}" alt="${stat.name}">
              </div>
              <div class="stat-content">
                <div class="stat-header">
                  <span class="stat-name">${stat.name}</span>
                  <span class="stat-tag ${stat.temp ? 'temp' : 'perm'}">${stat.temp ? 'TEMP' : 'PERM'}</span>
                </div>
                <p class="stat-desc">${stat.desc}</p>
              </div>
            </div>
          `;
        }).join("")}
      </div>

      <div class="footer">Icons from in-game screenshot</div>
    `;

    // Attach filter button listeners
    app.querySelectorAll(".filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        render();
      });
    });
  }

  render();
})();
