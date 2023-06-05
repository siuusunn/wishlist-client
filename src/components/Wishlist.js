import { useState, useEffect } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useAuthenticated } from '../hooks/useAuthenticated';

export default function Wishlist() {
  const [userData, setUserData] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();
  const id = AUTH.getPayload().sub;

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleWishlist(id)).then(({ data }) => {
      setUserData(data);
      setIsUpdated(false);
      console.log(data);
    });
  }, [id, isUpdated]);

  // const handleUpdate = (e) => {
  //   setIsUpdated(true);
  // };

  return (
    <>
      <h1>{userData?.owner.username}'s Wishlist</h1>
      {userData?.tracks.map((track) => (
        <>
          <h4>
            {track?.artist.map((artist) => artist.name)} - {track.title} -{' '}
            {track.isrc}
          </h4>
        </>
      ))}
    </>
  );
}
