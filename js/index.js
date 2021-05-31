import fetchGraphqlData from "./api";
import htmlRenderer from "./templating";
import { repoTemplate, avatarTemplate, mobileAvatarTemplate } from "./templates";

//get template nodes
const repositoryDiv = document.querySelector(".repository-wrapper");
const profileDiv = document.querySelector(".profile-wrapper");
const repoCounter = document.querySelector(".repository-counter");
const mobileProfileDiv = document.querySelector(".mobile-avatar-wrapper")

//get static content nodes
const usernameForm = document.getElementById("usernameForm");
const errorDiv = document.getElementById("error");
const mainContent = document.querySelector(".main");

//handle the username submission
usernameForm.onsubmit = handleSubmit;

//username input function handler
async function handleSubmit(event) {
  event.preventDefault();
  //get inputed value (can handle validation in the future)
  const gitUsername = event.target.elements.username.value;
  //temp validation if there is an input, handle the async requests
  if (gitUsername) {
    //show loading animation
    loading(true);
    //fire the fetch
    try {
      const userData = await fetchGraphqlData(gitUsername);
      //handle errors
      if (userData.errors || userData.documentation_url) {
        throw userData.errors ? userData.errors[0].message : userData.message;
      }
      //the data is fine
      else {
        const user = userData.data.user;
        //simplify data from the api
        const repos = [...user.repositories.nodes];
        const profile = {
          name: user.name,
          bio: user.bio,
          username: user.login,
          avatarUrl: user.avatarUrl,
        };
        //update the repositories
        htmlRenderer(repos, repositoryDiv, repoTemplate);
        //update the profile
        htmlRenderer(profile, profileDiv, avatarTemplate);
        //update the mobile profile
        htmlRenderer(profile, mobileProfileDiv, mobileAvatarTemplate)
        //update repo count
        htmlRenderer(user.repositories.totalCount, repoCounter);
        //show the page with the updated info
        mainContent.removeAttribute("hidden");
        usernameForm.classList.add("is-hidden");
      }
    } catch (error) {
      //console the error
      console.log(error);
      //show the error notification
      errorDiv.removeAttribute("hidden");
    } finally {
      //handle loading close
      loading(false);
    }
  }
}

function loading(state) {
  //set the full page to show the loading animation
  if (state) {
    //show animation
    console.log("loading on");
  } else {
    //stop animation
    console.log("loading off");
  }
}
