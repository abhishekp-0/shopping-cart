import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Box, Flex, Text, Link, Badge, Container, Button } from '@radix-ui/themes';
import { House, ShoppingCart, Store } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: House },
  { path: '/shop', label: 'Shop', icon: ShoppingCart },
  { path: '/cart', label: 'Cart', icon: Store }
];

const Navbar = ({ cart = [] }) => {
  const location = useLocation();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <Box style={{ borderBottom: '1px solid var(--gray-a6)', backdropFilter: 'blur(6px)' }} px="5" py="3">
      <Container px="4">
        <Flex justify="between" align="center">
          <Link asChild>
            <RouterLink to="/">
              <Text size="5" weight="bold">ShopCart</Text>
            </RouterLink>
          </Link>

            <Flex gap="3" align="center">
              {navItems.map(item => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                const showBadge = item.path === '/cart' && totalItems > 0;

                return (
                  <Button
                    key={item.path}
                    asChild
                    size="2"
                    variant={isActive ? 'solid' : 'soft'}
                    aria-current={isActive ? 'page' : undefined}
                    style={{ position: 'relative' }}
                  >
                    <RouterLink to={item.path}>
                      <Flex align="center" gap="2">
                        <Icon size={16} />
                        <Text>{item.label}</Text>
                        {showBadge && (
                          <Badge
                            variant="solid"
                            radius="full"
                            style={{
                              position: 'absolute',
                              top: '-6px',
                              right: '-6px',
                              lineHeight: 1
                            }}
                          >
                            {totalItems}
                          </Badge>
                        )}
                      </Flex>
                    </RouterLink>
                  </Button>
                );
              })}
            </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;