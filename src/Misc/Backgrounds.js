let colors = ["green", "blue", "indigo", "purple", "pink"];

let colorNumbers = [500, 600, 700, 800, 900];

export default createColorArray();

function createColorArray() {
  let results = [];

  colors.forEach(color => {
    colorNumbers.forEach(number => {
      results.push(`bg-${color}-${number}`);
    });
  });

  return results;
}
