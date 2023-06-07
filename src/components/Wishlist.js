import { useState, useEffect } from 'react';
import { API } from '../lib/api';
import { AUTH } from '../lib/auth';
import { useAuthenticated } from '../hooks/useAuthenticated';
import Search from './Search';
import ProfilePicture from './ProfilePicture';
import '../styles/Wishlist.scss';

export default function Wishlist() {
  const [userData, setUserData] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useAuthenticated();
  const id = AUTH.getPayload().sub;

  useEffect(() => {
    API.GET(API.ENDPOINTS.singleWishlist(id)).then(({ data }) => {
      setUserData(data);
      setIsUpdated(false);
    });
  }, [id, isUpdated]);

  const handleUpdate = (e) => {
    setIsUpdated(true);
  };

  return (
    <div className='wishlist-container'>
      <div className='search-container'>
        <Search
          wishlistId={id}
          wishlistData={userData}
          handleUpdate={handleUpdate}
        />
      </div>
      <div className='user-wishlist-container'>
        <div className='user-wishlist-title-container'>
          <ProfilePicture
            cloudinaryImageId={userData?.owner.profile_image}
            imageWidth={120}
            imageHeight={120}
            radius={20}
            backgroundColor={'white'}
          />
          <h1>{userData?.owner.username}'s Wishlist</h1>
        </div>

        <ol className='user-wishlist-tracks-container'>
          {userData?.tracks.map((track) => (
            <div key={track.id}>
              <li>
                {track?.artist.map((artist) => artist.name)} - {track.title} -{' '}
                {track.duration} - {track.isrc}
              </li>
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
}
