const apiKey = `Bearer ${process.env.API_KEY}`
const apiUrl = process.env.API_URL

const query = `query user($login:String!) {
    user(login: $login) {
      name
      login
      avatarUrl
      bio
      bioHTML
      repositories(first:20,orderBy:{field:UPDATED_AT, direction:DESC}){
        totalCount
        nodes{
          name
          description
          stargazerCount
          forkCount
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
          "Authorization": apiKey,
          "Content-Type": "application/json"},
        body: JSON.stringify({
          query,
          variables: {login: username}
      }),
        redirect: 'follow'
      };

      const result = await fetch(apiUrl, requestOptions)
      .then(response => response.json())

      return result

 }   


 export default fetchGraphqlData