import downloadFile from '@/lib/downloadFile'
import { Container, Group, Button } from '@mantine/core'
import { HiOutlineArrowDownTray, HiOutlineArrowPath } from 'react-icons/hi2'

interface DownloadOutputProps {
  context: {
    outputUrl: string
    filename: string
    filetype: string
    clearConversion: () => void
  }
}

const DownloadOutput = ({ context }: DownloadOutputProps) => (
  <Container mah={641} mt={12}>
    <Group grow>
      <Button
        fullWidth
        color='cyan'
        leftIcon={<HiOutlineArrowDownTray />}
        onClick={() => downloadFile(context.outputUrl, `${context.filename}.${context.filetype}`)}
      >
        Download converted file
      </Button>
      <Button
        fullWidth
        variant='light'
        leftIcon={<HiOutlineArrowPath />}
        onClick={() => context.clearConversion()}
      >
        Start over
      </Button>
    </Group>
  </Container>
)

export default DownloadOutput
