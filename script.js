let currentPage = 1;
let totalPages = 1;

async function searchRepos(page = 1) {
    const searchInput = document.getElementById('searchInput').value;
    const languageFilter = document.getElementById('languageFilter').value;
    const resultsDiv = document.getElementById('results');
    const loadingDiv = document.getElementById('loading');
    const paginationDiv = document.getElementById('pagination');

    resultsDiv.innerHTML = ''; // Clear previous results
    paginationDiv.innerHTML = ''; // Clear previous pagination
    loadingDiv.style.display = 'block'; // Show loading spinner

    const query = `https://api.github.com/search/repositories?q=${searchInput}+language:${languageFilter}&sort=stars&order=desc&page=${page}&per_page=10`;

    try {
        const response = await fetch(query);
        const data = await response.json();
        
        loadingDiv.style.display = 'none'; // Hide loading spinner
        
        if (data.items && data.items.length > 0) {
            data.items.forEach(repo => {
                const repoDiv = document.createElement('div');
                repoDiv.className = 'repo';

                const repoName = document.createElement('h2');
                repoName.textContent = repo.name;

                const repoDescription = document.createElement('p');
                repoDescription.textContent = repo.description || 'No description provided.';

                const repoDetails = document.createElement('p');
                repoDetails.innerHTML = `<strong>Owner:</strong> ${repo.owner.login} | <strong>Stars:</strong> ${repo.stargazers_count} | <strong>Forks:</strong> ${repo.forks_count}`;

                const repoLink = document.createElement('a');
                repoLink.href = repo.html_url;
                repoLink.textContent = 'Visit Repository';
                repoLink.target = '_blank';
                repoLink.className = 'btn btn-primary';

                repoDiv.appendChild(repoName);
                repoDiv.appendChild(repoDescription);
                repoDiv.appendChild(repoDetails);
                repoDiv.appendChild(repoLink);

                resultsDiv.appendChild(repoDiv);
            });

            totalPages = Math.ceil(data.total_count / 10);
            createPagination(page);
        } else {
            resultsDiv.textContent = 'No repositories found.';
        }
    } catch (error) {
        console.error('Error fetching repositories:', error);
        loadingDiv.style.display = 'none'; // Hide loading spinner
        resultsDiv.textContent = 'An error occurred while fetching repositories.';
    }
}

function createPagination(currentPage) {
    const paginationDiv = document.getElementById('pagination');
    const previousButton = document.createElement('a');
    previousButton.className = 'pagination-btn';
    previousButton.textContent = 'Previous';
    previousButton.onclick = () => searchRepos(currentPage - 1);
    previousButton.style.display = currentPage === 1 ? 'none' : 'inline-block';

    const nextButton = document.createElement('a');
    nextButton.className = 'pagination-btn';
    nextButton.textContent = 'Next';
    nextButton.onclick = () => searchRepos(currentPage + 1);
    nextButton.style.display = currentPage === totalPages ? 'none' : 'inline-block';

    paginationDiv.appendChild(previousButton);
    paginationDiv.appendChild(nextButton);
}
