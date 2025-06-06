const fs = require("fs");

const FRONTEND_CONFIG_FILE_NAME = "mempool-frontend-config.json";

let configContent;

// Read frontend config
try {
  const rawConfig = fs.readFileSync(FRONTEND_CONFIG_FILE_NAME);
  configContent = JSON.parse(rawConfig);
  console.log(`${FRONTEND_CONFIG_FILE_NAME} file found, using provided config`);
} catch (e) {
  console.log(e);
  if (e.code !== "ENOENT") {
    throw new Error(e);
  } else {
    console.log(
      `${FRONTEND_CONFIG_FILE_NAME} file not found, using default config`
    );
  }
}

let PROXY_CONFIG = [];

if (configContent && configContent.BASE_MODULE === "liquid") {
  PROXY_CONFIG.push(
    ...[
      {
        context: ["/liquid/api/v1/**"],
        target: `http://localhost:8999`,
        secure: false,
        ws: true,
        changeOrigin: true,
        proxyTimeout: 30000,
        pathRewrite: {
          "^/liquid": "",
        },
      },
      {
        context: ["/liquid/api/**"],
        target: `https://liquid.network`,
        secure: false,
        changeOrigin: true,
        proxyTimeout: 30000,
      },
      {
        context: ["/liquidtestnet/api/v1/**"],
        target: `http://localhost:8999`,
        secure: false,
        ws: true,
        changeOrigin: true,
        proxyTimeout: 30000,
        pathRewrite: {
          "^/liquidtestnet": "",
        },
      },
      {
        context: ["/liquidtestnet/api/**"],
        target: `https://liquid.network`,
        secure: false,
        changeOrigin: true,
        proxyTimeout: 30000,
      },
    ]
  );
}

PROXY_CONFIG.push(
  ...[
    {
      context: ["/api/v1/services/**"],
      target: `http://localhost:9000`,
      secure: false,
      ws: true,
      changeOrigin: true,
      proxyTimeout: 30000,
    },
    {
      context: ["/api/v1/**"],
      target: `http://localhost:8999`,
      secure: false,
      ws: true,
      changeOrigin: true,
      proxyTimeout: 30000,
    },
    {
      context: ["/api/**"],
      target: `https://xbtscan.org`,
      secure: false,
      changeOrigin: true,
      proxyTimeout: 30000,
    },
  ]
);

console.log(PROXY_CONFIG);

module.exports = PROXY_CONFIG;
