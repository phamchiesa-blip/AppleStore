import Footer from "../../Footer";
import Product from "./Product"
import NextGeneration from './NextGeneration'
import Support from "./Support";
import Unique from "./Unique";
import Discount from "./Discount"
import AppleSystem from "./AppleSystem";

const StorePage = () => {
    return (
        <>
            <Product />
            <NextGeneration />
            <Support />
            <Unique />
            <AppleSystem />
            <Discount />
            <Footer />
        </>
    )
}

export default StorePage;