// js/main.js
document.addEventListener("DOMContentLoaded", function() {
    // Fetch product data from the API
    fetch('https://fakestoreapi.com/products/1') // Example API URL
        .then(response => response.json())
        .then(data => {
            // Populate product details
            document.getElementById('product-title').textContent = data.title;
            document.getElementById('product-price').textContent = `$${data.price}`;
            document.getElementById('main-image').src = data.image;

            // Set stock status (simplified logic)
            const stockStatus = document.getElementById('stock-status');
            if (data.rating.count > 20) {
                stockStatus.textContent = 'In Stock';
                stockStatus.style.color = 'green';
            } else if (data.rating.count > 10) {
                stockStatus.textContent = 'Low Stock';
                stockStatus.style.color = 'orange';
            } else {
                stockStatus.textContent = 'Out of Stock';
                stockStatus.style.color = 'red';
            }
        });

    // Image gallery functionality
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumbnails img');
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            mainImage.src = this.src.replace('_thumb', '');
        });
    });

    // Real-time inventory update
    const stockStatus = document.getElementById('stock-status');
    const quantityInput = document.getElementById('quantity');

    quantityInput.addEventListener('input', function() {
        const quantity = parseInt(this.value);
        if (quantity > 10) {
            stockStatus.textContent = 'Low Stock';
            stockStatus.style.color = 'orange';
        } else if (quantity === 0) {
            stockStatus.textContent = 'Out of Stock';
            stockStatus.style.color = 'red';
        } else {
            stockStatus.textContent = 'In Stock';
            stockStatus.style.color = 'green';
        }
    });

    // Load customer reviews from a mock API
    const reviewList = document.getElementById('review-list');
    const loadMoreButton = document.getElementById('load-more-reviews');
    let reviewsLoaded = 0;

    function loadReviews() {
        fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
            .then(response => response.json())
            .then(data => {
                const reviews = data.slice(reviewsLoaded, reviewsLoaded + 5);
                reviews.forEach(review => {
                    const reviewElement = document.createElement('div');
                    reviewElement.className = 'review';
                    reviewElement.innerHTML = `<h3>${review.name}</h3><p>${review.body}</p>`;
                    reviewList.appendChild(reviewElement);
                });
                reviewsLoaded += 5;
                if (reviewsLoaded >= data.length) {
                    loadMoreButton.style.display = 'none';
                }
            });
    }

    loadMoreButton.addEventListener('click', loadReviews);

    // Initial load of reviews
    loadReviews();

    // Related products carousel (simplified example)
    const relatedProductsCarousel = document.getElementById('related-products-carousel');

    function loadRelatedProducts() {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(products => {
                const relatedProducts = products.slice(0, 3); // Example: show first 3 products
                relatedProducts.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.className = 'related-product';
                    productElement.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <p>${product.title}</p>
                        <p>$${product.price}</p>
                        <button>Add to Cart</button>
                    `;
                    relatedProductsCarousel.appendChild(productElement);
                });
            });
    }

    loadRelatedProducts();
});
