
const avatarHtml =(avatar)=>{
    //small avatar above
    document.querySelector('.avatar-small').setAttribute('src',`${avatar.avatarUrl}`)
    return `
    <img style="height:auto;" alt="Avatar" width="260" height="260" class="big-avatar" src="${avatar.avatarUrl}">
                <div>
                    <h2 class="avatar-name">${avatar.name}</h2>
                    <p class="avatar-username">${avatar.username}</p>
                    <p class="avatar-bio">${avatar.bio}</p>
                </div>`
}

const repoHtml = (repo)=>{
    //change the updated at format
    const reformatedUpdate = "Updated at 10 days ago"
    
    const repoDiv = document.createElement('div')
    repoDiv.classList.add('repository-details-wrapper')
    repoDiv.innerHTML = `
    <div class="repository-details">
    <h3 class="repository-details-name">${repo.name}</h3>
    <p class="repository-details-description">${repo.description?repo.description:""}
    </p>
    <div class="repository-details-stats">
        <p><span class="repo-language-color" style="background-color: ${repo.primaryLanguage ?repo.primaryLanguage.color:''}"></span>${repo.primaryLanguage? repo.primaryLanguage.name: ''}</p>
        <p><svg aria-label="star" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class=" octicon-star">
            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
        </svg>${repo.stargazerCount}</p>
        <p><svg aria-label="fork" role="img" viewBox="0 0 16 16" version="1.1" data-view-component="true" height="16" width="16" class="octicon octicon-repo-forked">
            <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
        </svg>${repo.forkCount}</p>
        <p>${reformatedUpdate}</p>
    </div>
</div>
<button class="button"><svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path></svg>Star</button>
    `
    return repoDiv
}

export {repoHtml, avatarHtml }