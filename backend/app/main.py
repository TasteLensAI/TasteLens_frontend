from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from .models import Movie, MovieCategory, NavigationItem, ThemeConfig, MoviesResponse
from .database import (
    get_movies_by_category,
    get_movie_categories,
    get_navigation_items,
    get_theme_config,
    get_movie_by_id
)

# Create FastAPI app
app = FastAPI(
    title="TasteLens API",
    description="Backend API for TasteLens movie recommendation system",
    version="1.0.0"
)

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://localhost:4173"],  # Vite dev server and build
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to TasteLens API",
        "version": "1.0.0",
        "docs_url": "/docs"
    }


@app.get("/api/movies", response_model=MoviesResponse)
async def get_movies(
    category: Optional[str] = Query(None, description="Filter movies by category"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=50, description="Number of movies per page")
):
    """Get movies, optionally filtered by category with pagination"""
    return get_movies_by_category(category=category, page=page, page_size=page_size)


@app.get("/api/movies/{movie_id}", response_model=Movie)
async def get_movie(movie_id: int):
    """Get a specific movie by ID"""
    movie = get_movie_by_id(movie_id)
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie


@app.get("/api/categories", response_model=List[MovieCategory])
async def get_categories():
    """Get all movie categories"""
    return get_movie_categories()


@app.get("/api/navigation", response_model=List[NavigationItem])
async def get_navigation():
    """Get navigation items for the UI"""
    return get_navigation_items()


@app.get("/api/theme", response_model=ThemeConfig)
async def get_theme():
    """Get theme configuration"""
    return get_theme_config()


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "tastelens-api"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)