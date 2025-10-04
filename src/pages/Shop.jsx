import React, { useState, useEffect } from 'react'
import {
  Section,
  Container,
  Heading,
  Text,
  Flex,
  Button,
  Grid,
  Box,
  TextField,
  Select
} from '@radix-ui/themes'
import { Search } from 'lucide-react'
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const FAKE_STORE_API = 'https://fakestoreapi.com';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/products',{mode: 'cors'});

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                // Only include ProductsfetchProducts with a valid image
                setProducts(data);
            } catch (error) {
                // Fallback card if API fetch fails
                console.log("Could not fetch Products:", error);
                setProductsError(error);
            } finally{
                setIsProductsLoading(false);
            }
        };

        fetchProducts();
  }, []);

  return { products, isProductsLoading, productsError };
};

function Shop({addToCart}) {

  const { products, isProductsLoading, productsError } = useProducts();
  
  if(isProductsLoading) {
    return(
      <Flex justify="center" style={{ padding: '5rem 0' }}>
        <LoadingSpinner size="lg" text="Loading products..." />
      </Flex>
    )
  }
  if (productsError) {
    return (
      <Box style={{ minHeight: '100vh' }}>
        <Section style={{ padding: '2rem 1rem' }}>
          <Container size="3">
            <Flex direction="column" align="center" gap="3">
              <Heading as="h1" size="5" weight="bold">Error Loading Products</Heading>
              <Text color="gray" align="center">
                Unable to load products. Please check your internet connection and try again.
              </Text>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </Flex>
          </Container>
        </Section>
      </Box>
    );
  }

  return (
    <Box style={{ minHeight: '100vh' }}>
      <Section style={{ padding: '2rem 0' }}>
        <Container size="4" px="4">
          <Heading
            as="h1"
            size="6"
            weight="bold"
            style={{ marginBottom: '1.5rem' }}
            data-testid="shop-title"
          >
            Shop Products
          </Heading>

          {/* Products Grid */}
          <Grid
              columns={{ initial: '1', sm: '2', md: '3', lg: '4' }}
              gap="6"
              data-testid="products-grid"
            >
              {(products).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))}
            </Grid>
          

          {/* No results */}
        </Container>
      </Section>
    </Box>
  );
}

export default Shop
