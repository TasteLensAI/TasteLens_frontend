# TasteLens - Movie Recommendation System

A full-stack movie recommendation application built with React + TypeScript frontend and FastAPI backend.

## Project Structure

- **Frontend**: React + TypeScript + Vite application
- **Backend**: FastAPI Python backend with REST API

## Getting Started

### Frontend Development
The frontend provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## Backend Development

The backend is a FastAPI application that provides REST API endpoints for the frontend.

### Installation
1. Navigate to the backend directory: `cd backend`
2. Install Python dependencies: `pip install -r requirements.txt`

### Running the Backend
```bash
cd backend
python run_server.py
```
The API will be available at `http://localhost:8000` with interactive documentation at `http://localhost:8000/docs`.

### API Endpoints
- `GET /api/movies` - Get movies with optional category filtering
- `GET /api/movies/{id}` - Get specific movie details  
- `GET /api/categories` - Get all movie categories
- `GET /api/navigation` - Get navigation items for UI
- `GET /api/theme` - Get theme configuration

See [backend/README.md](backend/README.md) for detailed API documentation.

## Development Workflow

1. Start the backend server: `cd backend && python run_server.py`
2. In a new terminal, start the frontend: `npm run dev`
3. Frontend will be available at `http://localhost:5173`
4. Backend API at `http://localhost:8000`

## Features

### Milestone 1 (Current)
- ✅ FastAPI backend with REST API
- ✅ Movie listings by category
- ✅ Navigation and theme configuration
- ✅ Sample movie data and categories
- 🚧 React frontend with Radix UI (in progress)

### Future Milestones
- User authentication and profiles
- Movie recommendations engine
- Reviews and ratings system
- Advanced search and filtering