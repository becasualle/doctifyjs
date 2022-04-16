import * as esbuild from "esbuild-wasm";

export const unpkgPathPlugin = () => {
  return {
    name: "unpkg-path-plugin",
    setup(build: esbuild.PluginBuild) {
      // определяет путь
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log("onResole", args);
        return { path: args.path, namespace: "a" };
      });
      // пытается загрузить контент файла по указанному пути
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("onLoad", args);

        if (args.path === "index.js") {
          return {
            loader: "jsx",
            contents: `
              import message from 'tiny-test-pkg';
              console.log(message);
            `,
          };
        }
      });
    },
  };
};
