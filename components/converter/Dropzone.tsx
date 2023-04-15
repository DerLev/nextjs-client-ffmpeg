import type { FileState } from '@/types/custom'
import { Group, rem, useMantineTheme, Text } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import { HiOutlineXMark, HiOutlineDocument, HiOutlineArrowUpTray, HiOutlineCheck } from 'react-icons/hi2'
import { Dispatch, SetStateAction } from 'react'
import { notifications } from '@mantine/notifications'

interface DropzoneProps {
  functions: {
    setFile: Dispatch<SetStateAction<FileState | undefined>>
  }
}

const ConverterDropzone = ({ functions }: DropzoneProps) => {
  const { setFile } = functions

  const theme = useMantineTheme()

  return (
    <Dropzone
      onDrop={
        (files) => {
          notifications.show({
            message: files[0].path,
            title: 'File added',
            color: 'green',
            id: 'file-add',
            icon: <HiOutlineCheck />,
            withCloseButton: false
          })

          if(files[0].path) setFile({
            object: files[0],
            info: {
              path: files[0].path,
              type: files[0].type.split('/')[0] as "audio" | "video",
              mime: files[0].type,
              size: files[0].size
            },
            url: URL.createObjectURL(files[0])
          })
        }
      }
      onReject={() => {
        notifications.show({
          message: 'File type is not supported',
          title: 'File cannot be added',
          color: 'red',
          id: 'file-fail',
          icon: <HiOutlineXMark />,
          withCloseButton: false
        })
      }}
      accept={{
        'video/*': [],
        'audio/*': []
      }}
      maxFiles={1}
    >
      <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <HiOutlineArrowUpTray
            size="3.2rem"
            color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <HiOutlineXMark
            size="3.2rem"
            color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <HiOutlineDocument size="3.2rem" />
        </Dropzone.Idle>
        <div>
          <Text size="xl" inline>
            Drag a media file here or click to select one
          </Text>
          <Text size="sm" color="dimmed" inline mt={7}>
            You can attach every audio or video file
          </Text>
        </div>
      </Group>
    </Dropzone>
  )
}

export default ConverterDropzone
