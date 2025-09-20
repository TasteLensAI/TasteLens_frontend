from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class Movie(BaseModel):
    """Movie data model"""
    id: int
    title: str
    description: Optional[str] = None
    genre: str
    release_year: int
    rating: Optional[float] = None
    poster_url: Optional[str] = None
    duration_minutes: Optional[int] = None


class MovieCategory(BaseModel):
    """Movie category model"""
    id: int
    name: str
    description: Optional[str] = None
    movie_count: int = 0


class NavigationItem(BaseModel):
    """Navigation item model"""
    id: str
    label: str
    path: str
    icon: Optional[str] = None
    active: bool = False


class ThemeConfig(BaseModel):
    """Theme configuration model"""
    name: str
    primary_color: str
    secondary_color: str
    background_color: str
    text_color: str
    accent_color: str


class MoviesResponse(BaseModel):
    """Response model for movies endpoint"""
    movies: List[Movie]
    total: int
    page: int
    page_size: int
    category: Optional[str] = None