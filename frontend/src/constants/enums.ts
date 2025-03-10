export const PERMISSION_STATUS = {
  GRANTED: "granted",
  PROMPT: "prompt",
  DENIED: "denied",
} as const;

export const TAB_VALUE_MAP: Record<number, string> = {
  0: "day",
  1: "month",
  2: "year",
} as const;

export const MONTH_MAP: Record<string, string> = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sept",
  "10": "Oct",
  "11": "Nov",
  "12": "Dec",
} as const;

export const MOOD_TO_SONG_GENRES_MAP: Record<string, string[]> = {
  happy: [
    "pop",
    "dance",
    "house",
    "edm",
    "funk",
    "disco",
    "reggae",
    "soul",
    "indie-pop",
    "k-pop",
    "latino",
    "jazz",
    "tropical",
    "afrobeat",
  ],
  neutral: [
    "indie-pop",
    "folk",
    "chill",
    "acoustic",
    "singer-songwriter",
    "soft-rock",
    "lo-fi",
    "ambient",
    "classical",
    "jazz",
    "soul",
  ],
  sad: [
    "indie",
    "acoustic",
    "blues",
    "soul",
    "lo-fi",
    "singer-songwriter",
    "r-n-b",
    "folk",
    "jazz",
    "chill",
  ],
  angry: [
    "rock",
    "metal",
    "hard-rock",
    "punk",
    "alternative",
    "grunge",
    "hip-hop",
    "rap",
    "trap",
  ],
} as const;

export const MOOD_TO_MOVIE_GENRES_MAP: Record<string, string[]> = {
  happy: ["Comedy", "Adventure", "Musical", "Animation", "Fantasy"],
  neutral: ["Drama", "Mystery", "Sci-Fi", "Thriller", "Biography"],
  sad: ["Feel-Good", "Comedy", "Romance", "Family", "Adventure"],
  angry: ["Action", "Thriller", "Crime", "Superhero", "War"],
};
