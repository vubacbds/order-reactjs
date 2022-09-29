import axiosClient from "./axiosClient";

const UserAPI = {
  login: (data) => {
    const url = "/user/login";
    return axiosClient.post(url, data);
  },
};

export default UserAPI;
