import prisma from '../../lib/prisma'
import { validateToken } from '../../lib/auth'
import { JwtPayload } from 'jsonwebtoken'
import GradientLayout from '../../components/GradientLayout'
import SongTable from '../../components/SongsTable'

const getBGColor = (id) => {
  const colors = [
    'red',
    'green',
    'blue',
    'orange',
    'purple',
    'gray',
    'teal',
    'yellow',
  ]
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}
const Playlist = ({ playlist }) => {
  const color = getBGColor(playlist.id)

  return (
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} songs`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      <SongTable songs={playlist.songs} />
    </GradientLayout>
  )
}

export const getServerSideProps = async ({ query, req }) => {
  let user
  try {
    user = validateToken(req.cookies.MY_ACCESS_TOKEN) as JwtPayload
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/siginin',
      },
    }
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: parseInt(query.id),
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  })

  return {
    props: { playlist },
  }
}

export default Playlist
