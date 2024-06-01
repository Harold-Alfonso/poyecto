function loadContent(page) {
    const container = document.querySelector('.container');
    fetch(page)
        .then(response => response.text())
        .then(data => container.innerHTML = data)
        .catch(error => console.error('Error loading content:', error));
}