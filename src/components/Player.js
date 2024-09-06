import React, { useState, useEffect } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import { IconButton } from '@mui/material';

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

  const iconStyle = { color: '#FFFFFF' };

  return (
    <div className="container-fluid fixed-bottom bg-container pt-1">
      <div className="row h-100">
        <div className="col-lg-10 offset-lg-2">
          <div className="row h-100 flex-column justify-content-center align-items-center">
            <div className="col-6 col-md-4 playerControls">
              <div className="d-flex">
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
          </div>
        </div>
      </div>
    </div>
  );
}
