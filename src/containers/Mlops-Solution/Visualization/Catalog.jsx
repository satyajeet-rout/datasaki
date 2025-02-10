


// import React, { useState } from 'react';
// import { Search, X } from 'lucide-react';

// const DataCatalog = () => {
//   const [isSnowflakeChecked, setIsSnowflakeChecked] = useState(true);
//   const [isProdChecked, setIsProdChecked] = useState(false);
//   const [expandedRowIndex, setExpandedRowIndex] = useState(null);
//   const [expandedSection, setExpandedSection] = useState(null);

//   const allTags = [
//     "Include All", "checking_balance", "months_loan_duration", "credit_history",
//     "purpose", "amount", "savings_balance", "employment_duration",
//     "percent_of_income", "existing_loans_count", "job", "years_at_residence",
//     "age", "other_credit", "housing", "dependents", "phone", "savings_balance",
//     "employment_duration", "percent_of_income"
//   ];

//   const columnDetails = Array(5).fill({
//     name: 'col1',
//     description: 'col1 description',
//     type: 'string'
//   });

//   const tableData = Array(14).fill({
//     platform: "Snowflake",
//     type: "Dataset",
//     datasetName: "demo_pipeline.public",
//     owner: "Kapil",
//     tags: ["Customers", "Account Balance"]
//   });

//   const handleRowClick = (index) => {
//     setExpandedRowIndex(expandedRowIndex === index ? null : index);
//   };

//   const toggleExpandedSection = (section) => {
//     setExpandedSection(expandedSection === section ? null : section);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top bar */}
//       <div className="flex justify-between items-center px-4 py-3 bg-white border-b">
//         <h1 className="font-semibold">Data Catalog</h1>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Explore.."
//             className="pl-4 pr-10 py-1.5 rounded-lg bg-gray-50 border text-sm w-40"
//           />
//           <Search className="absolute right-3 top-2 text-gray-400 w-4 h-4" />
//         </div>
//       </div>

//       <div className="p-4 space-y-4">
//         {/* Filter Section */}
//         <div className="grid grid-cols-12 gap-4">
//           {/* Platform */}
//           <div className="col-span-2 bg-white p-3 rounded-lg shadow-sm border">
//             <h2 className="text-sm font-medium mb-3">Platform</h2>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={isSnowflakeChecked}
//                 onChange={() => setIsSnowflakeChecked(!isSnowflakeChecked)}
//                 className="text-blue-600"
//               />
//               <span className="text-sm">Snowflake (468)</span>
//             </div>
//           </div>

//           {/* Environment */}
//           <div className="col-span-2 bg-white p-3 rounded-lg shadow-sm border">
//             <h2 className="text-sm font-medium mb-3">Environment</h2>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={isProdChecked}
//                 onChange={() => setIsProdChecked(!isProdChecked)}
//                 className="text-blue-600"
//               />
//               <span className="text-sm">PROD (468)</span>
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="col-span-4 bg-white p-3 rounded-lg shadow-sm border">
//             <h2 className="text-sm font-medium mb-3">Tags</h2>
//             <div className="flex flex-wrap gap-2">
//               <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Checking_balance</span>
//               <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Months_loan_duration</span>
//               <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Jobs</span>
//               <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Credit_history</span>
//               <button 
//                 className="text-blue-600 text-xs"
//                 onClick={() => toggleExpandedSection('tags')}
//               >
//                 + More
//               </button>
//             </div>
//           </div>

//           {/* Glossary Terms */}
//           <div className="col-span-4 bg-white p-3 rounded-lg shadow-sm border">
//             <h2 className="text-sm font-medium mb-3">Glossary Terms</h2>
//             <div className="flex flex-wrap gap-2">
//               <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Customers</span>
//               <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Account Balance</span>
//               <button 
//                 className="text-blue-600 text-xs"
//                 onClick={() => toggleExpandedSection('glossary')}
//               >
//                 + More
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Expanded Tags or Glossary Section */}
//         {expandedSection && (
//           <div className="bg-white p-4 rounded-lg shadow-sm border">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-sm font-medium">
//                 {expandedSection === 'tags' ? 'Tags' : 'Glossary Terms'}
//               </h2>
//               <button 
//                 onClick={() => setExpandedSection(null)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <X className="w-4 h-4" />
//               </button>
//             </div>
//             {[...Array(4)].map((_, rowIndex) => (
//               <div key={rowIndex} className="flex flex-wrap gap-2 mb-4">
//                 {allTags.map((tag) => (
//                   <span
//                     key={`${rowIndex}-${tag}`}
//                     className={`text-xs px-2 py-1 rounded ${
//                       expandedSection === 'tags' 
//                         ? 'bg-blue-50 text-blue-700'
//                         : 'bg-gray-100 text-gray-700'
//                     }`}
//                   >
//                     {tag}
//                   </span>
//                 ))}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Data Table */}
//         {isSnowflakeChecked && (
//           <div>
//             <div className="bg-blue-600 text-white grid grid-cols-5 px-4 py-2 rounded-t-lg text-sm">
//               <div>PLATFORM</div>
//               <div>TYPE</div>
//               <div>DATASET NAME</div>
//               <div>OWNER</div>
//               <div>TAGS</div>
//             </div>
//             <div className="bg-white border-x border-b rounded-b-lg divide-y">
//               {tableData.map((row, index) => (
//                 <React.Fragment key={index}>
//                   <div 
//                     onClick={() => handleRowClick(index)}
//                     className="grid grid-cols-5 px-4 py-3 text-sm items-center hover:bg-gray-50 cursor-pointer"
//                   >
//                     <div className="flex items-center gap-2">
//                       <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">❄</div>
//                       {row.platform}
//                     </div>
//                     <div>{row.type}</div>
//                     <div>{row.datasetName}</div>
//                     <div className="flex items-center gap-2">
//                       <div className="w-6 h-6 rounded-full bg-gray-200">
//                         <img src="https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png" alt="Kapil" className="rounded-full" />
//                       </div>
//                       {row.owner}
//                     </div>
//                     <div className="flex gap-2">
//                       {row.tags.map((tag, tagIndex) => (
//                         <span key={tagIndex} className="bg-blue-50 text-xs px-2 py-1 rounded text-blue-700">
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {expandedRowIndex === index && (
//                     <div className="px-4 py-6 bg-blue-50 border-t">
//                       <table className="w-full bg-white rounded-lg border">
//                         <thead>
//                           <tr className="bg-gray-50 border-b">
//                             <th className="px-4 py-2 text-left text-sm font-medium">NAME</th>
//                             <th className="px-4 py-2 text-left text-sm font-medium">TYPE</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {columnDetails.map((col, i) => (
//                             <tr key={i} className="border-b last:border-b-0">
//                               <td className="px-4 py-3">
//                                 <div className="flex items-center gap-2">
//                                   <span className="text-blue-600">{col.name}</span>
//                                   <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
//                                 </div>
//                                 <div className="text-sm text-gray-600 mt-1">{col.description}</div>
//                               </td>
//                               <td className="px-4 py-3 text-blue-600">{col.type}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default DataCatalog;




// import React, { useState } from 'react';
// import { Search, X, BarChart3 } from 'lucide-react';

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

// const DataCatalog = () => {
//   const [isSnowflakeChecked, setIsSnowflakeChecked] = useState(true);
//   const [isProdChecked, setIsProdChecked] = useState(false);
//   const [expandedRowIndex, setExpandedRowIndex] = useState(null);
//   const [expandedSection, setExpandedSection] = useState(null);
//   const [sliderOpen, setSliderOpen] = useState(false);

//   const allTags = [
//     "Include All", "checking_balance", "months_loan_duration", "credit_history",
//     "purpose", "amount", "savings_balance", "employment_duration",
//     "percent_of_income", "existing_loans_count", "job", "years_at_residence",
//     "age", "other_credit", "housing", "dependents", "phone", "savings_balance",
//     "employment_duration", "percent_of_income"
//   ];

//   const columnDetails = Array(5).fill({
//     name: 'col1',
//     description: 'col1 description',
//     type: 'string'
//   });

//   const tableData = Array(14).fill({
//     platform: "Snowflake",
//     type: "Dataset",
//     datasetName: "demo_pipeline.public",
//     owner: "Kapil",
//     tags: ["Customers", "Account Balance"]
//   });

//   const handleRowClick = (index) => {
//     setExpandedRowIndex(expandedRowIndex === index ? null : index);
//   };

//   const handleColumnClick = () => {
//     setSliderOpen(true);
//   };

//   const toggleExpandedSection = (section) => {
//     setExpandedSection(expandedSection === section ? null : section);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top bar */}
//       <div className="flex justify-between items-center px-4 py-3 bg-white border-b">
//         <h1 className="font-semibold">Data Catalog</h1>
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Explore.."
//             className="pl-4 pr-10 py-1.5 rounded-lg bg-gray-50 border text-sm w-40"
//           />
//           <Search className="absolute right-3 top-2 text-gray-400 w-4 h-4" />
//         </div>
//       </div>

//       {/* Main content */}
//       <div className="p-4 space-y-4">
//         {/* Filter Section */}
//         <div className="grid grid-cols-12 gap-4">
//           {/* Platform */}
//           <div className="col-span-2 bg-white p-3 rounded-lg shadow-sm border">
//             <h2 className="text-sm font-medium mb-3">Platform</h2>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={isSnowflakeChecked}
//                 onChange={() => setIsSnowflakeChecked(!isSnowflakeChecked)}
//                 className="text-blue-600"
//               />
//               <span className="text-sm">Snowflake (468)</span>
//             </div>
//           </div>

//           {/* Environment */}
//           <div className="col-span-2 bg-white p-3 rounded-lg shadow-sm border">
//             <h2 className="text-sm font-medium mb-3">Environment</h2>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 checked={isProdChecked}
//                 onChange={() => setIsProdChecked(!isProdChecked)}
//                 className="text-blue-600"
//               />
//               <span className="text-sm">PROD (468)</span>
//             </div>
//           </div>

//           {/* Tags */}
//           <div className="col-span-4 bg-white p-3 rounded-lg shadow-sm border">
//             <h2 className="text-sm font-medium mb-3">Tags</h2>
//             <div className="flex flex-wrap gap-2">
//               <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Checking_balance</span>
//               <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Months_loan_duration</span>
//               <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Jobs</span>
//               <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Credit_history</span>
//               <button 
//                 className="text-blue-600 text-xs"
//                 onClick={() => toggleExpandedSection('tags')}
//               >
//                 + More
//               </button>
//             </div>
//           </div>

//           {/* Glossary Terms */}
//           <div className="col-span-4 bg-white p-3 rounded-lg shadow-sm border">
//             <h2 className="text-sm font-medium mb-3">Glossary Terms</h2>
//             <div className="flex flex-wrap gap-2">
//               <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Customers</span>
//               <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Account Balance</span>
//               <button 
//                 className="text-blue-600 text-xs"
//                 onClick={() => toggleExpandedSection('glossary')}
//               >
//                 + More
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Data Table */}
//         {isSnowflakeChecked && (
//           <div>
//             <div className="bg-blue-600 text-white grid grid-cols-5 px-4 py-2 rounded-t-lg text-sm">
//               <div>PLATFORM</div>
//               <div>TYPE</div>
//               <div>DATASET NAME</div>
//               <div>OWNER</div>
//               <div>TAGS</div>
//             </div>
//             <div className="bg-white border-x border-b rounded-b-lg divide-y">
//               {tableData.map((row, index) => (
//                 <React.Fragment key={index}>
//                   <div 
//                     onClick={() => handleRowClick(index)}
//                     className="grid grid-cols-5 px-4 py-3 text-sm items-center hover:bg-gray-50 cursor-pointer"
//                   >
//                     <div className="flex items-center gap-2">
//                       <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">❄</div>
//                       {row.platform}
//                     </div>
//                     <div>{row.type}</div>
//                     <div>{row.datasetName}</div>
//                     <div className="flex items-center gap-2">
//                       <div className="w-6 h-6 rounded-full bg-gray-200">
//                         <img src="/api/placeholder/24/24" alt="Profile" className="rounded-full" />
//                       </div>
//                       {row.owner}
//                     </div>
//                     <div className="flex gap-2">
//                       {row.tags.map((tag, tagIndex) => (
//                         <span key={tagIndex} className="bg-blue-50 text-xs px-2 py-1 rounded text-blue-700">
//                           {tag}
//                         </span>
//                       ))}
//                     </div>
//                   </div>

//                   {expandedRowIndex === index && (
//                     <div className="px-4 py-6 bg-blue-50 border-t">
//                       <table className="w-full bg-white rounded-lg border">
//                         <thead>
//                           <tr className="bg-gray-50 border-b">
//                             <th className="px-4 py-2 text-left text-sm font-medium">NAME</th>
//                             <th className="px-4 py-2 text-left text-sm font-medium">TYPE</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {columnDetails.map((col, i) => (
//                             <tr 
//                               key={i} 
//                               className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
//                               onClick={handleColumnClick}
//                             >
//                               <td className="px-4 py-3">
//                                 <div className="flex items-center gap-2">
//                                   <span className="text-blue-600">{col.name}</span>
//                                   <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
//                                 </div>
//                                 <div className="text-sm text-gray-600 mt-1">{col.description}</div>
//                               </td>
//                               <td className="px-4 py-3 text-blue-600">{col.type}</td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                   )}
//                 </React.Fragment>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Expanded Tags or Glossary Section */}
//       {expandedSection && (
//         <div className="bg-white p-4 rounded-lg shadow-sm border">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-sm font-medium">
//               {expandedSection === 'tags' ? 'Tags' : 'Glossary Terms'}
//             </h2>
//             <button 
//               onClick={() => setExpandedSection(null)}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <X className="w-4 h-4" />
//             </button>
//           </div>
//           {[...Array(4)].map((_, rowIndex) => (
//             <div key={rowIndex} className="flex flex-wrap gap-2 mb-4">
//               {allTags.map((tag) => (
//                 <span
//                   key={`${rowIndex}-${tag}`}
//                   className={`text-xs px-2 py-1 rounded ${
//                     expandedSection === 'tags' 
//                       ? 'bg-blue-50 text-blue-700'
//                       : 'bg-gray-100 text-gray-700'
//                   }`}
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Detail Slider */}
//       <DetailSlider 
//         isOpen={sliderOpen}
//         onClose={() => setSliderOpen(false)}
//       />
//     </div>
//   );
// };

// export default DataCatalog;



// DataCatalog.jsx
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import DetailSlider from './DetailSlider';

const DataCatalog = () => {
  const [isSnowflakeChecked, setIsSnowflakeChecked] = useState(true);
  const [isProdChecked, setIsProdChecked] = useState(false);
  const [expandedRowIndex, setExpandedRowIndex] = useState(null);
  const [expandedSection, setExpandedSection] = useState(null);
  const [sliderOpen, setSliderOpen] = useState(false);

  const allTags = [
    "Include All", "checking_balance", "months_loan_duration", "credit_history",
    "purpose", "amount", "savings_balance", "employment_duration",
    "percent_of_income", "existing_loans_count", "job", "years_at_residence",
    "age", "other_credit", "housing", "dependents", "phone", "savings_balance",
    "employment_duration", "percent_of_income"
  ];

  const columnDetails = Array(5).fill({
    name: 'col1',
    description: 'col1 description',
    type: 'string'
  });

  const tableData = Array(14).fill({
    platform: "Snowflake",
    type: "Dataset",
    datasetName: "demo_pipeline.public",
    owner: "Kapil",
    tags: ["Customers", "Account Balance"]
  });

  const handleRowClick = (index) => {
    setExpandedRowIndex(expandedRowIndex === index ? null : index);
  };

  const handleColumnClick = () => {
    setSliderOpen(true);
  };

  const toggleExpandedSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-white border-b rounded-lg">
        <h1 className="font-semibold text-2xl">Data Catalog</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Explore.."
            className="pl-4 pr-10 py-1.5 rounded-lg bg-gray-50 border text-sm w-40"
          />
          <Search className="absolute right-3 top-2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Filter Section */}
        <div className="grid grid-cols-12 gap-4">
          {/* Platform */}
          <div className="col-span-2 bg-white p-3 rounded-lg shadow-sm border">
            <h2 className="text-sm font-medium mb-3">Platform</h2>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isSnowflakeChecked}
                onChange={() => setIsSnowflakeChecked(!isSnowflakeChecked)}
                className="text-blue-600"
              />
              <span className="text-sm">Snowflake (468)</span>
            </div>
          </div>

          {/* Environment */}
          <div className="col-span-2 bg-white p-3 rounded-lg shadow-sm border">
            <h2 className="text-sm font-medium mb-3">Environment</h2>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isProdChecked}
                onChange={() => setIsProdChecked(!isProdChecked)}
                className="text-blue-600"
              />
              <span className="text-sm">PROD (468)</span>
            </div>
          </div>

          {/* Tags */}
          <div className="col-span-4 bg-white p-3 rounded-lg shadow-sm border">
            <h2 className="text-sm font-medium mb-3">Tags</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Checking_balance</span>
              <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Months_loan_duration</span>
              <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Jobs</span>
              <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Credit_history</span>
              <button 
                className="text-blue-600 text-xs"
                onClick={() => toggleExpandedSection('tags')}
              >
                + More
              </button>
            </div>
          </div>

          {/* Glossary Terms */}
          <div className="col-span-4 bg-white p-3 rounded-lg shadow-sm border">
            <h2 className="text-sm font-medium mb-3">Glossary Terms</h2>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Customers</span>
              <span className="bg-blue-50 text-xs px-2 py-1 rounded-md text-blue-700">Account Balance</span>
              <button 
                className="text-blue-600 text-xs"
                onClick={() => toggleExpandedSection('glossary')}
              >
                + More
              </button>
            </div>
          </div>
        </div>

        {/* Expanded Tags or Glossary Section */}
        {expandedSection && (
          <div className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-sm font-medium">
                {expandedSection === 'tags' ? 'Tags' : 'Glossary Terms'}
              </h2>
              <button 
                onClick={() => setExpandedSection(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <span
                  key={tag}
                  className={`text-xs px-2 py-1 rounded ${
                    expandedSection === 'tags' 
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Data Table */}
        {isSnowflakeChecked && (
          <div>
            <div className="bg-blue-600 text-white grid grid-cols-5 px-4 py-2 rounded-t-lg text-sm">
              <div>PLATFORM</div>
              <div>TYPE</div>
              <div>DATASET NAME</div>
              <div>OWNER</div>
              <div>TAGS</div>
            </div>
            <div className="bg-white border-x border-b rounded-b-lg divide-y">
              {tableData.map((row, index) => (
                <React.Fragment key={index}>
                  <div 
                    onClick={() => handleRowClick(index)}
                    className="grid grid-cols-5 px-4 py-3 text-sm items-center hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">❄</div>
                      {row.platform}
                    </div>
                    <div>{row.type}</div>
                    <div>{row.datasetName}</div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200">
                        <img src="https://www.shareicon.net/data/512x512/2015/09/18/103160_man_512x512.png" alt="Profile" className="rounded-full" />
                      </div>
                      {row.owner}
                    </div>
                    <div className="flex gap-2">
                      {row.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="bg-blue-50 text-xs px-2 py-1 rounded text-blue-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {expandedRowIndex === index && (
                    <div className="px-4 py-6 bg-blue-50 border-t">
                      <table className="w-full bg-white rounded-xl border ">
                        <thead>
                          <tr className="bg-gray-50 border-b">
                            <th className="px-4 py-2 text-left text-sm font-medium">NAME</th>
                            <th className="px-4 py-2 text-left text-sm font-medium">TYPE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {columnDetails.map((col, i) => (
                            <tr 
                              key={i} 
                              className="border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                              onClick={handleColumnClick}
                            >
                              <td className="px-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-blue-600">{col.name}</span>
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                                </div>
                                <div className="text-sm text-gray-600 mt-1">{col.description}</div>
                              </td>
                              <td className="px-4 py-3 text-blue-600">{col.type}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail Slider */}
      <DetailSlider 
        isOpen={sliderOpen}
        onClose={() => setSliderOpen(false)}
      />
    </div>
  );
};

export default DataCatalog;