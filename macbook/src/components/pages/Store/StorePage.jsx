import NavBar from "../../Navbar";
import Footer from "../../Footer";
import Product from "./Product"
import NextGeneration from './NextGeneration'
import Support from "./Support";
import Unique from "./Unique";
import Discount from "./Discount"

const StorePage = () => {
    return (
        <>
            <NavBar />
            <Product />
            <NextGeneration />
            <Support />
            <Unique />
            <Discount />
            <Footer />
        </>
    )
}

export default StorePage;