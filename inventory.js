document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://127.0.0.1:8000/api/products';
    
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error-state');
    const gridEl = document.getElementById('products-grid');

    async function fetchProducts() {
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const products = await response.json();
            renderProducts(products);
            
        } catch (error) {
            console.error('Error fetching products:', error);
            loadingEl.classList.add('hidden');
            errorEl.classList.remove('hidden');
        }
    }

    function renderProducts(products) {
        loadingEl.classList.add('hidden');
        
        if (products.length === 0) {
            gridEl.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: var(--text-muted);">No products found.</p>';
        } else {
            const cardsHtml = products.map(product => `
                <div class="product-card">
                    <div class="product-category">${product.category ? product.category.name : 'Uncategorized'}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-details">
                        <span class="product-price">Rp ${parseFloat(product.price).toLocaleString('id-ID')}</span>
                        <span class="product-stock">${product.stock} in stock</span>
                    </div>
                </div>
            `).join('');
            
            gridEl.innerHTML = cardsHtml;
        }
        
        gridEl.classList.remove('hidden');
    }

    // Start fetching
    fetchProducts();
});
