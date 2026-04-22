import React from 'react'

const Utilities = () => {
  return (
    <div className='container mx-auto px-5 2xl:px-0 mt-[136px]'>
        <h1 className="text-6xl font-extrabold text-white">Coming home means being warmly welcomed.</h1>
        <div className="bg-[#151515] h-[100vh] rounded-2xl mt-[60px]">
            <div className="grid grid-cols-2 flex-center">
                <div className='mt-[10vh] ml-[15vw]'>
                    <img src="/welcome.jpg" width={350} className='rounded-4xl' />
                    </div>
               
                <h1 className="text-white text-3xl">
                    Categories such as Lighting, Security,
                    <br />
                    and Climate are located at the top of 
                    <br />
                    the Home tab, allowing you to quickly 
                    <br />
                    access and view the status of your 
                    <br />
                    accessories.
                </h1>
            </div>
        </div>

    </div>
  )
}

export default Utilities