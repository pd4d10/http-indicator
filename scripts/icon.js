// @ts-check
import { readFileSync, writeFileSync, unlinkSync } from "fs";
import { execSync } from "child_process";

// Icons: https://ionicons.com/
const icon = readFileSync("scripts/flash-sharp.svg", "utf8");

// Colors: https://material.io/resources/color/#!/?view.left=0&view.right=0
[
  ["src/images/h1", "#bdbdbd", , 38],
  ["src/images/h2", "#304ffe", , 38],
  ["src/images/hq", "#d50000", , 38],
  ["src/images/h3", "#ff6d00", , 38],
  ["src/images/spdy", "#009515", , 38],
  ["public/icon", "#ff6d00", , 128],
  ["public/default", , "#bdbdbd", 38],
].forEach(([fullPath, fill, stroke, size]) => {
  let mIcon = icon;
  if (fill) {
    mIcon = mIcon.replace("<path", `<path fill="${fill}"`);
  }
  if (stroke) {
    mIcon = mIcon.replace(
      "<path",
      `<path stroke="${stroke}" stroke-width="16" fill="none"`,
    );
  }

  unlinkSync(`${fullPath}.png`);
  writeFileSync(`${fullPath}.svg`, mIcon);
  execSync(
    `resvg --width ${size} --height ${size} ${fullPath}.svg ${fullPath}.png`,
    { stdio: "inherit" },
  );
  unlinkSync(`${fullPath}.svg`);
});
