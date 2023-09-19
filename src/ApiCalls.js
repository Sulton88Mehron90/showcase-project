
export function getTrivia(amount = 50, type = 'multiple', encode = 'url3986') {
    const API_ENDPOINT = `https://opentdb.com/api.php?amount=${amount}&type=${type}&encode=${encode}`;
    
    return fetch(API_ENDPOINT)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }
  