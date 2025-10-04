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

  // Guard against product being null or undefined
  if (!product) {
    return null;
  }

  return (
    <Card size="2" style={{ height: '100%' }}>
      <Flex direction="column" style={{ height: '100%' }}>
        {/* Image */}
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
                objectFit: 'contain', // Use 'contain' to see the whole product
                padding: '8px',
              }}
              data-testid={`product-image-${product.id}`}
            />
          </Box>
        </Inset>

        {/* Content */}
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
              flexGrow: 1, // Allow description to take up space
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
            <Flex align="center" gap="1" style={{ color: 'var(--gray-11)' }}>
              <span aria-hidden>★</span>
              <Text size="1" data-testid={`product-rating-${product.id}`}>
                {product.rating?.rate ?? '—'} ({product.rating?.count ?? 0})
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* Actions */}
        <Box px="4" pb="4">
          <Flex align="center" gap="2" width="100%" mb="3">
            <IconButton
              variant="soft"
              disabled={quantity <= 1}
              onClick={handleDecrement}
              data-testid={`product-decrement-${product.id}`}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </IconButton>

            <TextField.Root
              type="number"
              min="1"
              value={String(quantity)}
              onChange={(e) => handleQuantityChange(e.target.value)}
              aria-label="Quantity"
              data-testid={`product-quantity-input-${product.id}`}
              style={{ flex: 1, textAlign: 'center' }}
            />

            <IconButton
              variant="soft"
              onClick={handleIncrement}
              data-testid={`product-increment-${product.id}`}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </IconButton>
          </Flex>

          <Button
            size="3"
            onClick={handleAddToCart}
            style={{ width: '100%' }}
            data-testid={`product-add-to-cart-${product.id}`}
          >
            <ShoppingCart size={16} style={{ marginRight: 8 }} />
            Add to Cart
          </Button>
        </Box>
      </Flex>
    </Card>
  );
}