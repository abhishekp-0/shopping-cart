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
} from '@radix-ui/themes';


export default function CartItem({
  item,
  updateQuantity,
  removeFromCart,
}) {
  const { product, quantity } = item;

  const handleQuantityChange = (value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      updateQuantity(product.id, num);
    }
  };

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
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
        <Box
          width={{ initial: '64px', sm: '80px' }}
          height={{ initial: '64px', sm: '80px' }}
          style={{ borderRadius: 'var(--radius-3)' }}
          className="rt-bg-accent"
        >
          <img
            src={product.image}
            alt={product.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }}
            data-testid={`cart-item-image-${product.id}`}
          />
        </Box>

        <Flex justify="between" align="center" wrap="wrap" gap="4">
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
                <Minus size={14} />
              </IconButton>

              <TextField.Root
                value={quantity.toString()}
                onChange={(e) => handleQuantityChange(e.target.value)}
                style={{ width: '60px', textAlign: 'center' }}
                data-testid={`cart-item-quantity-${product.id}`}
                aria-label="Quantity"
              />

              <IconButton
                variant="outline"
                onClick={handleIncrement}
                data-testid={`cart-item-increment-${product.id}`}
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </IconButton>
            </Flex>
          </Flex>
        </Flex>

        <Flex direction="column" align={{ initial: 'start', sm: 'end' }} gap="1" style={{ gridColumn: { initial: '1 / -1', sm: 'auto' } }}>
          <Text size="2" color="gray">Subtotal</Text>
          <Text size="5" weight="bold" data-testid={`cart-item-subtotal-${product.id}`}>
            ${subtotal.toFixed(2)}
          </Text>
        </Flex>
      </Grid>
    </Card>
  );
}