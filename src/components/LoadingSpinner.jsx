import { Flex, Text } from '@radix-ui/themes';
import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({ size = 'md', text }) {
  const px = { sm: 16, md: 32, lg: 48 }[size] ?? 32;

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="2"
      data-testid="loading-spinner"
      role="status"
      aria-live="polite"
    >
      <Loader2
        width={px}
        height={px}
        style={{
          color: 'var(--accent-9)',
          animation: 'rt-spin 1s linear infinite',
        }}
        aria-hidden
      />
      {text && (
        <Text size="2" color="gray" data-testid="loading-text">
          {text}
        </Text>
      )}

      <style>
        {`@keyframes rt-spin { to { transform: rotate(360deg); } }`}
      </style>
    </Flex>
  );
}