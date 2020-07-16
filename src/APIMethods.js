let apiKey = "AIzaSyB3qWcupOE6HyS-qbnhnjRxHh8rM3w5Ra8";

export default {
  searchBooks: async function(keyword) {
    const data = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${keyword}&key=${apiKey}`
    );
    const json = await data.json();

    console.log(json);
    return json;
  }
};
