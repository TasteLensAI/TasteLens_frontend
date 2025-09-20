import React from 'react'
import { Box, Card, Flex, Text, Badge } from '@radix-ui/themes'
import { Star, Calendar, User } from 'lucide-react'
import type { Movie } from '../types/movie'

interface MovieCardProps {
  movie: Movie
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Card 
      size="3" 
      style={{ 
        width: '100%', 
        maxWidth: '320px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease'
      }}
      className="movie-card-hover"
    >
      <Box p="4">
        {/* Movie Poster Placeholder */}
        <Box 
          style={{
            width: '100%',
            height: '200px',
            backgroundColor: 'var(--gray-3)',
            borderRadius: 'var(--radius-2)',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(135deg, var(--gray-2) 0%, var(--gray-4) 100%)'
          }}
        >
          <Text size="2" style={{ color: 'var(--gray-9)' }}>
            {movie.title}
          </Text>
        </Box>

        {/* Movie Info */}
        <Flex direction="column" gap="2">
          <Text size="4" weight="bold" style={{ lineHeight: '1.3' }}>
            {movie.title}
          </Text>
          
          <Flex justify="between" align="center">
            <Badge color="blue" variant="soft">
              {movie.genre}
            </Badge>
            <Flex align="center" gap="1">
              <Star size={14} fill="gold" color="gold" />
              <Text size="2" weight="medium">
                {movie.rating}
              </Text>
            </Flex>
          </Flex>

          <Flex direction="column" gap="1">
            <Flex align="center" gap="2">
              <Calendar size={14} color="var(--gray-9)" />
              <Text size="2" style={{ color: 'var(--gray-11)' }}>
                {movie.year}
              </Text>
            </Flex>
            <Flex align="center" gap="2">
              <User size={14} color="var(--gray-9)" />
              <Text size="2" style={{ color: 'var(--gray-11)' }}>
                {movie.director}
              </Text>
            </Flex>
          </Flex>

          <Text size="2" style={{ color: 'var(--gray-11)', lineHeight: '1.4' }}>
            {movie.description.length > 100 
              ? `${movie.description.substring(0, 100)}...` 
              : movie.description
            }
          </Text>
        </Flex>
      </Box>
    </Card>
  )
}