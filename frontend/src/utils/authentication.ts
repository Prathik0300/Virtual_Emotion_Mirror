import axios from "axios";

export const OAuthAuthenticate = (user: any, setProfile: any) => {
  axios
    .get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json",
        },
      }
    )
    .then((response) => setProfile(response.data))
    .catch((error) => console.log(error));
};
