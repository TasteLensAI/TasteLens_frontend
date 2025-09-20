export interface Movie {
  id: number
  title: string
  genre: string
  year: number
  rating: number
  director: string
  poster?: string
  description: string
}

export type MovieCategory = 
  | 'All'
  | 'Action'
  | 'Comedy'
  | 'Drama'
  | 'Horror'
  | 'Romance'
  | 'Sci-Fi'
  | 'Thriller'
  | 'Documentary'
  | 'Animation'
  | 'Adventure'
  | 'Crime'
  | 'Fantasy'
  | 'Mystery'
  | 'War'
  | 'Western'
  | 'Musical'
  | 'Family'
  | 'Biography'
  | 'History'