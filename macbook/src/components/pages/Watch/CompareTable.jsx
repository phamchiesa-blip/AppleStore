import {watches} from '../../../constants'

const CompareTable = () => {
  const features = [
    { key: "display", label: "Display" },
    { key: "battery", label: "Battery" },
    { key: "chip", label: "Chip" },
    { key: "gps", label: "GPS" },
    { key: "water", label: "Water Resistance" },
    { key: "price", label: "Price" },
  ];

  return (
    <div className='w-full px-5 md:px-10 lg:px-20 2xl:px-0 max-w-7xl mx-auto mt-[150px] mb-[70px]'>
        <h1 className="text-5xl py-2 bg-gradient-to-r from-yellow-400 via-green-300 to-orange-400 bg-clip-text text-transparent font-bold mb-10 text-center">Which Apple Watch is suitable for you?</h1>
        <div className="overflow-x-auto rounded-2xl bg-[#111] border border-white/10 shadow-lg">
      <table className="min-w-full text-sm text-gray-300">
        
        {/* Header */}
        <thead className="border-b border-white/10">
          <tr>
            <th className="px-6 py-4 text-left text-gray-400"></th>
    
            {watches.map((watch) => (
              <th
                key={watch.id}
                className="px-6 py-4 text-center text-white font-semibold"
              >
                {watch.name}
              </th>
            ))}
          </tr>
        </thead>
    
        {/* Body */}
        <tbody>
          {features.map((feature, index) => (
            <tr
              key={feature.key}
              className={`border-b border-white/5 ${
                index % 2 === 0 ? "bg-white/5" : ""
              }`}
            >
              {/* Feature name */}
              <td className="px-6 py-4 text-gray-400 font-medium">
                {feature.label}
              </td>
    
              {/* Values */}
              {watches.map((watch) => (
                <td
                  key={watch.id + feature.key}
                  className="px-6 py-4 text-center text-white"
                >
                  {watch[feature.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    </div>
  );
};

export default CompareTable;