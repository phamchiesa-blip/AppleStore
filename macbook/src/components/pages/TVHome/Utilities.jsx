import React from 'react'

const Utilities = () => {
  return (
    <div className='container mx-auto px-5 2xl:px-0 mt-[136px]'>
        <h1 className="lg:text-6xl text-4xl font-extrabold text-white">Coming home means being warmly welcomed.</h1>
        <div className="bg-[#151515] rounded-2xl sm:py-16 lg:py-20 mt-[60px]">
            <div className="grid lg:grid-cols-2 grid-cols-1 flex-center">
                <div className='mt-[10vh] flex-center'>
                    <img src="/welcome.jpg" width={350} className='rounded-4xl' />
                    </div>
               
                <h1 className="text-white text-3xl mt-10 lg:mt-0 text-center">
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