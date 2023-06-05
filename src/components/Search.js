import { useState } from 'react';
import { API } from '../lib/api';

function TrackSearch({ wishlistId, wishlistData }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [tracks, setTracks] = useState([]);

  const handleSearch = async () => {
    try {
      API.GET(API.ENDPOINTS.searchTrack(searchQuery)).then(({ data }) => {
        setTracks(data);
        // console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTrack = async (trackId) => {
    const existingTracksInWishlist = wishlistData.tracks.map(
      (track) => track.id
    );
    existingTracksInWishlist.push(trackId);
    console.log(existingTracksInWishlist);
  };

  return (
    <div>
      <input
        type='text'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {tracks?.map((track) => (
        <div key={track.id}>
          <h4>Title: {track.title}</h4>
          <h4>
            Artists:{' '}
            {track?.artist.map((artist) => (
              <li key={artist.id}>{artist.name}</li>
            ))}
          </h4>
          <h4>Duration: {track.duration}</h4>
          <h4>ISRC: {track.isrc}</h4>
          <button key={track.id} onClick={() => handleAddTrack(track.id)}>
            Add Track to Watchlist
          </button>
        </div>
      ))}
    </div>
  );
}

export default TrackSearch;
