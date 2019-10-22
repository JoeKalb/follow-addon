// all listeners and function calls will happen here
let foundFollowers = false
let channelName = window.location.pathname.match(/[a-z]+/mg)[0]
document.body.addEventListener('click', (e) => {

    if(!document.getElementById('following-li-item')){
        createNewFollowItem()
    }

    const ul = document.getElementById('follow-ul')
    setTimeout(() => {
        let currentChannel = window.location.pathname.match(/[a-z]+/mg)[0]
        if(channelName !== currentChannel){
            currentURL = currentChannel
            foundFollowers = false

            if(!document.getElementById('following-li-item'))
                createNewFollowItem()
            
            while(ul.firstChild){
                ul.removeChild(ul.firstChild)
            }
        }
    }, 5000)
})

window.addEventListener('click', (e) => {
    const followDiv = document.getElementById('followDiv')
    if(!isFollowingExt(e) && followDiv.style.display === ''){
        followDiv.style.display = 'none'
    }
})

createFollowingDiv()

if(!document.getElementById('following-li-item')){
    createNewFollowItem()
}