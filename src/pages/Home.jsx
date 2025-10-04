import React from 'react'
import { Section, Container, Heading, Text, Flex, Button, Card, Grid, Box } from '@radix-ui/themes'
import { Package, ShoppingBag, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  const features = [
    {
      icon: ShoppingBag,
      title: "Wide Selection",
      description: "Browse through hundreds of quality products across multiple categories"
    },
    {
      icon: Star,
      title: "Top Rated",
      description: "All products are carefully curated and highly rated by customers"
    },
    {
      icon: Users,
      title: "Trusted by Many",
      description: "Join thousands of satisfied customers who shop with us daily"
    },
    {
      icon: Package,
      title: "Fast Delivery",
      description: "Quick and reliable shipping to get your products to you fast"
    }
  ];
  return (
    <div>
      <Section style={{ padding: '5rem 1rem' /* py-20 px-4 */ }}>
        <Container size="3" style={{ margin: '0 auto', textAlign: 'center' }}>
          <Heading
            as="h1"
            size="9"
            style={{ fontWeight: 800, marginBottom: '1.5rem' }} // mb-6
            data-testid="hero-title"
          >
            Welcome to{' '}
            <Text as="span" color="amber" >
              ShopCart
            </Text>
          </Heading>

          <Text
            as="p"
            size="5"
            color="gray"
            style={{
              marginBottom: '2rem', // mb-8
              maxWidth: '42rem',     // max-w-2xl
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
            data-testid="hero-description"
          >
            Discover amazing products from our curated collection. Shop with confidence 
            and enjoy a seamless shopping experience.
          </Text>

          <Flex gap="3" justify="center" wrap="wrap">
            <Button size="3" asChild data-testid="cta-shop-now">
              <Link to="/shop">Shop Now</Link>
            </Button>
            <Button variant="outline" size="3" asChild data-testid="cta-view-cart">
              <Link to="/cart">View Cart</Link>
            </Button>
          </Flex>
        </Container>
      </Section>

      {/* Features Section (Radix Themes) */}
      <Section style={{ padding: '4rem 1rem', backgroundColor: 'var(--gray-a3)' }}>
        <Container size="3" style={{ margin: '0 auto' }}>
          <Heading
            as="h2"
            size="6"
            weight="bold"
            align="center"
            style={{ marginBottom: '3rem' }}
            data-testid="features-title"
          >
            Why Choose ShopCart?
          </Heading>

          <Grid columns={{ initial: '1', md: '2', lg: '4' }} gap="6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} size="3" data-testid={`feature-card-${index}`}>
                  <Flex direction="column" align="center">
                    <Box
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        backgroundColor: 'var(--accent-a3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 16
                      }}
                    >
                      <Icon size={24} color="var(--accent-9)" aria-hidden />
                    </Box>

                    <Heading as="h3" size="3" align="center" data-testid={`feature-title-${index}`}>
                      {feature.title}
                    </Heading>

                    <Text as="p" color="gray" align="center" data-testid={`feature-description-${index}`}>
                      {feature.description}
                    </Text>
                  </Flex>
                </Card>
              );
            })}
          </Grid>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section style={{ padding: '5rem 1rem' }}>
        <Container size="3" style={{ margin: '0 auto', textAlign: 'center' }}>
          <Heading
            as="h2"
            size="6"
            style={{ fontWeight: 700, marginBottom: '1.5rem' }}
            data-testid="cta-title"
          >
            Ready to Start Shopping?
          </Heading>
          <Text
            as="p"
            size="5"
            color="gray"
            style={{ marginBottom: '2rem' }}
            data-testid="cta-description"
          >
            Browse our collection and find exactly what you're looking for.
          </Text>
          <Button size="4" asChild data-testid="cta-explore-products">
            <Link to="/shop" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
              Explore Products
            </Link>
          </Button>
        </Container>
      </Section>
    </div>
  )
}

export default Home
