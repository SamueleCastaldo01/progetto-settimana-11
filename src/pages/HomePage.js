import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTrack, setIsPlaying, getSearchResults, resetSearchResults, addToQueue } from '../redux/actions';
import { SideBar } from '../components/SideBar';
import AlbumCard from '../components/AlbumCard';
import { Player } from '../components/Player';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  const { searchResults } = useSelector((state) => state.search);

  const [rockMusic, setRockMusic] = useState([]);
  const [popMusic, setPopMusic] = useState([]);
  const [hipHopMusic, setHipHopMusic] = useState([]);
  const [querySearch, setQuerySearch] = useState("");

  useEffect(() => {
    fetchMusic('queen', setRockMusic);
    fetchMusic('katyperry', setPopMusic);
    fetchMusic('eminem', setHipHopMusic);
  }, []);

  useEffect(() => {
    if (querySearch.trim()) {
      dispatch(getSearchResults(querySearch));
    }
  }, [querySearch, dispatch]);

  const handleTrackSelect = (track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true));
  };

  const handleAddToQueue = (track) => {
    dispatch(addToQueue(track));
  };

  const handleBackToHome = () => {
    setQuerySearch(""); // Svuota la query di ricerca
    dispatch(resetSearchResults()); // Resetta i risultati della ricerca
  };

  const handleSearch = (query) => {
    setQuerySearch(query);
  };

  const hasSearchResults = searchResults.length > 0;

  return (
    <>
      <div className="container-fluid">
        <div className="row">
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
                {hasSearchResults ? (
                  <div id="searchResults">
                    <div className='d-flex align-items-center mt-4'>
                      <ArrowBackIcon 
                        fontSize="large" 
                        className="mr-2 me-3" 
                        onClick={handleBackToHome} 
                        style={{ cursor: 'pointer', color: "white" }}
                      />
                      <h2 className='text-white m-0'>Search Results</h2>
                    </div>
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3" id="searchSection">
                      {searchResults.map(song => (
                        <AlbumCard 
                          key={song.id} 
                          singleSong={song} 
                          onClick={handleTrackSelect} 
                          onAddToQueue={handleAddToQueue} 
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <div id="rock">
                      <h2>Rock Classics</h2>
                      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3" id="rockSection">
                        {rockMusic.map(song => (
                          <AlbumCard 
                            key={song.id} 
                            singleSong={song} 
                            onClick={handleTrackSelect} 
                            onAddToQueue={handleAddToQueue} 
                          />
                        ))}
                      </div>
                    </div>
                    <div id="pop">
                      <h2>Pop Culture</h2>
                      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3" id="popSection">
                        {popMusic.map(song => (
                          <AlbumCard 
                            key={song.id} 
                            singleSong={song} 
                            onClick={handleTrackSelect} 
                            onAddToQueue={handleAddToQueue} 
                          />
                        ))}
                      </div>
                    </div>
                    <div id="hiphop">
                      <h2>#HipHop</h2>
                      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 imgLinks py-3" id="hipHopSection">
                        {hipHopMusic.map(song => (
                          <AlbumCard 
                            key={song.id} 
                            singleSong={song} 
                            onClick={handleTrackSelect} 
                            onAddToQueue={handleAddToQueue} 
                          />
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