# Contributing

Thanks for wanting to help! This project is small and beginner-friendly, and every kind of contribution is welcome: fixing a typo, adding a missing problem link, reporting a bug, or improving the code.

If this is your first open-source contribution, you're in the right place. Nobody will mind if you ask questions.

## Ways to contribute

- **Report a bug**, for example the button is missing, in the wrong place, or opens the wrong page.
- **Fix or add a problem link** in `solutions.js`.
- **Improve the docs**, from a typo to a clearer explanation.
- **Pick up an issue.** Look for the [`good first issue`](https://github.com/ashxris/neetcode-solution-button/labels/good%20first%20issue) label.
- **Suggest an idea.** Open an issue to discuss it before you start building anything large.

## Reporting a bug

[Open an issue](https://github.com/ashxris/neetcode-solution-button/issues/new) and include:

1. **The LeetCode URL** where it happened, such as `https://leetcode.com/problems/two-sum/`.
2. **What you expected** and **what actually happened**. A screenshot helps a lot.
3. **Your browser and version**, and your operating system.
4. **Any errors in the console**: right-click the page → **Inspect** → **Console**.

Before filing, try reloading the extension at `chrome://extensions` and refreshing the LeetCode tab. That fixes most problems.

If you see a **floating button in the bottom-right corner** instead of one next to the Submissions tab, LeetCode has probably changed its layout and the selector in `content.js` needs updating. Please say so in your issue.

## Setting up for development

There is no build step and nothing to install: it's plain JavaScript.

1. **Fork** the repository: click the **Fork** button at the top right of [ashxris/neetcode-solution-button](https://github.com/ashxris/neetcode-solution-button).
2. **Clone** your fork, replacing `<your-username>` with your own GitHub username:
   ```bash
   git clone https://github.com/<your-username>/neetcode-solution-button.git
   cd neetcode-solution-button
   ```
3. **Load it in Chrome:** open `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and choose the project folder.
4. **Create a branch** for your change:
   ```bash
   git checkout -b fix/two-sum-link
   ```
5. **Make your change**, then click the reload icon on the extension's card in `chrome://extensions` and refresh the LeetCode tab to see it.

## Adding or fixing a problem link

All problem links live in `solutions.js`, one line per problem:

```js
"two-sum": "https://neetcode.io/solutions/two-sum",
```

- The **key** is the slug from the LeetCode URL, in lowercase: for `https://leetcode.com/problems/two-sum/` it is `two-sum`.
- The **value** is the full NeetCode solution URL.
- Keep **one entry per slug**. Don't add duplicates.
- Match the existing format: double quotes, a trailing comma on every line except the last.
- **Open the link yourself** before submitting to confirm it goes to the right solution.
- Only link to pages on `neetcode.io`. If a solution page doesn't exist, a link to NeetCode's own YouTube video for that problem is acceptable.

## Code guidelines

- **Keep it dependency-free.** Plain JavaScript and CSS, no frameworks, no build tools.
- **Keep permissions minimal.** This extension needs none, and changes that add permissions or host access need a very good reason.
- **No tracking, analytics, remote code, or network requests.** Pull requests that add these won't be accepted.
- **Keep the style consistent:** 2-space indentation, `'use strict'`, single quotes in JavaScript, and short comments that explain *why* rather than *what*.
- **Make selectors resilient.** LeetCode's class names change often, so prefer stable hooks (visible text, `flexlayout__*` classes) over auto-generated class names, and keep the fallbacks working.
- **Keep changes focused.** One fix or feature per pull request is much easier to review.

## Testing your change

There are no automated tests yet (adding some is a great first contribution!). Before opening a pull request, check these by hand:

- [ ] The button appears after the **Submissions** tab on a problem page.
- [ ] Clicking it opens the right NeetCode page **in a new tab**.
- [ ] Moving to another problem **without reloading** (use the next/previous arrows or the problem list) updates the link.
- [ ] Switching between **Description / Editorial / Solutions / Submissions** keeps the button.
- [ ] Problems that are **not** in `solutions.js` show no button.
- [ ] The browser console shows **no new errors**.

## Submitting a pull request

1. **Commit** your changes with a clear message:
   ```bash
   git add .
   git commit -m "Fix NeetCode link for two-sum"
   ```
   Short, present-tense messages work well: `Add button fallback for narrow panels`, `Fix typo in README`.
2. **Push** your branch:
   ```bash
   git push origin fix/two-sum-link
   ```
3. On GitHub, click **Compare & pull request** and fill in:
   - **What** you changed and **why**
   - **How** you tested it (a screenshot is welcome for visual changes)
   - The issue it fixes, if any, such as `Fixes #12`
4. The maintainer will review it and may ask for changes. That's normal and not a judgment on you. Push more commits to the same branch to update the pull request.

This is a volunteer project, so reviews may take a few days. Thanks for your patience!

## Be kind

Be respectful and constructive with everyone, in issues, pull requests and discussions. Assume good intent, be patient with beginners, and keep feedback about the code, not the person. Harassment or discrimination of any kind isn't tolerated, and the maintainer may remove comments or block people who break this rule.

## Questions?

Not sure where to start, or stuck on something? [Open an issue](https://github.com/ashxris/neetcode-solution-button/issues/new) and ask. No question is too basic.

## License

By contributing, you agree that your contributions will be licensed under the same license as this project (see [LICENSE](LICENSE)).
