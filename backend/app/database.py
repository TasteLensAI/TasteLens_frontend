from typing import List, Optional
from .models import Movie, MovieCategory, NavigationItem, ThemeConfig, MoviesResponse

# Sample movie data for demonstration
SAMPLE_MOVIES = [
    Movie(
        id=1,
        title="The Matrix",
        description="A computer hacker learns from mysterious rebels about the true nature of his reality.",
        genre="Sci-Fi",
        release_year=1999,
        rating=8.7,
        poster_url="https://via.placeholder.com/300x450/000000/FFFFFF?text=The+Matrix",
        duration_minutes=136
    ),
    Movie(
        id=2,
        title="Inception",
        description="A thief who steals corporate secrets through dream-sharing technology is given the inverse task.",
        genre="Sci-Fi",
        release_year=2010,
        rating=8.8,
        poster_url="https://via.placeholder.com/300x450/000000/FFFFFF?text=Inception",
        duration_minutes=148
    ),
    Movie(
        id=3,
        title="The Godfather",
        description="The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
        genre="Drama",
        release_year=1972,
        rating=9.2,
        poster_url="https://via.placeholder.com/300x450/000000/FFFFFF?text=The+Godfather",
        duration_minutes=175
    ),
    Movie(
        id=4,
        title="Pulp Fiction",
        description="The lives of two mob hitmen, a boxer, and others intertwine in four tales of violence.",
        genre="Crime",
        release_year=1994,
        rating=8.9,
        poster_url="https://via.placeholder.com/300x450/000000/FFFFFF?text=Pulp+Fiction",
        duration_minutes=154
    ),
    Movie(
        id=5,
        title="The Shawshank Redemption",
        description="Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.",
        genre="Drama",
        release_year=1994,
        rating=9.3,
        poster_url="https://via.placeholder.com/300x450/000000/FFFFFF?text=Shawshank",
        duration_minutes=142
    ),
    Movie(
        id=6,
        title="The Dark Knight",
        description="Batman faces the Joker, a criminal mastermind who wants to plunge Gotham City into anarchy.",
        genre="Action",
        release_year=2008,
        rating=9.0,
        poster_url="https://via.placeholder.com/300x450/000000/FFFFFF?text=Dark+Knight",
        duration_minutes=152
    ),
    Movie(
        id=7,
        title="Forrest Gump",
        description="A man with low IQ has accomplished great things and been present during significant historic events.",
        genre="Drama",
        release_year=1994,
        rating=8.8,
        poster_url="https://via.placeholder.com/300x450/000000/FFFFFF?text=Forrest+Gump",
        duration_minutes=142
    ),
    Movie(
        id=8,
        title="Die Hard",
        description="A New York police officer tries to save his wife and others taken hostage by German terrorists.",
        genre="Action",
        release_year=1988,
        rating=8.2,
        poster_url="https://via.placeholder.com/300x450/000000/FFFFFF?text=Die+Hard",
        duration_minutes=132
    )
]

# Sample categories data
SAMPLE_CATEGORIES = [
    MovieCategory(id=1, name="Action", description="High-energy movies with exciting sequences", movie_count=2),
    MovieCategory(id=2, name="Drama", description="Character-driven stories with emotional depth", movie_count=3),
    MovieCategory(id=3, name="Sci-Fi", description="Science fiction and futuristic themes", movie_count=2),
    MovieCategory(id=4, name="Crime", description="Crime and thriller movies", movie_count=1),
]

# Navigation items for the UI
NAVIGATION_ITEMS = [
    NavigationItem(id="home", label="Home", path="/", icon="home", active=True),
    NavigationItem(id="movies", label="Movies", path="/movies", icon="film", active=False),
    NavigationItem(id="categories", label="Categories", path="/categories", icon="grid", active=False),
    NavigationItem(id="search", label="Search", path="/search", icon="search", active=False),
    NavigationItem(id="favorites", label="Favorites", path="/favorites", icon="heart", active=False),
]

# Theme configuration
DEFAULT_THEME = ThemeConfig(
    name="TasteLens Dark",
    primary_color="#6366f1",
    secondary_color="#8b5cf6",
    background_color="#0f172a",
    text_color="#f8fafc",
    accent_color="#06b6d4"
)


def get_movies_by_category(category: Optional[str] = None, page: int = 1, page_size: int = 10) -> MoviesResponse:
    """Get movies, optionally filtered by category"""
    movies = SAMPLE_MOVIES
    
    if category:
        movies = [movie for movie in movies if movie.genre.lower() == category.lower()]
    
    # Pagination
    start = (page - 1) * page_size
    end = start + page_size
    paginated_movies = movies[start:end]
    
    return MoviesResponse(
        movies=paginated_movies,
        total=len(movies),
        page=page,
        page_size=page_size,
        category=category
    )


def get_movie_categories() -> List[MovieCategory]:
    """Get all movie categories"""
    return SAMPLE_CATEGORIES


def get_navigation_items() -> List[NavigationItem]:
    """Get navigation items for the UI"""
    return NAVIGATION_ITEMS


def get_theme_config() -> ThemeConfig:
    """Get theme configuration"""
    return DEFAULT_THEME


def get_movie_by_id(movie_id: int) -> Optional[Movie]:
    """Get a specific movie by ID"""
    for movie in SAMPLE_MOVIES:
        if movie.id == movie_id:
            return movie
    return None