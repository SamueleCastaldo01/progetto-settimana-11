// src/components/HomePage.js
import React, { useEffect } from 'react';
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
  
  const [rockMusic, setRockMusic] = React.useState([]);
  const [popMusic, setPopMusic] = React.useState([]);
  const [hipHopMusic, setHipHopMusic] = React.useState([]);

  useEffect(() => {
    fetchMusic('queen', setRockMusic);
    fetchMusic('katyperry', setPopMusic);
    fetchMusic('eminem', setHipHopMusic);
  }, []);

  const handleTrackSelect = (track) => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true)); // Avvia la riproduzione quando viene selezionata una canzone
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <SideBar />
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
                      <AlbumCard key={song.id} singleSong={song} onClick={() => handleTrackSelect(song)} />
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
                      <AlbumCard key={song.id} singleSong={song} onClick={() => handleTrackSelect(song)} />
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
                      <AlbumCard key={song.id} singleSong={song} onClick={() => handleTrackSelect(song)} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Player />
    </>
  );
}
