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
    
    let foundFollowers = false
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
                    newLI.innerText = channelFollowing.following[i].to_name
                    followingUL.appendChild(newLI)
                }
                foundFollowers = true
            }
            
            const followDiv = document.getElementById('followDiv')
            followDiv.style.display = ""
        }
        else{
            followDiv.style.display = "none"
        }
    })
}

let getChannelInfo = async(channelName) => {
    try{
        let res = await fetch(`https://api.twitch.tv/helix/users?login=${channelName}`,{
            headers:{
                "Client-ID":"o099v47qn5evhck790hfx1ch78ln12"
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
                "Client-ID":"o099v47qn5evhck790hfx1ch78ln12"
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
                        "Client-ID":"o099v47qn5evhck790hfx1ch78ln12"
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

let currentURL = window.location.href
document.body.addEventListener('click', () => {
    setTimeout(() => {
        if(currentURL !== window.location.href){
            currentURL = window.location.href
            createNewFollowItem()
            foundFollowers = false;
            while(ul.firstChild){
                ul.removeChild(ul.firstChild)
            }
        }
    }, 5000)
})

if(document.getElementsByClassName('tw-align-items-center tw-flex tw-flex-grow-1 tw-flex-wrap tw-font-size-4 tw-full-height tw-justify-content-center')[0].childElementCount === 5){
    createNewFollowItem()
}

fetch(browser.runtime.getURL("html/following.html"))
    .then(data => data.text())
    .then(html => {
        console.log(html)
        /* document.getElementsByClassName('tw-align-items-center tw-flex tw-flex-grow-1 tw-flex-wrap tw-font-size-4 tw-full-height tw-justify-content-center')[0]
            .appendChild(html) */
        document.body.appendChild(html)

        const closeBtn = document.getElementById('closeBtn')
        closeBtn.addEventListener('click',() => {
            document.getElementById('followDiv').style.display = 'none'
        })
})

const followDiv = document.createElement('div')
followDiv.id = 'followDiv'
followDiv.style.display = 'none'
followDiv.style.position = 'absolute'
followDiv.style.backgroundColor = 'black'
followDiv.style.width = '339px'
followDiv.style.height = '500px'
followDiv.style.zIndex = '10'
followDiv.style.top = '51px'
followDiv.style.right = '0px'
followDiv.style.borderStyle = "solid"
followDiv.style.borderColor = 'Silver'
followDiv.style.borderTopWidth = '1px'
followDiv.style.borderRightWidth = '1px'
followDiv.style.borderBottomWidth = '1px'
followDiv.style.borderRadius = '3px'
followDiv.style.paddingTop = "1px"
followDiv.style.paddingLeft = "1px"
//followDiv.style.overflow = 'auto'

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
//ul.style.overflow = 'auto'
ul.style.paddingLeft = '5px'
const ulDiv = document.createElement('div')
ulDiv.style.height = "90%"
ulDiv.style.overflow = 'auto'
ulDiv.style.scrollBehavior = 'inherit'

ulDiv.appendChild(ul)
followDiv.appendChild(ulDiv)
