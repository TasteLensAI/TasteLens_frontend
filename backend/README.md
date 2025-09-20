# TasteLens Backend

FastAPI backend for the TasteLens movie recommendation system.

## Features

This backend provides API endpoints to support the TasteLens frontend milestone #1:

- **Movie Listings**: Get movies with optional filtering by category and pagination
- **Categories**: Get all movie categories with metadata
- **Navigation**: Get navigation items for the UI
- **Theme**: Get theme configuration data
- **Individual Movies**: Get details for specific movies

## Installation

1. Make sure you have Python 3.8+ installed
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

### Development Mode
```bash
cd backend
python run_server.py
```
The server will start at `http://localhost:8000` with hot reload enabled.

### Production Mode
```bash
cd backend
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Endpoints

### Movies
- `GET /api/movies` - Get all movies with optional category filter and pagination
  - Query parameters: `category` (optional), `page` (default: 1), `page_size` (default: 10)
- `GET /api/movies/{movie_id}` - Get specific movie by ID

### Categories  
- `GET /api/categories` - Get all movie categories

### UI Support
- `GET /api/navigation` - Get navigation items for the frontend
- `GET /api/theme` - Get theme configuration

### System
- `GET /` - Root endpoint with API info
- `GET /api/health` - Health check endpoint

## Interactive Documentation

Once the server is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## Sample Data

The backend currently uses sample movie data for development and testing purposes. This includes:
- 8 sample movies across different genres (Action, Drama, Sci-Fi, Crime)
- 4 movie categories with metadata
- Navigation items for the frontend
- A dark theme configuration

## CORS Configuration

The backend is configured to allow CORS requests from:
- `http://localhost:3000` (Create React App default)
- `http://localhost:5173` (Vite dev server default)  
- `http://localhost:4173` (Vite preview default)

## Integration with Frontend

The frontend can make requests to these endpoints to:
1. Display movies by category in the main interface
2. Populate navigation bar items
3. Apply theme configuration
4. Show individual movie details