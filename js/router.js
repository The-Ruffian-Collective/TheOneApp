class Router {
    constructor(contentElement) {
        this.contentElement = contentElement;
        this.routes = new Map();
        this.currentPage = null;

        window.addEventListener('popstate', () => this.handleRoute());
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-page]')) {
                e.preventDefault();
                this.navigate(e.target.dataset.page);
            }
        });
    }

    addRoute(path, component) {
        this.routes.set(path, component);
    }

    async navigate(path) {
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.page === path);
        });

        history.pushState(null, '', `#${path}`);
        await this.handleRoute();
    }

    async handleRoute() {
        const path = window.location.hash.slice(1) || 'home';
        const component = this.routes.get(path);

        if (component) {
            this.showLoading();
            try {
                if (this.currentPage && this.currentPage.destroy) {
                    this.currentPage.destroy();
                }
                this.currentPage = new component(this.contentElement);
                await this.currentPage.render();
            } catch (error) {
                console.error('Route handling error:', error);
                this.contentElement.innerHTML = '<h2>An error occurred. Please try again later.</h2>';
            }
            this.hideLoading();
        }
    }

    showLoading() {
        document.querySelector('.loading-ring').classList.remove('hidden');
    }

    hideLoading() {
        document.querySelector('.loading-ring').classList.add('hidden');
    }
}