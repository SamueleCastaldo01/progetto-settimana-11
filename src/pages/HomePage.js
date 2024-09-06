import React, { useEffect, useState } from 'react';
import { SideBar } from '../components/SideBar';
import AlbumCard from '../components/AlbumCard';

// Funzione per recuperare i dati musicali
const fetchMusic = async (artistName, setMusicSection) => {
  try {
    const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`);
    if (response.ok) {
      const { data } = await response.json();
      setMusicSection(data.slice(0, 4)); // Mantieni solo i primi 4 elementi
    } else {
      throw new Error('Errore nel recupero delle canzoni');
    }
  } catch (err) {
    console.log('errore', err);
  }
};

// Componente principale della HomePage
export function HomePage() {
  const [rockMusic, setRockMusic] = useState([]);
  const [popMusic, setPopMusic] = useState([]);
  const [hipHopMusic, setHipHopMusic] = useState([]);

  useEffect(() => {
    fetchMusic('queen', setRockMusic);
    fetchMusic('katyperry', setPopMusic);
    fetchMusic('eminem', setHipHopMusic);
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* SIDEBAR */}
          <SideBar />
          {/* FINE SIDEBAR */}
          {/* SEZIONE PRINCIPALE */}
          <main className="col-12 col-md-9 offset-md-3 mainPage">
            <div className="row">
              <div className="col-9 col-lg-11 mainLinks d-none d-md-flex">
                <a href="#">TRENDING</a>
                <a href="#">PODCAST</a>
                <a href="#">MOODS AND GENRES</a>
                <a href="#">NEW RELEASES</a>
                <a href="#">DISCOVER</a>
              </div>
            </div>
            <div className="row">
              <div className="col-10">
                <div id="rock">
                  <h2>Rock Classics</h2>
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3" id="rockSection">
                    {rockMusic.map(song => (
                      <AlbumCard key={song.id} singleSong={song} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-10">
                <div id="pop">
                  <h2>Pop Culture</h2>
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3" id="popSection">
                    {popMusic.map(song => (
                      <AlbumCard key={song.id} singleSong={song} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-10">
                <div id="hiphop">
                  <h2>#HipHop</h2>
                  <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3" id="hipHopSection">
                    {hipHopMusic.map(song => (
                      <AlbumCard key={song.id} singleSong={song} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* PLAYER */}
      <div className="container-fluid fixed-bottom bg-container pt-1">
        <div className="row h-100">
          <div className="col-lg-10 offset-lg-2">
            <div className="row h-100 flex-column justify-content-center align-items-center">
              <div className="col-6 col-md-4 playerControls">
                <div className="d-flex">
                  <a href="#">
                    <img src="assets/playerbuttons/shuffle.png" alt="shuffle" />
                  </a>
                  <a href="#">
                    <img src="assets/playerbuttons/prev.png" alt="prev" />
                  </a>
                  <a href="#">
                    <img src="assets/playerbuttons/play.png" alt="play" />
                  </a>
                  <a href="#">
                    <img src="assets/playerbuttons/next.png" alt="next" />
                  </a>
                  <a href="#">
                    <img src="assets/playerbuttons/repeat.png" alt="repeat" />
                  </a>
                </div>
                <div className="progress mt-3">
                  <div role="progressbar"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* FINE PLAYER */}
    </>
  );
}
