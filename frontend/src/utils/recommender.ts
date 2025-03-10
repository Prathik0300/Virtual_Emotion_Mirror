import {
  MOOD_TO_MOVIE_GENRES_MAP,
  MOOD_TO_SONG_GENRES_MAP,
} from "../constants/enums";

export const getRecommendedSongGenres = (mood: string) => {
  switch (mood) {
    case "happy":
      return MOOD_TO_SONG_GENRES_MAP.happy.join(",");
    case "neutral":
      return [
        ...MOOD_TO_SONG_GENRES_MAP.happy,
        ...MOOD_TO_SONG_GENRES_MAP.neutral,
      ].join(","); // Uplifting + chill
    case "sad":
      return [
        ...MOOD_TO_SONG_GENRES_MAP.happy,
        ...MOOD_TO_SONG_GENRES_MAP.sad,
      ].join(","); // Cheerful + comforting
    case "angry":
      return [
        ...MOOD_TO_SONG_GENRES_MAP.happy,
        ...MOOD_TO_SONG_GENRES_MAP.angry,
      ].join(","); // Energetic + positive
    default:
      return MOOD_TO_SONG_GENRES_MAP.neutral.join(",");
  }
};

export const getRecommendedMovieGenres = (mood: string) => {
  return MOOD_TO_MOVIE_GENRES_MAP[mood].join(",");
};
