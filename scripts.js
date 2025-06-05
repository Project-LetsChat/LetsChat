// scripts.js
document.addEventListener('DOMContentLoaded', async () => {
    // Define multiple plugin repositories
    const pluginRepositories = [
        "https://github.com/Project-LetsChat/plugin-repo.git",
        "",
        // Add more repositories as needed
    ];

    let allPlugins = [];
    const pluginContainer = document.getElementById('plugin-container');
    
    // Show loading message
    if (pluginContainer) {
        pluginContainer.innerHTML = '<p class="loading-message">Loading plugins...</p>';
    }

    try {
        // Fetch plugins from all repositories
        for (const repoUrl of pluginRepositories) {
            const repoPlugins = await fetchPluginsFromRepo(repoUrl);
            allPlugins = [...allPlugins, ...repoPlugins];
        }
    } catch (error) {
        console.error('Error fetching plugins:', error);
        if (pluginContainer) {
            pluginContainer.innerHTML = '<p class="error-message">Failed to load plugins. Please try again later.</p>';
        }
        return;
    }

    const searchInput = document.getElementById('search');
    const categorySelect = document.getElementById('category-select');

    function displayPlugins(pluginsToDisplay) {
        pluginContainer.innerHTML = '';
        pluginsToDisplay.forEach(plugin => {
            const pluginCard = document.createElement('div');
            pluginCard.className = 'plugin-card';
            pluginCard.onclick = () => showPluginDetails(plugin);

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
        const filteredPlugins = allPlugins.filter(plugin => 
            (plugin.name.toLowerCase().includes(searchTerm) || 
            plugin.description.toLowerCase().includes(searchTerm)) &&
            (selectedCategory === 'All' || plugin.category === selectedCategory)
        );
        displayPlugins(filteredPlugins);
    }

    function showPluginDetails(plugin) {
        localStorage.setItem('selectedPlugin', JSON.stringify(plugin));
        window.location.href = 'plugin.html';
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
        displayPlugins(allPlugins);
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

            const compatibleElement = document.getElementById('plugin-compatible-with');
            compatibleElement.textContent = `Compatible with: ${selectedPlugin.compatibleWith || 'Not specified'}`;
        }

        document.getElementById('theme-toggle').addEventListener('change', toggleTheme);
    }
});

// Parse GitHub URL to extract owner and repo name
function parseGitHubUrl(url) {
    // Remove .git extension if present
    const cleanedUrl = url.replace(/\.git$/, '');
    const match = cleanedUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (match && match[1] && match[2]) {
        return {
            owner: match[1],
            repo: match[2]
        };
    }
    throw new Error(`Invalid GitHub URL: ${url}`);
}

// Fetch plugins from a specific repository
async function fetchPluginsFromRepo(repoUrl) {
    try {
        const { owner, repo } = parseGitHubUrl(repoUrl);
        const pluginsDirUrl = `https://api.github.com/repos/${owner}/${repo}/contents/plugins`;
        const response = await fetch(pluginsDirUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} for ${repoUrl}`);
        }
        
        const contents = await response.json();
        const pluginDirs = contents.filter(item => item.type === 'dir');

        const plugins = [];
        for (const dir of pluginDirs) {
            try {
                const dataUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/plugins/${dir.name}/data.json`;
                const dataResponse = await fetch(dataUrl);
                
                if (!dataResponse.ok) {
                    console.warn(`Skipping ${dir.name} in ${owner}/${repo}: Could not fetch data.json`);
                    continue;
                }
                
                // Add JSON parsing validation
                const text = await dataResponse.text();
                let pluginData;
                
                try {
                    pluginData = JSON.parse(text);
                } catch (parseError) {
                    console.error(`Invalid JSON in ${dataUrl}:`, parseError);
                    continue;
                }
                
                // Validate required fields
                if (!pluginData.name || !pluginData.category) {
                    console.warn(`Skipping ${dir.name} in ${owner}/${repo}: Missing required fields`);
                    continue;
                }

                // Add repo information
                pluginData.repoOwner = owner;
                pluginData.repoName = repo;
                
                // Construct download URL
                pluginData.downloadUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/plugins/${dir.name}/plugin.zip`;
                
                plugins.push(pluginData);
            } catch (error) {
                console.error(`Error processing ${dir.name} in ${owner}/${repo}:`, error);
            }
        }
        return plugins;
    } catch (error) {
        console.error(`Failed to fetch plugins from ${repoUrl}:`, error);
        return []; // Return empty array instead of failing completely
    }
}