document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://127.0.0.1:8000/api/products';
    
    // DOM Elements
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error-state');
    const gridEl = document.getElementById('products-grid');
    
    // Modal Elements
    const modal = document.getElementById('product-modal');
    const openModalBtn = document.getElementById('open-modal-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const addProductForm = document.getElementById('add-product-form');
    const submitBtn = document.getElementById('submit-btn');
    
    // Toast Element
    const toast = document.getElementById('toast');

    // --- Fetch Products ---
    async function fetchProducts() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            const products = await response.json();
            renderProducts(products);
            
        } catch (error) {
            console.warn('Backend Laravel tidak merespons (wajar karena ini Live Demo statis). Menggunakan data palsu (mock)...');
            // Mock Data Fallback
            const mockProducts = [
                { id: 1, name: "iPhone 15 Pro", category: { name: "Electronics" }, price: 25000000, stock: 45 },
                { id: 2, name: "MacBook Air M2", category: { name: "Electronics" }, price: 18500000, stock: 12 },
                { id: 3, name: "Sony WH-1000XM5", category: { name: "Accessories" }, price: 5800000, stock: 30 }
            ];
            renderProducts(mockProducts);
            showToast('Menampilkan data simulasi (Backend offline)', false);
        }
    }

    // --- Render Products ---
    function renderProducts(products) {
        loadingEl.classList.add('hidden');
        
        if (products.length === 0) {
            gridEl.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: var(--text-muted);">No products found. Be the first to add one!</p>';
        } else {
            const cardsHtml = products.map(product => `
                <div class="product-card">
                    <button class="btn-delete" onclick="window.deleteProduct(${product.id}, this)" title="Delete Product">&times;</button>
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

    // --- Delete Product Logic (Global so inline onclick works) ---
    window.deleteProduct = async (id, btn) => {
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete product');
            }

            showToast('Product deleted successfully!');
            fetchProducts();
        } catch (error) {
            console.warn('Backend offline, simulating delete...');
            showToast('Simulasi: Produk berhasil dihapus!');
            if (btn) btn.closest('.product-card').remove();
        }
    };

    // --- Modal Logic ---
    function openModal() {
        modal.classList.remove('hidden');
    }

    function closeModal() {
        modal.classList.add('hidden');
        addProductForm.reset();
    }

    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // --- Add Product Logic ---
    addProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // UI Loading state
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Saving...';
        submitBtn.disabled = true;

        const newProduct = {
            name: document.getElementById('name').value,
            sku: document.getElementById('sku').value,
            price: document.getElementById('price').value,
            stock: document.getElementById('stock').value,
            category_id: document.getElementById('category_id').value
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add product');
            }

            // Success
            closeModal();
            showToast('Product added successfully!');
            
            // Refresh grid
            loadingEl.classList.remove('hidden');
            gridEl.classList.add('hidden');
            fetchProducts();

        } catch (error) {
            console.warn('Backend offline, simulating add...');
            closeModal();
            showToast('Simulasi: Produk berhasil ditambahkan!');
        } finally {
            submitBtn.innerText = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // --- Toast Logic ---
    function showToast(message, isError = false) {
        toast.innerText = message;
        
        if (isError) {
            toast.classList.add('error');
        } else {
            toast.classList.remove('error');
        }

        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }

    // Start fetching on load
    fetchProducts();
});
