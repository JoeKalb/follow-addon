const CLIENT_ID = "o099v47qn5evhck790hfx1ch78ln12"

let getChannelInfo = async(channelName) => {
    try{
        let res = await fetch(`https://api.twitch.tv/helix/users?login=${channelName}`,{
            headers:{
                "Client-ID":CLIENT_ID
            }
        })
        let json = await res.json()
        return json.data[0]
    }
    catch(err){
        console.log(err)
        return 0
    }
}

let getChannelFollowing = async(channelID) => {
    try{
        let res = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${channelID}&first=100`, {
            headers:{
                "Client-ID":CLIENT_ID
            }
        })
        let json = await res.json()

        const { total } = json
        let following = [...json.data]
        while(json.data.length !== 0){
            try{
                const { cursor } = json.pagination
                res = await fetch(`https://api.twitch.tv/helix/users/follows?from_id=${channelID}&first=100&after=${cursor}`, {
                    headers:{
                        "Client-ID":CLIENT_ID
                    }
                })
                json = await res.json()
    
                following = [...following, ...json.data]
            }
            catch(err){
                json.data = []
                console.log(err)
            }
        }

        return {
            total,
            following
        }
    }
    catch(err){
        console.log(err)
        return 0
    }
}

let getChannelFollowerCount = async(channelID) => {
    try{
        let res = await fetch(`https://api.twitch.tv/helix/users/follows?to_id=${channelID}`, {
            headers:{
                "Client-ID":CLIENT_ID
            }
        })
        let json = await res.json()

        return json.total
    }
    catch(err){
        console.log(err)
        return 0
    }
}

let getStreamsByID = async(channelID) => {
    try{
        let res = await fetch(`https://api.twitch.tv/helix/streams?user_id=${channelID}`, {
            headers:{
                "Client-ID":CLIENT_ID
            }
        })
        let json = await res.json()

        return json.data[0]
    }
    catch(err){
        console.log(err)
        return 0
    }
}

let getVODSByID = async(channelID) => {
    try{
        let res = await fetch(`https://api.twitch.tv/helix/videos?user_id=${channelID}`, {
            headers:{
                "Client-ID":CLIENT_ID
            }
        })
        let json = await res.json()

        return json.data
    }
    catch(err){
        console.log(err)
        return 0
    }
}

let getClipsByID = async(channelID) => {
    try{
        let res = await fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${channelID}&first=3`, {
            headers:{
                "Client-ID":CLIENT_ID
            }
        })
        let json = await res.json()

        return json.data
    }
    catch(err){
        console.log(err)
        return 0
    }
}

let getGamesByID = async(gameIDArr) => {
    try{
        let res = await fetch(`https://api.twitch.tv/helix/clips?id=${gameIDArr.join('&id=')}`, {
            headers:{
                "Client-ID":CLIENT_ID
            }
        })
        let json = await res.json()

        return json.data
    }
    catch(err){
        console.log(err)
        return 0
    }
}