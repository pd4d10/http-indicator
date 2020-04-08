const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Icons: https://ionicons.com/
const flash = fs.readFileSync(path.join(__dirname, "flash.svg"), "utf8");
const flashOutline = fs.readFileSync(
  path.join(__dirname, "flash-outline.svg"),
  "utf8"
);

const i38 = flash
  .replace("width='512' height='512'", "width='38' height='38'")
  .replace("viewBox='0 0 512 512'", "viewBox='-32 -32 576 576'");

// Colors: https://material.io/resources/color/#!/?view.left=0&view.right=0
[
  ["h1", "#bdbdbd"],
  ["h2", "#304ffe"],
  ["hq", "#d50000"],
].forEach(([name, color]) => {
  fs.writeFileSync(
    path.join(__dirname, "../icons", `${name}.svg`),
    i38.replace("<path", `<path fill="${color}"`)
  );
  execSync(`rm -rf ${name}.png && svg2png ${name}.svg`, {
    cwd: path.join(__dirname, "../icons"),
  });
});
