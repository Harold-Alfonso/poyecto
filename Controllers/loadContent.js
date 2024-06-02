function loadContent(page) {
  const container = document.querySelector('.container');
  fetch(page)
    .then(response => response.text())
    .then(data => {
      container.innerHTML = data;
      if (page === 'agregar_produc.html') {
        import('../Controllers/addproductos.js').then(module => {
          module.initializeForm();
        });
      }
      if (page === 'cerveza.html') {
        import('../Controllers/vercervezas.js');
          
      }
    })
    .catch(error => console.error('Error loading content:', error));
}

