// Product Listing Page with filtering and sorting functionality
class ProductListing {
  constructor() {
    this.products = this.getSampleProducts();
    this.filteredProducts = [...this.products];
    
    this.initializeElements();
    this.bindEvents();
    this.renderProducts();
  }

  // Sample product data
  getSampleProducts() {
    return [
      {
        id: 1,
        name: "Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 89.99,
        category: "electronics",
        rating: 4.5,
        image: "headphones.jpg"
      },
      {
        id: 2,
        name: "Smartphone",
        description: "Latest smartphone with advanced camera features",
        price: 699.99,
        category: "electronics",
        rating: 4.8,
        image: "smartphone.jpg"
      },
      {
        id: 3,
        name: "Cotton T-Shirt",
        description: "Comfortable cotton t-shirt in various colors",
        price: 24.99,
        category: "clothing",
        rating: 4.2,
        image: "tshirt.jpg"
      },
      {
        id: 4,
        name: "Programming Book",
        description: "Comprehensive guide to modern JavaScript",
        price: 39.99,
        category: "books",
        rating: 4.6,
        image: "book.jpg"
      },
      {
        id: 5,
        name: "Garden Planters",
        description: "Beautiful ceramic planters for indoor and outdoor use",
        price: 45.99,
        category: "home",
        rating: 4.3,
        image: "planters.jpg"
      },
      {
        id: 6,
        name: "Laptop",
        description: "Powerful laptop for work and gaming",
        price: 1299.99,
        category: "electronics",
        rating: 4.7,
        image: "laptop.jpg"
      },
      {
        id: 7,
        name: "Denim Jeans",
        description: "Classic denim jeans with perfect fit",
        price: 59.99,
        category: "clothing",
        rating: 4.4,
        image: "jeans.jpg"
      },
      {
        id: 8,
        name: "Cookbook",
        description: "Collection of delicious recipes from around the world",
        price: 29.99,
        category: "books",
        rating: 4.1,
        image: "cookbook.jpg"
      }
    ];
  }

  // Initialize DOM elements
  initializeElements() {
    this.categoryFilter = document.getElementById('category-filter');
    this.priceMin = document.getElementById('price-min');
    this.priceMax = document.getElementById('price-max');
    this.sortSelect = document.getElementById('sort-select');
    this.applyFiltersBtn = document.getElementById('apply-filters');
    this.clearFiltersBtn = document.getElementById('clear-filters');
    this.productGrid = document.getElementById('product-grid');
    this.productCount = document.getElementById('count');
  }

  // Bind event listeners
  bindEvents() {
    this.applyFiltersBtn.addEventListener('click', () => this.applyFilters());
    this.clearFiltersBtn.addEventListener('click', () => this.clearFilters());
    this.sortSelect.addEventListener('change', () => this.sortProducts());
  }

  // Apply filters based on user selection
  applyFilters() {
    const category = this.categoryFilter.value;
    const minPrice = parseFloat(this.priceMin.value) || 0;
    const maxPrice = parseFloat(this.priceMax.value) || Infinity;

    this.filteredProducts = this.products.filter(product => {
      const categoryMatch = !category || product.category === category;
      const priceMatch = product.price >= minPrice && product.price <= maxPrice;
      
      return categoryMatch && priceMatch;
    });

    this.sortProducts();
    this.renderProducts();
  }

  // Clear all filters
  clearFilters() {
    this.categoryFilter.value = '';
    this.priceMin.value = '';
    this.priceMax.value = '';
    this.sortSelect.value = 'name';
    
    this.filteredProducts = [...this.products];
    this.renderProducts();
  }

  // Sort products based on selected criteria
  sortProducts() {
    const sortBy = this.sortSelect.value;
    
    this.filteredProducts.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    
    this.renderProducts();
  }

  // Render products to the DOM
  renderProducts() {
    this.productGrid.innerHTML = '';
    this.productCount.textContent = this.filteredProducts.length;
    
    if (this.filteredProducts.length === 0) {
      this.productGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">No products found matching your criteria.</p>';
      return;
    }
    
    this.filteredProducts.forEach(product => {
      const productCard = this.createProductCard(product);
      this.productGrid.appendChild(productCard);
    });
  }

  // Create individual product card
  createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
      <div class="product-image">
        <span>📷 ${product.name}</span>
      </div>
      <div class="product-info-card">
        <div class="product-title">${product.name}</div>
        <div class="product-description">${product.description}</div>
        <div class="product-meta">
          <div class="product-price">$${product.price.toFixed(2)}</div>
          <div class="product-rating">⭐ ${product.rating}</div>
        </div>
        <div class="product-category">${product.category}</div>
      </div>
    `;
    
    return card;
  }
}

// Initialize the product listing when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProductListing();
}); 