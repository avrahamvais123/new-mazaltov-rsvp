import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// הגדרת __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

const compositionId = "MyVideo";

const bundleLocation = await bundle({
  entryPoint: path.resolve(__dirname, "../app/components/Main.jsx"), // נתיב מלא
  // הוספת התאמה אישית ל-Webpack
  webpackOverride: (config) => {
    // הוספת alias לנתיבים שלך
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "../"), // עדכון קיצור הנתיב @
    };
    return config;
  },
});

const inputProps = { foo: "bar" };

const composition = await selectComposition({
  serveUrl: bundleLocation,
  id: compositionId,
  inputProps,
});

await renderMedia({
  composition,
  serveUrl: bundleLocation,
  codec: "h264",
  outputLocation: `out/${compositionId}.mp4`,
  inputProps,
});

console.log("Render done!");
