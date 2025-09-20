import React from 'react'
import { Box, Flex, Text, Button } from '@radix-ui/themes'
import { Filter } from 'lucide-react'
import type { MovieCategory } from '../types/movie'

interface MovieFiltersProps {
  selectedCategory: MovieCategory
  onCategoryChange: (category: MovieCategory) => void
}

export const MovieFilters: React.FC<MovieFiltersProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  const categories: MovieCategory[] = [
    'All',
    'Action',
    'Adventure', 
    'Animation',
    'Comedy',
    'Crime',
    'Drama',
    'Horror',
    'Romance',
    'Sci-Fi',
    'Thriller'
  ]

  return (
    <Box mb="6">
      <Flex align="center" gap="3" mb="3">
        <Filter size={18} color="var(--accent-9)" />
        <Text size="4" weight="medium">
          Filter by Category
        </Text>
      </Flex>
      
      <Flex wrap="wrap" gap="2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'solid' : 'outline'}
            size="2"
            onClick={() => onCategoryChange(category)}
            style={{ cursor: 'pointer' }}
          >
            {category}
          </Button>
        ))}
      </Flex>
    </Box>
  )
}