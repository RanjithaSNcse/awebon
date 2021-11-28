
const serverUrl = 'https://619b61042782760017445573.mockapi.io/api';

export function apiCall(service, input,method,callback) {
   var userDetails=JSON.parse(sessionStorage.getItem('userDet'));
    return fetch(serverUrl + service,
    {
      method : method,
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(input)
    })
    .then((response) => response.json())
    .then((responseJson) => {
        return callback(responseJson); 
    })
    .catch((error) => {
      console.error(error);
    });

  }
 