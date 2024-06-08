# GitHub Repo Explorer

GitHub Repo Explorer is a web application that allows users to search for GitHub repositories by keyword and filter by programming language. It displays basic information about each repository and provides a link to visit the repository on GitHub. The application also includes features like pagination, a loading indicator, and error handling for an enhanced user experience.

## Features

- Search for GitHub repositories by keyword
- Filter results by programming language
- Display repository details including name, description, owner, stars, and forks
- Visit the repository on GitHub
- Pagination to navigate through search results
- Loading indicator while fetching data
- Error handling for failed API requests

## Demo

[Link to Live Demo](#) (Add link to your live demo if hosted online)

## Screenshots

![Screenshot](screenshot.png) (Add screenshot of your application)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need a modern web browser and an internet connection to run this application.

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ShadBalti/GRE.git
    ```
2. Navigate to the project directory:
    ```sh
    cd repo-explorer
    ```

### Usage

1. Open `index.html` in your web browser.
2. Enter a search keyword and select a language (or leave it as "All Languages").
3. Click the "Search" button to see the results.

## Built With

- HTML
- CSS
- JavaScript
- [Bootstrap](https://getbootstrap.com/) - for responsive design
- [GitHub API](https://docs.github.com/en/rest) - to fetch repository data

## Code Overview

### HTML

The `index.html` file contains the structure of the application, including the search bar, loading indicator, results area, and pagination controls.

### CSS

The `style.css` file provides custom styling for the application, including styles for the repository cards and pagination buttons. Bootstrap is used for overall styling and responsive design.

### JavaScript

The `script.js` file contains the logic for fetching data from the GitHub API, displaying results, handling pagination, showing a loading indicator, and managing errors.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or bug fixes.

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing the data
- [Bootstrap](https://getbootstrap.com/) for the design framework
