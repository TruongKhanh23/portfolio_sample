import urlHostToConfigsMap from "./urlHostToConfigsMap.js";

function decideHostFromUrl(location) {
  const urlHost = location?.host;
  const urlParams = new URLSearchParams(location?.search);

  // Let's say we have URL like this: https://www.some-app.com?hostOverride=some-other-app.com
  // Then we return host based on ?hostOverride: some-other-app.com
  if (urlParams.get?.("hostOverride")) return urlParams.get?.("hostOverride");

  // But if we have URL like this: https://www.some-app.com we return: www.some-app.com
  return urlHost;
}

async function initEnvConfig(configKey) {
  const envConfig = urlHostToConfigsMap?.[configKey];

  if (!envConfig) {
    alert("App not found, please check settings is properly added for host.");
    throw new Error(
      "App not found, please check settings is properly added for host."
    );
  }
  window.envConfig = envConfig;
}

export default async function initializeApp() {
  const host = decideHostFromUrl(window.location);
  const availableHosts = Object.keys(urlHostToConfigsMap);
  const configKey = availableHosts.find((route) => host.includes(route))
  await initEnvConfig(configKey);
}
