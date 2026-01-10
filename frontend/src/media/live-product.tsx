// frontend/src/components/LiveProducts.tsx
import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  link?: string;
}

interface LiveProductsProps {
  products: Product[];        // Array of products to show
  rotationInterval?: number;  // Rotation interval in milliseconds
}

export default function LiveProducts({ products, rotationInterval = 5000 }: LiveProductsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate products automatically
  useEffect(() => {
    if (products.length <= 1) return; // No rotation if 0 or 1 product
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, rotationInterval);

    return () => clearInterval(timer);
  }, [products, rotationInterval]);

  if (!products || products.length === 0) return null;

  const product = products[currentIndex];

  return (
    <div className="live-product-container">
      <div className="live-product-card">
        <img src={product.imageUrl} alt={product.name} className="live-product-image" />
        <div className="live-product-info">
          <span className="live-product-name">{product.name}</span>
          <span className="live-product-price">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import './LiveProduct.css';

interface LiveProductProps {
  id: number;
  name: string;
  image: string;
  price: number;
}

export default function LiveProduct({ id, name, image, price }: LiveProductProps) {
  return (
    <div className="live-product" id={`product-${id}`}>
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">${price.toFixed(2)}</p>
    </div>
  );
}
// frontend/src/components/LiveProduct.tsx
import React from 'react';

interface ProductProps {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
  };
}

export default function LiveProduct({ product }: ProductProps) {
  return (
    <div className="live-product">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
}
// frontend/src/components/LiveProduct.tsx
import React from 'react';
import '../style/live-products.css';

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
}

interface LiveProductProps {
  product: Product;
}

export default function LiveProduct({ product }: LiveProductProps) {
  return (
    <div className="live-product-container">
      <div className="live-product-card">
        <img
          className="live-product-image"
          src={product.image}
          alt={product.name}
        />
        <div className="live-product-info">
          <span className="live-product-name">{product.name}</span>
          <span className="live-product-price">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}