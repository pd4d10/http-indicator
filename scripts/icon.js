// @ts-check
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Icons: https://ionicons.com/
const icon = fs.readFileSync(path.join(__dirname, "flash-sharp.svg"), "utf8");

// Colors: https://material.io/resources/color/#!/?view.left=0&view.right=0
[
  ["h1", "#bdbdbd", , 38],
  ["h2", "#304ffe", , 38],
  ["hq", "#d50000", , 38],
  ["h3", "#ff6d00", , 38],
  ["spdy", "#009515", , 38],
  ["icon", "#ff6d00", , 128],
  ["default", , "#bdbdbd", 38],
].forEach(([name, fill, stroke, size]) => {
  let mIcon = icon.replace(
    "width='512' height='512'",
    `width='${size}' height='${size}'`
  );
  if (fill) {
    mIcon = mIcon.replace("<path", `<path fill="${fill}"`);
  }
  if (stroke) {
    mIcon = mIcon.replace(
      "<path",
      `<path stroke="${stroke}" stroke-width="16" fill="none"`
    );
  }

  fs.writeFileSync(path.join(__dirname, "../icons", `${name}.svg`), mIcon);

  execSync(`rm -rf ${name}.png && svg2png ${name}.svg`, {
    cwd: path.join(__dirname, "../icons"),
  });
});
