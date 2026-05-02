import IntroHomeTV from './IntroHomeTV'
import Footer from "../../Footer";
import TVFrame from "./TVFrame";
import ExploreLineup from "../../ExploreLineup";

function TVHomePage() {
    return ( 
        <>
        <IntroHomeTV />
        <TVFrame />
        <ExploreLineup category="tvhome" learnMoreBehavior="internal" />
        <Footer />
        </>
     );
}

export default TVHomePage;