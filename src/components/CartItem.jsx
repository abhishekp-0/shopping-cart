import { Plus, Minus, Trash2 } from 'lucide-react';
import {
  Box,
  Card,
  Flex,
  Grid,
  Heading,
  IconButton,
  Text,
  TextField,
} from '@radix-ui/themes'; // Assuming this type import is correct

// Define the component's props, including the handler functions


export default function CartItem({
  item,
  updateQuantity,
  removeFromCart,
}) {
  const { product, quantity } = item;

  // --- Event Handlers ---
  const handleQuantityChange = (value) => {
    const num = parseInt(value, 10);
    // Update only if it's a valid positive number
    if (!isNaN(num) && num > 0) {
      updateQuantity(product.id, num);
    }
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    // Prevent quantity from going below 1
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const subtotal = product.price * quantity;

  return (
    <Card data-testid={`cart-item-${product.id}`}>
      <Grid columns={{ initial: "64px 1fr", sm: "80px 1fr auto" }} gap="4" align="center">
        {/* Product Image */}
        <Box
          width={{ initial: '64px', sm: '80px' }}
          height={{ initial: '64px', sm: '80px' }}
          style={{ borderRadius: 'var(--radius-3)' }} // Uses Radix theme variable for border radius
          className="rt-bg-accent" // A simple background color from Radix
        >
          <img
            src={product.image}
            alt={product.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
            data-testid={`cart-item-image-${product.id}`}
          />
        </Box>

        {/* Product Details & Quantity Controls (combined for better mobile layout) */}
        <Flex justify="between" align="center" wrap="wrap" gap="4">
          {/* Title, Category, and Price */}
          <Box>
            <Heading as="h3" size="4" trim="start" mb="1" data-testid={`cart-item-title-${product.id}`}>
              {product.title}
            </Heading>
            <Text as="p" size="2" color="gray">
              {product.category}
            </Text>
             <Text as="p" size="3" weight="bold" color="gray" mt="1" data-testid={`cart-item-price-${product.id}`}>
              ${product.price.toFixed(2)} each
            </Text>
          </Box>

          {/* Quantity and Actions */}
          <Flex direction="column" align="end" gap="2">
             <IconButton
              variant="ghost"
              color="ruby"
              onClick={handleRemove}
              data-testid={`cart-item-remove-${product.id}`}
              aria-label="Remove item"
            >
              <Trash2 size={16} />
            </IconButton>

            <Flex align="center" gap="2">
              <IconButton
                variant="outline"
                onClick={handleDecrement}
                disabled={quantity <= 1}
                data-testid={`cart-item-decrement-${product.id}`}
                 aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </IconButton>
              <TextField.Root
                type="number"
                value={String(quantity)}
                onChange={(e) => handleQuantityChange(e.target.value)}
                min={1}
                style={{ width: '55px', textAlign: 'center' }}
                data-testid={`cart-item-quantity-${product.id}`}
                aria-label="Item quantity"
              />
              <IconButton
                variant="outline"
                onClick={handleIncrement}
                data-testid={`cart-item-increment-${product.id}`}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </IconButton>
            </Flex>
            
             <Box mt="1" style={{ textAlign: 'right' }}>
              <Text size="2" color="gray">Subtotal</Text>
              <Text as="p" weight="bold" size="4" data-testid={`cart-item-subtotal-${product.id}`}>
                ${subtotal.toFixed(2)}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Grid>
    </Card>
  );
}