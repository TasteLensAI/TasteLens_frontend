import React, { useState, useMemo } from 'react'
import { Box, Text, Grid, Flex } from '@radix-ui/themes'
import { Film } from 'lucide-react'
import { MovieCard } from './MovieCard'
import { MovieFilters } from './MovieFilters'
import type { MovieCategory } from '../types/movie'
import { mockMovies } from '../data/movies'

export const MoviesListing: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<MovieCategory>('All')

  const filteredMovies = useMemo(() => {
    if (selectedCategory === 'All') {
      return mockMovies
    }
    return mockMovies.filter(movie => movie.genre === selectedCategory)
  }, [selectedCategory])

  return (
    <Box p="6" maxWidth="1200px" style={{ margin: '0 auto' }}>
      <Flex align="center" gap="3" mb="6">
        <Film size={24} color="var(--accent-9)" />
        <Text size="6" weight="bold">
          Movie Collection
        </Text>
      </Flex>

      <MovieFilters 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <Box mb="4">
        <Text size="3" style={{ color: 'var(--gray-11)' }}>
          {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''} found
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
        </Text>
      </Box>

      <Grid 
        columns={{ initial: '1', sm: '2', md: '3', lg: '4' }} 
        gap="4"
        width="100%"
      >
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>

      {filteredMovies.length === 0 && (
        <Flex 
          direction="column" 
          align="center" 
          justify="center" 
          style={{ minHeight: '300px' }}
        >
          <Film size={48} color="var(--gray-8)" />
          <Text size="4" style={{ color: 'var(--gray-9)', marginTop: '16px' }}>
            No movies found in the {selectedCategory} category
          </Text>
        </Flex>
      )}
    </Box>
  )
}