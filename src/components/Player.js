import React, { useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp'; // Icona per il controllo del volume
import { IconButton, Slider } from '@mui/material';

// Componente Player
export function Player({ currentTrack, isPlaying, onPlayPause, onNext, onPrevious }) {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    if (currentTrack) {
      // Pulisce l'audio precedente se c'è
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      // Crea un nuovo elemento audio
      const newAudio = new Audio(currentTrack.preview);
      setAudio(newAudio);
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play().catch(err => console.error('Error playing audio:', err));
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    // Funzione per gestire la pressione dei tasti
    const handleKeyDown = (event) => {
      if (event.code === 'Space') { // Utilizza `event.code` per una maggiore precisione
        event.preventDefault();
        onPlayPause(); // Alterna tra play e pause quando si preme Space
      }
    };

    // Aggiunge l'evento al caricamento del componente
    window.addEventListener('keydown', handleKeyDown);

    // Rimuove l'evento al momento della dismount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onPlayPause]);

  const iconStyle = { color: '#FFFFFF' };

  return (
    <div className="container-fluid fixed-bottom bg-container pt-1">
      <div className="row h-100">
        <div className="col-lg-10 offset-lg-2">
          <div className="row h-100 align-items-center">
            {/* Colonna per le informazioni della traccia */}
            <div className="col-3 d-flex align-items-center">
              {currentTrack && (
                <div className="d-flex align-items-center">
                  <img src={currentTrack.album.cover_medium} alt="Album cover" className="img-thumbnail me-2" style={{ width: 50, height: 50 }} />
                  <div className="text-white">
                    <div>{currentTrack.title}</div>
                    <div>{currentTrack.artist.name}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Colonna per i controlli del player */}
            <div className="col-6 d-flex flex-column align-items-center">
              <div className="d-flex mb-3">
                <IconButton onClick={(e) => { e.preventDefault(); onPrevious(); }}>
                  <SkipPreviousIcon sx={iconStyle} />
                </IconButton>
                <IconButton onClick={(e) => { e.preventDefault(); onPlayPause(); }}>
                  {isPlaying ? <PauseIcon sx={iconStyle} /> : <PlayArrowIcon sx={iconStyle} />}
                </IconButton>
                <IconButton onClick={(e) => { e.preventDefault(); onNext(); }}>
                  <SkipNextIcon sx={iconStyle} />
                </IconButton>
                <IconButton>
                  <ShuffleIcon sx={iconStyle} />
                </IconButton>
                <IconButton>
                  <RepeatIcon sx={iconStyle} />
                </IconButton>
              </div>
              <div className="progress mt-3">
                <div role="progressbar"></div>
              </div>
            </div>

            {/* Colonna per il controllo del volume */}
            <div className="col-3 d-flex align-items-center justify-content-end">
              <IconButton>
                <VolumeUpIcon sx={iconStyle} />
              </IconButton>
              <Slider
                defaultValue={30}
                aria-label="Volume"
                sx={{ color: '#FFFFFF', width: 100, ml: 1 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
