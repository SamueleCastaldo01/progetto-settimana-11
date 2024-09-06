import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

//ho aggiunto la lista preferiti sulla sideBar e quando premi una canzone nella lista comprare nel player
//per aggiungere una canzone ai preferiti si fà tramite player, con l'icona del cuoricino
//funziona anche la ricerca, per ritornare allo stato precedente senza ricaricare la pagina (dato che redux non è persistente)
//basta premere invio quando la stringa è vuota all'interno della search
//ho reso il redux persistente. In questo modo la lista dei preferiti non si cancella

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
