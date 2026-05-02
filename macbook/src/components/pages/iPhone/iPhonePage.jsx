import Hero from "./Hero";
import Highlight from "./Highlight";
import Model from "./Model";
import Feature from "./Feature";
import HowItWork from "./HowItWork";
import Footer from '../../Footer';
import ExploreLineup from "../../ExploreLineup";

function IphonePage() {
    return ( 
        <>
            <Hero />
            <Highlight />
            <Model />
            <Feature />
            <HowItWork />
            <ExploreLineup 
                category="iPhone" 
                learnMoreBehavior="external" 
                defaultLearnMoreLink="https://www.apple.com/iphone/" 
            />
            <Footer />
        </>
    );
}

export default IphonePage;