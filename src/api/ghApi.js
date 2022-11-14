import axios from "axios";

axios.defaults.baseURL = "https://api.github.com";
axios.defaults.headers.common["Authorization"] =
  "token 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";
axios.defaults.headers.accept = "application/vnd.github+json";

const getUser = async (username) => {
  const { data } = await axios.get(`/users/${username}`);
  return data;
};

const getUserRepos = async (username, per_page, page) => {
  const { data } = await axios.get(
    `/users/${username}/repos?type=owner&per_page=${per_page}&page=${page}`
  );
  return data;
};

const getRateLimit = async () => {
  const response = await axios.get("/rate_limit");
  return response;
};

const searchUsers = async (name, page, per_page) => {
  try {
    const { data } = await axios.get(
      `/search/users?q=${name}&type=user&in=name&per_page=${per_page}&page=${page}`
    );

    const findUsers = data.items.map(({ login }) => {
      const response = getUser(login);
      return response;
    });
    const usersData = await Promise.all(findUsers);
    return { usersData, total: data.total_count };
  } catch (error) {
    console.log(error);
  }
};

export { getRateLimit, searchUsers, getUser, getUserRepos };
