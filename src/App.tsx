import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

const cloudInstance = "https://cloud-test.hdw.mx";
const localHost = "http://localhost:3000";
const dashboardPath = `${cloudInstance}/dashboard?devServer=http://localhost:3000/widget`;
const authorizePath = `${cloudInstance}/authorize?redirectUrl=${dashboardPath}`;

function App() {
  const [count, setCount] = useState(0);
  const isIframe = window.location !== window.parent.location;

  const widget = (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Hello Vite + React!</p>
      <p>
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is: {count}
        </button>
      </p>
      <p>
        Edit <code>App.tsx</code> and save to test HMR updates.
      </p>
      <p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {" | "}
        <a
          className="App-link"
          href="https://vitejs.dev/guide/features.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Vite Docs
        </a>
      </p>
    </header>
  );

  const previewLink = (
    <>
      <h1>Running Widget</h1>
      <a href={dashboardPath} target="_widget_preview">
        Open Live Preview
      </a>
    </>
  );

  return <div className="App">{isIframe ? widget : previewLink}</div>;
}

export default App;
