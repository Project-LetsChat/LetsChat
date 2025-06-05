document.addEventListener('DOMContentLoaded', async () => {
    // Initialize theme for all pages
    function initTheme() {
        function toggleTheme() {
            const isDarkMode = document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        }

        // Load saved theme
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
            if (document.getElementById('theme-toggle')) {
                document.getElementById('theme-toggle').checked = true;
            }
        }

        // Attach event listener if toggle exists
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('change', toggleTheme);
        }
    }

    // Initialize theme for current page
    initTheme();

    // Only run store logic on store page
    if (window.location.pathname.endsWith('extra.html') || 
        window.location.pathname.endsWith('index.html')) {
        
        // Define multiple repositories
        const repositories = [
            "https://github.com/Project-LetsChat/plugin-repo.git",
            // Add more repositories as needed
        ];

        // Store types
        const storeTypes = {
            PLUGINS: 'plugins',
            THEMES: 'themes'
        };

        // Global state
        let currentType = storeTypes.PLUGINS;
        let allItems = { plugins: [], themes: [] };
        let currentItems = [];
        let categories = { plugins: new Set(), themes: new Set() };

        const itemContainer = document.getElementById('item-container');
        const searchInput = document.getElementById('search');
        const categorySelect = document.getElementById('category-select');
        const showPluginsBtn = document.getElementById('show-plugins');
        const showThemesBtn = document.getElementById('show-themes');

        // Show loading message
        if (itemContainer) {
            itemContainer.innerHTML = '<p class="loading-message">Loading items...</p>';
        }

        try {
            // Fetch items from all repositories
            for (const repoUrl of repositories) {
                const [repoPlugins, repoThemes] = await Promise.all([
                    fetchItemsFromRepo(repoUrl, storeTypes.PLUGINS),
                    fetchItemsFromRepo(repoUrl, storeTypes.THEMES)
                ]);
                
                allItems.plugins = [...allItems.plugins, ...repoPlugins];
                allItems.themes = [...allItems.themes, ...repoThemes];
                
                // Collect categories
                repoPlugins.forEach(p => categories.plugins.add(p.category));
                repoThemes.forEach(t => categories.themes.add(t.category));
            }
            
            // Set initial view
            switchType(storeTypes.PLUGINS);
        } catch (error) {
            console.error('Error fetching items:', error);
            if (itemContainer) {
                itemContainer.innerHTML = '<p class="error-message">Failed to load items. Please try again later.</p>';
            }
            return;
        }

        // Type switching
        showPluginsBtn.addEventListener('click', () => switchType(storeTypes.PLUGINS));
        showThemesBtn.addEventListener('click', () => switchType(storeTypes.THEMES));

        function switchType(type) {
            currentType = type;
            currentItems = allItems[type];
            
            // Update UI
            showPluginsBtn.classList.toggle('active', type === storeTypes.PLUGINS);
            showThemesBtn.classList.toggle('active', type === storeTypes.THEMES);
            
            // Update categories
            updateCategoryDropdown();
            
            // Display items
            filterItems();
        }

        function updateCategoryDropdown() {
            categorySelect.innerHTML = '<option value="All">All Categories</option>';
            
            const currentCategories = Array.from(categories[currentType]).sort();
            currentCategories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categorySelect.appendChild(option);
            });
        }

        function displayItems(itemsToDisplay) {
            itemContainer.innerHTML = '';
            
            if (itemsToDisplay.length === 0) {
                itemContainer.innerHTML = '<p class="no-items">No items found</p>';
                return;
            }
            
            itemsToDisplay.forEach(item => {
                const itemCard = document.createElement('div');
                itemCard.className = 'item-card';
                itemCard.onclick = () => showItemDetails(item);

                const itemTitle = document.createElement('h2');
                itemTitle.textContent = item.name;

                const itemCategory = document.createElement('p');
                itemCategory.textContent = `Category: ${item.category}`;

                const itemType = document.createElement('p');
                itemType.textContent = `Type: ${item.type === storeTypes.PLUGINS ? 'Plugin' : 'Theme'}`;

                itemCard.appendChild(itemTitle);
                itemCard.appendChild(itemCategory);
                itemCard.appendChild(itemType);
                itemContainer.appendChild(itemCard);
            });
        }

        function filterItems() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategory = categorySelect.value;
            
            const filteredItems = currentItems.filter(item => 
                (item.name.toLowerCase().includes(searchTerm) || 
                item.description.toLowerCase().includes(searchTerm)) &&
                (selectedCategory === 'All' || item.category === selectedCategory)
            );
            
            displayItems(filteredItems);
        }

        function showItemDetails(item) {
            localStorage.setItem('selectedItem', JSON.stringify(item));
            window.location.href = 'plugin.html';
        }
    }

    // Handle Item Details Page
    if (window.location.pathname.endsWith('plugin.html')) {
        const selectedItem = JSON.parse(localStorage.getItem('selectedItem'));
        if (selectedItem) {
            document.getElementById('item-name').textContent = selectedItem.name;
            document.getElementById('item-description').textContent = `Description: ${selectedItem.description}`;
            document.getElementById('item-version').textContent = `Version: ${selectedItem.version}`;
            document.getElementById('item-author').textContent = `Author: ${selectedItem.author}`;
            document.getElementById('item-category').textContent = `Category: ${selectedItem.category}`;
            document.getElementById('item-license').href = selectedItem.licenseUrl;
            document.getElementById('item-license').textContent = `License: ${selectedItem.license}`;
            document.getElementById('item-repo').href = selectedItem.repoUrl;

            const downloadButton = document.getElementById('download-button');
            downloadButton.href = selectedItem.downloadUrl;
            downloadButton.setAttribute('download', `${selectedItem.name.replace(/\s+/g, '-')}.zip`);
            downloadButton.textContent = selectedItem.type === 'plugins' ? 
                'Download Plugin' : 'Download Theme';

            const compatibleElement = document.getElementById('item-compatible-with');
            if (compatibleElement) {
                compatibleElement.textContent = `Compatible with: ${selectedItem.compatibleWith || 'Not specified'}`;
            }
        }
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

// Fetch items from a specific repository and type
async function fetchItemsFromRepo(repoUrl, type) {
    try {
        const { owner, repo } = parseGitHubUrl(repoUrl);
        const itemsDirUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${type}`;
        const response = await fetch(itemsDirUrl);
        
        if (!response.ok) {
            console.warn(`No ${type} found in ${owner}/${repo}`);
            return [];
        }
        
        const contents = await response.json();
        
        // Skip if it's a file instead of directory
        if (contents.type === 'file') return [];
        
        const itemDirs = Array.isArray(contents) ? 
            contents.filter(item => item.type === 'dir') : [];

        const items = [];
        for (const dir of itemDirs) {
            try {
                const dataUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${type}/${dir.name}/data.json`;
                const dataResponse = await fetch(dataUrl);
                
                if (!dataResponse.ok) {
                    console.warn(`Skipping ${dir.name} in ${owner}/${repo}: Could not fetch data.json`);
                    continue;
                }
                
                // Parse JSON
                const text = await dataResponse.text();
                let itemData;
                
                try {
                    itemData = JSON.parse(text);
                } catch (parseError) {
                    console.error(`Invalid JSON in ${dataUrl}:`, parseError);
                    continue;
                }
                
                // Validate required fields
                if (!itemData.name || !itemData.category) {
                    console.warn(`Skipping ${dir.name} in ${owner}/${repo}: Missing required fields`);
                    continue;
                }

                // Add repo and type information
                itemData.repoOwner = owner;
                itemData.repoName = repo;
                itemData.type = type;
                
                // Construct download URL
                const zipFileName = type === 'plugins' ? 'plugin.zip' : 'theme.zip';
                itemData.downloadUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${type}/${dir.name}/${zipFileName}`;
                
                items.push(itemData);
            } catch (error) {
                console.error(`Error processing ${dir.name} in ${owner}/${repo}:`, error);
            }
        }
        return items;
    } catch (error) {
        console.error(`Failed to fetch ${type} from ${repoUrl}:`, error);
        return [];
    }
}
