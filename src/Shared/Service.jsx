import axios from "axios";
const sendbirdApplicationId = import.meta.env.VITE_SENDBIRD_APP_ID
const sendbirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;
const FormatResult=(data)=>{
    let result = [];
    let finalResult = []
    data.forEach((item)=>{
        const ListingId = item.carListing?.id;
        if(!result[ListingId]){
            result[ListingId]={
                car:item.carListing,
                Images:[],
            }
        }
        if(item.carImages){
            result[ListingId].Images.push(item.carImages)
        }
    })
    result.forEach((item)=>{
        finalResult.push({
            ...item.car,
            images:item.Images
        })
    })
    return finalResult
}
const CreateSendBirdUser = async (userId, nickName, profileUrl) => {
    try {
        // Check if user already exists
        const userExistsResponse = await axios.get(`https://api-${sendbirdApplicationId}.sendbird.com/v3/users/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Api-Token': sendbirdApiToken
            }
        });

        // If the user exists, update their nickname and profile URL
        if (userExistsResponse.status === 200) {
            console.log('User already exists. Updating user info...');
            return await axios.put(`https://api-${sendbirdApplicationId}.sendbird.com/v3/users/${userId}`, {
                nickname: nickName,
                profile_url: profileUrl
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Token': sendbirdApiToken
                }
            });
        }
    } catch (error) {
        // If the error is related to user not found (404), proceed to create a new user
        if (error.response && error.response.status === 404) {
            console.log('User does not exist. Creating a new user...');
            return await axios.post(`https://api-${sendbirdApplicationId}.sendbird.com/v3/users`, {
                user_id: userId,
                nickname: nickName,
                profile_url: profileUrl,
                issue_access_token: false,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Token': sendbirdApiToken
                }
            });
        } else {
            // Handle other errors
            console.error('Error checking or creating user:', error);
            throw error; // Rethrow the error for further handling if necessary
        }
    }
};
const CreateGroupChannel = async (channelName, userIds) => {
    try {
        const response = await axios.post(
            `https://api-${sendbirdApplicationId}.sendbird.com/v3/group_channels`,
            {
                name: channelName,
                user_ids: userIds, // Array of user IDs to invite to the channel
                is_distinct: true, // Set to true if you want a distinct channel
                // cover_url: '', // Optional: URL for the channel cover image
                // data: '', // Optional: Metadata for the channel
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Token': sendbirdApiToken,
                },
            }
        );
    } catch (error) {
        console.error('Error creating group channel:', error);
        throw error; // Rethrow the error for further handling if necessary
    }
};
export default{
    FormatResult,
    CreateSendBirdUser,
    CreateGroupChannel
}