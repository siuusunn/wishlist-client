import { useState } from 'react';
import { API } from '../lib/api';
import { Button } from '@mui/material';
import '../styles/Search.scss';

function TrackSearch({ wishlistId, wishlistData, handleUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [tracks, setTracks] = useState([]);

  const handleClickModal = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

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
    setShowModal(false);
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
    setShowModal(false);
  };

  return (
    <div className='search-component-container'>
      <Button onClick={handleClickModal} variant='contained'>
        Add/Delete Track
      </Button>
      {showModal ? (
        <div className='modal'>
          <div className='modal-content'>
            <h1>Add/Delete Track</h1>
            <div className='search-input-container'>
              <input
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='ISRC'
              />
              <button onClick={handleSearch}>Search</button>
            </div>

            {tracks?.map((track) => (
              <div key={track.id} className='track-details'>
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
            <span className='close' onClick={handleCloseModal}>
              <Button variant='outlined'>CLOSE</Button>
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TrackSearch;
