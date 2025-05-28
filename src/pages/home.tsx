import { Skeleton } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'

import MainContent from '../components/main-content'

export default function Home() {
  return (
    <MainContent>
      <p>Welcome to the home page!</p>

      <Grid2 container spacing={2}>
        {[...Array(50)].map((_, index) => (
          <Grid2 key={index} xs={12} sm={6} md={4} lg={3}>
            <Skeleton variant="rectangular" width="100%" height={200} />
          </Grid2>
        ))}
      </Grid2>
    </MainContent>
  )
}
