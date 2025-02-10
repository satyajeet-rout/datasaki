// // DetailSlider.jsx
// import React, { useState } from 'react';
// import { X } from 'lucide-react';

// const DetailSlider = ({ isOpen, onClose }) => {
//   const [activeTab, setActiveTab] = useState('Describe');
  
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out border-l">
//       <div className="p-4 border-b">
//         <div className="flex justify-between items-center">
//           <h2 className="font-semibold">Price Balance Details</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             <X className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       <div className="border-b">
//         <div className="flex gap-2 p-2">
//           <button
//             className={`px-4 py-2 rounded-lg ${activeTab === 'Describe' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
//             onClick={() => setActiveTab('Describe')}
//           >
//             Describe
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg ${activeTab === 'Charts' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
//             onClick={() => setActiveTab('Charts')}
//           >
//             Charts
//           </button>
//           <button
//             className={`px-4 py-2 rounded-lg ${activeTab === 'Correlations' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
//             onClick={() => setActiveTab('Correlations')}
//           >
//             Correlations
//           </button>
//         </div>
//       </div>

//       <div className="p-4">
//         <div className="mb-6">
//           <h3 className="text-lg font-medium mb-2">Price</h3>
//           <div className="flex gap-2">
//             <span className="bg-gray-100 px-2 py-1 rounded text-sm">AB</span>
//             <span className="bg-gray-100 px-2 py-1 rounded text-sm">A6</span>
//             <div className="ml-auto">
//               <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded text-sm">String</span>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-3 gap-4 mb-6">
//           <div>
//             <h4 className="text-gray-600 text-sm mb-1">Rows</h4>
//             <p className="font-medium">1,000</p>
//           </div>
//           <div>
//             <h4 className="text-gray-600 text-sm mb-1">Empty Rows</h4>
//             <p className="font-medium">0</p>
//           </div>
//           <div>
//             <h4 className="text-gray-600 text-sm mb-1">Unique Values</h4>
//             <p className="font-medium">5</p>
//           </div>
//         </div>

//         <div className="mb-6">
//           <h4 className="text-gray-600 mb-2">Description</h4>
//           <p className="text-sm">The term "price" in hotel room data typically refers to the cost of booking a hotel room for a specific period (e.g., per night).</p>
//         </div>

//         <div className="mb-6">
//           <h4 className="text-gray-600 mb-4">Statistics</h4>
//           <div className="space-y-2">
//             {[
//               { label: 'Min', value: '1000' },
//               { label: 'Max', value: '99999999' },
//               { label: 'Mean', value: '65555' },
//               { label: 'Median', value: '99999' },
//               { label: 'Mode', value: '123456' },
//               { label: 'Standard Deviation', value: '100000' },
//               { label: 'Skew', value: '0.33333' },
//               { label: 'Kurt', value: '2.76868' }
//             ].map((stat, index) => (
//               <div key={index} className={`flex justify-between p-2 ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'} rounded`}>
//                 <span>{stat.label}</span>
//                 <span className="font-medium">{stat.value}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div>
//           <div className="flex gap-2 mb-4">
//             <button className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm">Distribution</button>
//             <button className="bg-gray-100 text-gray-600 px-4 py-1 rounded-lg text-sm">Outliners</button>
//           </div>
//           <div className="space-y-4">
//             {[
//               { label: '100 DM', percentage: '42%' },
//               { label: 'Good', percentage: '61%' },
//               { label: 'Poor', percentage: '27%' }
//             ].map((item, index) => (
//               <div key={index} className="space-y-1">
//                 <div className="flex justify-between text-sm">
//                   <span>{item.label}</span>
//                   <span>{item.percentage}</span>
//                 </div>
//                 <div className="h-2 bg-gray-200 rounded-full">
//                   <div 
//                     className="h-full bg-blue-600 rounded-full"
//                     style={{ width: item.percentage }}
//                   ></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailSlider;









// import React, { useState } from 'react';
// import { X } from 'lucide-react';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// const DetailSlider = ({ isOpen, onClose }) => {
//   const [activeTab, setActiveTab] = useState('Describe');
//   const [activeView, setActiveView] = useState('Distribution');
//   const [activePlot, setActivePlot] = useState('Histogram');
  
//   if (!isOpen) return null;

//   const statisticsData = [
//     { label: 'Min', value: '1000' },
//     { label: 'Max', value: '99999999' },
//     { label: 'Mean', value: '65555' },
//     { label: 'Medain', value: '99999' },
//     { label: 'Mode', value: '123456' },
//     { label: 'Standard Deviation', value: '100000' },
//     { label: 'Skew', value: '0.33333' },
//     { label: 'Kurt', value: '2.76868' }
//   ];

//   const distributionData = [
//     { label: '100 DM', percentage: '42%' },
//     { label: 'Good', percentage: '61%' },
//     { label: 'Poor', percentage: '27%' }
//   ];

//   const outliersData = [
//     '1130000', '1131000', '1135000', '1135250', '1137500',
//     '1138990', '1139990', '1140000', '1142000', '1145000',
//     '1146800', '1148000', '1149000', '1150000', '1151250',
//     '1153000', '1155000', '1156000', '1157200', '1157400',
//     '1160000', '1161000', '1164000', '1165000', '1168000'
//   ];

//   const chartData = [
//     { name: 'Item 1', series1: 8, series2: 6, series3: 6 },
//     { name: 'Item 2', series1: 12, series2: 10, series3: 8 },
//     { name: 'Item 3', series1: 15, series2: 10, series3: 10 },
//     { name: 'Item 4', series1: 20, series2: 15, series3: 15 }
//   ];

//   const correlationFactors = [
//     "Minority", "Sex", "Rent", "Education", "age", "Income",
//     "Loan Size", "Year", "Payment", "Checking Balance", "Credit History", "Default"
//   ];

//   const topCorrelations = [
//     { name: "Default", value: "+31%" },
//     { name: "Checking Balance", value: "+31%" },
//     { name: "Age", value: "+31%" },
//     { name: "Credit History", value: "+31%" },
//     { name: "Income", value: "+31%" }
//   ];

//   const generateCorrelationMatrix = () => {
//     const matrix = [];
//     for (let i = 0; i < correlationFactors.length; i++) {
//       const row = [];
//       for (let j = 0; j < correlationFactors.length; j++) {
//         row.push(0.4);  // Default correlation value
//       }
//       matrix.push(row);
//     }
//     return matrix;
//   };

//   const correlationMatrix = generateCorrelationMatrix();

//   const Header = () => (
//     <div className="mb-3">
//       <h3 className="text-base mb-1.5">Price</h3>
//       <div className="flex gap-1.5 items-center">
//         <span className="bg-gray-100 px-2 py-0.5 rounded text-sm">AB</span>
//         <span className="bg-gray-100 px-2 py-0.5 rounded text-sm">AB</span>
//         <div className="ml-auto">
//           <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-lg text-sm">
//             String
//           </span>
//         </div>
//       </div>
//     </div>
//   );

//   const DescribeView = () => (
//     <div className="p-3">
//       <Header />

//       <div className="grid grid-cols-3 gap-3 mb-4">
//         <div>
//           <h4 className="text-gray-600 text-xs mb-0.5">Rows</h4>
//           <p className="text-base font-normal">1,000</p>
//         </div>
//         <div>
//           <h4 className="text-gray-600 text-xs mb-0.5">Empty Rows</h4>
//           <p className="text-base font-normal">0</p>
//         </div>
//         <div>
//           <h4 className="text-gray-600 text-xs mb-0.5">Unique Values</h4>
//           <p className="text-base font-normal">5</p>
//         </div>
//       </div>

//       <div className="mb-4">
//         <h4 className="text-gray-600 text-sm mb-1">Description</h4>
//         <p className="text-sm text-gray-900">
//           The term "price" in banking data typically refers to the amount
//           charged for a service or product at a specific point in time.
//         </p>
//       </div>

//       <div className="mb-4">
//         <h4 className="text-gray-600 text-sm mb-2">Statistics</h4>
//         <div className="space-y-0.5">
//           {statisticsData.map((stat, index) => (
//             <div 
//               key={index} 
//               className={`flex justify-between py-1.5 px-2 ${
//                 index % 2 === 0 ? 'bg-blue-50' : 'bg-white'
//               } rounded`}
//             >
//               <span className="text-gray-900 text-sm">{stat.label}</span>
//               <span className="text-gray-900 text-sm">{stat.value}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//         <div className="flex gap-1.5 mb-3">
//           <button
//             className={`px-3 py-1 rounded-lg text-sm ${
//               activeView === 'Distribution'
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-100 text-gray-600'
//             }`}
//             onClick={() => setActiveView('Distribution')}
//           >
//             Distribution
//           </button>
//           <button
//             className={`px-3 py-1 rounded-lg text-sm ${
//               activeView === 'Outliers'
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-100 text-gray-600'
//             }`}
//             onClick={() => setActiveView('Outliers')}
//           >
//             Outliers
//           </button>
//         </div>
        
//         {activeView === 'Distribution' ? (
//           <div className="space-y-2">
//             {distributionData.map((item, index) => (
//               <div key={index} className="space-y-0.5">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-900">{item.label}</span>
//                   <span className="text-gray-900">{item.percentage}</span>
//                 </div>
//                 <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
//                   <div 
//                     className="h-full bg-blue-600 rounded-full"
//                     style={{ width: item.percentage }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-5 gap-2 text-xs">
//             {outliersData.map((value, index) => (
//               <div 
//                 key={index}
//                 className="text-gray-900"
//               >
//                 {value}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const ChartView = () => (
//     <div className="p-3">
//       <Header />

//       <div className="border rounded-lg p-2 mb-4">
//         <div className="flex gap-1 justify-center">
//           {['Histogram', 'Q-Q Plot', 'Bar Plot'].map((plot) => (
//             <button
//               key={plot}
//               className={`px-3 py-1 rounded-lg text-sm ${
//                 activePlot === plot 
//                   ? 'bg-blue-600 text-white' 
//                   : 'text-blue-600 hover:bg-blue-50'
//               }`}
//               onClick={() => setActivePlot(plot)}
//             >
//               {plot}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="mb-4">
//         <div className="flex gap-4 justify-center mb-2">
//           <div className="flex items-center gap-1">
//             <div className="w-3 h-3 bg-blue-100 rounded"></div>
//             <span className="text-sm">Series 1</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <div className="w-3 h-3 bg-blue-300 rounded"></div>
//             <span className="text-sm">Series 2</span>
//           </div>
//           <div className="flex items-center gap-1">
//             <div className="w-3 h-3 bg-blue-600 rounded"></div>
//             <span className="text-sm">Series 3</span>
//           </div>
//         </div>

//         <div className="w-full flex justify-center">
//           <BarChart width={300} height={300} data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
//             <CartesianGrid strokeDasharray="3 3" vertical={false} />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Bar dataKey="series1" stackId="a" fill="#DBEAFE" />
//             <Bar dataKey="series2" stackId="a" fill="#93C5FD" />
//             <Bar dataKey="series3" stackId="a" fill="#3B82F6" />
//           </BarChart>
//         </div>
//       </div>

//       <div>
//         <h4 className="text-base font-medium mb-2">AI interpretation</h4>
//         <p className="text-sm text-gray-600 leading-relaxed">
//           In the context of artificial intelligence (AI), interpretation refers to 
//           the process of understanding and explaining the decisions made 
//           by an AI model. It's a key aspect of explainable AI (XAI), which 
//           focuses on creating transparent models that provide clear and 
//           understandable explanations for their decisions.
//         </p>
//       </div>
//     </div>
//   );

//   const CorrelationsView = () => (
//     <div className="p-3">
//       <Header />

//       {/* Correlation Matrix */}
//       <div className="mb-4 overflow-x-auto">
//         <div className="min-w-full" style={{ width: 'max-content' }}>
//           <div className="grid" style={{
//             gridTemplateColumns: `80px repeat(${correlationFactors.length}, minmax(40px, 1fr))`,
//             fontSize: '11px'
//           }}>
//             {/* Empty top-left corner */}
//             <div className="h-20"></div>
            
//             {/* Top headers (rotated) */}
//             {correlationFactors.map((factor, i) => (
//               <div key={`header-${i}`} className="relative h-20">
//                 <div className="absolute origin-bottom-left -rotate-45 translate-x-4 whitespace-nowrap">
//                   {factor}
//                 </div>
//               </div>
//             ))}

//             {/* Rows */}
//             {correlationFactors.map((rowFactor, i) => (
//               <React.Fragment key={`row-${i}`}>
//                 {/* Row header */}
//                 <div className="py-1 pr-2 text-right">{rowFactor}</div>
                
//                 {/* Cells */}
//                 {correlationMatrix[i].map((value, j) => (
//                   <div 
//                     key={`cell-${i}-${j}`}
//                     className="p-1"
//                   >
//                     <div 
//                       className={`w-full h-8 flex items-center justify-center text-xs
//                         ${i === j ? 'bg-red-700 text-white' : 
//                           value > 0.5 ? 'bg-blue-600 text-white' : 
//                           value > 0.3 ? 'bg-blue-100' : 'bg-gray-50'}`}
//                     >
//                       {value}
//                     </div>
//                   </div>
//                 ))}
//               </React.Fragment>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Correlated Factors List */}
//       <div className="space-y-2">
//         {topCorrelations.map((factor, index) => (
//           <div
//             key={index}
//             className="flex justify-between items-center p-3 border-b"
//           >
//             <span className="text-sm">{factor.name}</span>
//             <span className="text-sm text-blue-600 bg-blue-50 px-3 py-0.5 rounded-full">
//               {factor.value}
//             </span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   return (
//     <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform border-l flex flex-col">
//       {/* Fixed Header */}
//       <div className="flex-none py-2 px-4 border-b flex justify-between items-center bg-white">
//         <h2 className="text-base font-normal">Price Balance Details</h2>
//         <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//           <X className="w-4 h-4" />
//         </button>
//       </div>

//       {/* Fixed Tabs */}
//       <div className="flex-none border-b bg-white">
//         <div className="flex p-1 gap-1">
//           {['Describe', 'Charts', 'Correlations'].map((tab) => (
//             <button
//               key={tab}
//               className={`px-3 py-1.5 rounded-lg text-sm ${
//                 activeTab === tab 
//                   ? 'bg-blue-600 text-white' 
//                   : 'text-gray-600 hover:bg-gray-50'
//               }`}
//               onClick={() => setActiveTab(tab)}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>
//       </div>

//         {/* Scrollable Content */}
//     <div className="flex-1 overflow-y-auto">
//     {activeTab === 'Describe' && <DescribeView />}
//     {activeTab === 'Charts' && <ChartView />}
//     {activeTab === 'Correlations' && <CorrelationsView />}
//     </div>
//     </div>
//     );
//     };

// export default DetailSlider;
    

















import React, { useState } from 'react';
import { X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const DetailSlider = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('Describe');
  const [activeView, setActiveView] = useState('Distribution');
  const [activePlot, setActivePlot] = useState('Histogram');
  
  if (!isOpen) return null;

  // ... [Previous data constants remain the same] ...

    
  const statisticsData = [
    { label: 'Min', value: '1000' },
    { label: 'Max', value: '99999999' },
    { label: 'Mean', value: '65555' },
    { label: 'Medain', value: '99999' },
    { label: 'Mode', value: '123456' },
    { label: 'Standard Deviation', value: '100000' },
    { label: 'Skew', value: '0.33333' },
    { label: 'Kurt', value: '2.76868' }
  ];

  const distributionData = [
    { label: '100 DM', percentage: '42%' },
    { label: 'Good', percentage: '61%' },
    { label: 'Poor', percentage: '27%' }
  ];

  const outliersData = [
    '1130000', '1131000', '1135000', '1135250', '1137500',
    '1138990', '1139990', '1140000', '1142000', '1145000',
    '1146800', '1148000', '1149000', '1150000', '1151250',
    '1153000', '1155000', '1156000', '1157200', '1157400',
    '1160000', '1161000', '1164000', '1165000', '1168000'
  ];

  const chartData = [
    { name: 'Item 1', series1: 8, series2: 6, series3: 6 },
    { name: 'Item 2', series1: 12, series2: 10, series3: 8 },
    { name: 'Item 3', series1: 15, series2: 10, series3: 10 },
    { name: 'Item 4', series1: 20, series2: 15, series3: 15 }
  ];

  const correlationFactors = [
    "Minority", "Sex", "Rent", "Education", "age", "Income",
    "Loan Size", "Year", "Payment", "Checking Balance", "Credit History", "Default"
  ];

  const topCorrelations = [
    { name: "Default", value: "+31%" },
    { name: "Checking Balance", value: "+31%" },
    { name: "Age", value: "+31%" },
    { name: "Credit History", value: "+31%" },
    { name: "Income", value: "+31%" }
  ];

  const generateCorrelationMatrix = () => {
    const matrix = [];
    for (let i = 0; i < correlationFactors.length; i++) {
      const row = [];
      for (let j = 0; j < correlationFactors.length; j++) {
        row.push(0.4);  // Default correlation value
      }
      matrix.push(row);
    }
    return matrix;
  };

  const correlationMatrix = generateCorrelationMatrix();
    
    
    
    
  const Header = () => (
    <div className="mb-3">
      <h3 className="text-lg mb-1.5">Price</h3>
      <div className="flex gap-1.5 items-center">
        <span className="bg-gray-100 px-2 py-0.5 rounded text-sm">AB</span>
        <span className="bg-gray-100 px-2 py-0.5 rounded text-sm">AB</span>
        <div className="ml-auto">
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
            String
          </span>
        </div>
      </div>
    </div>
  );

  const DescribeView = () => (
    <div className="p-3">
      <Header />

      {/* <div className="grid grid-cols-3 gap-3 mb-4 border border-gray-600 p-2 divide-x divide-gray-600 rounded-lg"> */}
        {/* <div className="grid grid-cols-3 gap-3 mb-4 border border-gray-200 p-2  rounded-lg">
        <div>
          <h4 className="text-gray-600 text-xs mb-0.5">Rows</h4>
          <p className="text-base font-normal">1,000</p>
          <div className="absolute right-0 top-2 bottom-2 w-px bg-gray-200"></div>
        </div>
        <div>
          <h4 className="text-gray-600 text-xs mb-0.5">Empty Rows</h4>
          <p className="text-base font-normal">0</p>
        </div>
        <div>
          <h4 className="text-gray-600 text-xs mb-0.5">Unique Values</h4>
          <p className="text-base font-normal">5</p>
        </div>
      </div> */}
          
    <div className="grid grid-cols-3 gap-3 mb-4 border border-gray-200 px-2 rounded-lg">
  <div className="relative border-r border-gray-200">
    <h4 className="text-gray-600 text-sm mb-0.5 mt-3">Rows</h4>
    <p className="text-base font-bold">1,000</p>
  </div>
  <div className="relative border-r border-gray-200">
    <h4 className="text-gray-600 text-sm mb-0.5 mt-3">Empty Rows</h4>
    <p className="text-base font-bold">0</p>
  </div>
  <div>
    <h4 className="text-gray-600 text-sm mb-0.5 mt-3">Unique Values</h4>
    <p className="text-base font-bold">5</p>
  </div>
</div>
          

    
        

      <div className="mb-4">
        <h4 className="text-gray-600 text-sm mb-1">Description</h4>
        <p className="text-sm text-gray-900">
          The term "price" in banking data typically refers to the amount
          charged for a service or product at a specific point in time.
        </p>
      </div>

      <div className="mb-4">
        <h4 className="text-gray-600 text-sm mb-2">Statistics</h4>
        <div className="space-y-0.5">
          {statisticsData.map((stat, index) => (
            <div 
              key={index} 
              className={`flex justify-between py-1.5 px-2 ${
                index % 2 === 0 ? 'bg-blue-50' : 'bg-white'
              } rounded`}
            >
              <span className="text-gray-900 text-sm">{stat.label}</span>
              <span className="text-gray-900 text-sm">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex gap-1.5 mb-3">
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              activeView === 'Distribution'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveView('Distribution')}
          >
            Distribution
          </button>
          <button
            className={`px-3 py-1 rounded-lg text-sm ${
              activeView === 'Outliers'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            onClick={() => setActiveView('Outliers')}
          >
            Outliers
          </button>
        </div>
        
        {activeView === 'Distribution' ? (
          <div className="space-y-2">
            {distributionData.map((item, index) => (
              <div key={index} className="space-y-0.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-900">{item.label}</span>
                  <span className="text-gray-900">{item.percentage}</span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: item.percentage }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-5 gap-2 text-xs">
            {outliersData.map((value, index) => (
              <div 
                key={index}
                className="text-gray-900"
              >
                {value}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const ChartView = () => (
    <div className="p-3">
      <Header />

      <div className="border rounded-lg p-2 mb-4">
        <div className="flex gap-1 justify-center">
          {['Histogram', 'Q-Q Plot', 'Bar Plot'].map((plot) => (
            <button
              key={plot}
              className={`px-3 py-1 rounded-lg text-sm ${
                activePlot === plot 
                  ? 'bg-blue-600 text-white' 
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
              onClick={() => setActivePlot(plot)}
            >
              {plot}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex gap-4 justify-center mb-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-100 rounded"></div>
            <span className="text-sm">Series 1</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-300 rounded"></div>
            <span className="text-sm">Series 2</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-600 rounded"></div>
            <span className="text-sm">Series 3</span>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <BarChart width={300} height={300} data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="series1" stackId="a" fill="#DBEAFE" />
            <Bar dataKey="series2" stackId="a" fill="#93C5FD" />
            <Bar dataKey="series3" stackId="a" fill="#3B82F6" />
          </BarChart>
        </div>
      </div>

      <div>
        <h4 className="text-base font-medium mb-2">AI interpretation</h4>
        <p className="text-sm text-gray-600 leading-relaxed">
          In the context of artificial intelligence (AI), interpretation refers to 
          the process of understanding and explaining the decisions made 
          by an AI model. It's a key aspect of explainable AI (XAI), which 
          focuses on creating transparent models that provide clear and 
          understandable explanations for their decisions.
        </p>
      </div>
    </div>
  );

  const CorrelationsView = () => (
    <div className="p-3">
      <Header />
      
      {/* Correlation Matrix */}
      <div className="mb-6 overflow-x-auto">
        <div className="min-w-full" style={{ width: 'max-content' }}>
          <div className="grid" style={{
            gridTemplateColumns: `80px repeat(${correlationFactors.length}, minmax(40px, 1fr))`
          }}>
            {/* Row headers */}
            <div className="h-8"></div>
            {correlationFactors.map((factor, i) => (
              <div key={`row-${i}`} className="py-1 pr-2 text-right text-xs">
                {/* {factor} */}
              </div>
            ))}

            {/* Matrix cells */}
            {/* {correlationFactors.map((rowFactor, i) => (
              <React.Fragment key={`row-${i}`}>
                <div className="py-1 pr-2 text-right text-xs">{rowFactor}</div>
                {correlationMatrix[i].map((value, j) => (
                  <div key={`cell-${i}-${j}`} className="p-0.5">
                    <div className={`w-full h-8 flex items-center justify-center text-xs
                      ${i === j ? 'bg-red-700 text-white' : 
                        value > 0.5 ? 'bg-blue-600 text-white' : 
                        value > 0.3 ? 'bg-blue-100' : 'bg-gray-50'}`}>
                      {value}
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))} */}
            
            {/* {correlationFactors.map((rowFactor, i) => (
              <React.Fragment key={`row-${i}`}>
                <div className="py-1 pr-2 text-right text-xs">{rowFactor}</div>
                {correlationMatrix[i].map((value, j) => (
                  <div key={`cell-${i}-${j}`} className="p-0.5">
                    <div className={`w-full h-8 flex items-center justify-center text-xs
                      ${i === j ? 'bg-red-700 text-white' : 
                        value > 0.5 ? 'bg-blue-600 text-white' : 
                        value > 0.3 ? 'bg-blue-100' : 'bg-gray-50'}`}>
                      {value}
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))} */}
                      

            {correlationFactors.map((rowFactor, i) => (
              <React.Fragment key={`row-${i}`}>
                <div className="py-1 pr-2 text-right text-xs">{rowFactor}</div>
                {correlationMatrix[i].map((value, j) => (
                  <div key={`cell-${i}-${j}`} className="p-0.5">
                    <div 
                      style={{
                        backgroundColor: i === j ? '#c81e1e' :   // Diagonal red
                          ((i + j) % 5 === 0) ? '#4361ee' :      // Strong blue
                          ((i + j) % 4 === 0) ? '#e9ecef' :      // Light gray
                          ((i + j) % 3 === 0) ? '#ffddd2' :      // Light salmon
                          ((i + j) % 2 === 0) ? '#dee2ff' :      // Light blue
                          '#f8f9fa',                             // Default very light gray
                        color: ((i + j) % 5 === 0 || i === j) ? '#ffffff' : '#000000'  // Text color
                      }}
                      className="w-full h-8 flex items-center justify-center text-xs"
                    >
                      {value}
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}

            {/* Bottom labels */}
            <div className="h-20"></div>
            {correlationFactors.map((factor, i) => (
              <div key={`bottom-${i}`} className="relative h-20">
                <div className="absolute origin-top-left rotate-45 translate-y-2 whitespace-nowrap text-xs">
                  {factor}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Correlation List */}
      <div className="space-y-4">
        {topCorrelations.map((correlation, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-gray-900">{correlation.name}</span>
            <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
              {correlation.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-lg transform border-l flex flex-col">
      {/* Fixed Header */}
      <div className="flex-none py-2 px-4 border-b flex justify-between items-center bg-white">
        <h2 className="text-base font-normal">Price Balance Details</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Fixed Tabs */}
      <div className="flex-none border-b bg-white">
        <div className="flex p-1 gap-1">
          {['Describe', 'Charts', 'Correlations'].map((tab) => (
            <button
              key={tab}
              className={`px-3 py-1.5 rounded-lg text-sm ${
                activeTab === tab 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'Describe' && <DescribeView />}
        {activeTab === 'Charts' && <ChartView />}
        {activeTab === 'Correlations' && <CorrelationsView />}
      </div>
    </div>
  );
};

export default DetailSlider;