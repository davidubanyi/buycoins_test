//TODO
//1. Get the username value
//Send value to the api service to fetch the data
//Show a loading state 
//Send to new page or show error if fetch didn't succeed
//There should be a state if there is no repo for the user
//Populate the html page with the data
//   Write a function that accepts an array and creates dom nodes using the values of the array
const API_URL = "https://api.github.com"
const first = 20

const query = `query user($login:String!) {
    user(login: $login) { 
      avatarUrl
      bio
      bioHTML
      repositories(first: 20){
        nodes{
          stargazerCount
          updatedAt
          primaryLanguage{
            color
            name
          }
        }
      }
    }
}`
    
    
 async function fetchGraphqlData(username){
    const requestOptions = {
        method: 'POST',
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"},
        body: JSON.stringify({
          query,
          variables: {login: username}
      }),
        redirect: 'follow'
      };

      const result = await fetch("https://api.github.com/graphql", requestOptions)
      .then(response => response.text())
      .then(result => {return result})
      .catch(error => console.log('error', error));

      return result
 }   



const usernameForm = document.getElementById('usernameForm');
usernameForm.onsubmit = handleSubmit;
const errorDiv = document.getElementById('error')


async function handleSubmit(event) {
    event.preventDefault();
    const gitUsername = event.target.elements.username.value
    if (gitUsername) {
        loading(true)
        //fire the fetch
        try {
           await fetchGraphqlData(gitUsername).then(data =>{console.log(data)})

            usernameForm.setAttribute('hidden', '')
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
