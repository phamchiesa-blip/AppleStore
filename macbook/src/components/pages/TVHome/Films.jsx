

const Films = () => {

  return (
    <>
      <section className="container mx-auto px-5 -mt-[100px]">
        <div className="flex items-center gap-4 mb-[150px]">

          {/* LEFT - TEXT */}
          <div className="md:w-1/3 mt-[10vh]">
            <h2 className="text-3xl text-white font-bold mb-4">
              Apple TV App.
            </h2>
            <p className="text-gray-400">
              Watch, rent, or buy all your favorite shows
              <br />
              and movies in one expertly curated app.
              <br />
              Enjoy hundreds of original movies and series
              <br />
              from Apple TV in the most immersive way.
              <br />
              Subscribe to the channels you want to watch.
              <br />
              You also don't need a new app, account, or
              <br />
              password for up to six family members.
            </p>
          </div>

          {/* RIGHT - IMAGE */}
          <div className="md:w-2/3 mt-[30vh">
            <img
              src="/messi.png"
              alt="demo"
              className="w-[80%] ml-auto h-auto object-cover"
            />
          </div>

        </div>

        <div className="flex items-center gap-4 mb-[150px]">

          {/* LEFT - TEXT */}
          <div className="md:w-1/3">
            <h2 className="text-3xl text-white font-bold mb-4">
              Apple TV.
            </h2>
            <p className="text-gray-400">
              Stream hundreds of Apple Originals:
              <br />
              thrilling dramas, epic science fiction
              <br />
              films, relaxing comedies, and more.
            </p>
          </div>

          {/* RIGHT - IMAGE */}
          <div className="md:w-2/3">
            <img
              src="/films.png"
              alt="demo"
              className="w-[80%] ml-auto h-auto object-cover"
            />
          </div>

        </div>

        <div className="flex items-center gap-4">

          {/* LEFT - TEXT */}
          <div className="md:w-1/3">
            <h2 className="text-3xl text-white font-bold mb-4">
              In-Depth.
            </h2>
            <p className="text-gray-400">
              Get insights into Apple Original movies and
              <br />
              series as you watch. Simply open the media player
              <br />
              controls to learn about the actors on screen and
              <br />
              the music playing. Insights automatically update
              <br />
              as scenes change. And when you use your iPhone
              <br />
              as a remote for Apple TV, In-Depth information
              <br />
              is displayed right in the palm of your hand.
            </p>
          </div>

          {/* RIGHT - IMAGE */}
          <div className="md:w-2/3">
            <img
              src="/seriefilms.webp"
              alt="demo"
              className="w-[80%] ml-auto h-auto object-cover"
            />
          </div>

        </div>

       <section className="mt-24 sm:mt-32 lg:mt-[270px] px-4 sm:px-6 lg:px-10">
  {/* Hero Title */}
  <div className="text-center">
    <h1 className="text-4xl sm:text-5xl lg:text-7xl text-white font-semibold">
      FaceTime on your
    </h1>
    <h1 className="text-4xl sm:text-5xl lg:text-7xl text-white font-semibold mt-2">
      biggest screen.
    </h1>
  </div>

  {/* Image */}
  <div className="flex justify-center mt-10 sm:mt-12 lg:mt-[60px]">
    <img
      src="/faceID.png"
      alt="FaceTime on Apple TV"
      className="w-full sm:w-[85%] lg:w-[70vw] object-contain"
    />
  </div>

  {/* Bottom Content */}
  <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 lg:gap-12 mt-12 sm:mt-16 lg:mt-[100px] mb-16">
    
    {/* Left Title */}
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-center lg:text-left bg-gradient-to-r from-green-500 via-sky-300 to-yellow-300 bg-clip-text text-transparent">
      FaceTime App
    </h1>

    {/* Right Description */}
    <p className="text-sm sm:text-base lg:text-xl text-gray-300 leading-relaxed text-center lg:text-left max-w-2xl">
      On Apple TV 4K, FaceTime seamlessly connects with your iPhone or iPad to
      stream audio and video to the big screen via Continuity Camera. Live
      Captions in FaceTime now support more languages and automatically display
      what the other person is saying, making conversations easier for everyone
      to follow. Apple TV 4K also shows FaceTime call notifications, making it
      easier than ever to share moments together.
    </p>
  </div>
</section>


      </section>
    </>
  )
}

export default Films