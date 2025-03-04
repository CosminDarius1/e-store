import Footer from "@/components/global/Footer"
import LoadingContainer from "@/components/global/LoadingContainer"
import FeaturedProducts from "@/components/home/FeaturedProducts"
import Hero from "@/components/home/Hero"
import { Suspense } from "react"

function HomePage() {
  return (
    <>
      <Hero/>
      <Suspense fallback={<LoadingContainer/>}>
        <FeaturedProducts/>
      </Suspense>
      <Footer/>
    </>
  )
}

export default HomePage