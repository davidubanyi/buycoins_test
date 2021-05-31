

import fetchGraphqlData from './api'
import htmlUpdater from './templating'
import repoHtml from './templates'

const repositoryDiv = document.querySelector('.repository-wrapper')
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
            usernameForm.setAttribute('hidden', '')
            mainContent.removeAttribute('hidden')
            //update the repositories
            htmlUpdater(repositoryDiv, repoHtml, userData.data.user.repositories.nodes)
        
        }
           //pass user data to html template
           //hide the user inpur form
           //introduce the ui for the profile page
          // mainContent.classList.remove('is-hidden')
           //go to the profile url
           
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
