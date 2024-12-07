import React from 'react'
import Navbar from './shared/Navbar'
import Herosection from './HeroSection'
import CategoryCrousel from './CategoryCrousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'

const Home = () => {
    return (
        <>
            <Navbar />
            <Herosection/>
            <CategoryCrousel/>
            <LatestJobs/>
            <Footer/>
        </>
    )
}

export default Home