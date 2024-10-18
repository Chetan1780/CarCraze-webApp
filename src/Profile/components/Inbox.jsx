import React, { useState,useEffect } from 'react'
import { App as SendbirdApp, SendBirdProvider } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import { useUser } from '@clerk/clerk-react';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
const Inbox = () => {
    const { user } = useUser();
    const [userId, setuserId] = useState()
    const [channelUrl,setChannelUrl] = useState();
    useEffect(() => {
        if (user) {
            const id = user.primaryEmailAddress.emailAddress.split('@')[0];
            setuserId(id); // Correct usage of the computed id
        }
    }, [user]);
    return (
        <div>
            <div style={{ width: '100%', height: '80vh' }}>
                <SendBirdProvider userId={userId} nickname={user?.fullName} profileUrl={user?.imageUrl} allowProfileEdit={true} appId={import.meta.env.VITE_SENDBIRD_APP_ID}>
                    <div className='grid grid-cols-1 gap-2 md:grid-cols-3 h-full'>
                        {/* Channel List  */}
                        <div className='p-5 border shadow-lg'>
                            <GroupChannelList onChannelSelect={(channel)=>{
                                setChannelUrl(channel?.url)
                            }} channelListQueryParams={
                                {
                                    includeEmpty:true,
                                }
                            } />
                            
                        </div>
                        {/* Channel Message  */}
                        <div className='col-span-2 shadow-lg'>
                        <GroupChannel channelUrl={channelUrl} />
                        </div>
                    </div>

                </SendBirdProvider>
            </div>
        </div>
    )
}

export default Inbox
