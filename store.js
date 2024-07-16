document.addEventListener('DOMContentLoaded', () => {
    const plugins = [
        { name: 'Plugin One', description: 'Description for plugin one.' },
        { name: 'Plugin Two', description: 'Description for plugin two.' },
        { name: 'Plugin Three', description: 'Description for plugin three.' },
        // Add more plugins here
    ];

    const pluginContainer = document.getElementById('plugin-container');
    const searchInput = document.getElementById('search');

    function displayPlugins(plugins) {
        pluginContainer.innerHTML = '';
        plugins.forEach(plugin => {
            const pluginCard = document.createElement('div');
            pluginCard.className = 'plugin-card';

            const pluginTitle = document.createElement('h2');
            pluginTitle.textContent = plugin.name;

            const pluginDescription = document.createElement('p');
            pluginDescription.textContent = plugin.description;

            pluginCard.appendChild(pluginTitle);
            pluginCard.appendChild(pluginDescription);

            pluginContainer.appendChild(pluginCard);
        });
    }

    function filterPlugins() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPlugins = plugins.filter(plugin =>
            plugin.name.toLowerCase().includes(searchTerm) ||
            plugin.description.toLowerCase().includes(searchTerm)
        );
        displayPlugins(filteredPlugins);
    }

    searchInput.addEventListener('input', filterPlugins);

    displayPlugins(plugins);
});
