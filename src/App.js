import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

//ho aggiunto la lista preferiti sulla sideBar e quando premi una canzone nella lista comprare nel player
//per aggiungere una canzone ai preferiti si fà tramite player, con l'icona del cuoricino

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
