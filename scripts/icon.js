// @ts-check
import { readFileSync, writeFileSync, unlinkSync, copyFileSync } from "fs";
import { execSync } from "child_process";
import { chdir } from "process";

// Icons: https://ionicons.com/
const icon = readFileSync("scripts/flash-sharp.svg", "utf8");

chdir("assets");

// Colors: https://material.io/resources/color/#!/?view.left=0&view.right=0
[
  ["h1", "#bdbdbd", , 38],
  ["h2", "#304ffe", , 38],
  ["hq", "#d50000", , 38],
  ["h3", "#ff6d00", , 38],
  ["spdy", "#009515", , 38],
  ["icon", "#ff6d00", , 128, true],
  ["default", , "#bdbdbd", 38, true],
].forEach(([name, fill, stroke, size, copyToPublic]) => {
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

  writeFileSync(`${name}.svg`, mIcon);
  execSync(`resvg --width ${size} --height ${size} ${name}.svg ${name}.png`, {
    stdio: "inherit",
  });

  if (copyToPublic) {
    copyFileSync(`${name}.png`, `../public/${name}.png`);
  }
  unlinkSync(`${name}.svg`);
});
