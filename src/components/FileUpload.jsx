// import React, { useState, useRef } from 'react';
// import { Alert } from '@/components/ui/alert';

// const FileUpload = ({ onFileSelect, onClose }) => {
//   const [uploadStatus, setUploadStatus] = useState(null);
//   const fileInputRef = useRef(null);
  
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       // Check file size (max 10MB)
//       if (file.size > 10 * 1024 * 1024) {
//         setUploadStatus({
//           type: 'error',
//           message: 'File size must be less than 10MB'
//         });
//         return;
//       }

//       // Check file type
//       const allowedTypes = ['text/csv', 'application/vnd.ms-excel', 
//         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         'application/json'];
      
//       if (!allowedTypes.includes(file.type)) {
//         setUploadStatus({
//           type: 'error',
//           message: 'Only CSV, Excel, and JSON files are supported'
//         });
//         return;
//       }

//       // Handle successful file selection
//       onFileSelect(file);
//       setUploadStatus({
//         type: 'success',
//         message: 'File uploaded successfully'
//       });
      
//       // Close the dropdown after successful upload
//       setTimeout(() => {
//         onClose();
//       }, 1500);
//     }
//   };

//   const handleGDriveClick = () => {
//     setUploadStatus({
//       type: 'info',
//       message: 'Google Drive integration requires API setup. Please contact your administrator.'
//     });
//   };

//   return (
//     <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-64">
//       {uploadStatus && (
//         <Alert className="mb-2 mx-2" variant={uploadStatus.type === 'error' ? 'destructive' : 'default'}>
//           {uploadStatus.message}
//         </Alert>
//       )}
      
//       <button 
//         className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 text-left"
//         onClick={handleGDriveClick}
//       >
//         <img src="/api/placeholder/20/20" alt="Google Drive" className="w-5 h-5" />
//         <span className="text-sm text-gray-700">Add From Google Drive</span>
//       </button>
      
//       <label className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 text-left cursor-pointer">
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
//           <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
//           <polyline points="17 8 12 3 7 8"/>
//           <line x1="12" y1="3" x2="12" y2="15"/>
//         </svg>
//         <span className="text-sm text-gray-700">Upload From Computer</span>
//         <input
//           ref={fileInputRef}
//           type="file"
//           className="hidden"
//           accept=".csv,.xlsx,.xls,.json"
//           onChange={handleFileChange}
//         />
//       </label>
//     </div>
//   );
// };

// export default FileUpload;