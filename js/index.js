

import fetchGraphqlData from './api'
import htmlUpdater from './templating'
import {repoHtml, avatarHtml} from './templates'

const repositoryDiv = document.querySelector('.repository-wrapper')
const profileDiv = document.querySelector('.profile-wrapper')
const repoCounter = document.querySelector('.repository-counter')
const usernameForm = document.getElementById('usernameForm');
const errorDiv = document.getElementById('error');
const mainContent = document.querySelector('.main')
usernameForm.onsubmit = handleSubmit;


async function handleSubmit(event) {
    event.preventDefault();
    const gitUsername = event.target.elements.username.value
    if (gitUsername) {
        loading(true)
        //fire the fetch
        try {
           const userData = await fetchGraphqlData(gitUsername)
           if(userData.errors || userData.documentation_url){
             throw (userData.errors ? userData.errors[0].message : userData.message)
            }
            //the data is fine 
            else { 
            const user = userData.data.user
            //simplify data from the api
            const repos = [...user.repositories.nodes]
            const profile = {name: user.name, bio: user.bio, username: user.login, avatarUrl: user.avatarUrl }
            //update the repositories
            htmlUpdater(repos, repositoryDiv, repoHtml)
            //update the profile
            htmlUpdater(profile, profileDiv, avatarHtml )
            //update repo count
            htmlUpdater(user.repositories.totalCount, repoCounter)    
            //show the page with the updated info
            mainContent.removeAttribute('hidden')
            usernameForm.classList.add('is-hidden')
        }
        }
        catch (error) {
            console.log(error)
            errorDiv.removeAttribute('hidden')
        } finally {
            loading(false)
        }

    }

}

function loading(state) {
    //set the full page to show the loading animation
    if (state) {
        //show animation
        console.log("loading on")
    } else {
        //stop animation
        console.log("loading off")
    }
}
