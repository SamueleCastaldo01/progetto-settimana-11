import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTrack, setIsPlaying } from '../redux/actions';
import { SideBar } from '../components/SideBar';
import AlbumCard from '../components/AlbumCard';
import { Player } from '../components/Player';

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

export function HomePage() {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying } = useSelector((state) => state.player);
  
  const [rockMusic, setRockMusic] = useState([]);
  const [popMusic, setPopMusic] = useState([]);
  const [hipHopMusic, setHipHopMusic] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // Stato per i risultati della ricerca
  const [isSearching, setIsSearching] = useState(false); // Stato per sapere se è attiva la ricerca

  useEffect(() => {
    if (!isSearching) {  // Se non si sta cercando, mostra le sezioni iniziali
      fetchMusic('queen', setRockMusic);
      fetchMusic('katyperry', setPopMusic);
      fetchMusic('eminem', setHipHopMusic);
    }
  }, [isSearching]);

  const handleTrackSelect = (track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true)); // Avvia la riproduzione quando viene selezionata una canzone
  };

  const handleSearch = async (query) => {
    if (query.trim()) {
      setIsSearching(true); // Imposta lo stato di ricerca
      const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`);
      if (response.ok) {
        const { data } = await response.json();
        setSearchResults(data); // Memorizza i risultati della ricerca
      }
    } else {
      setIsSearching(false); // Se non c'è query, disabilita la ricerca e mostra i default
      setSearchResults([]);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Passa la funzione handleSearch alla Sidebar */}
          <SideBar onTrackSelect={handleTrackSelect} onSearch={handleSearch} />
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
                {isSearching ? (
                  // Se è attiva la ricerca, mostra i risultati della ricerca
                  <div id="searchResults">
                    <h2 className='text-white mt-3'>Search Results</h2>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3" id="searchSection">
                      {searchResults.map(song => (
                        <AlbumCard key={song.id} singleSong={song} onClick={() => handleTrackSelect(song)} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Se non è attiva la ricerca, mostra le sezioni predefinite */}
                    <div id="rock">
                      <h2>Rock Classics</h2>
                      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3" id="rockSection">
                        {rockMusic.map(song => (
                          <AlbumCard key={song.id} singleSong={song} onClick={() => handleTrackSelect(song)} />
                        ))}
                      </div>
                    </div>
                    <div id="pop">
                      <h2>Pop Culture</h2>
                      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3" id="popSection">
                        {popMusic.map(song => (
                          <AlbumCard key={song.id} singleSong={song} onClick={() => handleTrackSelect(song)} />
                        ))}
                      </div>
                    </div>
                    <div id="hiphop">
                      <h2>#HipHop</h2>
                      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3" id="hipHopSection">
                        {hipHopMusic.map(song => (
                          <AlbumCard key={song.id} singleSong={song} onClick={() => handleTrackSelect(song)} />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
      <Player />
    </>
  );
}
