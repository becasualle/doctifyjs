import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const container = document.getElementById("root")!;
const root = createRoot(container);
const App: React.FC = () => {
  const ref = useRef<any>();
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const handleClick = async () => {
    if (!ref.current) {
      return;
    }

    // const result = await ref.current.transform(input, {
    //   loader: "jsx",
    //   target: "es2015",
    // });

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    // console.log(result);

    // setCode(result.code);
    setCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      ></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};

root.render(<App />);
