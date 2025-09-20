import React from 'react'
import { Box, Text, Flex } from '@radix-ui/themes'
import { User as UserIcon } from 'lucide-react'

export const Profile: React.FC = () => {
  return (
    <Box p="6" maxWidth="1200px" style={{ margin: '0 auto' }}>
      <Flex align="center" gap="3" mb="6">
        <UserIcon size={24} color="var(--accent-9)" />
        <Text size="6" weight="bold">
          Profile
        </Text>
      </Flex>
      
      <Flex 
        direction="column" 
        align="center" 
        justify="center" 
        style={{ minHeight: '400px' }}
      >
        <UserIcon size={64} color="var(--gray-7)" />
        <Text size="4" style={{ color: 'var(--gray-9)', marginTop: '16px' }}>
          Profile management coming soon
        </Text>
        <Text size="2" style={{ color: 'var(--gray-8)', marginTop: '8px' }}>
          Manage your account settings and preferences
        </Text>
      </Flex>
    </Box>
  )
}