import React from 'react';
import { IconButton } from '@mui/material';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';

const AlbumCard = ({ singleSong, onClick, onAddToQueue }) => {
  return (
    <div className="col text-center">
      <img
        className="img-fluid"
        src={singleSong.album.cover_medium}
        alt="track"
        style={{ cursor: 'pointer' }}
        onClick={() => onClick(singleSong)}
      />
      <p className='m-0'>
        Track: "{singleSong.title}"<br />
        Artist: {singleSong.artist.name}
      </p>
      <div className="d-flex justify-content-center">
        <IconButton onClick={() => onAddToQueue(singleSong)}>
          <QueueMusicIcon style={{color: "white"}} />
        </IconButton>
      </div>
    </div>
  );
};

export default AlbumCard;