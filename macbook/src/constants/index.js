export const navLinks = [
    { label: "Store" },
    { label: "Mac" },
    { label: "iPad" },
    { label: "iPhone" },
    { label: "Watch" },
    { label: "AirPods" },
    { label: "TV & Home" },
]

export const dn = [
    { label: "Login", link: "/login" },
    { label: "Sign Up", link: "/signup" },
]

export const linkToNav = [
    { label: "/" },
    { label: "mac" },
    { label: "ipad" },
    { label: "iphone" },
    { label: "watch" },
    { label: "airpod" },
    { label: "tv&home" },
]

const noChangeParts = [
    "Object_84",
    "Object_37",
    "Object_34",
    "Object_12",
    "Object_80",
    "Object_35",
    "Object_36",
    "Object_13",
    "Object_125",
    "Object_76",
    "Object_33",
    "Object_42",
    "Object_58",
    "Object_52",
    "Object_21",
    "Object_10",
];

const performanceImages = [
    { id: "p1", src: "/performance1.png" },
    { id: "p2", src: "/performance2.png" },
    { id: "p3", src: "/performance3.png" },
    { id: "p4", src: "/performance4.png" },
    { id: "p5", src: "/performance5.jpg" },
    { id: "p6", src: "/performance6.png" },
    { id: "p7", src: "/performance7.png" },
];

const performanceImgPositions = [
    {
        id: "p1",
        left: 5,
        bottom: 65,
    },
    {
        id: "p2",
        right: 10,
        bottom: 60,
    },
    {
        id: "p3",
        right: -5,
        bottom: 45,
    },
    {
        id: "p4",
        right: -10,
        bottom: 0,
    },
    {
        id: "p5",
        left: 20,
        bottom: 50,
    },
    {
        id: "p6",
        left: 2,
        bottom: 30,
    },
    {
        id: "p7",
        left: -5,
        bottom: 0,
    },
];

const features = [
    {
        id: 1,
        icon: "/feature-icon1.svg",
        highlight: "Email AI.",
        text: "Summarize and draft replies to emails instantly, so you stay on top of your inbox.",
        styles: "left-5 md:left-20 top-[20%] opacity-0 translate-y-5",
    },
    {
        id: 2,
        icon: "/feature-icon2.svg",
        highlight: "Image AI.",
        text: "Generate or edit images with ease. Just type what you imagine, and let AI bring it to life.",
        styles: "right-5 md:right-20 top-[30%] opacity-0 translate-y-5",
    },
    {
        id: 3,
        icon: "/feature-icon3.svg",
        highlight: "Summarize AI.",
        text: "Turn long articles, reports, or notes into clear, bite-sized summaries in seconds.",
        styles: "left-5 md:left-20 top-[50%] opacity-0 translate-y-5",
    },
    {
        id: 4,
        icon: "/feature-icon4.svg",
        highlight: "AirDrop.",
        text: "Wirelessly share photos, large files, and more between your iPhone, your Mac, & other devices.",
        styles: "right-5 md:right-20 top-[70%] opacity-0 translate-y-5",
    },
    {
        id: 5,
        icon: "/feature-icon5.svg",
        highlight: "Writing Tool.",
        text: "Write smarter and faster, whether it’s blogs, essays, or captions, AI helps polish your words.",
        styles: "left-5 md:left-20 top-[90%] opacity-0 translate-y-5",
    },
];

const featureSequence = [
    { videoPath: "/videos/feature-1.mp4", boxClass: ".box1", delay: 1 },
    { videoPath: "/videos/feature-2.mp4", boxClass: ".box2", delay: 0 },
    { videoPath: "/videos/feature-3.mp4", boxClass: ".box3", delay: 0 },
    { videoPath: "/videos/feature-4.mp4", boxClass: ".box4", delay: 0 },
    { videoPath: "/videos/feature-5.mp4", boxClass: ".box5", delay: 0 },
];

const footerLinks = [
    { label: "Privacy Policy", link: "#" },
    { label: "Terms of Use", link: "#" },
    { label: "Sales Policy", link: "#" },
    { label: "Legal", link: "#" },
    { label: "Site Map", link: "#" },
];

const imageAppleStore = [
    { src: "/MacPro-removebg-preview.png", name: 'Macbook Pro', desc: 'Now with the M5, M5 Pro, and M5 Max.', price: 'From $1599' },
    { src: "/ip-removebg-preview.png", name: 'iPhone 17 Pro', desc: 'The marvelous phone.', price: 'From $1153'  },
    { src: "/ipadnew-removebg-preview.png", name: 'iPad Pro', desc: 'Super power with M4.', price: 'From $653 or $26/mo. in 1 year'  },
    { src: "/applewatch-removebg-preview.png", name: 'Apple Watch Series 11', desc: 'The amazing Apple Watch helps you track your health.', price: 'From $442 or $18/mo. in 1 year'  },
    { src: "/ap-removebg-preview.png", name: 'AirPods Max', desc: 'New smart features. A more immersive listening experience.', price: 'From $577'  },
    { src: "/Apple-TV-4K-removebg-preview.png", name: 'Apple TV 4K', desc: 'The Apple experience. A cinematic experience for all your senses.', price: 'From $132'  }
];

const appleSupport = [
    {title: 'APPLE EXPERT', desc: 'Shop with direct advice from online experts.', src: '/timcook-removebg-preview.png'},
    {title: 'Services and Support', desc: 'We are always ready to assist.', src: '/support.png'}
    // https://support.apple.com/vi-vn
];

const reasons = [
    {title: 'Finance', desc: 'Monthly payments are easy.', bonus: 'Includes a 0% interest rate option.', src: "/card-removebg-preview.png"},
     {title: 'Apple Trade In', desc: 'Save money when buying a new Apple Watch with the trade-in program.', bonus: 'Earn up to $323 in credit points to buy a new Apple Watch when you trade in your eligible device.', src: "/saving-removebg-preview.png"},
      {title: 'Delivery', desc: 'Free shipping.', bonus: 'Free home delivery.', src: "/shopping-removebg-preview.png"},
       {title: 'Shopping with advice.', desc: 'Shop online with experts.', bonus: 'Choose the right Apple Watch for you with the help of our online experts.', src: "/timcook-removebg-preview.png"},
        {title: 'Apple Store app', desc: 'Discover a shopping experience designed just for you.', bonus: 'Use the Apple Store app for a more personalized shopping experience.', src: "/applestoreapp-removebg-preview.png"}
];

const coupleData = [
  {
    id: 0,
    title: "Apple Watch and iPhone",
    content: "Pairing your Apple Watch with your iPhone unlocks a wealth of features, making each device even better. You can do things like start a bike ride on your watch and see your metrics automatically appear as Live Activity on your iPhone.",
    imageUrl: "/watch_and_iphone_4ce417f2c_2x-removebg-preview.png"
  },
  {
    id: 1,
    title: "Apple Watch and AirPods",
    content: "You can do so much with just your Apple Watch and AirPods without needing your iPhone. Take calls, listen to music and podcasts online, hear incoming notifications. You can even respond to messages using Siri.",
    imageUrl: "/watch_and_airpods_394907b3a_2x-removebg-preview.png"
  },
  {
    id: 2,
    title: "Apple Watch and Apple Fitness+",
    content: "The Apple Watch enhances your Fitness+ experience with personalized metrics displayed in real time on the screen, such as heart rate, calories burned, and Activity laps. And you can comfortably walk, run, and meditate with audio guidance, all with just your watch and AirPods.",
    imageUrl: "/watch_and_fitness_plus_4c66373c9_2x-removebg-preview.png"
  }
];

export {
    features,
    featureSequence,
    footerLinks,
    noChangeParts,
    performanceImages,
    performanceImgPositions,
    imageAppleStore,
    appleSupport,
    reasons,
    coupleData
};

