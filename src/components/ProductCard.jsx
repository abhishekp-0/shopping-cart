import { useState } from 'react';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import {
  Card,
  Flex,
  Box,
  Text,
  Heading,
  Badge,
  Button,
  IconButton,
  TextField,
  Inset,
} from '@radix-ui/themes';

export default function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (value) => {
    const num = parseInt(value, 10);
    setQuantity(isNaN(num) || num < 1 ? 1 : num);
  };

  const handleIncrement = () => setQuantity((p) => p + 1);
  const handleDecrement = () => setQuantity((p) => Math.max(1, p - 1));

  const handleAddToCart = () => {
    if (typeof addToCart === 'function') addToCart(product, quantity);
    setQuantity(1);
  };

  if (!product) {
    return null;
  }

  return (
    <Card size="2" style={{ height: '100%' }}>
      <Flex direction="column" style={{ height: '100%' }}>
        <Inset clip="padding-box" side="top" pb="current">
          <Box
            style={{
              height: '160px',
              backgroundColor: 'var(--gray-a3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                padding: '8px',
              }}
              data-testid={`product-image-${product.id}`}
            />
          </Box>
        </Inset>

        <Flex direction="column" p="4" style={{ flexGrow: 1 }}>
          <Badge variant="soft" mb="2" data-testid={`product-category-${product.id}`}>
            {product.category}
          </Badge>

          <Heading as="h3" size="3" mb="2" trim="start" data-testid={`product-title-${product.id}`}>
            {product.title}
          </Heading>

          <Text
            as="p"
            size="2"
            color="gray"
            mb="3"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              flexGrow: 1,
            }}
            data-testid={`product-description-${product.id}`}
          >
            {product.description}
          </Text>

          <Flex align="center" justify="between" mb="3">
            <Text
              as="span"
              size="6"
              weight="bold"
              color="accent"
              data-testid={`product-price-${product.id}`}
            >
              ${Number(product.price).toFixed(2)}
            </Text>
            {product.rating && (
              <Flex align="center" gap="1">
                <Text size="2" color="gray" data-testid={`product-rating-${product.id}`}>
                  ⭐ {product.rating.rate}
                </Text>
              </Flex>
            )}
          </Flex>

          <Flex direction="column" gap="3" mt="auto">
            <Flex align="center" gap="2">
              <IconButton
                variant="outline"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                data-testid={`product-decrement-${product.id}`}
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </IconButton>

              <TextField.Root
                value={quantity.toString()}
                onChange={(e) => handleQuantityChange(e.target.value)}
                style={{ width: '60px', textAlign: 'center' }}
                data-testid={`product-quantity-${product.id}`}
                aria-label="Quantity"
              />

              <IconButton
                variant="outline"
                onClick={handleIncrement}
                data-testid={`product-increment-${product.id}`}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </IconButton>
            </Flex>

            <Button
              size="2"
              onClick={handleAddToCart}
              data-testid={`add-to-cart-${product.id}`}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}