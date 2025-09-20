import type { MovieCategory } from '../types/movie';

export const mockMovieData: MovieCategory[] = [
  {
    name: "Action & Adventure",
    movies: [
      {
        id: "1",
        title: "Mad Max: Fury Road",
        coverImage: "https://m.media-amazon.com/images/M/MV5BN2EwM2I5OWMtMGQyMi00Zjg1LWJkNTctZTdjYTA4OGUwZjMyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.1,
        genres: ["Action", "Adventure", "Sci-Fi"],
        year: 2015,
        director: "George Miller",
        duration: "2h 0m",
        description: "In a post-apocalyptic wasteland, Max teams up with Furiosa to flee from cult leader Immortan Joe."
      },
      {
        id: "2",
        title: "John Wick",
        coverImage: "https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 7.4,
        genres: ["Action", "Crime", "Thriller"],
        year: 2014,
        director: "Chad Stahelski",
        duration: "1h 41m",
        description: "An ex-hitman comes out of retirement to track down the gangsters who killed his dog."
      },
      {
        id: "3",
        title: "The Dark Knight",
        coverImage: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 9.0,
        genres: ["Action", "Crime", "Drama"],
        year: 2008,
        director: "Christopher Nolan",
        duration: "2h 32m",
        description: "Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into anarchy."
      },
      {
        id: "9",
        title: "Mission: Impossible - Fallout",
        coverImage: "https://m.media-amazon.com/images/M/MV5BNjRlZmM0ODktY2RjNS00ZDdjLWJhZGYtNDljNWZkMGM5MTg0XkEyXkFqcGdeQXVyNjAwMjI5MDk@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 7.7,
        genres: ["Action", "Adventure", "Thriller"],
        year: 2018,
        director: "Christopher McQuarrie",
        duration: "2h 27m",
        description: "Ethan Hunt and his team race against time after a mission gone wrong."
      },
      {
        id: "10",
        title: "Top Gun: Maverick",
        coverImage: "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.3,
        genres: ["Action", "Drama"],
        year: 2022,
        director: "Joseph Kosinski",
        duration: "2h 10m",
        description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator."
      },
      {
        id: "11",
        title: "Indiana Jones: Raiders of the Lost Ark",
        coverImage: "https://m.media-amazon.com/images/M/MV5BNTU2ODkyY2MtMjU1NC00NjE1LWEzYjgtNzNjZmRhM2Q4M2ZhXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.5,
        genres: ["Action", "Adventure"],
        year: 1981,
        director: "Steven Spielberg",
        duration: "1h 55m",
        description: "Archaeologist Indiana Jones races to find the Ark of the Covenant before the Nazis."
      },
      {
        id: "12",
        title: "Die Hard",
        coverImage: "https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgwNmMtNjBmMzc0MGU3N2E4XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.2,
        genres: ["Action", "Thriller"],
        year: 1988,
        director: "John McTiernan",
        duration: "2h 12m",
        description: "A New York cop tries to save his wife and several others taken hostage during a Christmas party."
      },
      {
        id: "13",
        title: "Gladiator",
        coverImage: "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.5,
        genres: ["Action", "Adventure", "Drama"],
        year: 2000,
        director: "Ridley Scott",
        duration: "2h 35m",
        description: "A former Roman General seeks vengeance against the corrupt emperor who murdered his family."
      }
    ]
  },
  {
    name: "Drama",
    movies: [
      {
        id: "4",
        title: "The Shawshank Redemption",
        coverImage: "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 9.3,
        genres: ["Drama"],
        year: 1994,
        director: "Frank Darabont",
        duration: "2h 22m",
        description: "Two imprisoned men bond over years, finding solace and redemption through acts of common decency."
      },
      {
        id: "5",
        title: "Forrest Gump",
        coverImage: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.8,
        genres: ["Drama", "Romance"],
        year: 1994,
        director: "Robert Zemeckis",
        duration: "2h 22m",
        description: "The presidencies of Kennedy and Johnson through the eyes of an Alabama man with an IQ of 75."
      },
      {
        id: "14",
        title: "The Godfather",
        coverImage: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 9.2,
        genres: ["Crime", "Drama"],
        year: 1972,
        director: "Francis Ford Coppola",
        duration: "2h 55m",
        description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son."
      },
      {
        id: "15",
        title: "Goodfellas",
        coverImage: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjA4NGVjYWU5MjU1XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.7,
        genres: ["Biography", "Crime", "Drama"],
        year: 1990,
        director: "Martin Scorsese",
        duration: "2h 26m",
        description: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen."
      },
      {
        id: "16",
        title: "12 Angry Men",
        coverImage: "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 9.0,
        genres: ["Crime", "Drama"],
        year: 1957,
        director: "Sidney Lumet",
        duration: "1h 36m",
        description: "A jury holdout attempts to prevent a miscarriage of justice by forcing his colleagues to reconsider."
      },
      {
        id: "17",
        title: "The Pianist",
        coverImage: "https://m.media-amazon.com/images/M/MV5BOWRiZDIxZjktMTA1NC00MDQ2LWEzMjUtMTliZmY3NjQ3ODJiXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.5,
        genres: ["Biography", "Drama", "Music"],
        year: 2002,
        director: "Roman Polanski",
        duration: "2h 30m",
        description: "A Polish Jewish musician struggles to survive the destruction of the Warsaw ghetto during WWII."
      },
      {
        id: "18",
        title: "A Beautiful Mind",
        coverImage: "https://m.media-amazon.com/images/M/MV5BMzcwYWFkYzktZjAzNC00OGY1LWI4YTgtNzc5MzVjMDVmNjY0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.2,
        genres: ["Biography", "Drama"],
        year: 2001,
        director: "Ron Howard",
        duration: "2h 15m",
        description: "After John Nash suffers a breakdown, his wife helps him overcome his mental illness."
      }
    ]
  },
  {
    name: "Sci-Fi",
    movies: [
      {
        id: "6",
        title: "Inception",
        coverImage: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.8,
        genres: ["Action", "Sci-Fi", "Thriller"],
        year: 2010,
        director: "Christopher Nolan",
        duration: "2h 28m",
        description: "A thief enters the dreams of others to steal secrets from their subconscious minds."
      },
      {
        id: "7",
        title: "Blade Runner 2049",
        coverImage: "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.0,
        genres: ["Action", "Drama", "Sci-Fi"],
        year: 2017,
        director: "Denis Villeneuve",
        duration: "2h 44m",
        description: "A young blade runner's discovery leads him to a long-lost secret that could plunge what's left of society into chaos."
      },
      {
        id: "8",
        title: "Interstellar",
        coverImage: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.6,
        genres: ["Adventure", "Drama", "Sci-Fi"],
        year: 2014,
        director: "Christopher Nolan",
        duration: "2h 49m",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
      },
      {
        id: "19",
        title: "The Matrix",
        coverImage: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.7,
        genres: ["Action", "Sci-Fi"],
        year: 1999,
        director: "The Wachowskis",
        duration: "2h 16m",
        description: "A computer programmer discovers reality as he knows it is actually a simulation."
      },
      {
        id: "20",
        title: "Star Wars: A New Hope",
        coverImage: "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.6,
        genres: ["Adventure", "Fantasy", "Sci-Fi"],
        year: 1977,
        director: "George Lucas",
        duration: "2h 1m",
        description: "Luke Skywalker joins forces with a Jedi Knight to rescue a princess and save the galaxy."
      },
      {
        id: "21",
        title: "Back to the Future",
        coverImage: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.5,
        genres: ["Adventure", "Comedy", "Sci-Fi"],
        year: 1985,
        director: "Robert Zemeckis",
        duration: "1h 56m",
        description: "A teenager is accidentally sent thirty years into the past in a time-traveling DeLorean."
      },
      {
        id: "22",
        title: "Alien",
        coverImage: "https://m.media-amazon.com/images/M/MV5BOGQzZTBjMjQtOTVmMS00NGE5LWEyYmMtOGQ1ZGZjNmRkYjFhXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.5,
        genres: ["Horror", "Sci-Fi"],
        year: 1979,
        director: "Ridley Scott",
        duration: "1h 57m",
        description: "The crew of a commercial spacecraft encounters a deadly lifeform after investigating a mysterious transmission."
      },
      {
        id: "23",
        title: "Dune",
        coverImage: "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
        imdbRating: 8.0,
        genres: ["Action", "Adventure", "Drama", "Sci-Fi"],
        year: 2021,
        director: "Denis Villeneuve",
        duration: "2h 35m",
        description: "Paul Atreides leads nomadic tribes in a revolt against the galactic emperor and his father's enemy."
      }
    ]
  }
];