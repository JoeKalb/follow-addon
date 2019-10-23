let createNewFollowItem = () => {
    const topDiv = document.createElement('div')
    topDiv.className = 'tw-align-center tw-flex tw-flex-column tw-full-height'
    const newDiv = document.createElement('div')
    newDiv.className = 'tw-flex-grow-0'
    const newDiv2 = document.createElement('div')
    newDiv2.className = 'tw-font-size-5 tw-regular'
    newDiv2.innerText = 'Following'
    const newA = document.createElement('a')
    newA.className = 'tw-block tw-c-text-inherit tw-full-height tw-full-width tw-interactive tw-pd-l-1 tw-pd-r-1 tw-tab-item'
    const newLi = document.createElement('li')
    newLi.className = 'tw-align-items-center tw-c-text-base tw-flex-grow-0 tw-full-height tw-justify-content-center tw-tabs__tab'
    newLi.style.cursor = "pointer"
    newLi.id = "following-li-item"
    
    newDiv.appendChild(newDiv2)
    topDiv.appendChild(newDiv2)
    newA.appendChild(topDiv)
    newLi.appendChild(newA)
    
    document.getElementsByClassName('tw-align-items-center tw-flex tw-flex-grow-1 tw-flex-wrap tw-font-size-4 tw-full-height tw-justify-content-center')[0]
        .appendChild(newLi)
    
    newLi.addEventListener('click', async () => {
        const followDiv = document.getElementById('followDiv')
        if(followDiv.style.display === "none"){
            const pathArr = window.location.pathname.match(/[a-z]+/mg)
            const channel = pathArr[0]

            if(channel !== channelName){
                foundFollowers = false
                const ul = document.getElementById('follow-ul')
                while(ul.firstChild){
                    ul.removeChild(ul.firstChild)
                }
                channelName = channel
            }
        
            if(!foundFollowers){
                let userInfo = await getChannelInfo(channel)
                if(userInfo === 0) return
            
                let channelFollowing = await getChannelFollowing(userInfo.id)
                if(channelFollowing === 0) return
            
                const followingUL = document.getElementById('follow-ul')
                for(let i = 0; i < channelFollowing.total; ++i){
                    const newLI = document.createElement('li')
                    newLI.className = 'following-li'
                    newLI.dataset.name = channelFollowing.following[i].to_name
                    newLI.dataset.id = channelFollowing.following[i].to_id
                    newLI.dataset.date = channelFollowing.following[i].followed_at

                    const p = document.createElement('span')
                    p.innerText = channelFollowing.following[i].to_name
                    //p.href = `https://www.twitch.tv/${channelFollowing.following[i].to_name}`
                    //p.target = '_blank'
                    p.className = 'following-li-p'
                    p.addEventListener('click', () => singleFollowingDiv(
                        channelFollowing.following[i].to_name
                    ))

                    newLI.appendChild(p)
                    followingUL.appendChild(newLI)
                }
                const followingHeader = document.getElementById('following-header')
                followingHeader.innerText = `FOLLOWING: ${channelFollowing.total}`

                foundFollowers = true
            }
            
            followDiv.style.display = ""
        }
        else{
            followDiv.style.display = "none"
        }
    })
}

let singleFollowingDiv = async (name) => {
    let res = await getChannelInfo(name)
    console.log(res)
    if(res !== 0){
        const singleFollowDiv = document.getElementById('singleFollowDiv')
        //singleFollowDiv.style.display = ''
        const singleFollowATag = document.getElementById('singleFollowATag')
        const singleFollowImg = document.getElementById('singleFollowImg')
        const singleFollowDescription = document.getElementById('singleFollowDescription')
        const singleFollowers = document.getElementById('singleFollowers')

        singleFollowDiv.style.backgroundImage = `url(${res.offline_image_url})`

        singleFollowATag.href = `https://www.twitch.tv/${res.login}`
        singleFollowATag.innerText = res.display_name
        singleFollowATag.description = `https://www.twitch.tv/${res.login}`
        
        singleFollowDescription.innerText = res.description

        singleFollowImg.src = res.profile_image_url
        singleFollowImg.title = res.display_name
        singleFollowImg.style.height = '100px'
        singleFollowImg.style.width = '100px'

        let followCount = await getChannelFollowerCount(res.id)
        if(followCount !== 0){
            singleFollowers.innerText = `Followers: ${followCount}`
        }

        let isStreaming = await getStreamsByID(res.id)
        console.log(isStreaming)

        let topClips = await getClipsByID(res.id)
        console.log(topClips)
    }
}

let createFollowingDiv = () => {
    const followDiv = document.createElement('div')
    followDiv.id = 'followDiv'
    followDiv.style.display = 'none'
    
    const headerDiv = document.createElement('div')
    headerDiv.style.display = 'flex'
    
    const newP = document.createElement('p')
    newP.innerText = "FOLLOWING"
    newP.style.verticalAlign = "bottom"
    newP.id = 'following-header'
    
    const closeBtn = document.createElement('button')
    closeBtn.id = 'closeBtn'
    closeBtn.innerText = 'X'
    closeBtn.className = 'tw-align-items-center tw-align-middle tw-border-bottom-left-radius-medium tw-border-bottom-right-radius-medium tw-border-top-left-radius-medium tw-border-top-right-radius-medium tw-button-icon tw-core-button tw-core-button--border tw-inline-flex tw-interactive tw-justify-content-center tw-overflow-hidden tw-relative'
    closeBtn.style.position = "absolute"
    closeBtn.style.marginLeft = '10px'
    closeBtn.style.marginTop = '10px'
    closeBtn.addEventListener('click', () => {
        followDiv.style.display = 'none'
    })
    
    followDiv.appendChild(headerDiv)
    headerDiv.appendChild(closeBtn)
    headerDiv.appendChild(newP)
    document.body.appendChild(followDiv)
    
    const ul = document.createElement('ul')
    ul.id = 'follow-ul'
    const ulDiv = document.createElement('div')
    ulDiv.className = 'scroll'

    const singleFollowDiv = document.createElement('div')
    singleFollowDiv.id = 'singleFollowDiv'

    const singleInfoDiv = document.createElement('div')
    singleInfoDiv.id = 'singleInfoDiv'
    singleInfoDiv.className = 'purpleBack'

    const img = document.createElement('img')
    img.id = 'singleFollowImg'

    const textInfoDiv = document.createElement('div')
    textInfoDiv.id = 'textInfoDiv'
    const a = document.createElement('a')
    a.id = 'singleFollowATag'
    a.target = '_blank'
    const followers = document.createElement('p')
    followers.id = 'singleFollowers'
    const des = document.createElement('p')
    des.id = 'singleFollowDescription'
    textInfoDiv.append(a, followers, des)

    singleInfoDiv.appendChild(img)
    singleInfoDiv.appendChild(textInfoDiv)
    singleFollowDiv.appendChild(singleInfoDiv)
    
    ulDiv.appendChild(singleFollowDiv)
    ulDiv.appendChild(ul)
    followDiv.appendChild(ulDiv)    
}

let isFollowingExt = (e) => {
    const followingLI = document.getElementById('following-li-item')
    const followDiv = document.getElementById('followDiv')
    const closeFollowBtn = document.getElementById('closeBtn')

    return (followingLI.contains(e.target) || followDiv.contains(e.target)) 
    && !closeFollowBtn.contains(e.target)
}
