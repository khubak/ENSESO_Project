import * as URL from "./urls";
import axios from "axios";
import requestHeaders from "./auth";

const getAll = async () => {
  const requestURL = URL.baseURL + URL.getAllURL;

  try {
    const response = axios({
      method: "get",
      url: requestURL,
      headers: requestHeaders("GET"),
    });
    return response;
  } catch (error) {
    console.error("There was an error making the request:", error);
    throw error;
  }
};

export default getAll;
