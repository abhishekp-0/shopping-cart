import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
} from '@radix-ui/themes';

import CartItem from '../components/CartItem';


export default function Cart({
  items,
  getTotalPrice,
  getTotalItems,
  clearCart,
  updateQuantity,
  removeFromCart,
}) {
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <Container size="2" px="4" py="8">
        <Flex
          direction="column"
          align="center"
          justify="center"
          py="9"
          gap="4"
        >
          <ShoppingBag
            width="96"
            height="96"
            className="text-gray-400"
          />
          <Heading size="8" align="center" data-testid="empty-cart-title">
            Your cart is empty
          </Heading>
          <Text
            as="p"
            color="gray"
            align="center"
            mb="4"
            data-testid="empty-cart-description"
          >
            Looks like you haven't added any items yet. Start browsing to find
            something you like!
          </Text>
          <Link to="/shop">
            <Button size="3" data-testid="continue-shopping">
              <ArrowLeft width="16" height="16" />
              Continue Shopping
            </Button>
          </Link>
        </Flex>
      </Container>
    );
  }

  return (
    <Container px="4" py="8">
      <Flex align="center" gap="4" mb="8">
        <Link to="/shop">
          <Button variant="ghost" size="2" data-testid="back-to-shop">
            <ArrowLeft width="16" height="16" />
            Back to Shop
          </Button>
        </Link>
        <Heading size="8" data-testid="cart-title">
          Shopping Cart
        </Heading>
      </Flex>

      <Grid columns={{ initial: '1', md: '3' }} gap="6">
        <Box gridColumn={{ initial: '1', md: 'span 2' }}>
          <Flex direction="column" gap="4" data-testid="cart-items-list">
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} updateQuantity={updateQuantity} removeFromCart={removeFromCart} />
            ))}
          </Flex>

          <Flex justify="between" align="center" mt="6">
            <Text size="2" color="gray" data-testid="total-items">
              {totalItems} items in cart
            </Text>
            <Button
              variant="outline"
              color="ruby"
              onClick={clearCart}
              data-testid="clear-cart"
            >
              Clear Cart
            </Button>
          </Flex>
        </Box>

        <Box gridColumn={{ initial: '1', md: 'span 1' }}>
          <Card data-testid="order-summary">
            <Flex direction="column" gap="4">
              <Heading as="h3" size="6">
                Order Summary
              </Heading>
              
              <Flex direction="column" gap="2">
                <Flex justify="between">
                  <Text>Subtotal</Text>
                  <Text data-testid="subtotal">${totalPrice.toFixed(2)}</Text>
                </Flex>
                <Flex justify="between">
                  <Text>Shipping</Text>
                  <Text color="green" data-testid="shipping">Free</Text>
                </Flex>
                <Flex justify="between">
                  <Text>Tax</Text>
                  <Text data-testid="tax">$0.00</Text>
                </Flex>
              </Flex>
              
              <Separator my="2" size="4" />
              
              <Flex justify="between">
                <Heading as="h4" size="4">Total</Heading>
                <Heading as="h4" size="4" data-testid="total-price">
                  ${totalPrice.toFixed(2)}
                </Heading>
              </Flex>

              <Button size="3" data-testid="checkout-button">
                Proceed to Checkout
              </Button>

              <Link to="/shop">
                <Button
                  variant="outline"
                  size="2"
                  style={{ width: '100%' }}
                  data-testid="continue-shopping-summary"
                >
                  Continue Shopping
                </Button>
              </Link>
            </Flex>
          </Card>
        </Box>
      </Grid>
    </Container>
  );
}