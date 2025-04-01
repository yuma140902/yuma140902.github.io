import { add } from '.';

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) {
  throw new Error('element #app not found');
}
app.innerHTML = `
  <div>
    <h1>Vite + TypeScript</h1>
    <div>
      <input id="a" type="number" />
      <input id="b" type="number" />
      <button id="run" type="button">Run</button>
      <span id="output"></span>
    </div>
  </div>
`;

const inputA = document.querySelector<HTMLInputElement>('#a');
const inputB = document.querySelector<HTMLInputElement>('#b');
const run = document.querySelector<HTMLButtonElement>('#run');
const output = document.querySelector<HTMLSpanElement>('#output');
if (!inputA) {
  throw new Error('element #a not found');
}
if (!inputB) {
  throw new Error('element #b not found');
}
if (!run) {
  throw new Error('element #run not found');
}
if (!output) {
  throw new Error('element #output not found');
}

const setupAdd = (
  inputA: HTMLInputElement,
  inputB: HTMLInputElement,
  run: HTMLButtonElement,
  output: HTMLSpanElement,
) => {
  inputA.valueAsNumber = 1;
  inputB.valueAsNumber = 1;
  run.addEventListener('click', () => {
    const a = inputA.valueAsNumber;
    const b = inputB.valueAsNumber;
    output.textContent = `add(${a}, ${b}) → ${add(a, b)}`.toString();
  });
};

setupAdd(inputA, inputB, run, output);
