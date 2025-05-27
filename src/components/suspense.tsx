import { Suspense } from 'react'
import { useScroll } from 'framer-motion'

import SplashScreen from './splash-screen'
import ScrollProgress from './scroll-progress'

export default function SuspenseProvider({ children }: React.PropsWithChildren) {
  const { scrollYProgress } = useScroll()

  return (
    <Suspense
      fallback={
        <>
          <ScrollProgress scrollYProgress={scrollYProgress} />

          <SplashScreen />
        </>
      }
    >
      {children}
    </Suspense>
  )
}
