document.addEventListener('DOMContentLoaded', () => {
    const router = new Router(document.getElementById('content'));
    
    router.addRoute('home', HomePage);
    router.addRoute('movies', MoviesPage);
    router.addRoute('characters', CharactersPage);
    router.addRoute('quotes', QuotesPage);
    
    router.handleRoute();
});