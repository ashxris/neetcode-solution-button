// Adds a "Neetcode solution" button next to the "Submissions" tab on LeetCode problem pages.
// NEETCODE_SOLUTIONS (slug -> URL) comes from solutions.js, loaded just before this file.

(() => {
  'use strict';

  const BTN_ID = 'neetcode-solution-btn';
  const LABEL = 'Neetcode solution';
  const FALLBACK_DELAY_MS = 5000; // how long to wait for the tab bar before using a floating button
  const DEBOUNCE_MS = 100;

  let fallbackTimer = null;
  let syncTimer = null;
  let lastHref = location.href;

  // ---- helpers -------------------------------------------------------------

  function getSlug() {
    const m = location.pathname.match(/^\/problems\/([^/]+)/);
    return m ? m[1].toLowerCase() : null;
  }

  const isLeaf = (el, text) => el.childElementCount === 0 && el.textContent.trim() === text;

  function containsLeaf(root, text) {
    for (const el of root.querySelectorAll('*')) if (isLeaf(el, text)) return true;
    return false;
  }

  // Returns the element the button should be placed right after (the "Submissions" tab), or null.
  function findSubmissionsTab() {
    // 1) LeetCode's layout library renders each tab as .flexlayout__tab_button
    for (const tab of document.querySelectorAll('.flexlayout__tab_button')) {
      if (tab.textContent.trim() === 'Submissions') return tab;
    }

    // 2) Class-name-independent fallback: find the "Submissions" label, then walk up until the
    //    parent also holds the "Description" and "Solutions" labels -> that child is the tab.
    for (const leaf of document.querySelectorAll('div, span, a, button')) {
      if (!isLeaf(leaf, 'Submissions')) continue;
      let node = leaf;
      while (node.parentElement && node.parentElement !== document.body) {
        const parent = node.parentElement;
        if (containsLeaf(parent, 'Description') && containsLeaf(parent, 'Solutions')) return node;
        node = parent;
      }
    }
    return null;
  }

  function createButton() {
    const a = document.createElement('a');
    a.id = BTN_ID;
    a.textContent = LABEL;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.title = 'Open the NeetCode solution in a new tab';
    // Keep LeetCode's own tab/drag handlers from swallowing the click.
    for (const type of ['pointerdown', 'mousedown', 'click']) {
      a.addEventListener(type, (e) => e.stopPropagation());
    }
    return a;
  }

  function clearFallbackTimer() {
    if (fallbackTimer) {
      clearTimeout(fallbackTimer);
      fallbackTimer = null;
    }
  }

  // ---- main sync -----------------------------------------------------------

  function sync() {
    lastHref = location.href;
    const slug = getSlug();
    const url = slug && Object.prototype.hasOwnProperty.call(NEETCODE_SOLUTIONS, slug)
      ? NEETCODE_SOLUTIONS[slug]
      : null;
    let btn = document.getElementById(BTN_ID);

    // Not a problem we have a solution for: make sure no button is shown.
    if (!url) {
      clearFallbackTimer();
      if (btn) btn.remove();
      return;
    }

    if (!btn) btn = createButton();
    if (btn.href !== url) btn.href = url;
    btn.dataset.slug = slug;

    const tab = findSubmissionsTab();
    if (tab) {
      clearFallbackTimer();
      if (btn.previousElementSibling !== tab) {
        btn.classList.remove('ncsb-floating');
        tab.after(btn);
      }
      return;
    }

    // Tab bar not (yet) in the DOM. Give it a few seconds, then show a floating button instead.
    if (!btn.isConnected && !fallbackTimer) {
      fallbackTimer = setTimeout(() => {
        fallbackTimer = null;
        const b = document.getElementById(BTN_ID) || btn;
        if (!b.isConnected && getSlug() === slug) {
          b.classList.add('ncsb-floating');
          document.body.appendChild(b);
        }
      }, FALLBACK_DELAY_MS);
    }
  }

  function scheduleSync() {
    clearTimeout(syncTimer);
    syncTimer = setTimeout(sync, DEBOUNCE_MS);
  }

  // ---- wiring --------------------------------------------------------------

  // LeetCode is an SPA: re-check whenever the DOM changes (covers React re-renders and
  // navigation between problems) ...
  new MutationObserver(scheduleSync).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
  window.addEventListener('popstate', scheduleSync);
  // ... and, as a safety net, whenever the URL changes without a DOM change.
  setInterval(() => {
    if (location.href !== lastHref) scheduleSync();
  }, 500);

  sync();
})();
