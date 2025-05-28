// JavaScript para catálogo Veneto: categorías, detalles y modal moderno

document.addEventListener('DOMContentLoaded', () => {
    // Asume que los productos están en el HTML, no en JSON externo
    const categorySections = document.querySelectorAll('section.category');
    const categoryTabs = document.querySelectorAll('.category-tab');
    const detailsButtons = document.querySelectorAll('.details-btn');
    const modal = document.getElementById('product-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalPrice = document.getElementById('modal-price');
    const closeModalBtn = document.querySelector('.close');
    const prevBtn = document.getElementById('prev-product');
    const nextBtn = document.getElementById('next-product');

    let currentCategory = 'hornet';
    let currentProducts = [];
    let currentIndex = 0;

    // Cambia de categoría
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            categorySections.forEach(section => {
                section.style.display = section.id === 'category-' + currentCategory ? '' : 'none';
            });
        });
    });

    // Inicializa mostrando solo la categoría activa
    categorySections.forEach(section => {
        section.style.display = section.id === 'category-' + currentCategory ? '' : 'none';
    });

    // Prepara productos de la categoría actual
    function updateCurrentProducts() {
        const section = document.getElementById('category-' + currentCategory);
        currentProducts = Array.from(section.querySelectorAll('.product'));
    }

    // Abre modal de detalles
    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('details-btn')) {
            updateCurrentProducts();
            const productDiv = e.target.closest('.product');
            currentIndex = currentProducts.indexOf(productDiv);
            showModal(productDiv);
        }
    });

    function showModal(productDiv) {
        modalImg.src = productDiv.querySelector('img').src;
        modalImg.alt = productDiv.querySelector('img').alt;
        modalTitle.textContent = productDiv.querySelector('h2').textContent;
        modalDesc.textContent = productDiv.querySelector('p').textContent;
        modalPrice.textContent = productDiv.querySelector('strong').textContent;
        modal.style.display = 'block';
        setTimeout(() => { modal.classList.add('show'); }, 10);
    }

    // Cierra modal
    closeModalBtn.onclick = () => {
        modal.classList.remove('show');
        setTimeout(() => { modal.style.display = 'none'; }, 300);
    };
    window.onclick = function(event) {
        if (event.target === modal) closeModalBtn.onclick();
    };

    // Navegación entre productos
    prevBtn.onclick = () => {
        if (currentIndex > 0) {
            currentIndex--;
            showModal(currentProducts[currentIndex]);
        }
    };
    nextBtn.onclick = () => {
        if (currentIndex < currentProducts.length - 1) {
            currentIndex++;
            showModal(currentProducts[currentIndex]);
        }
    };

    // BUSCADOR DE PRODUCTOS
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function () {
        const query = this.value.trim().toLowerCase();
        categorySections.forEach(section => {
            // Solo muestra productos de la categoría activa
            if (section.id === 'category-' + currentCategory) {
                const products = section.querySelectorAll('.product');
                products.forEach(prod => {
                    const text = prod.textContent.toLowerCase();
                    prod.style.display = text.includes(query) ? '' : 'none';
                });
            }
        });
    });

    // Cuando cambias de categoría, limpia el buscador y muestra todos los productos
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            searchInput.value = '';
            categorySections.forEach(section => {
                if (section.id === 'category-' + currentCategory) {
                    const products = section.querySelectorAll('.product');
                    products.forEach(prod => prod.style.display = '');
                }
            });
        });
    });
})