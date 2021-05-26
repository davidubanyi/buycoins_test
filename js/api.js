//TODO
//1. Connect to the graphql api
//2. Fetch the data from the api after search

const API_URL = "https://api.github.com"

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
