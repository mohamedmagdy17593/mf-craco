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
            name: "app1",
            filename: "remoteEntry.js",
            remotes: {
              app1: 'app1@http://localhost:3000/remoteEntry.js',
              app2: 'app2@http://localhost:3001/remoteEntry.js',
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
