import { Flex, Text } from '@mantine/core'

interface MetadataItemProps {
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

const MetadataItem = ({ children, icon, title }: MetadataItemProps) => (
  <Flex align={'center'}>
    <Text component='div' color='dimmed' w={128}>
      <Flex align={'center'} gap={2}>
        { icon }
        <Text>{ title }</Text>
      </Flex>
    </Text>
    { children }
  </Flex>
)

export default MetadataItem
