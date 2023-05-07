import type { NextPage } from 'next'
import type { FileState, LoadingState } from '@/types/custom'
import { useEffect, useState } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import { Button, Container, Group, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { HiOutlineCog, HiOutlineTrash, HiOutlineXMark } from 'react-icons/hi2'
import stripFileextension from '@/lib/stripFileextension'
import additionalFlags from '@/lib/ffmpegFlags'
import PlayerWithInfo from '@/components/converter/PlayerWithInfo'
import ConverterDropzone from '@/components/converter/Dropzone'
import FiletypeSelection from '@/components/converter/FiletypeSelection'
import ConvertingProgress from '@/components/converter/ConvertingProgress'
import DownloadOutput from '@/components/converter/DownloadOutput'
import WasmError from '@/components/converter/WasmError'
import PageLoading from '@/components/converter/PageLoading'

const ffmpegDevMode = () => {
  if(process.env.NODE_ENV !== 'production') return {
    log: true,
    corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
    wasmPath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.wasm',
    workerPath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.worker.js',
  }

  return {}
}

const ffmpeg = createFFmpeg({
  ...ffmpegDevMode()
})

// See https://stackoverflow.com/a/47880734
const wasmSupported = (() => {
  try {
    if (typeof WebAssembly === "object" && typeof WebAssembly.instantiate === "function") {
      const testModule = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00))
      if (testModule instanceof WebAssembly.Module) {
        return new WebAssembly.Instance(testModule) instanceof WebAssembly.Instance
      }
    }
  } catch (e) {
  }
  return false
})

const Convert: NextPage = () => {
  const [loadingPage, setLoadingPage] = useState<LoadingState>({ loading: true, module: 'general' })
  const [wasm, setWasm] = useState(false)
  const [file, setFile] = useState<FileState>()
  const [filetype, setFiletype] = useState<string | null>(null)
  const [converting, setConverting] = useState(false)
  const [output, setOutput] = useState<string | null>(null)
  const [convertProgress, setConvertProgress] = useState(0)
  
  const loadFfmpeg = async () => {
    if(ffmpeg.isLoaded()) {
      ffmpeg.setProgress(({ ratio }) => {
        setConvertProgress(ratio)
      })
      return setLoadingPage({ loading: false, module: 'none'})
    }
    await ffmpeg.load()
    ffmpeg.setProgress(({ ratio }) => {
      setConvertProgress(ratio)
    })
    setLoadingPage({ loading: false, module: 'none'})
  }

  useEffect(() => {
    setLoadingPage({ loading: true, module: 'wasm' })
    const getWasmSupport = wasmSupported()
    setWasm(getWasmSupport)

    if(getWasmSupport === true) {
      setLoadingPage({ loading: true, module: 'ffmpeg' })
      loadFfmpeg()
    } else {
      setLoadingPage({ loading: false, module: 'none'})
    }
  }, [setWasm, setLoadingPage])

  const deleteFile = () => {
    if(file) {
      URL.revokeObjectURL(file.url)
      notifications.show({
        message: file.info.path,
        title: 'File removed',
        color: 'blue',
        icon: <HiOutlineTrash />,
        withCloseButton: false,
        id: 'file-remove'
      })
      // @ts-ignore
      setFile()
      setFiletype(null)
    }
  }

  const startConversion = async () => {
    if(!file) return
    if(typeof filetype !== 'string') return notifications.show({
      message: 'Select a filetype to convert to',
      title: 'No filetype selected',
      color: 'red',
      icon: <HiOutlineXMark />,
      withCloseButton: false,
      id: 'no-filetype'
    })

    setConverting(true)

    if(filetype === stripFileextension(file.info.path).fileextension) {
      setConverting(false)
      return notifications.show({
        message: 'The file you selected is already in the selected codec',
        title: 'Filetype the same',
        color: 'red',
        icon: <HiOutlineXMark />,
        withCloseButton: false,
        id: 'filetype-same'
      })
    }

    try {
      ffmpeg.FS('writeFile', file.info.path, await fetchFile(file.url))
      await ffmpeg.run('-i', file.info.path, ...additionalFlags(file.info.path, filetype), `out.${filetype}`)
      const data = ffmpeg.FS('readFile', `out.${filetype}`)
      const url = URL.createObjectURL(new Blob([data.buffer]))
      setOutput(url)
      setConverting(false)
    } catch(err) {
      notifications.show({
        message: 'Please try again. If error persists look at JS console',
        title: 'Error while converting',
        color: 'red',
        icon: <HiOutlineXMark />,
        withCloseButton: false,
        id: 'convert-error'
      })
      ffmpeg.setLogging(true)
    }
  }

  const clearConversion = () => {
    try {
      if(output) ffmpeg.FS('unlink', `out.${filetype}`)
      if(file) ffmpeg.FS('unlink', file.info.path)
    } catch(err) {
      // eslint-disable-next-line no-console
      console.warn(err)
    }

    if(output) {
      URL.revokeObjectURL(output)
      setOutput(null)
    }

    if(file) {
      URL.revokeObjectURL(file.url)
      // @ts-ignore
      setFile()
    }

    setFiletype(null)
    setConvertProgress(0)
  }

  // Display loading placeholder page
  if(loadingPage.loading) return <PageLoading module={loadingPage.module} />

  // Display WASM error
  if(wasm === false) return <WasmError />

  return (
    <Container maw={1140}>
      <Title size={'h1'} mb={'lg'}>Media converter</Title>
      {
        !file ? (
          <ConverterDropzone functions={{ setFile }} />
        ) : (
          <>
            {
              !converting && !output &&
              <PlayerWithInfo functions={{ file, deleteFile }} />
            }
            {
              converting &&
              <ConvertingProgress progress={convertProgress} />
            }
            <Container mah={641} mt={12}>
              <Group grow position='center' align='end'>
                <FiletypeSelection
                  select={{ value: filetype, setValue: setFiletype, typeSelected: file.info.type, disabled: converting || Boolean(output) }}
                />
                <Button fullWidth color='green' leftIcon={<HiOutlineCog size={'1.25rem'} />} onClick={() => startConversion()} loading={converting} disabled={Boolean(output)}>
                  Convert
                </Button>
              </Group>
            </Container>
            {
              output &&
              <DownloadOutput context={{
                clearConversion,
                filename: stripFileextension(file.info.path).filename,
                filetype: filetype ? filetype : '',
                outputUrl: output
              }} />
            }
          </>
        )
      }
    </Container>
  )
}

export default Convert
