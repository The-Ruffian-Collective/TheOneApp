class QuotesPage {
    constructor(container) {
        this.container = container;
        this.quotes = [];
        this.currentPage = 1;
        this.limit = 20;
    }

    async render() {
        await this.fetchQuotes();
        this.renderContent();
        this.setupSearch();
        this.setupInfiniteScroll();
    }

    async fetchQuotes() {
        try {
            const response = await API.getQuotes({
                limit: this.limit,
                page: this.currentPage
            });
            this.quotes = response.docs;
        } catch (error) {
            console.error('Error fetching quotes:', error);
            this.quotes = [];
        }
    }

    renderContent() {
        this.container.innerHTML = `
            <h1>Memorable Quotes</h1>
            <div class="search-container">
                <input type="text" class="search-input" placeholder="Search quotes...">
            </div>
            <div class="grid" id="quotes-grid">
                ${this.renderQuotes()}
            </div>
        `;
    }

    renderQuotes(filteredQuotes = this.quotes) {
        return filteredQuotes.map(quote => `
            <div class="card">
                <p>"${quote.dialog}"</p>
                <p><em>- ${quote.character || 'Unknown'}</em></p>
            </div>
        `).join('');
    }

    setupSearch() {
        const searchInput = this.container.querySelector('.search-input');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredQuotes = this.quotes.filter(quote => 
                quote.dialog.toLowerCase().includes(searchTerm)
            );
            const quotesGrid = this.container.querySelector('#quotes-grid');
            quotesGrid.innerHTML = this.renderQuotes(filteredQuotes);
        });
    }

    setupInfiniteScroll() {
        const observer = new IntersectionObserver(async (entries) => {
            if (entries[0].isIntersecting) {
                this.currentPage++;
                const response = await API.getQuotes({
                    limit: this.limit,
                    page: this.currentPage
                });
                this.quotes = [...this.quotes, ...response.docs];
                const quotesGrid = this.container.querySelector('#quotes-grid');
                quotesGrid.innerHTML = this.renderQuotes();
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