import { useState } from 'react';
import axios from 'axios';
import { API } from '../lib/api';

function TrackSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tracks, setTracks] = useState([]);

  // const handleSearch = async () => {
  //   try {
  //     const response = await axios.get('/tracks/search/', {
  //       params: {
  //         isrc: searchQuery
  //       }
  //     });
  //     setTracks(response.data);
  //   } catch (error) {
  //     console.error('Error searching for tracks:', error);
  //   }
  // };

  const handleSearch = async () => {
    try {
      API.GET(API.ENDPOINTS.searchTrack(searchQuery)).then(({ data }) => {
        setTracks(data);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
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
        <>
          <h4 key={track.id}>Title: {track.title}</h4>
          <h4 key={track.artist}>
            Artists:{' '}
            {track?.artist.map((artist) => (
              <li key={artist.id}>{artist.name}</li>
            ))}
          </h4>
          <h4>Duration: {track.duration}</h4>
          <h4>ISRC: {track.isrc}</h4>
        </>
      ))}
    </div>
  );
}

export default TrackSearch;
