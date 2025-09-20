export interface Movie {
  id: string;
  title: string;
  coverImage: string;
  imdbRating: number;
  genres: string[];
  year: number;
  director: string;
  duration: string;
  description: string;
}

export interface MovieCategory {
  name: string;
  movies: Movie[];
}