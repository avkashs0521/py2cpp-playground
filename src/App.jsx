import React, { useState, useEffect } from 'react';
import { transpile } from '@avkashhhh/py2cpp';
import { Copy, Check, Play, Code2, Sparkles } from 'lucide-react';

const PRESETS = {
  factorial: `# Recursive Factorial calculation
def factorial(n: int) -> int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)

total = factorial(6)
print("Factorial of 6 is:", total)
`,
  fibonacci: `# Fibonacci generator with loops
n = 10
a = 0
b = 1
print("Fibonacci sequence:")
for i in range(n):
    print(a)
    temp = a + b
    a = b
    b = temp
`,
  vectors: `# Array operations and accumulation
numbers = [10, 20, 30, 40, 50]
numbers.append(60)

total = 0
for val in numbers:
    if val > 25:
        total += val

print("Sum of elements > 25 is:", total)
`,
  math: `# Math computations using std::cmath
import math

radius = 7.5
area = math.pi * radius ** 2
hypot = math.sqrt(3.0 ** 2 + 4.0 ** 2)

print("Circle area:", area)
print("Hypotenuse:", hypot)
`,
};

export default function App() {
  const [selectedPreset, setSelectedPreset] = useState('factorial');
  const [pythonCode, setPythonCode] = useState(PRESETS.factorial);
  const [cppCode, setCppCode] = useState('');
  const [wrapInMain, setWrapInMain] = useState(true);
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [useNamespaceStd, setUseNamespaceStd] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const handleTranspile = () => {
    try {
      setError(null);
      const result = transpile(pythonCode, {
        wrapInMain,
        includeHeaders,
        useNamespaceStd,
        indent: 4,
      });
      setCppCode(result);
    } catch (err) {
      setError(err.message);
      setCppCode(`// Transpilation Error:\n// ${err.message}`);
    }
  };

  useEffect(() => {
    handleTranspile();
  }, [pythonCode, wrapInMain, includeHeaders, useNamespaceStd]);

  const handlePresetChange = (e) => {
    const key = e.target.value;
    setSelectedPreset(key);
    if (PRESETS[key]) {
      setPythonCode(PRESETS[key]);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cppCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <>
      <header>
        <div className="brand">
          <Code2 size={28} color="#38bdf8" />
          <h1>Py2Cpp Playground</h1>
          <span className="badge">v1.0.0</span>
        </div>
        <div>
          <a
            href="https://www.npmjs.com/package/@avkashhhh/py2cpp"
            target="_blank"
            rel="noopener noreferrer"
            className="action-btn secondary"
          >
            <Sparkles size={16} /> View on npm
          </a>
        </div>
      </header>

      <main className="playground-container">
        <div className="controls-bar">
          <div className="preset-group">
            <label htmlFor="presets"><strong>Example Presets:</strong></label>
            <select id="presets" value={selectedPreset} onChange={handlePresetChange}>
              <option value="factorial">Recursion & Factorial</option>
              <option value="fibonacci">Loops & Fibonacci</option>
              <option value="vectors">std::vector & Filters</option>
              <option value="math">math & Power</option>
            </select>
          </div>

          <div className="toggle-group">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={wrapInMain}
                onChange={(e) => setWrapInMain(e.target.checked)}
              />
              Wrap in <code>main()</code>
            </label>

            <label className="toggle-label">
              <input
                type="checkbox"
                checked={includeHeaders}
                onChange={(e) => setIncludeHeaders(e.target.checked)}
              />
              Include Headers
            </label>

            <label className="toggle-label">
              <input
                type="checkbox"
                checked={useNamespaceStd}
                onChange={(e) => setUseNamespaceStd(e.target.checked)}
              />
              <code>using namespace std;</code>
            </label>
          </div>
        </div>

        <div className="editor-grid">
          <div className="editor-panel">
            <div className="panel-header">
              <span>Python Source</span>
              <button className="action-btn" onClick={handleTranspile}>
                <Play size={14} /> Transpile
              </button>
            </div>
            <textarea
              className="code-textarea"
              value={pythonCode}
              onChange={(e) => setPythonCode(e.target.value)}
              placeholder="Type or paste Python code here..."
              spellCheck="false"
            />
          </div>

          <div className="editor-panel">
            <div className="panel-header">
              <span>Generated C++ (C++17/20)</span>
              <button className="action-btn secondary" onClick={handleCopy}>
                {copied ? <Check size={14} color="#3fb950" /> : <Copy size={14} />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <pre className="code-output">{cppCode}</pre>
          </div>
        </div>
      </main>

      <footer>
        Powered by{' '}
        <a href="https://www.npmjs.com/package/@avkashhhh/py2cpp" target="_blank" rel="noopener noreferrer">
          @avkashhhh/py2cpp
        </a>{' '}
        — Developed by <a href="https://github.com/avkashs0521" target="_blank" rel="noopener noreferrer">Avkash Singh</a>.
      </footer>
    </>
  );
}
