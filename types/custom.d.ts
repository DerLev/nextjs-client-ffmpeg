import type { FileWithPath } from '@mantine/dropzone'

interface FileState {
  object: FileWithPath
  info: {
    path: string
    type: "audio" | "video"
    mime: string
    size: number
  }
  url: string
}

interface LoadingState {
  loading: boolean
  module: 'general' | 'wasm' | 'ffmpeg' | 'none'
}
