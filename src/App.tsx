import { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SharedWidgetState, System } from "dashboard-widget-state";

const dashboardPath = `${process.env.CLOUD_INSTANCE}/dashboard?devServer=http://127.0.0.1:3000}`;

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  const [systems, setSystems] = useState<System[]>([]);
  const isIframe = window.location !== window.parent.location;
  const stateObject = useRef<SharedWidgetState>();

  useEffect(() => {
    const subscriptions: any[] = [];
    const stateChecker = setInterval(() => {
      const _stateObject = (window as any).sharedState as SharedWidgetState;
      if (_stateObject) {
        stateObject.current = _stateObject;
        clearInterval(stateChecker);
        subscriptions.push(stateObject.current.state$.subscribe(setCount));
        subscriptions.push(stateObject.current.systems$.subscribe(setSystems));
      }
    }, 10);
    return () => {
      clearInterval(stateChecker);
      subscriptions.forEach((sub) => sub.unsubscribe());
    };
  }, [stateObject]);

  const widget = stateObject ? (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>Hello Vite + React!</p>
      <p>
        <h2>count is: {count}</h2>
        <button type="button" onClick={() => stateObject?.current?.increment()}>
          Increment
        </button>
        <button type="button" onClick={() => stateObject?.current?.decrement()}>
          Decrement
        </button>
      </p>
      <p>
        Edit <code>App.tsx</code> and save to test HMR updates.
      </p>
      <div>
        <h3>Systems</h3>
        {message ? (
          <h3>{message}</h3>
        ) : (
          <div className="systems">
            {systems.map(({ name, id }) => (
              <a
                className="system"
                onClick={() => {
                  stateObject?.current
                    ?.navigateByUrl(`/systems/${id}`)
                    .then(() => {
                      setMessage(`Navigating to ${name} system`);
                    });
                }}
                key={id}
              >
                {name}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  ) : (
    <h2>Loading...</h2>
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
