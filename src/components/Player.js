import React, { useState, useEffect, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { IconButton, Slider } from "@mui/material";

// Componente Player
export function Player({
  currentTrack,
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
}) {
  const [audio, setAudio] = useState(null);
  const [volume, setVolume] = useState(1); // Volume iniziale al massimo (range 0-1)
  const [currentTime, setCurrentTime] = useState(0); // Tempo corrente della traccia
  const [duration, setDuration] = useState(0); // Durata totale della traccia
  const audioRef = useRef(null); // Riferimento all'elemento audio

  useEffect(() => {
    if (currentTrack) {
      // Pulisce l'audio precedente se c'è
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      // Crea un nuovo elemento audio e aggiorna la durata
      const newAudio = new Audio(currentTrack.preview);
      setAudio(newAudio);
      audioRef.current = newAudio;
      newAudio.addEventListener("loadedmetadata", () => {
        setDuration(newAudio.duration);
      });
    }
  }, [currentTrack]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume; // Imposta il volume iniziale
      if (isPlaying) {
        audio.play().catch((err) => console.error("Error playing audio:", err));
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audio, volume]);

  useEffect(() => {
    if (audio) {
      // Aggiorna il tempo corrente ogni secondo
      const interval = setInterval(() => {
        setCurrentTime(audio.currentTime);
      }, 1000);

      // Pulisce l'intervallo quando il componente viene smontato
      return () => clearInterval(interval);
    }
  }, [audio]);

  useEffect(() => {
    // Funzione per gestire la pressione dei tasti
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        // Utilizza `event.code` per una maggiore precisione
        event.preventDefault();
        onPlayPause(); // Alterna tra play e pause quando si preme Space
      }
    };

    // Aggiunge l'evento al caricamento del componente
    window.addEventListener("keydown", handleKeyDown);

    // Rimuove l'evento al momento della dismount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onPlayPause]);

  const handleVolumeChange = (event, newValue) => {
    const volumeValue = newValue / 100;
    setVolume(volumeValue);
    if (audio) {
      audio.volume = volumeValue;
    }
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

  const iconStyle = { color: "#FFFFFF" };

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
                    onPrevious();
                  }}
                >
                  <SkipPreviousIcon sx={iconStyle} />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    onPlayPause();
                  }}
                >
                  {isPlaying ? (
                    <PauseIcon sx={iconStyle} />
                  ) : (
                    <PlayArrowIcon sx={iconStyle} />
                  )}
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    onNext();
                  }}
                >
                  <SkipNextIcon sx={iconStyle} />
                </IconButton>
                <IconButton>
                  <ShuffleIcon sx={iconStyle} />
                </IconButton>
                <IconButton>
                  <RepeatIcon sx={iconStyle} />
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
                    color: "#FFFFFF",
                    "& .MuiSlider-thumb": {
                      border: "2px solid #FFFFFF",
                      width: 15,
                      height: 15,
                      backgroundColor: "#FFFFFF",
                    },
                    "& .MuiSlider-track": {
                      height: 8,
                      backgroundColor: "#FFFFFF",
                    },
                    "& .MuiSlider-rail": {
                      height: 8,
                      backgroundColor: "#555555",
                    },
                  }}
                />
                <div className="ms-3 text-white">{formatTime(duration)}</div>
              </div>
            </div>

            {/* Colonna per il controllo del volume */}
            <div className="col-3 d-flex align-items-center justify-content-center">
              <IconButton>
                <VolumeUpIcon sx={iconStyle} />
              </IconButton>
              <Slider
                value={volume * 100}
                onChange={handleVolumeChange}
                aria-label="Volume"
                sx={{
                  color: "#FFFFFF",
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
