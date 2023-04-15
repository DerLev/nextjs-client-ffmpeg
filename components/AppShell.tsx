import { AppShell, Button, Flex, Header, Title } from '@mantine/core'
import Link from 'next/link'

const HeaderComponent = () => (
  <Header height={{ base: 50, md: 60 }} py={4} px={'xs'}>
    <Flex align={'center'} h={'100%'}>
      <Button component={Link} href="/" p={0} variant='subtle' h={'100%'}>
        <Title size={'h2'}>nextjs-client-ffmpeg</Title>
      </Button>
    </Flex>
  </Header>
)

interface AppShellComponentProps {
  children: React.ReactNode
}

const AppShellComponent = ({ children }: AppShellComponentProps) => (
  <AppShell
    padding={'md'}
    header={<HeaderComponent />}
    styles={(theme) => ({
      main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
    })}
  >
    { children }
  </AppShell>
)

export default AppShellComponent
