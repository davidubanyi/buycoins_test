//TODO
//1. Connect to the graphql api
//2. Fetch the data from the api after search

const API_URL = "https://developer.github.com/v4/explorer/"
const first = 20

const query = `query  
    user($login:Sring!, $first: Int!) { 
      avatarUrl
      bio
      bioHTML
      repositories(first: 20, ){
        nodes{
          stargazerCount
          updatedAt
          primaryLanguage{
            color
            name
          }
        }
      }
    }`

function getGraphqlData(login){
    fetch(`${API_URL}/graphql`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query,
            variables: {login,first}
        })
    }).then(r=>r.json()).then(data => {return data})
}
