import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import { dts } from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/esm/index.js",
        format: "es",
        sourcemap: true,
      },
    ],
    external: ["react", "react-dom"],
    plugins: [
      nodeResolve(),
      commonjs(),
      typescript(),
      babel({
        babelHelpers: "bundled",
        extensions: [".ts", ".tsx"],
      }),
      postcss({
        inject: { insertAt: "top" },
      }),
      process.env.BUILD === "production" && terser(),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
