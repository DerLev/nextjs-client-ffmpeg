import type { NextPage } from 'next'
import { Badge, Button, Card, Container, Flex, Grid, Group, Text } from '@mantine/core'
import { HiHeart } from 'react-icons/hi2'
import Image from 'next/image'
import Link from 'next/link'
import FfmpegHeader from '@/assets/ffmpeg-with-text.png'

const Index: NextPage = () => (
  <>
    <Flex justify={'center'}>
      <Grid mt={'lg'} maw={1140} w={'100%'} justify='center'>
        <Grid.Col span={4}>
          <Card radius={'md'} withBorder shadow='sm' padding={'lg'}>
            <Card.Section>
              <Container h={160} sx={{ position: 'relative' }} mx={'md'}>
                <Image
                  src={FfmpegHeader}
                  alt="FFMPEG Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                  quality={90}
                  draggable={false}
                />
              </Container>
            </Card.Section>
            <Group position='apart' mt='md' mb='xs'>
              <Text weight={500} size={'lg'}>ffmpeg converter</Text>
              <Badge variant='light'>Try Out</Badge>
            </Group>
            <Text size={'sm'} color='dimmed'>
              Try out the ffmpeg media converter that does not send your files to any
              server and converts them locally in your browser instead.
            </Text>
            <Button variant='light' color='blue' fullWidth mt='md' radioGroup='md' component={Link} href="/convert">
              Open converter
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </Flex>
    <Flex align={'center'} justify={'center'} mt={'xl'}>
      <Button
        component='a'
        color='dimmed'
        size={'xs'}
        variant='subtle'
        href='https://github.com/DerLev/nextjs-client-ffmpeg'
        rel='noopener noreferrer'
        target='_blank'
      >
        <Flex align={'center'} justify={'center'} gap={4}>
          <span>Made with</span>
          <HiHeart />
          <span>by DerLev</span>
        </Flex>
      </Button>
    </Flex>
  </>
)

export default Index
