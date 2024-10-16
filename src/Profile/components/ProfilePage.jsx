import React, { useEffect } from 'react';
import { UserProfile, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProfilePage = () => {
  const { isSignedIn } = useAuth(); // Get the authentication state
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // If the user is not signed in, navigate to the login page
    if (!isSignedIn) {
      navigate('/login'); // Adjust the path as needed
    }
  }, [isSignedIn, navigate]); // Run effect when isSignedIn changes

  // Render nothing while redirecting
  if (!isSignedIn) {
    return null; // Optionally, you could show a loading indicator here
  }

  return (
    <div>
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
