"use client";

import axios from "axios";
import { useState, useEffect } from "react";

const Pricing = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedProduct, setSearchedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/wp-products");
      const data = await response.json();
      if (response.ok) {
        setProducts(data);
        console.log("data: ", data);
      } else {
        setError(data.error || "Failed to load products");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products");
      setIsLoading(false);
    }
  };
  useEffect(() => {
    //fetchProducts();
  }, []);

  const searchProductByName = async () => {
    try {
      const response = await fetch(
        `/api/products?name=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      if (response.ok) {
        setSearchedProduct(data);
      } else {
        console.error("Error response:", data);
        setSearchedProduct(null);
        alert(data.error || "Product not found");
      }
    } catch (error) {
      console.error("Error searching product by name:", error);
      alert("Failed to search product");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Pricing List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <span>
              {product.name} - ID: {product.id}
            </span>
            <span>Price: {product.price}</span>
          </li>
        ))}
      </ul>

      <h2>Search for a Product</h2>
      <input
        type="text"
        placeholder="Enter product name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={searchProductByName}>Search</button>

      {searchedProduct && (
        <div>
          <h3>Product Found:</h3>
          <p>Name: {searchedProduct.name}</p>
          <p>ID: {searchedProduct.id}</p>
          <p>Price: {searchedProduct.price}</p>
        </div>
      )}
    </div>
  );
};

export default Pricing;
