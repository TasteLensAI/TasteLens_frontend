import React from 'react'
import { Box, Text, Flex } from '@radix-ui/themes'
import { Search as SearchIcon } from 'lucide-react'

export const Search: React.FC = () => {
  return (
    <Box p="6" maxWidth="1200px" style={{ margin: '0 auto' }}>
      <Flex align="center" gap="3" mb="6">
        <SearchIcon size={24} color="var(--accent-9)" />
        <Text size="6" weight="bold">
          Search
        </Text>
      </Flex>
      
      <Flex 
        direction="column" 
        align="center" 
        justify="center" 
        style={{ minHeight: '400px' }}
      >
        <SearchIcon size={64} color="var(--gray-7)" />
        <Text size="4" style={{ color: 'var(--gray-9)', marginTop: '16px' }}>
          Search functionality coming soon
        </Text>
        <Text size="2" style={{ color: 'var(--gray-8)', marginTop: '8px' }}>
          Find your favorite movies by title, genre, director, or year
        </Text>
      </Flex>
    </Box>
  )
}