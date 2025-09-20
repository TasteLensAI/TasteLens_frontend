import { useState } from 'react'
import { Box } from '@radix-ui/themes'
import { Navigation } from './components/Navigation'
import { MoviesListing } from './components/MoviesListing'
import { Favorites } from './components/Favorites'
import { Search } from './components/Search'
import { Profile } from './components/Profile'

function App() {
  const [activeTab, setActiveTab] = useState('movies')

  const renderContent = () => {
    switch (activeTab) {
      case 'movies':
        return <MoviesListing />
      case 'favorites':
        return <Favorites />
      case 'search':
        return <Search />
      case 'profile':
        return <Profile />
      default:
        return <MoviesListing />
    }
  }

  return (
    <Box style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </Box>
  )
}

export default App
