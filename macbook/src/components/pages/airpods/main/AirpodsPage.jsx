import Footer from "../../../Footer";
import HeroAirpodsMax from "./HeroAirpodsMax";
import HeroAirpodsPro from "./HeroAirpodsPro";
import Airpods4 from "./Airpods4";
import CompareAirpods from "./CompareAirpods";
import FeatureCards from "./FeatureCards";

const AirpodsPage = () => {
    return (
        <div className="bg-black text-white min-h-screen">
            <HeroAirpodsMax />
            <HeroAirpodsPro />
            <Airpods4 />
            <CompareAirpods />
            <FeatureCards />
            <Footer />
        </div>
    );
};

export default AirpodsPage;
