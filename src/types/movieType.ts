export interface MovieDataType {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

export interface MovieShowtimeType {
  movie: {
    id: number;
    times: string[];
    screen: string;
  }[];
}

export interface GenreType {
  id: number;
  name: string;
}

export interface MovieDetailType {
  backdrop_path: string;
  budget: number;
  genres: { name: string; id: number }[];
  overview: string;
  poster_path: string;
  production_companies: { name: string; logo_path: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { name: string; english_name: string }[];
  status: string;
  tagline: string;
  title: string;
  vote_count: number;
  vote_average: number;
  id: number;
}

export interface MovieCrewType {
  cast: { name: string; character: string; profile_path: string }[];
  crew: { name: string; job: string; profile_path: string }[];
}
export interface MovieCastType {
  name: string;
  character: string;
  profile_path: string;
  id: number;
}
export interface VideoTrailerType {
  type: string;
  key: string;
}
export interface ReviewType {
  author: string;
  content: string;
  created_at: string;
  id: string;
  length: number;
  author_details: {
    avatar_path: string;
    name: string;
    username: string;
    rating: number;
  };
}
export interface KeywordType {
  id: number;
  name: string;
}
