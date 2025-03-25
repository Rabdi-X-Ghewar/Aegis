import ExploreSection from "../components/landing-page/ExploreSection"
import Features from "../components/landing-page/Features"
import Navbar from "../components/navigation/Navbar"
import Footer from "../components/navigation/Footer"


const HomeBeforeLogin = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <Navbar />
            <main>
                    <ExploreSection />
                
                <Features />
                <Footer />
            </main>
        </div>
    )
}

export default HomeBeforeLogin