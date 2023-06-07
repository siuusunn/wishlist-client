import { useState } from 'react';
import { API } from '../lib/api';
import { Button } from '@mui/material';
import '../styles/Search.scss';

function TrackSearch({ wishlistId, wishlistData, handleUpdate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [tracks, setTracks] = useState([]);

  const handleSearch = async () => {
    try {
      API.GET(API.ENDPOINTS.searchTrackByISRC(searchQuery)).then(({ data }) => {
        setTracks(data);
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
    const requestBody = { tracks: existingTracksInWishlist };

    try {
      await API.PUT(
        API.ENDPOINTS.singleWishlist(wishlistId),
        requestBody,
        API.getHeaders()
      );
      setIsUpdated(true);
      setTracks([]);
      handleUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTrack = async (trackId) => {
    const existingTracksInWishlist = wishlistData.tracks.map(
      (track) => track.id
    );
    const updatedTracks = existingTracksInWishlist.filter(
      (track) => track !== trackId
    );
    const requestBody = { tracks: updatedTracks };

    try {
      await API.PUT(
        API.ENDPOINTS.singleWishlist(wishlistId),
        requestBody,
        API.getHeaders()
      );
      setIsUpdated(true);
      setTracks([]);
      handleUpdate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='search-component-container'>
      <h1>Add/Delete Track</h1>
      <div>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='ISRC'
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {tracks?.map((track) => (
        <div key={track.id}>
          <p>Title: {track.title}</p>
          <p>
            Artists:{' '}
            {track?.artist.map((artist) => (
              <li key={artist.id}>{artist.name}</li>
            ))}
          </p>
          <p>Duration: {track.duration}</p>
          <p>ISRC: {track.isrc}</p>
          <div className='search-buttons-container'>
            <Button
              key={track.id}
              onClick={() => handleAddTrack(track.id)}
              variant='contained'
              color='success'
              className='edit-wishlist-button'
            >
              Add Track to Watchlist
            </Button>
            <Button
              key={track.name}
              onClick={() => handleDeleteTrack(track.id)}
              variant='contained'
              color='error'
              className='edit-wishlist-button'
            >
              Delete Track from Watchlist
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TrackSearch;
