class MoviesPage {
    constructor(container) {
        this.container = container;
        this.movies = [];
    }

    async render() {
        await this.fetchMovies();
        this.renderContent();
        this.setupSearch();
    }

    async fetchMovies() {
        try {
            const response = await API.getMovies();
            this.movies = response.docs;
        } catch (error) {
            console.error('Error fetching movies:', error);
            this.movies = [];
        }
    }

    renderContent() {
        this.container.innerHTML = `
            <div class="hero">
                <h1>movies</h1>
            </div>
            <div class="search-container">
                <span class="search-icon"></span>
                <input type="text" class="search-input" placeholder="Search Middle-earth...">
            </div>
            <div class="grid" id="movies-grid">
                ${this.renderMovies()}
            </div>
        `;
    }

    renderMovies(filteredMovies = this.movies) {
        return filteredMovies.map(movie => `
            <div class="card">
                <h3>${movie.name}</h3>
                <p>Runtime: ${movie.runtimeInMinutes} minutes</p>
                <p>Budget: $${movie.budgetInMillions}M</p>
                <p>Box Office: $${movie.boxOfficeRevenueInMillions}M</p>
                <p>Academy Awards: ${movie.academyAwardWins}</p>
            </div>
        `).join('');
    }

    setupSearch() {
        const searchInput = this.container.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredMovies = this.movies.filter(movie => 
                movie.name.toLowerCase().includes(searchTerm)
            );
            const moviesGrid = this.container.querySelector('#movies-grid');
            moviesGrid.innerHTML = this.renderMovies(filteredMovies);
        });
    }

    destroy() {
        // Cleanup if needed
    }
}