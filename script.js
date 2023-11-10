import Rgb from "./rgb.js";
import Hex from "./hex.js";
import Hsl from "./Hsl.js";
const COLOR_MAP = {
  rgb: Rgb,
  hex: Hex,
  hsl: Hsl,
};

const DIFFICULTY_MAP = {
  easy: { withinTolerance: 1, outsideTolerance: 0.2 },
  medium: { withinTolerance: 0.5, outsideTolerance: 0.2 },
  hard: { withinTolerance: 0.3, outsideTolerance: 0.2 },
};
const nextButton = document.querySelector("[data-next-button]");
nextButton.addEventListener("click", render);

document.addEventListener("change", (e) => {
  if (e.target.matches('input[type="radio"]')) render();
});
const colorGrid = document.querySelector("[data-color-grid]");
const resultsElement = document.querySelector("[data-results]");
const resultsText = document.querySelector("[data-results-text]");
const colorStringElement = document.querySelector("[data-color-string]");

function render() {
  const format = document.querySelector('[name="format"]:checked').value;
  const difficulty = document.querySelector(
    '[name="difficulty"]:checked'
  ).value;
  const { colors, correctColor } = generateColors({ format, difficulty });

  colorGrid.innerHTML = " ";
  colorStringElement.textContent = correctColor.toCss();
  resultsElement.classList.add("hide");
  const colorElements = colors
    .sort(() => Math.random() - 0.5)
    .map((color) => {
      const element = document.createElement("button");
      element.style.backgroundColor = color.toCss();
      return { color, element };
    });
  colorElements.forEach(({ color, element }) => {
    element.addEventListener("click", () => {
      resultsElement.classList.remove("hide");
      resultsText.textContent = color === correctColor ? "Correct" : "Wrong";
      colorElements.forEach(({ color: c, element: e }) => {
        e.disabled = true;
        e.classList.toggle("wrong", c !== correctColor);
      });
    });
    colorGrid.append(element);
  });
}
render();

function generateColors({ format, difficulty }) {
  const colorClass = COLOR_MAP[format];
  const difficultyRules = DIFFICULTY_MAP[difficulty];
  const correctColor = colorClass.generate();
  const colors = [correctColor];
  for (let i = 0; i < 5; i++) {
    colors.push(correctColor.generateSimilar(difficultyRules));
  }
  return { colors, correctColor };
}
