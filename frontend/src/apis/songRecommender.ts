import { SPOTIFY_OAUTH } from "../constants/keys";
import { request } from "../lib/Axios";
import { isEmptyData } from "../utils/commonUtils";
import { getCookieData, setCookieData } from "../utils/cookieUtil";

export const getSpotifyAccessToken = async () => {
  try {
    const auth = `Basic ${Buffer.from(
      process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID +
        ":" +
        process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
    ).toString("base64")}`;

    const response = await request(
      process.env.NEXT_PUBLIC_ACCOUNTS_SPOTIFY_BASE_URL
    ).post(
      "/api/token",
      {
        grant_type: "client_credentials",
      },
      {
        headers: {
          Authorization: auth,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    setCookieData(SPOTIFY_OAUTH, JSON.stringify(response.data), {
      expires: Date.now() + response.data?.expires_in * 1000,
      path: "/",
      sameSite: "Strict",
      secure: true,
    });
    return response.data;
  } catch (e) {
    console.log({ error: e });
    return {};
  }
};

export const getGenreBasedSongRecommendation = async ({
  genre = "sad",
  offset = 0,
}) => {
  try {
    let spotifyAccessToken = await getCookieData(SPOTIFY_OAUTH);
    if (isEmptyData(spotifyAccessToken)) {
      spotifyAccessToken = await getSpotifyAccessToken();
    } else {
      spotifyAccessToken = JSON.parse(spotifyAccessToken || "{}");
    }

    const recommendation = await request(
      process.env.NEXT_PUBLIC_SPOTIFY_BASE_URL
    ).get("/search", {
      params: {
        type: "album",
        q: encodeURIComponent(`genre:${genre}`),
        offset,
      },
      headers: {
        Authorization: `${spotifyAccessToken?.token_type} ${spotifyAccessToken?.access_token}`,
      },
    });
    return recommendation.data;
  } catch {
    return {};
  }
};
