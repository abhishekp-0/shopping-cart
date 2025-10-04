import { useState, useEffect } from 'react';

const FAKE_STORE_API = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
  
}
// Hook: products by category
export const useProductsByCategory = (category) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(!!category);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;
    if (!category || category === 'all') {
      // load all products when 'all'
      (async () => {
        try {
          setLoading(true);
          const res = await fetch(`${FAKE_STORE_API}/products`);
          if (!res.ok) throw new Error('Failed to fetch products');
          const json = await res.json();
          if (!ignore) setData(json);
        } catch (err) {
          if (!ignore) setError(err);
        } finally {
          if (!ignore) setLoading(false);
        }
      })();
      return () => { ignore = true; };
    }

    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${FAKE_STORE_API}/products/category/${category}`);
        if (!res.ok) throw new Error(`Failed to fetch products for category: ${category}`);
        const json = await res.json();
        if (!ignore) setData(json);
      } catch (err) {
        if (!ignore) setError(err);
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => { ignore = true; };
  }, [category]);

  return { data, isLoading, error };
};