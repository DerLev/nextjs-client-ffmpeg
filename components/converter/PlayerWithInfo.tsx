import type { FileState } from '@/types/custom'
import { Badge, Button, Code, Container, Flex, Text } from '@mantine/core'
import MetadataItem from '@/components/converter/MetadataItem'
import { HiOutlineDocument, HiOutlineSpeakerWave, HiOutlineTag, HiOutlineTrash, HiOutlineVideoCamera } from 'react-icons/hi2'
import Plyr from 'plyr-react'
import "plyr-react/plyr.css"

interface PlayerWithInfoProps {
  functions: {
    file: FileState
    deleteFile: () => void
  }
}

const PlayerWithInfo = ({ functions }: PlayerWithInfoProps) => {
  const { file, deleteFile } = functions

  return (
    <Container mah={641}>
      <Flex justify={'space-between'} mb={'md'} direction={{ base: 'column', sm: 'row' }} gap={8}>
        <Flex direction={'column'} gap={2}>
          <MetadataItem title="Filename" icon={<HiOutlineDocument />}>
            <Text lineClamp={1}><Code>{ file.info.path }</Code></Text>
          </MetadataItem>
          <MetadataItem title="Type" icon={<HiOutlineTag />}>
            <Badge
              color={ file.info.type === 'video' ? 'blue' : 'violet' }
              leftSection={ file.info.type === 'video' ?
                <Flex align={'center'}><HiOutlineVideoCamera /></Flex> :
                <Flex align={'center'}><HiOutlineSpeakerWave /></Flex>
              }
            >
              { file.info.type.toUpperCase() }
            </Badge>
          </MetadataItem>
        </Flex>
        <Button
          color='red'
          leftIcon={<HiOutlineTrash />}
          variant='subtle'
          onClick={deleteFile}
        >
          Delete from selection
        </Button>
      </Flex>
      <Plyr
        source={{
          sources: [
            { src: file.url, type: file.info.mime }
          ],
          type: file.info.type
        }}
        options={{
          controls: [ 'play-large', 'rewind', 'play', 'fast-forward', 'progress', 'current-time', 'duration', 'mute', 'volume', 'pip' ],
          hideControls: false,
          keyboard: { focused: true, global: true }
        }}
      />
    </Container>
  )
}

export default PlayerWithInfo
