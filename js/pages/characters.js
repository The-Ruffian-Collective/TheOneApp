class CharactersPage {
    constructor(container) {
        this.container = container;
        this.characters = [];
        this.currentPage = 1;
        this.limit = 20;
    }

    async render() {
        await this.fetchCharacters();
        this.renderContent();
        this.setupSearch();
        this.setupInfiniteScroll();
    }

    async fetchCharacters() {
        try {
            const response = await API.getCharacters({
                limit: this.limit,
                page: this.currentPage
            });
            this.characters = response.docs;
        } catch (error) {
            console.error('Error fetching characters:', error);
            this.characters = [];
        }
    }

    renderContent() {
        this.container.innerHTML = `
            <h1>Characters</h1>
            <div class="search-container">
                <input type="text" class="search-input" placeholder="Search characters...">
            </div>
            <div class="grid" id="characters-grid">
                ${this.renderCharacters()}
            </div>
        `;
    }

    renderCharacters(filteredCharacters = this.characters) {
        return filteredCharacters.map(character => `
            <div class="card">
                <h3>${character.name}</h3>
                ${character.race ? `<p>Race: ${character.race}</p>` : ''}
                ${character.gender ? `<p>Gender: ${character.gender}</p>` : ''}
                ${character.realm ? `<p>Realm: ${character.realm}</p>` : ''}
            </div>
        `).join('');
    }

    setupSearch() {
        const searchInput = this.container.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredCharacters = this.characters.filter(character => 
                character.name.toLowerCase().includes(searchTerm)
            );
            const charactersGrid = this.container.querySelector('#characters-grid');
            charactersGrid.innerHTML = this.renderCharacters(filteredCharacters);
        });
    }

    setupInfiniteScroll() {
        const observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting) {
                this.currentPage++;
                const response = await API.getCharacters({
                    limit: this.limit,
                    page: this.currentPage
                });
                this.characters = [...this.characters, ...response.docs];
                const charactersGrid = this.container.querySelector('#characters-grid');
                charactersGrid.innerHTML = this.renderCharacters();
            }
        });

        const lastCard = this.container.querySelector('.card:last-child');
        if (lastCard) {
            observer.observe(lastCard);
        }
    }

    destroy() {
        // Cleanup if needed
    }
}