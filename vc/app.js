(function() {
  let currentTab = "stats";
  let currentFilter = "all";
  const app = document.getElementById("app");

  function esc(str) {
    const d = document.createElement("div");
    d.textContent = str;
    return d.innerHTML;
  }

  function evoIconHTML(key) {
    if (key && EVO_ICONS[key]) {
      return `<img src="${EVO_ICONS[key]}" alt="${esc(key)}" class="evo-sprite">`;
    }
    return `<div class="evo-qm">?</div>`;
  }

  function renderStatsTab() {
    const filtered = currentFilter === "all" ? STATS : STATS.filter(s => s.category === currentFilter);
    return `
      <div class="filters">
        ${Object.entries(CATEGORIES).map(([key, {label, color}]) => `
          <button class="filter-btn ${currentFilter===key?'active':''}"
            style="--cat-color:${color}" data-filter="${key}">${label}</button>
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
            <div class="stat-card" style="--cat-color:${cat.color}">
              <div class="icon-box"><img src="${stat.icon}" alt="${esc(stat.name)}"></div>
              <div class="stat-content">
                <div class="stat-header">
                  <span class="stat-name">${esc(stat.name)}</span>
                  <span class="stat-tag ${stat.temp?'temp':'perm'}">${stat.temp?'TEMP':'PERM'}</span>
                </div>
                <p class="stat-desc">${esc(stat.desc)}</p>
              </div>
            </div>`;
        }).join("")}
      </div>`;
  }

  function renderEvosTab() {
    return `
      <div class="evos-info">
        17 recipes · Base Card + Item Card at an Evolution Statue ·
        <span style="color:#e070a0">UNION</span> consumes all cards
      </div>
      <div class="evos-list">
        ${EVOLUTIONS.map(e => {
          const color = e.type === "union" ? "#c04060" : "#c8a050";
          const resultColor = e.type === "union" ? "#e070a0" : "#c8a050";
          return `
            <div class="evo-row" style="--evo-color:${color}">
              <div class="evo-recipe">
                <div class="evo-slot">
                  ${evoIconHTML(e.base_icon)}
                  ${e.extra_icon ? `<span class="evo-plus">+</span>${evoIconHTML(e.extra_icon)}` : ""}
                  <span class="evo-label">${esc(e.base)}</span>
                </div>
                <span class="evo-plus">+</span>
                <div class="evo-slot">
                  ${evoIconHTML(e.item_icon)}
                  <span class="evo-label">${esc(e.item)}</span>
                </div>
                <span class="evo-arrow">→</span>
                <div class="evo-slot">
                  ${evoIconHTML(e.result_icon)}
                  <span class="evo-result" style="color:${resultColor}">${esc(e.result)}</span>
                </div>
                ${e.type==="union" ? '<span class="evo-tag-union">UNION</span>' : ""}
              </div>
              ${e.alt ? `<div class="evo-alt">Also: ${esc(e.alt)}</div>` : ""}
              <p class="evo-desc">${esc(e.desc)}</p>
            </div>`;
        }).join("")}
      </div>`;
  }

  function render() {
    app.innerHTML = `
      <div class="header">
        <div class="header-box">
          <div class="title">VAMPIRE CRAWLERS</div>
          <div class="subtitle">REFERENCE</div>
        </div>
      </div>
      <div class="tabs">
        <button class="tab-btn ${currentTab==='stats'?'active':''}" data-tab="stats">STATS</button>
        <button class="tab-btn ${currentTab==='evos'?'active':''}" data-tab="evos">EVOLUTIONS</button>
      </div>
      ${currentTab === "stats" ? renderStatsTab() : renderEvosTab()}
      <div class="footer">Icons from in-game screenshots</div>`;

    app.querySelectorAll(".tab-btn").forEach(b => b.addEventListener("click", () => { currentTab = b.dataset.tab; render(); }));
    app.querySelectorAll(".filter-btn").forEach(b => b.addEventListener("click", () => { currentFilter = b.dataset.filter; render(); }));
  }

  render();
})();
