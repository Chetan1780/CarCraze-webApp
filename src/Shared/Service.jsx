import axios from "axios";
const sendbirdApplicationId = import.meta.env.VITE_SENDBIRD_APP_ID
const sendbirdApiToken = import.meta.env.VITE_SENDBIRD_API_TOKEN;
const FormatResult = (data) => {
    let result = [];
    let finalResult = []
    data.forEach((item) => {
        const ListingId = item.carListing?.id;
        if (!result[ListingId]) {
            result[ListingId] = {
                car: item.carListing,
                Images: [],
            }
        }
        if (item.carImages) {
            result[ListingId].Images.push(item.carImages)
        }
    })
    result.forEach((item) => {
        finalResult.push({
            ...item.car,
            images: item.Images
        })
    })
    return finalResult
}
const CreateSendBirdUser = async (userId, nickName, profileUrl) => {
    try {
        // Check if user already exists
        const userExistsResponse = await axios.get(
            `https://api-${sendbirdApplicationId}.sendbird.com/v3/users/${userId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Api-Token': sendbirdApiToken
                }
            }
        );

        // If the user exists, update their nickname and profile URL
        if (userExistsResponse.status === 200) {
            return await axios.put(
                `https://api-${sendbirdApplicationId}.sendbird.com/v3/users/${userId}`,
                {
                    nickname: nickName,
                    profile_url: profileUrl
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Api-Token': sendbirdApiToken
                    }
                }
            );
        }
    } catch (error) {
        // If user is not found (404), create a new one

        try {
            return await axios.post(
                `https://api-${sendbirdApplicationId}.sendbird.com/v3/users`,
                {
                    user_id: userId,
                    nickname: nickName,
                    profile_url: profileUrl,
                    issue_access_token: false,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Api-Token': sendbirdApiToken
                    }
                }
            );
        } catch (createError) {
            console.error('Error creating new user:', createError.response?.data || createError.message);
            throw createError; // Handle further errors if user creation fails
        }
    }
};

const CreateGroupChannel = async (channelName, userIds) => {
    return await axios.post(
        `https://api-${sendbirdApplicationId}.sendbird.com/v3/group_channels`,
        {
            name: channelName,
            user_ids: userIds, 
            is_distinct: false, 
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Api-Token': sendbirdApiToken,
            },
        }
    );
}
export default {
    FormatResult,
    CreateSendBirdUser,
    CreateGroupChannel
}