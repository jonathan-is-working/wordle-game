# Contributing to Wordle

Thank you for your interest in contributing to Wordle! We welcome contributions, bug fixes, and improvements from everyone.

---

## 🛠️ Verification Commands

Before submitting a pull request, ensure all local checks pass without warnings or errors:

```bash
# 1. Typecheck the codebase
pnpm run typecheck

# 2. Run the linter
pnpm run lint

# 3. Verify production build
pnpm run build
```

---

## 🧭 Core Design Principles

When contributing code, please adhere to these core architectural guidelines:

1. **Zero Secrets**: Never commit API keys, personal tokens, credentials, or sensitive data.
2. **Performance & Determinism**: Keep the client bundle minimal, animations smooth (60 FPS), and game state evaluations deterministic.
3. **Accessibility**: Ensure keyboard navigation and screen-reader accessibility remain functional across desktop and mobile devices.
4. **Code Quality**: Write clean, modern TypeScript with proper types (avoid `any`), idiomatic React 19 patterns, and Tailwind CSS v4 styling.

---

## 🚀 Submitting a Pull Request

1. **Fork** the repository and clone your fork locally.
2. **Create a branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/my-new-feature
   ```
3. **Make your changes** and verify them with `pnpm run typecheck && pnpm run lint && pnpm run build`.
4. **Commit** with descriptive, conventional commit messages.
5. **Push** your branch to GitHub and open a Pull Request against the `main` branch.

---

## 📄 Contribution Agreement

By contributing, you agree that your contributions are licensed under the project's terms (MIT OR Apache-2.0).
