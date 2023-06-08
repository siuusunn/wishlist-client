import { useState, useEffect } from 'react';
import { API } from '../lib/api';
import '../styles/AllTracks.scss';

export default function AllTracks() {
  const [allTracks, setAllTracks] = useState([]);

  useEffect(() => {
    API.GET(API.ENDPOINTS.allTracks).then(({ data }) => setAllTracks(data));
    console.log(allTracks);
  }, []);

  return (
    <div className='all-tracks-container'>
      <h1>ALL TRACKS</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artists</th>
            <th>Duration</th>
            <th>ISRC</th>
          </tr>
        </thead>
        <tbody>
          {allTracks.map((track) => (
            <tr key={track.id}>
              <td>{track.title}</td>
              <td>{track.artist.map((artist) => artist.name).join(', ')}</td>
              <td>{track.duration}</td>
              <td>{track.isrc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
