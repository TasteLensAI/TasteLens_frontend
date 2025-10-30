export interface Movie {
  movieId: number;
  tmdbId: string;
  title: string;
  original_title: string;
  genres: string; // Comma-separated string from API
  tagline: string;
  description: string;
  year: number;
  duration: number; // Duration in minutes
  tmdbRating: number;
  tmdbVoteCount: number;
  poster_path: string;
}

export interface MovieCategory {
  name: string;
  movies: Movie[];
}

export interface Genre {
  genre: string;
  count: number;
}

export interface GenresResponse {
  genres: Genre[];
  total_movies: number;
}

export interface MoviesResponse {
  movies: Movie[];
  total: number;
  page: number;
  limit: number;
  has_next: boolean;
}