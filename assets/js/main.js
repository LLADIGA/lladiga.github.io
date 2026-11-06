(function () {
  "use strict";

  const data = window.LLADIGA_DATA || { games: {} };

  /* --------------------------------------------------------------------------
     1. Sticky Header & Mobile Navigation
     -------------------------------------------------------------------------- */
  const header = document.getElementById("site-header");
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const navLinksContainer = document.getElementById("nav-links");

  if (header) {
    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 12) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      },
      { passive: true }
    );
  }

  if (mobileBtn && navLinksContainer) {
    mobileBtn.addEventListener("click", () => {
      const isOpen = navLinksContainer.classList.toggle("open");
      mobileBtn.setAttribute("aria-expanded", String(isOpen));
    });
  }

  /* --------------------------------------------------------------------------
     2. Interactive Dialogue Game Sandbox (active on /research/)
     -------------------------------------------------------------------------- */
  const turnsListEl = document.getElementById("turns-list");
  if (turnsListEl) {
    const gameTabs = document.querySelectorAll(".game-tab");
    const contextBannerEl = document.getElementById("game-context-banner");
    const mTurnEl = document.getElementById("metric-turn");
    const mViolationsEl = document.getElementById("metric-violations");
    const mStatusEl = document.getElementById("metric-status");
    const mRewardEl = document.getElementById("metric-reward");
    const signalDescEl = document.getElementById("signal-desc");
    const compTagsEl = document.getElementById("competencies-tags");

    const btnStep = document.getElementById("btn-step-turn");
    const btnAuto = document.getElementById("btn-auto-play");
    const btnReset = document.getElementById("btn-reset-game");

    let activeGameKey = "taboo";
    let visibleTurnCount = 3;
    let autoTimer = null;

    function stopAutoPlay() {
      if (autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
      if (btnAuto) {
        btnAuto.textContent = "▶ Auto-Play";
      }
    }

    function escapeHtml(str) {
      const div = document.createElement("div");
      div.textContent = str;
      return div.innerHTML;
    }

    function renderGame() {
      const game = data.games[activeGameKey];
      if (!game) return;

      contextBannerEl.innerHTML = `
        <span><strong>${escapeHtml(game.family)}</strong></span>
        <span>${game.contextLeft} &nbsp;·&nbsp; ${game.contextRight}</span>
      `;

      turnsListEl.innerHTML = "";
      const count = Math.min(visibleTurnCount, game.turns.length);

      for (let i = 0; i < count; i++) {
        const t = game.turns[i];
        const bubble = document.createElement("div");
        bubble.className = `turn-bubble ${t.role}`;
        let inner = `
          <div class="turn-role">
            <span>${escapeHtml(t.speaker)}</span>
            <span>Turn ${escapeHtml(t.turnNum)}</span>
          </div>
          <div>${escapeHtml(t.text)}</div>
        `;
        if (t.pre) {
          inner += `<div class="turn-pre">${escapeHtml(t.pre)}</div>`;
        }
        bubble.innerHTML = inner;
        turnsListEl.appendChild(bubble);
      }

      const latest = game.turns[Math.max(0, count - 1)];
      if (latest) {
        mTurnEl.textContent = latest.turnNum;
        mViolationsEl.textContent = latest.violations;
        mStatusEl.textContent = latest.status;
        mRewardEl.textContent = latest.reward;
      }

      signalDescEl.textContent = game.learningSignal;
      compTagsEl.innerHTML = game.competencies
        .map((c) => `<span class="comp-tag">${escapeHtml(c)}</span>`)
        .join("");

      if (btnStep) {
        btnStep.disabled = count >= game.turns.length;
        btnStep.style.opacity = count >= game.turns.length ? "0.5" : "1";
      }
    }

    gameTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        stopAutoPlay();
        gameTabs.forEach((t) => {
          t.classList.remove("active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");
        activeGameKey = tab.getAttribute("data-game");
        const g = data.games[activeGameKey];
        visibleTurnCount = g ? g.turns.length : 3;
        renderGame();
      });
    });

    if (btnStep) {
      btnStep.addEventListener("click", () => {
        stopAutoPlay();
        const game = data.games[activeGameKey];
        if (!game) return;
        if (visibleTurnCount < game.turns.length) {
          visibleTurnCount += 1;
          renderGame();
        }
      });
    }

    if (btnReset) {
      btnReset.addEventListener("click", () => {
        stopAutoPlay();
        visibleTurnCount = 1;
        renderGame();
      });
    }

    if (btnAuto) {
      btnAuto.addEventListener("click", () => {
        if (autoTimer) {
          stopAutoPlay();
          return;
        }
        const game = data.games[activeGameKey];
        if (!game) return;
        if (visibleTurnCount >= game.turns.length) {
          visibleTurnCount = 1;
          renderGame();
        }
        btnAuto.textContent = "⏸ Pause";
        autoTimer = setInterval(() => {
          if (visibleTurnCount < game.turns.length) {
            visibleTurnCount += 1;
            renderGame();
          } else {
            stopAutoPlay();
          }
        }, 1150);
      });
    }

    if (data.games[activeGameKey]) {
      visibleTurnCount = data.games[activeGameKey].turns.length;
      renderGame();
    }
  }

  /* --------------------------------------------------------------------------
     3. Publication Filter & BibTeX Copy (active on /publications/)
     -------------------------------------------------------------------------- */
  const filterBtns = document.querySelectorAll(".filter-btn");
  const pubCards = document.querySelectorAll(".pub-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      pubCards.forEach((card) => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat === filter) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  document.querySelectorAll("[data-toggle-bib]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-toggle-bib");
      const drawer = document.getElementById(targetId);
      if (drawer) {
        const isOpen = drawer.classList.toggle("open");
        btn.setAttribute("aria-expanded", String(isOpen));
      }
    });
  });

  document.querySelectorAll("[data-copy-bib]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const preId = btn.getAttribute("data-copy-bib");
      const pre = document.getElementById(preId);
      if (!pre) return;
      try {
        await navigator.clipboard.writeText(pre.textContent.trim());
        const orig = btn.textContent;
        btn.textContent = "Copied ✓";
        setTimeout(() => {
          btn.textContent = orig;
        }, 1800);
      } catch (_) {
        btn.textContent = "Select & Copy";
      }
    });
  });
})();
