import { Box, Flex, Text } from '@chakra-ui/layout'
import { Image } from '@chakra-ui/react'
import GradientLayout from '../components/GradientLayout'
import prisma from '../lib/prisma'

import { useUserProfile } from '../lib/hooks'

const Home = ({ artists }) => {
  const { user } = useUserProfile()

  return (
    <GradientLayout
      image="https://picsum.photos/id/1062/300/300"
      roundImage={false}
      color="green"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={` ${user?.playlistsCount} public playlists`}
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top Artits this month
          </Text>
          <Text fontSize="md">Only Visible To You</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="12px" width="20%">
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="http://placekitten.com/300/300"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  )
}

export async function getServerSideProps() {
  const artists = await prisma.artist.findMany({})

  return {
    props: { artists },
  }
}
export default Home
