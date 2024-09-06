import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

//ho aggiunto la lista preferiti sulla sideBar e quando premi una canzone nella lista comprare nel player
//per aggiungere una canzone ai preferiti si fà tramite player, con l'icona del cuoricino
//funziona anche la ricerca, per ritornare allo stato precedente senza ricaricare la pagina (dato che redux non è persistente)
//basta premere invio quando la stringa è vuota all'interno della search
//ho reso il redux persistente. In questo modo la lista dei preferiti non si cancella
//sono riusctio ad aggiungere anche la coda tramite redux
//Se si preme il comando per la traccia successiva funziona in base agli elementi che sono stati aggiunti alla coda
//il tasto per andare a quella precedente non lo ho fatto funzionare, perché quando passa alla prossia eliminia quella canzone dalla coda
//il volume funziona. E non ho voluto far funzionare lo shuffle perché preferisco che la coda si mantenga nell'ordine in cui li ho inseriti

//bug alcune vole le tracce delle canzoni si sovrappongo tra loro, basta ricarca la pagina, oppure cambiare album. Devo risolvere
//purtroppo non è responsive, per via del tempo. Mi sono concentrato di più sulla logica

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
