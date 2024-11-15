class HomePage {
    constructor(container) {
        this.container = container;
    }

    async render() {
        this.container.innerHTML = `
            <div class="hero">
                <h1>One App to Rule</h1>
                <p>Your gateway to Middle-earth</p>
            </div>
            <div class="grid">
                <div class="card">
                    <h3>Movies</h3>
                    <p>Journey through the legendary trilogy that brought Middle-earth to life on the silver screen.</p>
                </div>
                <div class="card">
                    <h3>Characters</h3>
                    <p>Discover the heroes, villains, and beings that shaped the fate of Middle-earth.</p>
                </div>
                <div class="card">
                    <h3>Quotes</h3>
                    <p>Relive the most powerful and memorable moments through the words that echoed through the ages.</p>
                </div>
            </div>
        `;
    }
}