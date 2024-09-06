// src/components/Player.js
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsPlaying, setVolume } from '../redux/actions';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import RepeatIcon from '@mui/icons-material/Repeat';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { IconButton, Slider } from '@mui/material';

export function Player() {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, volume } = useSelector((state) => state.player);

  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (currentTrack) {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      const newAudio = new Audio(currentTrack.preview);
      setAudio(newAudio);
      audioRef.current = newAudio;

      newAudio.addEventListener('loadedmetadata', () => {
        setDuration(newAudio.duration);
      });

      newAudio.addEventListener('timeupdate', () => {
        setCurrentTime(newAudio.currentTime);
      });
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
      if (isPlaying) {
        audio.play().catch((err) => console.error('Error playing audio:', err));
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audio, volume]);

  const handlePlayPause = () => {
    dispatch(setIsPlaying(!isPlaying));
  };

  const handleVolumeChange = (event, newValue) => {
    dispatch(setVolume(newValue / 100));
  };

  const handleProgressChange = (event, newValue) => {
    if (audio) {
      audio.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div className="container-fluid fixed-bottom bg-container pt-1">
      <div className="row h-100">
        <div className="col-lg-10 offset-lg-2">
          <div className="row h-100 align-items-center">
            {/* Colonna per le informazioni della traccia */}
            <div className="col-3 d-flex align-items-center">
              {currentTrack && (
                <div className="d-flex align-items-center">
                  <img
                    src={currentTrack.album.cover_medium}
                    alt="Album cover"
                    className="img-thumbnail me-2"
                    style={{ width: 50, height: 50 }}
                  />
                  <div className="text-white">
                    <div>{currentTrack.title}</div>
                    <div>{currentTrack.artist.name}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Colonna per i controlli del player */}
            <div className="col-6 d-flex flex-column align-items-center">
              <div className="d-flex mb-2">
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    // Gestisci la traccia precedente qui
                    // dispatch(onPrevious());
                  }}
                >
                  <SkipPreviousIcon sx={{ color: '#FFFFFF' }} />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    handlePlayPause();
                  }}
                >
                  {isPlaying ? (
                    <PauseIcon sx={{ color: '#FFFFFF' }} />
                  ) : (
                    <PlayArrowIcon sx={{ color: '#FFFFFF' }} />
                  )}
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    // Gestisci la traccia successiva qui
                    // dispatch(onNext());
                  }}
                >
                  <SkipNextIcon sx={{ color: '#FFFFFF' }} />
                </IconButton>
                <IconButton>
                  <ShuffleIcon sx={{ color: '#FFFFFF' }} />
                </IconButton>
                <IconButton>
                  <RepeatIcon sx={{ color: '#FFFFFF' }} />
                </IconButton>
              </div>

              {/* Barra di progresso con timer */}
              <div className="d-flex align-items-center w-100">
                <div className="me-3 text-white">{formatTime(currentTime)}</div>
                <Slider
                  value={currentTime}
                  min={0}
                  max={duration}
                  onChange={handleProgressChange}
                  sx={{
                    color: '#FFFFFF',
                    '& .MuiSlider-thumb': {
                      border: '2px solid #FFFFFF',
                      width: 15,
                      height: 15,
                      backgroundColor: '#FFFFFF',
                    },
                    '& .MuiSlider-track': {
                      height: 8,
                      backgroundColor: '#FFFFFF',
                    },
                    '& .MuiSlider-rail': {
                      height: 8,
                      backgroundColor: '#555555',
                    },
                  }}
                />
                <div className="ms-3 text-white">{formatTime(duration)}</div>
              </div>
            </div>

            {/* Colonna per il controllo del volume */}
            <div className="col-3 d-flex align-items-center justify-content-center">
              <IconButton>
                <VolumeUpIcon sx={{ color: '#FFFFFF' }} />
              </IconButton>
              <Slider
                value={volume * 100}
                onChange={handleVolumeChange}
                aria-label="Volume"
                sx={{
                  color: '#FFFFFF',
                  width: 100,
                  ml: 1,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
