import axios from 'axios'
const BASEURL = "http://192.168.16.137:8000/";
const cache = {};

const client = axios.create({
  baseURL: BASEURL,
});

// export const axiosPrivate = axios.create({
//   baseURL: BASEURL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

// Caching data for GET requests
client.get = async (url, config = {}) => {
  const cacheKey = url + JSON.stringify(config.params || {});

  // If the response is already cached, return it directly
  if (cache[cacheKey]) {
    console.log("Data retrieved from cache:", cache[cacheKey]);
    return cache[cacheKey];
  }

  try {
    // console.log("Making network request...");
    const axiosInstance = axios.create({ baseURL: BASEURL });
    const response = await axiosInstance.get(url, config);
    // console.log("Data retrieved from network:", response.data);
    // Cache the response for future use
    cache[cacheKey] = response;

    return response;
  } catch (error) {
    console.log(error)
  }
};

export default client