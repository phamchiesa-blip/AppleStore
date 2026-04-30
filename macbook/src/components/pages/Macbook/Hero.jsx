import { useRef, useEffect } from "react"
import { useCart } from '../../../context/useCart';

const Hero = () => {
    const { addToCart, setIsCartOpen } = useCart();

    // useRef  tạo reference đến DOM node thật của video
    // Cho phép gọi các phương thức của video như play, pause, set playback rate, v.v.
    const videoRef = useRef(null);

    useEffect(() => {
       if (videoRef.current) {
        videoRef.current.playbackRate = 1.5;
       }
    }, []);

    const product = {
    id: "macbook-pro", // nhớ unique
    name: "Macbook Pro",
    price: 1599,
    image: "/macbook-pro.png"
    };

  return (
    <section id="hero">
      <div>
          <h1>Macbook Pro</h1>
          <img src="/title.png" alt="Mac title" />
      </div>

      <video ref={videoRef} src="/videos/hero.mp4" autoPlay muted />

      <button
        onClick={() => {
          addToCart(product);
          setIsCartOpen(true);
        }}
      >
        Buy
      </button>

      <p>From $1599 or $135 /mo. for 12 months</p>
    </section>
  )
}

export default Hero