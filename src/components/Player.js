import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCurrentTrack,
  setIsPlaying,
  setVolume,
  addFavorites,
  removeFavorites,
  removeFromQueue,
} from "../redux/actions";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import RepeatIcon from "@mui/icons-material/Repeat";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton, Slider } from "@mui/material";

const MAX_TEXT_LENGTH = 20; // Lunghezza massima per troncamento
const AUDIO_SWITCH_DELAY = 500; // Delay in milliseconds to ensure audio switch

export function Player() {
  const dispatch = useDispatch();
  const { currentTrack, isPlaying, volume } = useSelector(
    (state) => state.player
  );
  const { queue } = useSelector((state) => state.queue); // Ottieni la coda dallo stato
  const favorites = useSelector((state) => state.favorites.content);

  const [audio, setAudio] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Funzioni per gestire gli eventi dell'audio
  const onLoadedMetadata = (event) => {
    setDuration(event.target.duration);
  };

  const onTimeUpdate = (event) => {
    setCurrentTime(event.target.currentTime);
  };

  useEffect(() => {
    const switchTrack = () => {
      if (audio) {
        // Pulisci e rimuovi l'audio precedente
        audio.pause();
        audio.currentTime = 0;
        audio.removeEventListener("loadedmetadata", onLoadedMetadata);
        audio.removeEventListener("timeupdate", onTimeUpdate);
        setAudio(null);
      }

      if (currentTrack) {
        // Delay per assicurare che la traccia precedente sia completamente fermata
        setTimeout(() => {
          const newAudio = new Audio(currentTrack.preview);
          setAudio(newAudio);
          audioRef.current = newAudio;

          newAudio.addEventListener("loadedmetadata", onLoadedMetadata);
          newAudio.addEventListener("timeupdate", onTimeUpdate);

          if (isPlaying) {
            newAudio.play().catch((err) => console.error("Error playing audio:", err));
          }

          // Aggiungi l'evento per gestire la fine della traccia
          newAudio.addEventListener("ended", () => {
            console.log("Track ended, current queue:", queue);
            if (queue.length > 0) {
              const nextTrack = queue[0];
              console.log("Playing next track:", nextTrack);
              dispatch(setCurrentTrack(nextTrack));
              dispatch(setIsPlaying(true));
              dispatch(removeFromQueue(nextTrack.id)); // Rimuovi la canzone dalla coda
            }
          });
        }, AUDIO_SWITCH_DELAY);
      }
    };

    switchTrack();

    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener("loadedmetadata", onLoadedMetadata);
        audio.removeEventListener("timeupdate", onTimeUpdate);
        setAudio(null);
      }
    };
  }, [currentTrack]);

  useEffect(() => {
    if (audio) {
      audio.volume = volume;
      if (isPlaying) {
        audio.play().catch((err) => console.error("Error playing audio:", err));
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

  const handleNextTrack = () => {
    if (queue.length > 0) {
      const nextTrack = queue[0];
      dispatch(setCurrentTrack(nextTrack));
      dispatch(setIsPlaying(true));
      dispatch(removeFromQueue(nextTrack.id)); // Rimuovi la canzone dalla coda
    }
  };

  const truncateText = (text) => {
    return text.length > MAX_TEXT_LENGTH
      ? text.slice(0, MAX_TEXT_LENGTH) + "..."
      : text;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleFavoriteToggle = () => {
    if (currentTrack) {
      const isFavorite = favorites.some((fav) => fav.id === currentTrack.id);
      if (isFavorite) {
        dispatch(removeFavorites(currentTrack.id));
      } else {
        dispatch(addFavorites(currentTrack));
      }
    }
  };

  const isCurrentTrackFavorite =
    currentTrack && favorites.some((fav) => fav.id === currentTrack.id);

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
                  <div className="text-white d-flex align-items-center">
                    <div className="me-2">
                      <IconButton onClick={handleFavoriteToggle}>
                        {isCurrentTrackFavorite ? (
                          <FavoriteIcon sx={{ color: "#FFFFFF" }} />
                        ) : (
                          <FavoriteBorderIcon sx={{ color: "#FFFFFF" }} />
                        )}
                      </IconButton>
                    </div>
                    <div>
                      <div
                        className="text-truncate"
                        style={{ maxWidth: "150px" }}
                      >
                        {truncateText(currentTrack.title)}
                      </div>
                      <div
                        className="text-truncate"
                        style={{ maxWidth: "150px" }}
                      >
                        {truncateText(currentTrack.artist.name)}
                      </div>
                    </div>
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
                  }}
                >
                  <SkipPreviousIcon sx={{ color: "#FFFFFF" }} />
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    handlePlayPause();
                  }}
                >
                  {isPlaying ? (
                    <PauseIcon sx={{ color: "#FFFFFF" }} />
                  ) : (
                    <PlayArrowIcon sx={{ color: "#FFFFFF" }} />
                  )}
                </IconButton>
                <IconButton
                  onClick={(e) => {
                    e.preventDefault();
                    handleNextTrack(); // Avanza alla traccia successiva
                  }}
                >
                  <SkipNextIcon sx={{ color: "#FFFFFF" }} />
                </IconButton>
                <IconButton>
                  <ShuffleIcon sx={{ color: "#FFFFFF" }} />
                </IconButton>
                <IconButton>
                  <RepeatIcon sx={{ color: "#FFFFFF" }} />
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
                <VolumeUpIcon sx={{ color: "#FFFFFF" }} />
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
