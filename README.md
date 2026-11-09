# Py2Cpp Playground

A modern, interactive web-based playground for transpiling Python code directly into clean, modern C++17/20 in the browser.

---

## Built with [@avkashhhh/py2cpp](https://www.npmjs.com/package/@avkashhhh/py2cpp)

This application is powered by [`@avkashhhh/py2cpp`](https://www.npmjs.com/package/@avkashhhh/py2cpp), a tiny, zero-dependency Python to modern C++ transpiler and code generator.

### Features
- **Instant Transpilation**: Converts Python variables, types, loops, math, and functions into equivalent C++.
- **Interactive Controls**:
  - Toggle `wrapInMain` for full compilable files or raw snippets.
  - Toggle `includeHeaders` to automatically detect and include standard libraries (`<iostream>`, `<vector>`, `<cmath>`, etc.).
  - Toggle `using namespace std;` formatting.
- **Preloaded Algorithms**: Factorial, Fibonacci generator, vector operations, and math formulas.
- **Zero-Dependency Core**: Compiles directly in modern client-side JavaScript without requiring a backend compiler.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## License

[MIT](LICENSE) © [Avkash Singh](https://github.com/avkashs0521)

