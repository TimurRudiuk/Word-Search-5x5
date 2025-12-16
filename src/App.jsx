import { useState } from "react";
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ResultPage from "./pages/ResultPage";

function App() {
  const [page, setPage] = useState("start");

  return (
    <>
      {page === "start" && <StartPage onStart={() => setPage("game")} />}
      {page === "game" && <GamePage onFinish={() => setPage("result")} />}
      {page === "result" && <ResultPage onRestart={() => setPage("start")} />}
    </>
  );
}

export default App;
