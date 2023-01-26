export const setAuthToken = (user) =>{
    const currentUser = {
        email: user.email
    }

//get jwt token
fetch('https://car-service-hub-server.vercel.app/jwt', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(currentUser)
  })
  .then(res => res.json())
  .then(data => {
    console.log(data)
    // Local storage is the easiest but not the best place to store jwt token
    localStorage.setItem('car-service-token' , data.token);
    // navigate(from, {replace: true});
  })
}