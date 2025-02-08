document.addEventListener('DOMContentLoaded', async () => {
    let plugins = [];
    const pluginContainer = document.getElementById('plugin-container');
    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category-select');

    // Show a loading message
    if (pluginContainer) {
        pluginContainer.innerHTML = '<p class="loading-message">Loading plugins...</p>';
    }

    try {
        plugins = await fetchPlugins();
    } catch (error) {
        console.error('Error fetching plugins:', error);
        if (pluginContainer) {
            pluginContainer.innerHTML = '<p class="error-message">Failed to load plugins. Please try again later.</p>';
        }
        return;
    }

    function displayPlugins(pluginsToDisplay) {
        pluginContainer.innerHTML = '';
        pluginsToDisplay.forEach(plugin => {
            const pluginCard = document.createElement('div');
            pluginCard.className = 'plugin-card';
            pluginCard.onclick = () => showPluginDetails(plugin.id);

            const pluginTitle = document.createElement('h2');
            pluginTitle.textContent = plugin.name;

            const pluginCategory = document.createElement('p');
            pluginCategory.textContent = `Category: ${plugin.category}`;

            pluginCard.appendChild(pluginTitle);
            pluginCard.appendChild(pluginCategory);
            pluginContainer.appendChild(pluginCard);
        });
    }

    function filterPlugins() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;
        const filteredPlugins = plugins.filter(plugin => 
            (plugin.name.toLowerCase().includes(searchTerm) || plugin.description.toLowerCase().includes(searchTerm)) &&
            (selectedCategory === 'All' || plugin.category === selectedCategory)
        );
        displayPlugins(filteredPlugins);
    }

    function showPluginDetails(pluginId) {
        const plugin = plugins.find(p => p.id === pluginId);
        if (plugin) {
            localStorage.setItem('selectedPlugin', JSON.stringify(plugin));
            window.location.href = 'plugin.html';
        }
    }

    function toggleTheme() {
        const isDarkMode = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-toggle').checked = true;
    }

    if (pluginContainer) {
        searchInput.addEventListener('input', filterPlugins);
        categorySelect.addEventListener('change', filterPlugins);
        document.getElementById('theme-toggle').addEventListener('change', toggleTheme);
        displayPlugins(plugins);
    }

    // Handle Plugin Details Page
    if (window.location.pathname.endsWith('plugin.html')) {
        const selectedPlugin = JSON.parse(localStorage.getItem('selectedPlugin'));
        if (selectedPlugin) {
            document.getElementById('plugin-name').textContent = selectedPlugin.name;
            document.getElementById('plugin-description').textContent = `Description: ${selectedPlugin.description}`;
            document.getElementById('plugin-version').textContent = `Version: ${selectedPlugin.version}`;
            document.getElementById('plugin-author').textContent = `Author: ${selectedPlugin.author}`;
            document.getElementById('plugin-category').textContent = `Category: ${selectedPlugin.category}`;
            document.getElementById('plugin-license').href = selectedPlugin.licenseUrl;
            document.getElementById('plugin-license').textContent = `License: ${selectedPlugin.license}`;
            document.getElementById('plugin-repo').href = selectedPlugin.repoUrl;

            const downloadButton = document.getElementById('download-button');
            downloadButton.href = selectedPlugin.downloadUrl;
            downloadButton.setAttribute('download', `${selectedPlugin.name.replace(/\s+/g, '-')}.zip`);
        }

        document.getElementById('theme-toggle').addEventListener('change', toggleTheme);
    }
});

// Fetch Plugins from GitHub Repo
async function fetchPlugins() {
    try {
        const pluginsDirUrl = 'https://api.github.com/repos/Project-LetsChat/plugin-repo/contents/plugins';
        const response = await fetch(pluginsDirUrl);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        
        const contents = await response.json();
        const pluginDirs = contents.filter(item => item.type === 'dir');

        const plugins = [];
        for (const dir of pluginDirs) {
            try {
                const dataUrl = `https://raw.githubusercontent.com/Project-LetsChat/plugin-repo/main/plugins/${dir.name}/data.json`;
                const zipUrl = `https://raw.githubusercontent.com/Project-LetsChat/plugin-repo/main/plugins/${dir.name}/plugin.zip`;
                const dataResponse = await fetch(dataUrl);
                if (!dataResponse.ok) continue;
                
                const pluginData = await dataResponse.json();
                pluginData.downloadUrl = zipUrl;
                plugins.push(pluginData);
            } catch (error) {
                console.error(`Error processing ${dir.name}:`, error);
            }
        }
        return plugins;
    } catch (error) {
        console.error('Failed to fetch plugins:', error);
        throw error;
    }
}
