import React from 'react'
import { Box, Flex, Text, Button } from '@radix-ui/themes'
import { Home, Film, Heart, Search, User } from 'lucide-react'

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
  const navigationItems = [
    { id: 'movies', label: 'Movies', icon: Film },
    { id: 'favorites', label: 'Favorites', icon: Heart },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'profile', label: 'Profile', icon: User }
  ]

  return (
    <Box 
      style={{
        borderBottom: '1px solid var(--gray-6)',
        backgroundColor: 'var(--color-surface)'
      }}
    >
      <Flex 
        justify="between" 
        align="center" 
        p="4"
        maxWidth="1200px"
        style={{ margin: '0 auto' }}
      >
        <Flex align="center" gap="3">
          <Home size={24} color="var(--accent-9)" />
          <Text size="5" weight="bold" style={{ color: 'var(--accent-9)' }}>
            TasteLens
          </Text>
        </Flex>

        <Flex gap="2">
          {navigationItems.map(({ id, label, icon: Icon }) => (
            <Button
              key={id}
              variant={activeTab === id ? 'solid' : 'ghost'}
              onClick={() => onTabChange(id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <Icon size={16} />
              {label}
            </Button>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}