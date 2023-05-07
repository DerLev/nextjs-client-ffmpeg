import { Container, Title, Alert, Text, Button } from '@mantine/core'
import { HiOutlineExclamationCircle, HiOutlineHome } from 'react-icons/hi2'
import Link from 'next/link'

const WasmError = () => (
  <Container maw={1140}>
    <Title size={'h1'} mb={'lg'}>No Support</Title>
    <Alert title="No WASM support" color='red' icon={<HiOutlineExclamationCircle size={20} />}>
      <Text>
        Your browser does not support client-side conversion, due to it being 
        dependent on WebAssembly. Please update your browser or use a newer 
        Browser (Chrome, Firefox, or other Chromium-based browsers)
      </Text>
      <Button
        component={Link}
        href="/"
        mt={'md'}
        compact
        color='red'
        variant='light'
        leftIcon={<HiOutlineHome />}
      >
        Go back to home
      </Button>
    </Alert>
  </Container>
)

export default WasmError
