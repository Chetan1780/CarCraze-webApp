import React, { useEffect, useState } from 'react'; // Import useState
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import MyListing from './components/MyListing';
import Inbox from './components/Inbox';
import ProfilePage from './components/ProfilePage';
import Navbar from '@/Components/Navbar';

const Profile = () => {
  const [updateKey, setUpdateKey] = useState(0); // State variable to track updates

  const handleMyListingUpdate = () => {
    setUpdateKey((prev) => prev + 1); // Increment to trigger re-render
  };

  return (
    <div>
      <Navbar />
      <div className='px-10 md:px-20 my-10'>
        <Tabs defaultValue="my-listing" className="w-full">
          <TabsList className="w-full flex justify-start">
            <TabsTrigger value="my-listing">My Listing</TabsTrigger>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="my-listing">
            <MyListing onUpdate={handleMyListingUpdate} key={updateKey} /> {/* Pass update handler and key */}
          </TabsContent>
          <TabsContent value="inbox"><Inbox/></TabsContent>
          <TabsContent value="profile"><ProfilePage/></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
