# NeetCode Solution Button for LeetCode

A small Chrome extension that adds a **"Neetcode solution"** button to LeetCode problem pages. Click it and the matching [NeetCode](https://neetcode.io) solution opens in a new tab. No searching, no copy-pasting the problem name.

## Features

- **One click to the solution.** The button sits right after the **Submissions** tab, in the same place on every problem.
- **973 problems covered.** Every problem in NeetCode's full list (Blind 75, NeetCode 150, NeetCode 250 and more). The button only appears on problems that have a NeetCode solution.
- **Works with LeetCode's single-page navigation.** Moving between problems, or switching between the Description / Editorial / Solutions / Submissions tabs, keeps the button in place with the correct link.
- **Private and lightweight.** No permissions, no tracking, no network requests, no accounts. It only runs on `leetcode.com`.
- **No build step.** Plain JavaScript and CSS, with zero dependencies.

## Installation

The extension isn't on the Chrome Web Store yet, so install it from source (takes about a minute):

1. Download this repository: click **Code → Download ZIP** on GitHub and unzip it, or run:
   ```bash
   git clone https://github.com/ashxris/neetcode-solution-button.git
   ```
2. Open `chrome://extensions` in Chrome (or Edge, Brave, Arc, or any Chromium browser).
3. Turn on **Developer mode** (top right).
4. Click **Load unpacked** and select the project folder, the one that contains `manifest.json`.
5. Open any problem, for example [Two Sum](https://leetcode.com/problems/two-sum/). The **Neetcode solution** button appears next to the **Submissions** tab.

To update later, pull or download the latest version, then click the reload icon on the extension's card in `chrome://extensions` and refresh LeetCode.

## How it works

LeetCode is a single-page app, so the page doesn't reload when you move between problems. The extension handles that like this:

1. `content.js` runs on `leetcode.com` pages and reads the problem slug from the URL (`/problems/<slug>/...`).
2. It looks the slug up in `solutions.js`, which maps each LeetCode slug to a NeetCode solution URL.
3. If the problem is in the list, it inserts a link right after the **Submissions** tab. If not, it shows nothing.
4. A `MutationObserver` re-checks whenever the page changes, so the button follows you from problem to problem and comes back if LeetCode re-renders the tab bar.

If LeetCode changes its page layout and the tab bar can't be found, the extension looks for the "Submissions" label by its text. If that also fails after about 5 seconds, it shows the button floating in the bottom-right corner instead. If you ever see that floating button, please [open an issue](https://github.com/ashxris/neetcode-solution-button/issues/new): it means a selector needs updating.

## Project structure

```
.
├── manifest.json   # Extension config (Manifest V3, no permissions)
├── content.js      # Finds the tab bar, injects and updates the button
├── solutions.js    # LeetCode slug -> NeetCode URL map
├── styles.css      # Button styling
├── icons/          # Extension icons (16, 32, 48, 128 px)
├── README.md
├── CONTRIBUTING.md
└── LICENSE
```

## Customizing

**Colors:** edit the two CSS variables at the top of `styles.css` (`--ncsb-text` and `--ncsb-border`).

**Adding or fixing a problem:** each entry in `solutions.js` is one line:

```js
"two-sum": "https://neetcode.io/solutions/two-sum",
```

The key is the part of the LeetCode URL after `/problems/`. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full steps.

## Known limitations

- Only `leetcode.com/problems/<slug>/` pages are supported. Contest pages (`/contest/.../problems/...`) are not.
- LeetCode Premium problems get the button too, but NeetCode may require a NeetCode Pro account to open some of those solutions.
- The problem list is a snapshot. Problems NeetCode adds later won't appear until `solutions.js` is updated. Pull requests are welcome.

## Roadmap ideas

Good places to start if you'd like to contribute:

- [ ] Automated tests for the button placement logic
- [ ] A script that regenerates `solutions.js` from NeetCode's problem list
- [ ] Firefox support
- [ ] A popup or options page, for example to turn the button off or change its color
- [ ] Publish to the Chrome Web Store

## Contributing

Contributions of all sizes are welcome, including typo fixes, new problem links and bug reports. Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## Disclaimer

This is an independent, community project. It is **not affiliated with, endorsed by, or sponsored by LeetCode or NeetCode**. It only adds a link to publicly available NeetCode pages and does not copy or redistribute any of their content. All trademarks belong to their respective owners.

## License

Released under the [MIT License](LICENSE).

Maintained by [@ashxris](https://github.com/ashxris).
