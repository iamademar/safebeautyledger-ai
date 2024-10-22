'use client';

import { useState, useEffect } from 'react';
import Chatbot from '@/app/components/Chatbot';

interface Product {
  product_id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  images: { url: string; alt_text: string }[];
  ingredients: string[];
  usage_instructions: string;
  size: string;
  weight: string;
  current_status: string;
  retailer: string;
  created_by: {
    name: string;
    email: string;
  };
}

export default function ProductAssistant({ params }: { params: { product_id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/beauty-products/${params.product_id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status} ${response.statusText}`);
        }

        const fetchedProduct = await response.json();
        setProduct(fetchedProduct.data);
        console.log('Product fetched successfully');
        console.log(fetchedProduct);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to fetch product');
      }
    };

    fetchProduct();
  }, [params.product_id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return <Chatbot product={product} />;
}
