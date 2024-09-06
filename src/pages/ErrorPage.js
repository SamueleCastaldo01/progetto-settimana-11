import { useNavigate } from "react-router-dom"

export function ErrorPage () {
    const navigate = useNavigate()

    return(
        <>
            <h2>Errore 404</h2>
            <p>Pagina non trovata</p>
            <button onClick={() => {navigate("/")}}>Ritorna alla home</button>
        </>
    )
}