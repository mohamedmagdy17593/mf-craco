const {ModuleFederationPlugin} = require('webpack').container
const deps = require("./package.json").dependencies;

module.exports = () => {
  return {
    webpack: {
      configure: {
        output: {
          publicPath: "auto",
        },
      },
      plugins: {
        add: [
          new ModuleFederationPlugin({
            name: "app2",
            filename: "remoteEntry.js",
            exposes: {
              "./App": "./src/App",
            },
            remotes: {
              app1: 'app1@http://localhost:3000/remoteEntry.js'
            },
            shared: {
              ...deps,
              react: {
                singleton: true,
                requiredVersion: deps.react,
              },
              "react-dom": {
                singleton: true,
                requiredVersion: deps["react-dom"],
              },
            },
          }),
        ],
      },
    },
  }
}
