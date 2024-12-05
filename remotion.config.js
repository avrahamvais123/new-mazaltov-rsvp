import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind";

Config.overrideWebpackConfig((currentConfiguration) => {
  console.log("Current Webpack Configuration:", currentConfiguration);
  const updatedConfig = enableTailwind(currentConfiguration);
  console.log("Updated Webpack Configuration:", updatedConfig);
  return updatedConfig;
});
