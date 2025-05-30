import MainContent from '@/components/main-content'

import Grid from '@mui/material/Grid'
import Skeleton from '@mui/material/Skeleton'

export default function Home() {
  return (
    <MainContent>
      <p>Welcome to the home page!</p>

      <Grid container spacing={2}>
        {[...Array(50)].map((_, index) => (
          <Grid key={index} size={[12, 6, 4, 3]}>
            <Skeleton variant="rounded" width="100%" height={200} />
          </Grid>
        ))}
      </Grid>
    </MainContent>
  )
}
