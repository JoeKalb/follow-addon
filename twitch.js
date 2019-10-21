let foundFollowers = false
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
        
            if(!foundFollowers){
                let userInfo = await getChannelInfo(channel)
                if(userInfo === 0) return
            
                let channelFollowing = await getChannelFollowing(userInfo.id)
                if(channelFollowing === 0) return
            
                const followingUL = document.getElementById('follow-ul')
                for(let i = 0; i < channelFollowing.total; ++i){
                    const newLI = document.createElement('li')
                    newLI.dataset.name = channelFollowing.following[i].to_name
                    newLI.dataset.id = channelFollowing.following[i].to_id
                    newLI.dataset.date = channelFollowing.following[i].followed_at
                    //newLI.innerText = channelFollowing.following[i].to_name

                    const a = document.createElement('a')
                    a.innerText = channelFollowing.following[i].to_name
                    a.href = `https://www.twitch.tv/${channelFollowing.following[i].to_name}`
                    a.target = '_blank'

                    newLI.appendChild(a)
                    followingUL.appendChild(newLI)
                }
                foundFollowers = true
            }
            
            followDiv.style.display = ""
        }
        else{
            followDiv.style.display = "none"
        }
    })
}

let channelName = window.location.pathname.match(/[a-z]+/mg)[0]
document.body.addEventListener('click', (e) => {

    const followDiv = document.getElementById('followDiv')
    const followingBtn = document.getElementById('following-li-item')
    /* if(followDiv.style.display === "" 
        && (!followDiv.contains(e.target)) || !followingBtn.contains(e.target)){
        followDiv.style.display = "none"
        rething logic for this area
    } */
    
    setTimeout(() => {
        let currentChannel = window.location.pathname.match(/[a-z]+/mg)[0]
        if(channelName !== currentChannel){
            currentURL = currentChannel
            foundFollowers = false

            if(document.getElementsByClassName('tw-align-items-center tw-flex tw-flex-grow-1 tw-flex-wrap tw-font-size-4 tw-full-height tw-justify-content-center')[0].childElementCount === 5)
                createNewFollowItem()
            
            while(ul.firstChild){
                ul.removeChild(ul.firstChild)
            }
        }
    }, 5000)
})

if(document.getElementsByClassName('tw-align-items-center tw-flex tw-flex-grow-1 tw-flex-wrap tw-font-size-4 tw-full-height tw-justify-content-center')[0].childElementCount === 5){
    createNewFollowItem()
}

let createFollowingDiv = () => {
    const followDiv = document.createElement('div')
    followDiv.id = 'followDiv'
    followDiv.style.display = 'none'
    
    const headerDiv = document.createElement('div')
    headerDiv.style.display = 'flex'
    
    const newP = document.createElement('p')
    newP.innerText = "Following"
    newP.style.verticalAlign = "bottom"
    newP.style.paddingTop = "18px"
    newP.style.paddingLeft = "100px"
    
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
    
    ulDiv.appendChild(ul)
    followDiv.appendChild(ulDiv)    
}
createFollowingDiv()