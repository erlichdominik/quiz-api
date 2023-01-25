import { useCallback, useEffect, useState } from "react";

import useAxiosPrivate from "./useAxiosPrivate";

const usePrivateRequests = ({
  url,
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

  const loadData = async () => {
    let response = null;
    try {
      if (requestType === "GET") {
        response = await axiosPrivate.get(url, options);
        setResponseData(response?.data);
        setResponseCode(response?.status);
      } else if (requestType === "POST") {
        response = await axiosPrivate.post(url, body, options);
        setResponseData(response?.data);
        setResponseCode(response?.status);
      }
    } catch (err) {
      setInfoMessage(err?.reponse?.data?.message);
      setResponseCode(err?.response?.status);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (loadType === "INITIAL_LOAD") {
      loadData();
    }
  }, []);

  return { isLoading, responseData, responseCode, infoMessage, loadData };
};

export default usePrivateRequests;
