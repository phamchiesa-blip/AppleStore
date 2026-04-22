import { 
  BatteryCharging, 
  Headphones, 
  AudioLines, 
  Bluetooth, 
  Zap, 
  Cable, 
  Music4, 
  HeartPulse, 
  Thermometer, 
  BatteryFull, 
  ShieldCheck, 
  Mic2, 
  Fingerprint, 
  Waves, 
  Check, 
  Minus 
} from "lucide-react";

export const CDN = "https://www.apple.com";

// ─── AirPods Max 2 Data ───
export const airpodsMaxData = {
  teardown: [
    {
      id: "cushion",
      tag: "Acoustic Seal",
      title: "Memory foam cushions.",
      desc: "Premium aluminum frame with breathable memory foam ear cushions for ultimate comfort.",
      position: "left"
    },
    {
      id: "driver",
      tag: "Custom Audio",
      title: "50mm Custom Driver",
      desc: "Custom-built acoustic design. Deep, rich bass and sharp, clean highs.",
      position: "right"
    },
    {
      id: "chip",
      tag: "Computational Audio",
      title: "Dual Apple H2 Chips",
      desc: "Computational audio gets a major boost with revolutionary spatial audio.",
      position: "right"
    }
  ],
  bento: [
    {
      id: "battery",
      label: "Battery Life",
      title: "30 hours of listening.",
      desc: "Up to 30 hours of music with ANC on. A 5-minute charge provides 1.5 hours of listening.",
      icon: <BatteryCharging className="w-8 h-8 text-emerald-400" />,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10"
    },
    {
      id: "usbc",
      label: "Charging",
      title: "Transition to USB‑C.",
      desc: "Moving to USB-C. Optimizing your Apple ecosystem with universal connectivity.",
      icon: <Cable className="w-8 h-8 text-blue-400" />,
      color: "text-blue-400",
      bg: "bg-blue-500/10"
    },
    {
      id: "lossless",
      label: "Audio Quality",
      title: "Lossless Audio support.",
      desc: "Supports Lossless Audio via wired connection for a studio-quality experience.",
      icon: <Music4 className="w-8 h-8 text-purple-400" />,
      color: "text-purple-400",
      bg: "bg-purple-500/10"
    }
  ],
  anc: {
    tag: "Noise Cancellation",
    title: "Pro‑level silencing.",
    desc: "Active Noise Cancellation is now up to 2x more effective than the previous generation."
  }
};

// ─── AirPods Pro 3 Data ───
export const airpodsProData = {
    hero: {
        title: "AirPods Pro 3",
        subtitle: "Reengineered for sound, health, and life."
    },
    anc: {
        label: "Pro Noise Cancellation",
        title: "3x more effective. Silence is golden.",
        desc: "The all-new H3 chip cancels noise at over 48,000 times per second. By analyzing environmental sound waves in real-time, it neutralizes unwanted noise before it reaches your ear."
    },
    specs: [
        {
            id: "health",
            title: "Pioneering Health Features",
            desc: "The first clinical-grade Hearing Aid feature on a pro-level earbud. Integrated with a Body Temperature Sensor to monitor your thermal variations throughout the day, providing insights into your overall wellness.",
            img: "/images/airpods_pro3_earbud_left.png",
            icon: <HeartPulse className="w-6 h-6" />,
            color: "text-red-400",
            bg: "bg-red-500/10"
        },
        {
            id: "adaptive",
            title: "Adaptive Audio",
            desc: "Seamlessly blends Transparency mode and Active Noise Cancellation. It intelligently tailors the noise control experience by reacting to the specific environments you move through, from a quiet office to a bustling street corner.",
            img: "/images/airpods_pro3_earbud_right.png",
            icon: <Zap className="w-6 h-6" />,
            color: "text-amber-400",
            bg: "bg-amber-500/10"
        },
        {
            id: "conversation",
            title: "Conversation Awareness",
            desc: "When you start speaking, Conversation Awareness automatically lowers the volume of whatever is playing, enhances the voices in front of you, and reduces background noise so you can interact effortlessly.",
            img: "/images/airpods_pro3_case.png",
            icon: <Mic2 className="w-6 h-6" />,
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },
        {
            id: "touch",
            title: "Force Sensor Control",
            desc: "A high-precision sensor in the stem gives you total control. Swipe up or down to adjust volume. Press to play, pause music, or mute and unmute yourself on calls. Press and hold to switch between listening modes.",
            img: "/images/airpods_pro3_earbud_left.png",
            icon: <Fingerprint className="w-6 h-6" />,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10"
        }
    ],
    battery: {
        title: "Endurance meets durability.",
        stats: [
            {
                label: "Total Listening",
                value: "36 hrs",
                desc: "With the MagSafe Charging Case (USB‑C).",
                icon: <BatteryFull className="w-6 h-6" />
            },
            {
                label: "Protection",
                value: "IP54",
                desc: "Dust, sweat, and water resistant for buds and case.",
                icon: <ShieldCheck className="w-6 h-6" />
            }
        ]
    }
};

// ─── AirPods 4 Data ───
export const airpods4CompareData = [
    {
        category: "Audio Technology",
        specs: [
            { label: "Custom high-excursion Apple driver", std: true, anc: true },
            { label: "Custom high dynamic range amplifier", std: true, anc: true },
            { label: "Active Noise Cancellation", std: false, anc: true },
            { label: "Transparency mode", std: false, anc: true },
            { label: "Adaptive Audio", std: false, anc: true },
            { label: "Conversation Awareness", std: false, anc: true },
            { label: "Voice Isolation", std: true, anc: true },
            { label: "Personalized Spatial Audio with dynamic head tracking", std: true, anc: true },
            { label: "Adaptive EQ", std: true, anc: true }
        ]
    },
    {
        category: "Sensors",
        specs: [
            { label: "Dual beamforming microphones", std: true, anc: true },
            { label: "Inward-facing microphone", std: true, anc: true },
            { label: "Optical in-ear sensor", std: true, anc: true },
            { label: "Motion-detecting accelerometer", std: true, anc: true },
            { label: "Speech-detecting accelerometer", std: true, anc: true },
            { label: "Force sensor", std: true, anc: true }
        ]
    },
    {
        category: "Chip",
        specs: [
            { label: "Apple H2 headphone chip", std: "Yes", anc: "Yes" }
        ]
    },
    {
        category: "Battery",
        specs: [
            { label: "Listening time (Single charge)", std: "Up to 5 hours", anc: "Up to 4 hours (ANC on)" },
            { label: "Total listening time (With case)", std: "Up to 30 hours", anc: "Up to 20 hours (ANC on)" },
            { label: "Fast Charging", std: "5m = 1h", anc: "5m = 1h" }
        ]
    }
];
