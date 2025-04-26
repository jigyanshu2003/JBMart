import React from 'react';
import { createRoot } from 'react-dom/client';

export default class ContainerView {
  constructor(data) {
    this.data = data;
    this.render();
  }

  render() {
    const container = document.getElementById('container');
    if (!container) return;

    const products = this.data.map((product, index) => (
      <div key={index} className="product-card">
        <img src={product.src} alt={product.name} className="product-image" />
        <div className="product-details">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-unit">{product.unit}</p>
          <p className="product-type">{product.type}</p>
          <div className="product-pricing">
            <span className="original-price">₹{product.price}</span>
            <span className="discount-price">₹{product.discount_price}</span>
          </div>
          <p className="product-origin">Origin: {product.countryoforigin}</p>
          <button className="add-to-cart">Add to Cart</button>
        </div>
      </div>
    ));

    const root = createRoot(container);
    root.render(
      <div className="products-container">
        {products}
      </div>
    );
  }
} 