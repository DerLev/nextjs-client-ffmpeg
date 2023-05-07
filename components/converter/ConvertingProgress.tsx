import { Container, Flex, Loader, Progress, Title } from '@mantine/core'

interface ConvertingProgressProps {
  progress: number
}

const ConvertingProgress = ({ progress }: ConvertingProgressProps) => (
  <Container mah={641}>
    <Flex align={'center'} gap={16}>
      <Loader size={'md'} variant='dots' color='green' />
      <Title size={'h2'}>Converting...</Title>
    </Flex>
    <Progress
      value={progress * 100}
      label={`${Math.floor(progress * 100)}%`}
      color='green'
      animate
      size={'xl'}
      radius={'xl'}
      mt={8}
    />
  </Container>
)

export default ConvertingProgress
