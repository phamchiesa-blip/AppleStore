import Hero from "./Hero";
import ProductViewer from "./ProductViewer";
import Showcase from "./Showcase";
import Performance from "./Performance";
import Feature from "./Feature";
import Highlight from "./Highlight";
import Footer from "../../Footer";
import ExploreLineup from "../../ExploreLineup";

function MacPage() {
  return (
    <>
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Feature />
      <Highlight />
      <ExploreLineup 
        category="Mac" 
        learnMoreBehavior="external" 
        defaultLearnMoreLink="https://www.apple.com/mac/" 
      />
      <Footer />
    </>
  );
}

export default MacPage;