const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Icons: https://ionicons.com/
const flash = fs.readFileSync(path.join(__dirname, "flash.svg"), "utf8");
const flashOutline = fs.readFileSync(
  path.join(__dirname, "flash-outline.svg"),
  "utf8"
);

const icon = flash.replace(
  "viewBox='0 0 512 512'",
  "viewBox='-32 -32 576 576'"
);

// Colors: https://material.io/resources/color/#!/?view.left=0&view.right=0
[
  ["h1", "#bdbdbd", 38],
  ["h2", "#304ffe", 38],
  ["hq", "#d50000", 38],
  ["h3", "#ff6d00", 38],
  ["icon", "#ff6d00", 128],
].forEach(([name, color, size]) => {
  fs.writeFileSync(
    path.join(__dirname, "../icons", `${name}.svg`),
    icon
      .replace("width='512' height='512'", `width='${size}' height='${size}'`)
      .replace("<path", `<path fill="${color}"`)
  );
  execSync(`rm -rf ${name}.png && svg2png ${name}.svg`, {
    cwd: path.join(__dirname, "../icons"),
  });
});
