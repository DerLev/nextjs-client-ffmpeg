import type { NextPage } from 'next'
import type { FileState } from '@/types/custom'
import { useEffect, useState } from 'react'
import { Alert, Button, Container, Flex, Loader, Text, Title } from '@mantine/core'
import Link from 'next/link'
import { HiOutlineExclamationCircle, HiOutlineHome, HiOutlineTrash } from 'react-icons/hi2'
import PlayerWithInfo from '@/components/converter/PlayerWithInfo'
import ConverterDropzone from '@/components/converter/Dropzone'
import { notifications } from '@mantine/notifications'

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
  const [loadingPage, setLoadingPage] = useState(true)
  const [wasm, setWasm] = useState(false)
  const [file, setFile] = useState<FileState>()

  useEffect(() => {
    const getWasmSupport = wasmSupported()
    setWasm(getWasmSupport)
    setLoadingPage(false)
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
    }
  }

  if(loadingPage) return (
    <Container maw={1140}>
      <Flex gap={16} align={'center'}>
        <Loader size={'lg'} variant='bars' color='gray' />
        <Title size={'h1'}>Loading...</Title>
      </Flex>
    </Container>
  )

  if(wasm === false) return (
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

  return (
    <Container maw={1140}>
      <Title size={'h1'} mb={'lg'}>Media converter</Title>
      {
        !file ? (
          <ConverterDropzone functions={{ setFile }} />
        ) : (
          <PlayerWithInfo functions={{ file, deleteFile }} />
        )
      }
    </Container>
  )
}

export default Convert
