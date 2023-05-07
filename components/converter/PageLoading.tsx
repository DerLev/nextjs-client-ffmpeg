import type { LoadingState } from '@/types/custom'
import { Container, Flex, Loader, Title, Code } from '@mantine/core'

const convertLoadingModuleToText = (module: LoadingState['module']) => {
  switch (module) {
    case 'general':
      return 'the page'
    case 'wasm':
      return 'WebAssembly support'
    case 'ffmpeg':
      return 'the ffmpeg wasm script'
    default:
      return ''
  }
}

interface PageLoadingProps {
  module: LoadingState['module']
}

const PageLoading = ({ module }: PageLoadingProps) => (
  <Container maw={1140}>
    <Flex gap={16} align={'center'}>
      <Loader size={'lg'} variant='bars' color='gray' />
      <Title size={'h1'}>Loading...</Title>
    </Flex>
    <Code>Currently loading { convertLoadingModuleToText(module) }...</Code>
  </Container>
)

export default PageLoading
