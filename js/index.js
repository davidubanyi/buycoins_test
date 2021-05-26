//TODO
//1. Get the username value
//Send value to the api service to fetch the data
//Show a loading state 
//Send to new page or show error if fetch didn't succeed
//There should be a state if there is no repo for the user
//Populate the html page with the data
//   Write a function that accepts an array and creates dom nodes using the values of the array

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
           //hide the user inpur form
           usernameForm.setAttribute('hidden', '')
           //introduce the ui for the profile page
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
