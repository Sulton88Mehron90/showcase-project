export function getTrivia(amount = 50, category, type = 'multiple', encode = 'url3986') {
  let API_ENDPOINT = `https://opentdb.com/api.php?amount=${amount}&type=${type}&encode=${encode}`;
  if (category) {
    API_ENDPOINT += `&category=${category}`;
  }
  
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

export function getCategories() {
  const CATEGORY_API_ENDPOINT = "https://opentdb.com/api_category.php";

  return fetch(CATEGORY_API_ENDPOINT)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.trivia_categories) 
    .catch(error => {
      console.error("There was a problem with the fetch operation:", error);
      throw error;
    });
}
