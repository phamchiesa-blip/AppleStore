

const Films = () => {

  return (
    <>
      <section className="container mx-auto px-5 -mt-[100px]">
        <div className="flex items-center gap-4 mb-[150px]">

          {/* LEFT - TEXT */}
          <div className="md:w-1/3">
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
          <div className="md:w-2/3">
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

        <div className="mt-[270px] text-center">
          <h1 className="text-7xl text-white">FaceTime on your</h1>
          <h1 className="text-7xl text-white">biggest screen.</h1>
        </div>

        <div className="flex flex-center mt-[60px]">
            <img src="/faceID.png" alt="" className="w-[70vw]"/>
        </div>

        <span className=" flex-center mt-[100px] mb-[60px]">
              <h1 className="mr-25 text-6xl bg-gradient-to-r from-green-500 via-sky-300 to-yellow-300 bg-clip-text text-transparent">FaceTime App</h1>
            <h1 className="text-xl">on Apple TV 4K seamlessly connects with your iPhone
              <br />
              or iPad to stream audio and video to the big screen via the Clear 
              <br />
              Camera Live Annotations in FaceTime now support more languages and will
              <br />
              automatically display what the other person is saying, making it eassier
              <br />
              for everyone to understand the call. Apple TV 4K will also display
              <br />
              notifications about FaceTime calls, making it easier, more impressive,
              <br />
              and sharper than ever to share special moments together.
            </h1>
            </span>


      </section>
    </>
  )
}

export default Films