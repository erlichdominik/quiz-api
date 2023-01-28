import { useEffect, useState } from "react";

import useAxiosPrivate from "./useAxiosPrivate";

const usePrivateRequests = ({
  url = "",
  body = {},
  queryParams = {},
  options = {
    headers: {
      "Content-Type": "application/json",
    },
    params: queryParams,
  },
  requestType = "GET",
  loadType = "INITIAL_LOAD",
}) => {
  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [infoMessage, setInfoMessage] = useState("");
  const [responseCode, setResponseCode] = useState("");

  const performRequest = async (customUrl = url) => {
    let response = null;
    try {
      if (requestType === "GET") {
        response = await axiosPrivate.get(customUrl, options);
      } else if (requestType === "POST") {
        response = await axiosPrivate.post(customUrl, body, options);
      } else if (requestType === "DELETE") {
        response = await axiosPrivate.delete(customUrl, options);
      }
      setResponseData(response?.data);
      setResponseCode(response?.status);
    } catch (err) {
      setInfoMessage(err?.response?.data?.message);
      setResponseCode(err?.response?.status);
      return err;
    } finally {
      setIsLoading(false);
    }
    return response;
  };

  useEffect(() => {
    if (loadType === "INITIAL_LOAD") {
      performRequest();
    }
  }, []);

  return { isLoading, responseData, responseCode, infoMessage, performRequest };
};

export default usePrivateRequests;
