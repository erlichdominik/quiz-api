import React from "react";

import axios from "../api/axios";
import USER_ROLES from "../utils/roles/authRoles";
import useAuth from "./useAuth";

const REFRESH_URL = "auth/refreshtoken";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(REFRESH_URL, {
      withCredentials: true,
    });

    setAuth((prev) => {
      return {
        ...prev,
        roles: [USER_ROLES.regularUser],
        accessToken: response.data.accessToken,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
