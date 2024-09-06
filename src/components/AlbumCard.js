const AlbumCard = ({ singleSong, onClick }) => {
    return (
      <div className="col text-center" key={singleSong.id} onClick={() => onClick(singleSong)}>
        <img className="img-fluid" src={singleSong.album.cover_medium} alt="track" />
        <p>
          Track: "{singleSong.title}"<br />
          Artist: {singleSong.artist.name}
        </p>
      </div>
    );
  };
  
  export default AlbumCard;
  