import React from 'react'
import { Box, Text, Flex } from '@radix-ui/themes'
import { Heart } from 'lucide-react'

export const Favorites: React.FC = () => {
  return (
    <Box p="6" maxWidth="1200px" style={{ margin: '0 auto' }}>
      <Flex align="center" gap="3" mb="6">
        <Heart size={24} color="var(--accent-9)" />
        <Text size="6" weight="bold">
          Favorites
        </Text>
      </Flex>
      
      <Flex 
        direction="column" 
        align="center" 
        justify="center" 
        style={{ minHeight: '400px' }}
      >
        <Heart size={64} color="var(--gray-7)" />
        <Text size="4" style={{ color: 'var(--gray-9)', marginTop: '16px' }}>
          Your favorite movies will appear here
        </Text>
        <Text size="2" style={{ color: 'var(--gray-8)', marginTop: '8px' }}>
          Start by marking movies as favorites in the Movies section
        </Text>
      </Flex>
    </Box>
  )
}