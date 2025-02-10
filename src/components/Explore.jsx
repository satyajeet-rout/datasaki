
// import React, { useState, useEffect, useRef } from "react";
// import { Button, Input, Drawer } from "antd";
// import { 
//   PlusOutlined,
//   SearchOutlined, 
//   MessageOutlined,
//   BarChartOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   DeleteOutlined,
//   LineChartOutlined,
//   PieChartOutlined,
//   AreaChartOutlined,
//   CloseOutlined
// } from "@ant-design/icons";
// import { Send } from 'lucide-react';

// // Typing Animation Component
// const TypingAnimation = () => {
//   return (
//     <div className="flex justify-start mb-4">
//       <div className="flex max-w-[80%] items-start gap-3">
//         {/* Bot Avatar */}
//         <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-blue-100">
//           <span className="text-xs font-medium text-blue-600">D</span>
//         </div>

//         {/* Typing Animation */}
//         <div className="flex flex-col">
//           <div className="flex items-center gap-2 mb-0.5">
//             <span className="text-xs font-medium">Datasaki AI</span>
//             <span className="text-xs text-gray-500">- Just now</span>
//           </div>
//           <div className="py-1.5 px-2.5 rounded-lg bg-blue-50">
//             <div className="flex items-center gap-0.5">
//               <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
//               <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
//               <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" style={{ animationDelay: '600ms' }}></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Explore = () => {
//   const [chartsDrawerOpen, setChartsDrawerOpen] = useState(false);
//   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
//   const [userInput, setUserInput] = useState("");
//   const [activeChat, setActiveChat] = useState(null);
//   const [chats, setChats] = useState([]);
//   const [isTyping, setIsTyping] = useState(false);
//   const chatContainerRef = useRef(null);
//   const [showFileOptions, setShowFileOptions] = useState(false);

// // Close dropdown when clicking outside
// useEffect(() => {
//   const handleClickOutside = (event) => {
//     if (showFileOptions) {
//       setShowFileOptions(false);
//     }
//   };

//   document.addEventListener('click', handleClickOutside);
//   return () => {
//     document.removeEventListener('click', handleClickOutside);
//   };
// }, [showFileOptions]);

// // Function to scroll to bottom of chat
// const scrollToBottom = () => {
//   if (chatContainerRef.current) {
//     chatContainerRef.current.scrollTo({
//       top: chatContainerRef.current.scrollHeight,
//       behavior: 'smooth'
//     });
//   }
// };

//   // Initialize first chat on component mount
//   useEffect(() => {
//     if (chats.length === 0) {
//       const initialChat = {
//         id: Date.now(),
//         title: "New Chat",
//         createdAt: new Date(),
//         messages: []
//       };
//       setChats([initialChat]);
//       setActiveChat(initialChat.id);
//     }
//   }, []);

//   // Sample saved charts data
//   const savedCharts = [
//     { id: 1, name: "Monthly Revenue", type: "line", updatedAt: "2 hours ago" },
//     { id: 2, name: "Customer Distribution", type: "pie", updatedAt: "Yesterday" },
//     { id: 3, name: "Sales Performance", type: "bar", updatedAt: "2 days ago" },
//     { id: 4, name: "Growth Metrics", type: "area", updatedAt: "1 week ago" },
//   ];

//   const getChartIcon = (type) => {
//     switch (type) {
//       case 'line':
//         return <LineChartOutlined className="text-blue-500" />;
//       case 'pie':
//         return <PieChartOutlined className="text-green-500" />;
//       case 'bar':
//         return <BarChartOutlined className="text-purple-500" />;
//       case 'area':
//         return <AreaChartOutlined className="text-orange-500" />;
//       default:
//         return <BarChartOutlined className="text-gray-500" />;
//     }
//   };

//   const createNewChat = () => {
//     const newChat = {
//       id: Date.now(),
//       title: "New Chat",
//       createdAt: new Date(),
//       messages: []
//     };
//     setChats(prevChats => [newChat, ...prevChats]);
//     setActiveChat(newChat.id);
//     setUserInput("");
//   };

//   const deleteChat = (chatId, e) => {
//     e.stopPropagation();
//     setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
//     if (activeChat === chatId) {
//       setActiveChat(chats[0]?.id || null);
//     }
//   };

//   const switchChat = (chatId) => {
//     setActiveChat(chatId);
//     setUserInput("");
//   };

//   const handleChatSubmit = () => {
//     if (!userInput.trim() || !activeChat) return;

//     const newMessage = {
//       id: Date.now(),
//       text: userInput,
//       sender: "user",
//     //   name: "Krishna Padam IT",
//       timestamp: new Date()
//     };

//     setChats(prevChats => {
//       const newChats = prevChats.map(chat => {
//         if (chat.id === activeChat) {
//           const title = chat.messages.length === 0 ? 
//             userInput.slice(0, 30) + (userInput.length > 30 ? "..." : "") : 
//             chat.title;
          
//           return {
//             ...chat,
//             title,
//             messages: [...chat.messages, newMessage]
//           };
//         }
//         return chat;
//       });
      
//       // Scroll after state update
//       setTimeout(scrollToBottom, 100);
//       return newChats;
//     });

//     setUserInput("");
    
//     // Show typing animation
//     setIsTyping(true);

//     // Simulate bot response
//     setTimeout(() => {
//       const botResponse = {
//         id: Date.now(),
//         text: userInput,
//         sender: "bot",
//         name: "Datasaki AI",
//         timestamp: new Date()
//       };

//       setIsTyping(false);
//       setChats(prevChats => {
//         const newChats = prevChats.map(chat =>
//           chat.id === activeChat
//             ? { ...chat, messages: [...chat.messages, botResponse] }
//             : chat
//         );
//         // Scroll after bot response
//         setTimeout(scrollToBottom, 100);
//         return newChats;
//       });
//     }, 2000);
//   };

//   const formatTimestamp = (date) => {
//     const now = new Date();
//     const minutes = Math.floor((now - date) / 60000);
    
//     if (minutes < 1) return 'Just now';
//     if (minutes < 60) return `${minutes}m ago`;
//     if (minutes < 1440) return `${Math.floor(minutes/60)}h ago`;
//     return date.toLocaleDateString();
//   };

//   const groupChatsByDate = () => {
//     const groups = {
//       Today: [],
//       Yesterday: [],
//       "Previous 7 Days": [],
//       Older: []
//     };

//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(yesterday.getDate() - 1);
//     const lastWeek = new Date(today);
//     lastWeek.setDate(lastWeek.getDate() - 7);

//     chats.forEach(chat => {
//       const chatDate = new Date(chat.createdAt);
      
//       if (chatDate.toDateString() === today.toDateString()) {
//         groups.Today.push(chat);
//       } else if (chatDate.toDateString() === yesterday.toDateString()) {
//         groups.Yesterday.push(chat);
//       } else if (chatDate > lastWeek) {
//         groups["Previous 7 Days"].push(chat);
//       } else {
//         groups.Older.push(chat);
//       }
//     });

//     return groups;
//   };

//   const currentChat = chats.find(chat => chat.id === activeChat);

//   // SavedChartsDrawer component
//   const SavedChartsDrawer = () => (
//     <Drawer
//       title={
//         <div className="flex justify-between items-center">
//           <span className="text-lg font-medium">Saved Charts</span>
//           <Button 
//             type="text" 
//             icon={<CloseOutlined />} 
//             onClick={() => setChartsDrawerOpen(false)}
//           />
//         </div>
//       }
//       placement="right"
//       onClose={() => setChartsDrawerOpen(false)}
//       open={chartsDrawerOpen}
//       width={320}
//       bodyStyle={{ padding: 0 }}
//     >
//       <div className="p-4 border-b border-gray-200">
//         <Input
//           prefix={<SearchOutlined className="text-gray-400" />}
//           placeholder="Search charts..."
//           className="w-full"
//         />
//       </div>
//       <div className="overflow-y-auto">
//         {savedCharts.map((chart) => (
//           <div 
//             key={chart.id} 
//             className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-200"
//           >
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
//                 {getChartIcon(chart.type)}
//               </div>
//               <div className="flex-1">
//                 <h3 className="text-sm font-medium text-gray-900">{chart.name}</h3>
//                 <p className="text-xs text-gray-500">{chart.updatedAt}</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </Drawer>
//   );

//   return (
//     <div className="flex flex-col h-[94vh] bg-gray-50 ">
//       {/* Header */}
//       <div className="w-full bg-white shadow-sm z-10 border  rounded-lg mb-1">
//         <div className="max-w-screen-2xl mx-auto px-4">
//           <div className="h-16 flex items-center justify-between gap-4">
//             <div className="flex items-center">
//               <span className="text-lg font-medium">Explore</span>
//             </div>

//             <div className="flex items-center gap-3">
//               <Button 
//                 type="primary"
//                 className="bg-blue-600 flex items-center h-10 px-4"
//                 icon={<PlusOutlined />}
//                 onClick={createNewChat}
//               >
//                 New Chat
//               </Button>
//               <Button 
//                 className="border-gray-200 flex items-center h-10 px-4 bg-white"
//                 icon={<BarChartOutlined />}
//                 onClick={() => setChartsDrawerOpen(true)}
//               >
//                 Saved Charts
//               </Button>
//             </div>

//             <div className="flex items-center">
//               <Input
//                 prefix={<SearchOutlined className="text-gray-400" />}
//                 placeholder="Explore.."
//                 className="w-64 rounded-lg border-gray-200"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-1 overflow-hidden border rounded-lg">
//         {/* Collapsible Sidebar */}
//         <div 
//           className={`flex-none bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
//             isSidebarCollapsed ? 'w-16' : 'w-56'
//           }`}
//         >
//           {/* Sidebar Toggle */}
//           <Button
//             type="text"
//             icon={isSidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//             onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
//             className="self-end m-2"
//           />

//           {/* Conversation List */}
//           <div className="flex-1 overflow-y-auto min-h-0">
//             {Object.entries(groupChatsByDate()).map(([timeFrame, timeChats]) => {
//               if (timeChats.length === 0) return null;
              
//               return (
//                 <div key={timeFrame} className="mb-4">
//                   {!isSidebarCollapsed && (
//                     <div className="px-4 py-2">
//                       <span className="text-sm text-gray-500">{timeFrame}</span>
//                     </div>
//                   )}
//                   {timeChats.map(chat => (
//                     <div
//                       key={chat.id}
//                       onClick={() => switchChat(chat.id)}
//                       className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${
//                         activeChat === chat.id ? 'bg-blue-50' : ''
//                       }`}
//                     >
//                       <div className="flex items-center gap-2">
//                         <MessageOutlined className="text-gray-400" />
//                         {!isSidebarCollapsed && (
//                           <>
//                             <div className="flex-1 min-w-0">
//                               <div className="flex items-center justify-between">
//                                 <span className="text-sm truncate">{chat.title}</span>
//                                 <Button
//                                   type="text"
//                                   size="small"
//                                   className="opacity-0 group-hover:opacity-100"
//                                   icon={<DeleteOutlined />}
//                                   onClick={(e) => deleteChat(chat.id, e)}
//                                 />
//                               </div>
//                               <span className="text-xs text-gray-400">
//                                 {formatTimestamp(new Date(chat.createdAt))}
//                               </span>
//                             </div>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Main Chat Area */}
//         <div className="flex-1 flex flex-col min-h-0">
//           <div className="flex-1 overflow-y-auto p-4 min-h-0" ref={chatContainerRef}>
//             {!currentChat?.messages?.length ? (
//               <div className="h-full flex flex-col items-center justify-center">
//                 <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                   <div className="text-blue-600">
//                     <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
//                     </svg>
//                   </div>
//                 </div>
//                 <h1 className="text-2xl font-semibold mb-2">Welcome to Datasaki</h1>
//                 <p className="text-gray-600">Explore your chat</p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {currentChat.messages.map((msg) => (
//                   <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//                     <div className={`flex max-w-[80%] items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
//                       {/* Avatar */}
//                       <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
//                         ${msg.sender === 'user' ? 'bg-green-100' : 'bg-blue-100'}`}>
//                         <span className={`text-xs font-medium
//                           ${msg.sender === 'user' ? 'text-green-600' : 'text-blue-600'}`}>
//                           {msg.sender === 'user' ? 'K' : 'D'}
//                         </span>
//                       </div>

//                       {/* Message content */}
//                       <div className="flex flex-col">
//                         <div className="flex items-center gap-2 mb-0.5">
//                           <span className="text-xs font-medium">{msg.name}</span>
//                           <span className="text-xs text-gray-500">- {formatTimestamp(msg.timestamp)}</span>
//                         </div>
//                         <div className={`py-1.5 px-2.5 rounded-lg ${
//                           msg.sender === 'user' 
//                             ? 'bg-white border border-gray-200' 
//                             : 'bg-blue-50'
//                         }`}>
//                           <p className="text-sm text-gray-800">{msg.text}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
                
//                 {/* Show typing animation when bot is "typing" */}
//                 {isTyping && <TypingAnimation />}
//               </div>
//             )}
//           </div>

//           {/* Chat Input */}
//           {/* {currentChat && (
//             <div className="flex-none border-t bg-white p-3">
//               <div className="max-w-3xl mx-auto flex items-center gap-2 py-1.5 px-2 bg-white rounded-full border border-gray-200">
//                 <input
//                   type="text"
//                   value={userInput}
//                   onChange={(e) => setUserInput(e.target.value)}
//                   onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
//                   placeholder="Customize visualizations to tell your story."
//                   className="flex-1 px-3 py-1.5 bg-transparent focus:outline-none text-sm"
//                 />
//                 <button 
//                   onClick={handleChatSubmit}
//                   className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
//                 >
//                   <Send size={16} />
//                 </button>
//               </div>
//             </div>
//           )} */}
                  


//                   {currentChat && (
//   <div className="flex-none border-t bg-white p-3">
//     <div className="max-w-3xl mx-auto flex items-center gap-2 py-1.5 px-2 bg-white rounded-full border border-gray-200">
//       {/* Attachment Button */}
//       <div className="relative">
//         <button 
//           className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
//           onClick={(e) => {
//             e.stopPropagation();
//             setShowFileOptions(!showFileOptions);
//           }}
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
//             <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
//           </svg>
//         </button>
        
//         {/* File Options Dropdown */}
//         {showFileOptions && (
//           <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-64">
//             <button className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 text-left">
//               <img src="/api/placeholder/20/20" alt="Google Drive" className="w-5 h-5" />
//               <span className="text-sm text-gray-700">Add From Google Drive</span>
//             </button>
//             <button className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 text-left">
//               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
//                 <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
//                 <polyline points="17 8 12 3 7 8"/>
//                 <line x1="12" y1="3" x2="12" y2="15"/>
//               </svg>
//               <span className="text-sm text-gray-700">Upload From Computer</span>
//             </button>
//           </div>
//         )}
//       </div>

//       <input
//         type="text"
//         value={userInput}
//         onChange={(e) => setUserInput(e.target.value)}
//         onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
//         placeholder="Customize visualizations to tell your story."
//         className="flex-1 px-3 py-1.5 bg-transparent focus:outline-none text-sm"
//       />
//       <button 
//         onClick={handleChatSubmit}
//         className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
//       >
//         <Send size={16} />
//       </button>
//     </div>
//   </div>
// )}
//         </div>
//       </div>

//       {/* Saved Charts Drawer */}
//       <SavedChartsDrawer />
//     </div>
//   );
// };

// export default Explore;












import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Drawer } from "antd";
import { 
  PlusOutlined,
  SearchOutlined, 
  MessageOutlined,
  BarChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DeleteOutlined,
  LineChartOutlined,
  PieChartOutlined,
  AreaChartOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { Send } from 'lucide-react';
// import FileUpload from './FileUpload';

// Typing Animation Component
const TypingAnimation = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex max-w-[80%] items-start gap-3">
        {/* Bot Avatar */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  
                                        <svg width="22"  height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.2675 13.6742C11.2341 13.6742 10.3967 11.0912 10.3967 7.90492C10.3967 4.71869 11.2334 2.13533 12.2675 2.13533C12.8063 2.13533 13.2919 2.83916 13.6331 3.96384C13.2115 1.83932 12.456 0.42334 11.5938 0.42334C10.2712 0.42334 9.19922 3.75613 9.19922 7.86765C9.19922 11.9792 10.2712 15.312 11.5938 15.312C12.4258 15.312 13.158 13.9937 13.5876 11.9929C13.249 13.0318 12.7826 13.6742 12.2675 13.6742Z" fill="white"/>
                                        <path d="M13.8385 11.2178C13.3292 11.2178 13.0902 9.9183 13.0902 8.03841C13.0902 6.15851 13.4031 4.96255 13.9134 4.96255C14.1793 4.96255 14.2124 5.40909 14.3063 5.71161C14.0979 4.45811 13.7243 3.62256 13.2994 3.62256C12.6465 3.62256 12.1172 5.58894 12.1172 8.01453C12.1172 10.4401 12.6465 12.4069 13.2994 12.4069C13.7101 12.4069 14.0717 11.6292 14.2837 10.4484C14.115 11.0632 14.0931 11.2178 13.8385 11.2178Z" fill="white"/>
                                        <path d="M5.55714 2.3584H4.82962C4.76192 2.3584 4.70703 2.413 4.70703 2.48035V3.20408C4.70703 3.27143 4.76192 3.32603 4.82962 3.32603H5.55714C5.62484 3.32603 5.67972 3.27143 5.67972 3.20408V2.48035C5.67972 2.413 5.62484 2.3584 5.55714 2.3584Z" fill="white"/>
                                        <path d="M5.48294 4.81494H4.30618C4.23848 4.81494 4.18359 4.86954 4.18359 4.93689V6.10753C4.18359 6.17488 4.23848 6.22948 4.30618 6.22948H5.48294C5.55064 6.22948 5.60553 6.17488 5.60553 6.10753V4.93689C5.60553 4.86954 5.55064 4.81494 5.48294 4.81494Z" fill="white"/>
                                        <path d="M7.57934 5.63379H6.77688C6.70918 5.63379 6.6543 5.68839 6.6543 5.75574V6.55401C6.6543 6.62136 6.70918 6.67596 6.77688 6.67596H7.57934C7.64704 6.67596 7.70192 6.62136 7.70192 6.55401V5.75574C7.70192 5.68839 7.64704 5.63379 7.57934 5.63379Z" fill="white"/>
                                        <path d="M6.15605 10.6958H5.05423C4.98652 10.6958 4.93164 10.7504 4.93164 10.8177V11.9138C4.93164 11.9812 4.98652 12.0358 5.05423 12.0358H6.15605C6.22376 12.0358 6.27864 11.9812 6.27864 11.9138V10.8177C6.27864 10.7504 6.22376 10.6958 6.15605 10.6958Z" fill="white"/>
                                        <path d="M7.76667 8.90967H6.73977C6.67207 8.90967 6.61719 8.96427 6.61719 9.03162V10.0532C6.61719 10.1205 6.67207 10.1751 6.73977 10.1751H7.76667C7.83437 10.1751 7.88925 10.1205 7.88925 10.0532V9.03162C7.88925 8.96427 7.83437 8.90967 7.76667 8.90967Z" fill="white"/>
                                        <path d="M5.48311 12.4829H4.53079C4.46309 12.4829 4.4082 12.5375 4.4082 12.6049V13.5522C4.4082 13.6196 4.46309 13.6742 4.53079 13.6742H5.48311C5.55081 13.6742 5.6057 13.6196 5.6057 13.5522V12.6049C5.6057 12.5375 5.55081 12.4829 5.48311 12.4829Z" fill="white"/>
                                        <path d="M6.23185 14.0459H5.65384C5.58613 14.0459 5.53125 14.1005 5.53125 14.1678V14.7429C5.53125 14.8102 5.58613 14.8648 5.65384 14.8648H6.23185C6.29955 14.8648 6.35444 14.8102 6.35444 14.7429V14.1678C6.35444 14.1005 6.29955 14.0459 6.23185 14.0459Z" fill="white"/>
                                        <path d="M6.38173 7.04834H5.1304C5.0627 7.04834 5.00781 7.10294 5.00781 7.17029V8.41511C5.00781 8.48246 5.0627 8.53706 5.1304 8.53706H6.38173C6.44943 8.53706 6.50432 8.48246 6.50432 8.41511V7.17029C6.50432 7.10294 6.44943 7.04834 6.38173 7.04834Z" fill="white"/>
                                        <path d="M17.4078 6.03964H16.6439C16.6258 6.03963 16.6079 6.03569 16.5915 6.02809C16.575 6.02049 16.5605 6.0094 16.5488 5.99562C16.5371 5.98183 16.5286 5.96567 16.5239 5.94827C16.5191 5.93088 16.5183 5.91266 16.5213 5.89489L16.6592 5.11217C16.6643 5.08342 16.6794 5.05737 16.7019 5.03863C16.7244 5.01989 16.7528 5.00967 16.7821 5.00977H17.546C17.5642 5.00977 17.5821 5.01371 17.5985 5.02131C17.6149 5.02892 17.6295 5.04 17.6412 5.05378C17.6528 5.06757 17.6613 5.08373 17.6661 5.10113C17.6708 5.11853 17.6717 5.13675 17.6686 5.15451L17.5308 5.93687C17.5257 5.96565 17.5106 5.99175 17.4881 6.01055C17.4656 6.02934 17.4372 6.03965 17.4078 6.03964Z" fill="white"/>
                                        <path d="M16.4195 6.96282H15.8142C15.7909 6.96286 15.7678 6.95781 15.7467 6.94802C15.7255 6.93824 15.7068 6.92396 15.6918 6.9062C15.6767 6.88843 15.6658 6.86761 15.6598 6.8452C15.6537 6.82278 15.6527 6.79932 15.6567 6.77646L15.7658 6.15333C15.7724 6.11652 15.7918 6.08319 15.8206 6.05918C15.8494 6.03516 15.8858 6.02199 15.9233 6.02197H16.5308C16.5541 6.02199 16.5771 6.02708 16.5982 6.03689C16.6194 6.0467 16.6381 6.06098 16.653 6.07874C16.668 6.0965 16.6789 6.1173 16.6849 6.13969C16.691 6.16208 16.692 6.18551 16.688 6.20833L16.5788 6.83147C16.5723 6.86861 16.5526 6.90223 16.5235 6.92629C16.4943 6.95036 16.4574 6.96331 16.4195 6.96282Z" fill="white"/>
                                        <path d="M17.9213 6.81836H17.4215C17.406 6.81807 17.3907 6.81449 17.3767 6.80786C17.3627 6.80123 17.3503 6.79171 17.3403 6.77993C17.3302 6.76815 17.3229 6.75439 17.3186 6.73955C17.3144 6.72471 17.3134 6.70914 17.3156 6.69388L17.3989 6.19631C17.4034 6.17145 17.4165 6.14892 17.4359 6.1326C17.4553 6.11629 17.4798 6.10721 17.5052 6.10693H18.005C18.0205 6.10723 18.0357 6.11081 18.0497 6.11743C18.0637 6.12406 18.0762 6.13358 18.0862 6.14536C18.0962 6.15714 18.1036 6.17091 18.1078 6.18575C18.1121 6.20058 18.1131 6.21615 18.1108 6.23142L18.0275 6.72898C18.023 6.75385 18.01 6.77638 17.9906 6.79269C17.9712 6.80901 17.9467 6.81808 17.9213 6.81836Z" fill="white"/>
                                        <path d="M18.6801 5.94986H18.113C18.099 5.94985 18.0852 5.94685 18.0726 5.94107C18.0599 5.93529 18.0486 5.92687 18.0394 5.91637C18.0303 5.90587 18.0235 5.89354 18.0196 5.88022C18.0156 5.86689 18.0146 5.85288 18.0166 5.83913L18.0977 5.27317C18.1011 5.25009 18.1126 5.22897 18.1303 5.21368C18.148 5.19839 18.1707 5.18997 18.1941 5.18994H18.7612C18.7752 5.1899 18.789 5.19285 18.8018 5.19861C18.8145 5.20437 18.8258 5.2128 18.835 5.22331C18.8441 5.23382 18.8509 5.24618 18.8548 5.25953C18.8587 5.27288 18.8597 5.28691 18.8576 5.30067L18.7765 5.86663C18.7732 5.88972 18.7616 5.91084 18.7439 5.92612C18.7262 5.94141 18.7035 5.94984 18.6801 5.94986Z" fill="white"/>
                                        <path d="M19.172 6.60134H18.8163C18.8054 6.60134 18.7946 6.59902 18.7847 6.59453C18.7748 6.59005 18.766 6.58351 18.7589 6.57534C18.7518 6.56718 18.7465 6.55759 18.7434 6.54721C18.7403 6.53684 18.7395 6.52593 18.741 6.51522L18.7923 6.1595C18.7947 6.1415 18.8037 6.12501 18.8175 6.11309C18.8313 6.10117 18.8489 6.09465 18.8672 6.09473H19.2229C19.2338 6.09473 19.2446 6.09705 19.2545 6.10153C19.2644 6.10602 19.2732 6.11256 19.2803 6.12073C19.2875 6.12889 19.2928 6.13848 19.2958 6.14885C19.2989 6.15923 19.2998 6.17014 19.2983 6.18085L19.2473 6.53657C19.2447 6.55457 19.2356 6.57102 19.2218 6.58292C19.208 6.59481 19.1903 6.60135 19.172 6.60134Z" fill="white"/>
                                        <path d="M19.8632 5.95259H19.4518C19.4349 5.95242 19.4183 5.94848 19.4031 5.94108C19.3879 5.93367 19.3746 5.92298 19.3642 5.9098C19.3537 5.89661 19.3464 5.88126 19.3426 5.86487C19.3389 5.84848 19.3389 5.83147 19.3427 5.81509L19.4405 5.38627C19.4461 5.36153 19.4599 5.33938 19.4797 5.32342C19.4995 5.30746 19.5242 5.29862 19.5496 5.29834H19.9611C19.9779 5.29852 19.9946 5.30245 20.0097 5.30986C20.0249 5.31726 20.0382 5.32795 20.0487 5.34114C20.0591 5.35433 20.0665 5.36968 20.0702 5.38607C20.0739 5.40246 20.0739 5.41947 20.0702 5.43585L19.9727 5.86502C19.967 5.88973 19.9531 5.9118 19.9332 5.92769C19.9133 5.94357 19.8887 5.95235 19.8632 5.95259Z" fill="white"/>
                                        <path d="M20.5383 6.42024H20.216C20.2008 6.42028 20.1859 6.41704 20.1721 6.41074C20.1583 6.40444 20.1461 6.39524 20.1363 6.38378C20.1265 6.37231 20.1193 6.35886 20.1152 6.34434C20.1111 6.32983 20.1103 6.31461 20.1127 6.29974L20.1658 5.96537C20.1696 5.94086 20.1821 5.91852 20.2011 5.90239C20.22 5.88626 20.2442 5.87741 20.2691 5.87744H20.5914C20.6065 5.8774 20.6215 5.88065 20.6353 5.88694C20.649 5.89324 20.6612 5.90244 20.6711 5.9139C20.6809 5.92537 20.6881 5.93883 20.6922 5.95334C20.6963 5.96785 20.6971 5.98307 20.6947 5.99794L20.6419 6.33231C20.638 6.35682 20.6254 6.37913 20.6064 6.39524C20.5874 6.41135 20.5632 6.42021 20.5383 6.42024Z" fill="white"/>
                                        <path d="M21.0273 5.85428H20.7752C20.7633 5.85433 20.7516 5.85181 20.7409 5.84691C20.7301 5.842 20.7206 5.83481 20.7129 5.82586C20.7052 5.8169 20.6996 5.80639 20.6964 5.79505C20.6932 5.78371 20.6925 5.77182 20.6944 5.7602L20.7359 5.49893C20.7389 5.47975 20.7486 5.46227 20.7634 5.44965C20.7783 5.43703 20.7971 5.43012 20.8166 5.43018H21.0687C21.0806 5.43013 21.0923 5.43264 21.103 5.43755C21.1138 5.44246 21.1233 5.44965 21.131 5.4586C21.1387 5.46755 21.1443 5.47807 21.1475 5.48941C21.1507 5.50075 21.1514 5.51264 21.1495 5.52426L21.108 5.78553C21.1051 5.80471 21.0953 5.82219 21.0805 5.83481C21.0656 5.84743 21.0468 5.85433 21.0273 5.85428Z" fill="white"/>
                                        <path d="M21.4126 6.16672H21.2543C21.2469 6.16671 21.2396 6.1651 21.2329 6.16201C21.2262 6.15892 21.2202 6.15441 21.2154 6.14881C21.2106 6.1432 21.2071 6.13663 21.205 6.12954C21.203 6.12245 21.2026 6.11502 21.2038 6.10774L21.2296 5.94345C21.2315 5.93141 21.2377 5.92044 21.247 5.91254C21.2564 5.90464 21.2682 5.90033 21.2805 5.90039H21.4387C21.4462 5.90035 21.4535 5.90192 21.4603 5.90499C21.4671 5.90806 21.4731 5.91256 21.4779 5.91817C21.4828 5.92378 21.4863 5.93037 21.4883 5.93749C21.4904 5.9446 21.4908 5.95207 21.4897 5.95938L21.4635 6.12366C21.4615 6.13568 21.4553 6.1466 21.446 6.15449C21.4366 6.16238 21.4248 6.16671 21.4126 6.16672Z" fill="white"/>
                                        <path d="M17.1168 8.31942H16.3529C16.3348 8.31942 16.3169 8.31548 16.3004 8.30787C16.284 8.30027 16.2695 8.28919 16.2578 8.2754C16.2461 8.26162 16.2376 8.24546 16.2329 8.22806C16.2281 8.21066 16.2272 8.19244 16.2303 8.17467L16.3682 7.39196C16.3732 7.36321 16.3884 7.33716 16.4109 7.31842C16.4334 7.29968 16.4618 7.28946 16.4911 7.28955H17.255C17.2731 7.28955 17.2911 7.29349 17.3075 7.3011C17.3239 7.3087 17.3385 7.31978 17.3501 7.33357C17.3618 7.34736 17.3703 7.36351 17.3751 7.38091C17.3798 7.39831 17.3807 7.41653 17.3776 7.4343L17.2397 8.21665C17.2347 8.24544 17.2196 8.27153 17.1971 8.29033C17.1746 8.30913 17.1462 8.31943 17.1168 8.31942Z" fill="white"/>
                                        <path d="M16.1285 9.24261H15.5232C15.4999 9.24264 15.4768 9.23759 15.4557 9.22781C15.4345 9.21802 15.4158 9.20375 15.4007 9.18598C15.3857 9.16822 15.3748 9.1474 15.3688 9.12498C15.3627 9.10257 15.3617 9.07911 15.3657 9.05625L15.4748 8.43312C15.4814 8.39631 15.5008 8.36298 15.5296 8.33896C15.5584 8.31495 15.5948 8.30178 15.6323 8.30176H16.2398C16.2631 8.30178 16.2861 8.30687 16.3072 8.31668C16.3283 8.32648 16.347 8.34076 16.362 8.35852C16.377 8.37628 16.3879 8.39708 16.3939 8.41947C16.3999 8.44186 16.401 8.46529 16.397 8.48812L16.2878 9.11125C16.2813 9.1484 16.2616 9.18201 16.2324 9.20608C16.2033 9.23014 16.1664 9.24309 16.1285 9.24261Z" fill="white"/>
                                        <path d="M17.6303 9.09815H17.1305C17.115 9.09785 17.0997 9.09427 17.0857 9.08764C17.0717 9.08102 17.0593 9.0715 17.0492 9.05972C17.0392 9.04794 17.0319 9.03417 17.0276 9.01933C17.0234 9.00449 17.0223 8.98893 17.0246 8.97366L17.1079 8.4761C17.1124 8.45123 17.1255 8.4287 17.1449 8.41239C17.1642 8.39607 17.1887 8.387 17.2141 8.38672H17.7139C17.7294 8.38701 17.7447 8.39059 17.7587 8.39722C17.7727 8.40384 17.7852 8.41337 17.7952 8.42514C17.8052 8.43692 17.8126 8.45069 17.8168 8.46553C17.8211 8.48037 17.8221 8.49594 17.8198 8.5112L17.7365 9.00877C17.732 9.03363 17.7189 9.05616 17.6996 9.07248C17.6802 9.08879 17.6557 9.09787 17.6303 9.09815Z" fill="white"/>
                                        <path d="M18.3891 8.22965H17.822C17.808 8.22963 17.7942 8.22663 17.7815 8.22086C17.7688 8.21508 17.7575 8.20665 17.7484 8.19615C17.7393 8.18565 17.7325 8.17333 17.7286 8.16C17.7246 8.14667 17.7236 8.13266 17.7256 8.11891L17.8067 7.55296C17.81 7.52987 17.8216 7.50875 17.8393 7.49347C17.857 7.47818 17.8797 7.46975 17.9031 7.46973H18.4702C18.4842 7.46968 18.498 7.47264 18.5107 7.4784C18.5235 7.48416 18.5348 7.49258 18.5439 7.50309C18.5531 7.51361 18.5599 7.52596 18.5638 7.53931C18.5677 7.55266 18.5686 7.5667 18.5666 7.58046L18.4855 8.14642C18.4822 8.1695 18.4706 8.19062 18.4529 8.20591C18.4352 8.22119 18.4125 8.22962 18.3891 8.22965Z" fill="white"/>
                                        <path d="M18.881 8.88064H18.5253C18.5144 8.88064 18.5036 8.87832 18.4937 8.87383C18.4838 8.86935 18.475 8.8628 18.4679 8.85464C18.4607 8.84648 18.4555 8.83688 18.4524 8.82651C18.4493 8.81614 18.4484 8.80523 18.45 8.79451L18.5012 8.4388C18.5037 8.4208 18.5127 8.4043 18.5265 8.39239C18.5402 8.38047 18.5579 8.37394 18.5762 8.37402H18.9319C18.9428 8.37402 18.9536 8.37634 18.9635 8.38083C18.9734 8.38531 18.9822 8.39186 18.9893 8.40002C18.9964 8.40819 19.0017 8.41778 19.0048 8.42815C19.0079 8.43852 19.0087 8.44943 19.0072 8.46015L18.9563 8.81586C18.9537 8.83386 18.9446 8.85032 18.9308 8.86221C18.917 8.87411 18.8993 8.88065 18.881 8.88064Z" fill="white"/>
                                        <path d="M19.5722 8.23238H19.1608C19.1439 8.2322 19.1273 8.22827 19.1121 8.22086C19.0969 8.21346 19.0836 8.20277 19.0732 8.18958C19.0627 8.17639 19.0553 8.16104 19.0516 8.14465C19.0479 8.12826 19.0479 8.11125 19.0516 8.09487L19.1495 7.66606C19.1551 7.64131 19.1689 7.61917 19.1887 7.60321C19.2085 7.58725 19.2331 7.57841 19.2586 7.57812H19.67C19.6869 7.5783 19.7036 7.58223 19.7187 7.58964C19.7339 7.59705 19.7472 7.60774 19.7576 7.62092C19.7681 7.63411 19.7755 7.64946 19.7792 7.66585C19.7829 7.68224 19.7829 7.69925 19.7792 7.71563L19.6817 8.14481C19.676 8.16951 19.662 8.19159 19.6422 8.20747C19.6223 8.22336 19.5977 8.23213 19.5722 8.23238Z" fill="white"/>
                                        <path d="M20.2473 8.70003H19.925C19.9098 8.70006 19.8949 8.69682 19.8811 8.69052C19.8673 8.68423 19.8551 8.67503 19.8453 8.66356C19.8354 8.6521 19.8282 8.63864 19.8242 8.62413C19.8201 8.60962 19.8192 8.5944 19.8217 8.57952L19.8748 8.24516C19.8786 8.22064 19.8911 8.1983 19.9101 8.18217C19.929 8.16604 19.9531 8.15719 19.9781 8.15723H20.3004C20.3155 8.15719 20.3305 8.16043 20.3443 8.16673C20.358 8.17302 20.3702 8.18222 20.3801 8.19369C20.3899 8.20515 20.3971 8.21861 20.4012 8.23312C20.4053 8.24763 20.4061 8.26286 20.4037 8.27773L20.3509 8.61209C20.347 8.63661 20.3344 8.65892 20.3154 8.67503C20.2964 8.69114 20.2722 8.7 20.2473 8.70003Z" fill="white"/>
                                        <path d="M20.7362 8.13407H20.4842C20.4723 8.13412 20.4606 8.1316 20.4499 8.12669C20.4391 8.12178 20.4295 8.1146 20.4219 8.10564C20.4142 8.09669 20.4085 8.08618 20.4054 8.07484C20.4022 8.0635 20.4015 8.0516 20.4034 8.03998L20.4449 7.77871C20.4478 7.75954 20.4576 7.74205 20.4724 7.72944C20.4872 7.71682 20.5061 7.70991 20.5256 7.70996H20.7777C20.7895 7.70991 20.8013 7.71243 20.812 7.71734C20.8228 7.72225 20.8323 7.72943 20.84 7.73838C20.8477 7.74734 20.8533 7.75785 20.8565 7.76919C20.8597 7.78053 20.8604 7.79242 20.8585 7.80405L20.817 8.06531C20.814 8.08449 20.8043 8.10198 20.7894 8.11459C20.7746 8.12721 20.7558 8.13412 20.7362 8.13407Z" fill="white"/>
                                        <path d="M21.1215 8.44651H20.9633C20.9559 8.4465 20.9486 8.44489 20.9419 8.44179C20.9351 8.4387 20.9292 8.4342 20.9244 8.42859C20.9196 8.42299 20.916 8.41642 20.914 8.40933C20.912 8.40224 20.9116 8.3948 20.9127 8.38753L20.9386 8.22324C20.9405 8.21119 20.9467 8.20022 20.956 8.19232C20.9654 8.18442 20.9772 8.18011 20.9895 8.18018H21.1477C21.1552 8.18014 21.1625 8.18171 21.1693 8.18478C21.176 8.18785 21.1821 8.19234 21.1869 8.19795C21.1917 8.20356 21.1953 8.21016 21.1973 8.21727C21.1994 8.22439 21.1998 8.23186 21.1987 8.23916L21.1725 8.40345C21.1705 8.41546 21.1643 8.42639 21.1549 8.43428C21.1456 8.44216 21.1338 8.4465 21.1215 8.44651Z" fill="white"/>
                                        <path d="M17.0074 10.4542H16.2435C16.2254 10.4542 16.2075 10.4502 16.1911 10.4426C16.1746 10.435 16.1601 10.424 16.1484 10.4102C16.1367 10.3964 16.1282 10.3802 16.1235 10.3628C16.1187 10.3454 16.1179 10.3272 16.1209 10.3094L16.2588 9.52672C16.2639 9.49797 16.279 9.47192 16.3015 9.45318C16.324 9.43444 16.3524 9.42422 16.3818 9.42432H17.1456C17.1638 9.42432 17.1817 9.42826 17.1981 9.43586C17.2145 9.44347 17.2291 9.45455 17.2408 9.46834C17.2524 9.48212 17.261 9.49828 17.2657 9.51568C17.2704 9.53308 17.2713 9.5513 17.2682 9.56906L17.1304 10.3514C17.1253 10.3802 17.1102 10.4063 17.0877 10.4251C17.0652 10.4439 17.0368 10.4542 17.0074 10.4542Z" fill="white"/>
                                        <path d="M16.0191 11.3779H15.4138C15.3905 11.3779 15.3674 11.3728 15.3463 11.3631C15.3251 11.3533 15.3064 11.339 15.2914 11.3212C15.2764 11.3035 15.2654 11.2827 15.2594 11.2602C15.2533 11.2378 15.2523 11.2144 15.2563 11.1915L15.3654 10.5684C15.372 10.5316 15.3914 10.4982 15.4202 10.4742C15.449 10.4502 15.4854 10.437 15.523 10.437H16.1304C16.1537 10.437 16.1767 10.4421 16.1979 10.4519C16.219 10.4617 16.2377 10.476 16.2526 10.4938C16.2676 10.5115 16.2785 10.5323 16.2845 10.5547C16.2906 10.5771 16.2916 10.6005 16.2876 10.6234L16.1784 11.2465C16.1719 11.2837 16.1523 11.3173 16.1231 11.3413C16.0939 11.3654 16.057 11.3783 16.0191 11.3779Z" fill="white"/>
                                        <path d="M17.5209 11.2329H17.0211C17.0056 11.2326 16.9903 11.229 16.9763 11.2224C16.9623 11.2158 16.9499 11.2063 16.9399 11.1945C16.9299 11.1827 16.9225 11.1689 16.9182 11.1541C16.914 11.1393 16.913 11.1237 16.9152 11.1084L16.9985 10.6109C17.003 10.586 17.0161 10.5635 17.0355 10.5472C17.0549 10.5308 17.0794 10.5218 17.1048 10.5215H17.6046C17.6201 10.5218 17.6353 10.5254 17.6493 10.532C17.6634 10.5386 17.6758 10.5481 17.6858 10.5599C17.6958 10.5717 17.7032 10.5855 17.7074 10.6003C17.7117 10.6151 17.7127 10.6307 17.7104 10.646L17.6271 11.1435C17.6226 11.1684 17.6096 11.1909 17.5902 11.2072C17.5708 11.2236 17.5463 11.2326 17.5209 11.2329Z" fill="white"/>
                                        <path d="M18.2797 10.3644H17.7126C17.6987 10.3644 17.6849 10.3614 17.6722 10.3556C17.6595 10.3498 17.6482 10.3414 17.639 10.3309C17.6299 10.3204 17.6231 10.3081 17.6192 10.2948C17.6153 10.2814 17.6142 10.2674 17.6162 10.2537L17.6973 9.68772C17.7007 9.66464 17.7122 9.64352 17.7299 9.62823C17.7476 9.61295 17.7703 9.60452 17.7937 9.60449H18.3608C18.3748 9.60445 18.3886 9.60741 18.4014 9.61316C18.4141 9.61892 18.4254 9.62735 18.4346 9.63786C18.4437 9.64837 18.4505 9.66073 18.4544 9.67408C18.4583 9.68743 18.4593 9.70147 18.4572 9.71522L18.3761 10.2812C18.3728 10.3043 18.3612 10.3254 18.3435 10.3407C18.3258 10.356 18.3032 10.3644 18.2797 10.3644Z" fill="white"/>
                                        <path d="M18.7716 11.0159H18.4159C18.405 11.0159 18.3942 11.0136 18.3844 11.0091C18.3745 11.0046 18.3656 10.9981 18.3585 10.9899C18.3514 10.9817 18.3461 10.9721 18.343 10.9618C18.3399 10.9514 18.3391 10.9405 18.3406 10.9298L18.3919 10.5741C18.3943 10.5561 18.4033 10.5396 18.4171 10.5276C18.4309 10.5157 18.4485 10.5092 18.4668 10.5093H18.8226C18.8334 10.5093 18.8442 10.5116 18.8541 10.5161C18.864 10.5206 18.8728 10.5271 18.8799 10.5353C18.8871 10.5434 18.8924 10.553 18.8955 10.5634C18.8985 10.5738 18.8994 10.5847 18.8979 10.5954L18.8469 10.9511C18.8443 10.9691 18.8353 10.9856 18.8214 10.9975C18.8076 11.0094 18.7899 11.0159 18.7716 11.0159Z" fill="white"/>
                                        <path d="M19.4628 10.3671H19.0514C19.0345 10.367 19.0179 10.363 19.0027 10.3556C18.9876 10.3482 18.9742 10.3375 18.9638 10.3243C18.9533 10.3112 18.946 10.2958 18.9422 10.2794C18.9385 10.263 18.9385 10.246 18.9423 10.2296L19.0401 9.80082C19.0457 9.77608 19.0595 9.75393 19.0793 9.73797C19.0991 9.72201 19.1238 9.71317 19.1492 9.71289H19.5607C19.5776 9.71307 19.5942 9.717 19.6093 9.72441C19.6245 9.73181 19.6378 9.7425 19.6483 9.75569C19.6587 9.76888 19.6661 9.78423 19.6698 9.80062C19.6735 9.81701 19.6735 9.83402 19.6698 9.8504L19.5723 10.2796C19.5666 10.3043 19.5527 10.3264 19.5328 10.3422C19.513 10.3581 19.4883 10.3669 19.4628 10.3671Z" fill="white"/>
                                        <path d="M20.1379 10.8348H19.8156C19.8005 10.8348 19.7855 10.8316 19.7717 10.8253C19.758 10.819 19.7457 10.8098 19.7359 10.7983C19.7261 10.7869 19.7189 10.7734 19.7148 10.7589C19.7107 10.7444 19.7099 10.7292 19.7123 10.7143L19.7654 10.3799C19.7692 10.3554 19.7817 10.3331 19.8007 10.3169C19.8196 10.3008 19.8438 10.292 19.8687 10.292H20.191C20.2061 10.292 20.2211 10.2952 20.2349 10.3015C20.2486 10.3078 20.2609 10.317 20.2707 10.3285C20.2805 10.3399 20.2877 10.3534 20.2918 10.3679C20.2959 10.3824 20.2967 10.3976 20.2943 10.4125L20.2416 10.7469C20.2376 10.7714 20.225 10.7937 20.206 10.8098C20.187 10.8259 20.1628 10.8348 20.1379 10.8348Z" fill="white"/>
                                        <path d="M20.6269 10.2688H20.3748C20.3629 10.2689 20.3512 10.2664 20.3405 10.2615C20.3297 10.2565 20.3202 10.2494 20.3125 10.2404C20.3048 10.2315 20.2992 10.2209 20.296 10.2096C20.2928 10.1983 20.2921 10.1864 20.294 10.1747L20.3355 9.91348C20.3385 9.8943 20.3482 9.87682 20.363 9.8642C20.3779 9.85158 20.3967 9.84468 20.4163 9.84473H20.6683C20.6802 9.84468 20.6919 9.8472 20.7026 9.8521C20.7134 9.85701 20.7229 9.8642 20.7306 9.87315C20.7383 9.8821 20.7439 9.89262 20.7471 9.90396C20.7503 9.9153 20.751 9.92719 20.7491 9.93881L20.7076 10.2001C20.7047 10.2193 20.6949 10.2367 20.6801 10.2494C20.6652 10.262 20.6464 10.2689 20.6269 10.2688Z" fill="white"/>
                                        <path d="M21.0122 10.5818H20.8539C20.8465 10.5817 20.8392 10.5801 20.8325 10.577C20.8258 10.574 20.8198 10.5695 20.815 10.5638C20.8102 10.5582 20.8067 10.5517 20.8047 10.5446C20.8027 10.5375 20.8022 10.5301 20.8034 10.5228L20.8292 10.3585C20.8311 10.3464 20.8373 10.3355 20.8466 10.3276C20.856 10.3197 20.8679 10.3154 20.8801 10.3154H21.0383C21.0458 10.3154 21.0531 10.317 21.0599 10.32C21.0667 10.3231 21.0727 10.3276 21.0775 10.3332C21.0824 10.3388 21.0859 10.3454 21.088 10.3525C21.09 10.3596 21.0904 10.3671 21.0893 10.3744L21.0631 10.5387C21.0611 10.5507 21.0549 10.5616 21.0456 10.5695C21.0362 10.5774 21.0244 10.5818 21.0122 10.5818Z" fill="white"/>
                                        <path d="M3.6122 9.65381H2.36087C2.29317 9.65381 2.23828 9.70841 2.23828 9.77576V11.0206C2.23828 11.0879 2.29317 11.1425 2.36087 11.1425H3.6122C3.6799 11.1425 3.73479 11.0879 3.73479 11.0206V9.77576C3.73479 9.70841 3.6799 9.65381 3.6122 9.65381Z" fill="white"/>
                                        <path d="M2.71499 6.75049H2.06204C1.99434 6.75049 1.93945 6.80509 1.93945 6.87244V7.52199C1.93945 7.58934 1.99434 7.64394 2.06204 7.64394H2.71499C2.78269 7.64394 2.83757 7.58934 2.83757 7.52199V6.87244C2.83757 6.80509 2.78269 6.75049 2.71499 6.75049Z" fill="white"/>
                                        <path d="M8.02749 11.0684H7.37454C7.30684 11.0684 7.25195 11.123 7.25195 11.1903V11.8399C7.25195 11.9072 7.30684 11.9618 7.37454 11.9618H8.02749C8.09519 11.9618 8.15007 11.9072 8.15007 11.8399V11.1903C8.15007 11.123 8.09519 11.0684 8.02749 11.0684Z" fill="white"/>
                                        <path d="M3.38899 8.09033H2.96048C2.89277 8.09033 2.83789 8.14493 2.83789 8.21228V8.63856C2.83789 8.70591 2.89277 8.76051 2.96048 8.76051H3.38899C3.45669 8.76051 3.51157 8.70591 3.51157 8.63856V8.21228C3.51157 8.14493 3.45669 8.09033 3.38899 8.09033Z" fill="white"/>
                                        <path d="M1.29257 8.76025H0.938993C0.87129 8.76025 0.816406 8.81485 0.816406 8.8822V9.23394C0.816406 9.30129 0.87129 9.35589 0.938993 9.35589H1.29257C1.36027 9.35589 1.41515 9.30129 1.41515 9.23394V8.8822C1.41515 8.81485 1.36027 8.76025 1.29257 8.76025Z" fill="white"/>
                                        <path d="M1.816 9.65381H1.46243C1.39473 9.65381 1.33984 9.70841 1.33984 9.77576V10.1275C1.33984 10.1948 1.39473 10.2494 1.46243 10.2494H1.816C1.88371 10.2494 1.93859 10.1948 1.93859 10.1275V9.77576C1.93859 9.70841 1.88371 9.65381 1.816 9.65381Z" fill="white"/>
                                        <path d="M5.63313 9.13281H5.20462C5.13692 9.13281 5.08203 9.18741 5.08203 9.25476V9.68104C5.08203 9.74839 5.13692 9.80299 5.20462 9.80299H5.63313C5.70083 9.80299 5.75571 9.74839 5.75571 9.68104V9.25476C5.75571 9.18741 5.70083 9.13281 5.63313 9.13281Z" fill="white"/>
                                        <path d="M4.06086 11.7383H3.63235C3.56465 11.7383 3.50977 11.7929 3.50977 11.8602V12.2865C3.50977 12.3539 3.56465 12.4085 3.63235 12.4085H4.06086C4.12856 12.4085 4.18345 12.3539 4.18345 12.2865V11.8602C4.18345 11.7929 4.12856 11.7383 4.06086 11.7383Z" fill="white"/>
                                        </svg>
        </div>

        {/* Message Container */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">Datasaki AI</span>
            <span className="text-sm text-gray-500">- Just now</span>
          </div>
          <div className="bg-white border border-gray-300 p-2 rounded-lg">
            {/* Typing Animation Dots */}
            <div className="flex items-center gap-1">
              <img 
                src="https://s3-alpha-sig.figma.com/img/f915/7f6d/929431f2655b216180eceadfbc201958?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=uYnLXkgD1Fqr45a4NB1SUSSfKo-7DmDyxYDENb2sigxnxHpICPMFT~bQIM9EMibwIG6s8rNNg20GdZ5U-52V7gOSm8avOOQ5ukKds~nUL115tlEmvde7Vw1txNCcxV3oEzGmd-mI8l0FJHBWQyyzj7nsJl-m4HuUa4UTl3hIKG7H9uCi9X3bI7ZUXue8uN~QaGqAFakonf1Z6W~0lZPi9f3k3HdfKfNAYNybuMqg~scewVn3Wcs2U8D8AUZagDJZbFCTBx3Jg7X452oiaNQTxBjaJL1EvCRtQcn24nJnXth9E7kIqKITB9ZUKSJExzNFyFkjFjetnmPXC3kmldX9ew__" 
                alt="Loading..."
                className="w-8 h-8 object-cover"
              />
              <span className="text-sm text-gray-600">Getting Data...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Explore = () => {
  const [chartsDrawerOpen, setChartsDrawerOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [activeChat, setActiveChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const [showFileOptions, setShowFileOptions] = useState(false);

// Close dropdown when clicking outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (showFileOptions) {
      setShowFileOptions(false);
    }
  };

  document.addEventListener('click', handleClickOutside);
  return () => {
    document.removeEventListener('click', handleClickOutside);
  };
}, [showFileOptions]);

// Function to scroll to bottom of chat
const scrollToBottom = () => {
  if (chatContainerRef.current) {
    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }
};

  // Initialize first chat on component mount
  useEffect(() => {
    if (chats.length === 0) {
      const initialChat = {
        id: Date.now(),
        title: "New Chat",
        createdAt: new Date(),
        messages: []
      };
      setChats([initialChat]);
      setActiveChat(initialChat.id);
    }
  }, []);

  // Sample saved charts data
  const savedCharts = [
    { id: 1, name: "Monthly Revenue", type: "line", updatedAt: "2 hours ago" },
    { id: 2, name: "Customer Distribution", type: "pie", updatedAt: "Yesterday" },
    { id: 3, name: "Sales Performance", type: "bar", updatedAt: "2 days ago" },
    { id: 4, name: "Growth Metrics", type: "area", updatedAt: "1 week ago" },
  ];

  const getChartIcon = (type) => {
    switch (type) {
      case 'line':
        return <LineChartOutlined className="text-blue-500" />;
      case 'pie':
        return <PieChartOutlined className="text-green-500" />;
      case 'bar':
        return <BarChartOutlined className="text-purple-500" />;
      case 'area':
        return <AreaChartOutlined className="text-orange-500" />;
      default:
        return <BarChartOutlined className="text-gray-500" />;
    }
  };

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      createdAt: new Date(),
      messages: []
    };
    setChats(prevChats => [newChat, ...prevChats]);
    setActiveChat(newChat.id);
    setUserInput("");
  };

  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(chats[0]?.id || null);
    }
  };

  const switchChat = (chatId) => {
    setActiveChat(chatId);
    setUserInput("");
  };

  const handleChatSubmit = () => {
    if (!userInput.trim() || !activeChat) return;

    const newMessage = {
      id: Date.now(),
      text: userInput,
      sender: "user",
    //   name: "Krishna Padam IT",
      timestamp: new Date()
    };

    setChats(prevChats => {
      const newChats = prevChats.map(chat => {
        if (chat.id === activeChat) {
          const title = chat.messages.length === 0 ? 
            userInput.slice(0, 30) + (userInput.length > 30 ? "..." : "") : 
            chat.title;
          
          return {
            ...chat,
            title,
            messages: [...chat.messages, newMessage]
          };
        }
        return chat;
      });
      
      // Scroll after state update
      setTimeout(scrollToBottom, 100);
      return newChats;
    });

    setUserInput("");
    
    // Show typing animation
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now(),
        text: userInput,
        sender: "bot",
        name: "Datasaki AI",
        timestamp: new Date()
      };

      setIsTyping(false);
      setChats(prevChats => {
        const newChats = prevChats.map(chat =>
          chat.id === activeChat
            ? { ...chat, messages: [...chat.messages, botResponse] }
            : chat
        );
        // Scroll after bot response
        setTimeout(scrollToBottom, 100);
        return newChats;
      });
    }, 2000);
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const minutes = Math.floor((now - date) / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes/60)}h ago`;
    return date.toLocaleDateString();
  };

  const groupChatsByDate = () => {
    const groups = {
      Today: [],
      Yesterday: [],
      "Previous 7 Days": [],
      Older: []
    };

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(lastWeek.getDate() - 7);

    chats.forEach(chat => {
      const chatDate = new Date(chat.createdAt);
      
      if (chatDate.toDateString() === today.toDateString()) {
        groups.Today.push(chat);
      } else if (chatDate.toDateString() === yesterday.toDateString()) {
        groups.Yesterday.push(chat);
      } else if (chatDate > lastWeek) {
        groups["Previous 7 Days"].push(chat);
      } else {
        groups.Older.push(chat);
      }
    });

    return groups;
  };

  const currentChat = chats.find(chat => chat.id === activeChat);

  // SavedChartsDrawer component
  const SavedChartsDrawer = () => (
    <Drawer
      title={
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Saved Charts</span>
          <Button 
            type="text" 
            icon={<CloseOutlined />} 
            onClick={() => setChartsDrawerOpen(false)}
          />
        </div>
      }
      placement="right"
      onClose={() => setChartsDrawerOpen(false)}
      open={chartsDrawerOpen}
      width={320}
      bodyStyle={{ padding: 0 }}
    >
      <div className="p-4 border-b border-gray-200">
        <Input
          prefix={<SearchOutlined className="text-gray-400" />}
          placeholder="Search charts..."
          className="w-full"
        />
      </div>
      <div className="overflow-y-auto">
        {savedCharts.map((chart) => (
          <div 
            key={chart.id} 
            className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                {getChartIcon(chart.type)}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900">{chart.name}</h3>
                <p className="text-xs text-gray-500">{chart.updatedAt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );

  return (
    <div className="flex flex-col h-[94vh] bg-gray-50 ">
      {/* Header */}
      <div className="w-full bg-white shadow-sm z-10 border  rounded-lg mb-1">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between gap-4">
            <div className="flex items-center">
              <span className="text-lg font-medium">Explore</span>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                type="primary"
                className="bg-blue-600 flex items-center h-10 px-4"
                icon={<PlusOutlined />}
                onClick={createNewChat}
              >
                New Chat
              </Button>
              <Button 
                className="border-gray-200 flex items-center h-10 px-4 bg-white"
                icon={<BarChartOutlined />}
                onClick={() => setChartsDrawerOpen(true)}
              >
                Saved Charts
              </Button>
            </div>

            <div className="flex items-center">
              <Input
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="Explore.."
                className="w-64 rounded-lg border-gray-200"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden border rounded-lg">
        {/* Collapsible Sidebar */}
        <div 
          className={`flex-none bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? 'w-16' : 'w-56'
          }`}
        >
          {/* Sidebar Toggle */}
          <Button
            type="text"
            icon={isSidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="self-end m-2"
          />

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto min-h-0">
            {Object.entries(groupChatsByDate()).map(([timeFrame, timeChats]) => {
              if (timeChats.length === 0) return null;
              
              return (
                <div key={timeFrame} className="mb-4">
                  {!isSidebarCollapsed && (
                    <div className="px-4 py-2">
                      <span className="text-sm text-gray-500">{timeFrame}</span>
                    </div>
                  )}
                  {timeChats.map(chat => (
                    <div
                      key={chat.id}
                      onClick={() => switchChat(chat.id)}
                      className={`px-4 py-2 hover:bg-gray-50 cursor-pointer ${
                        activeChat === chat.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MessageOutlined className="text-gray-400" />
                        {!isSidebarCollapsed && (
                          <>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-sm truncate">{chat.title}</span>
                                <Button
                                  type="text"
                                  size="small"
                                  className="opacity-0 group-hover:opacity-100"
                                  icon={<DeleteOutlined />}
                                  onClick={(e) => deleteChat(chat.id, e)}
                                />
                              </div>
                              <span className="text-xs text-gray-400">
                                {formatTimestamp(new Date(chat.createdAt))}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-blue-50">
          <div className="flex-1 overflow-y-auto p-4 min-h-0" ref={chatContainerRef}>
            {!currentChat?.messages?.length ? (
              <div className="h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-white border border-gray-400 rounded-full flex items-center justify-center mb-4">
                  <div className="text-blue-600">
                <svg width="48" height="58" viewBox="0 0 48 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.6133 28.4585H14.9883V24.771H18.6133V28.4585ZM33.1133 28.4585H29.4883V24.771H33.1133V28.4585ZM47.6133 24.771V32.146H43.9883V41.3647C43.9883 42.1329 43.8467 42.8531 43.5635 43.5253C43.2803 44.1975 42.8932 44.7833 42.4023 45.2827C41.9115 45.782 41.3356 46.1757 40.6748 46.4638C40.014 46.7519 39.306 46.896 38.5508 46.896H31.0742L18.6133 57.728V46.896H9.55078C8.79557 46.896 8.08756 46.7519 7.42676 46.4638C6.76595 46.1757 6.1901 45.782 5.69922 45.2827C5.20833 44.7833 4.82129 44.1975 4.53809 43.5253C4.25488 42.8531 4.11328 42.1329 4.11328 41.3647V32.146H0.488281V24.771H4.11328V19.2397C4.11328 18.4715 4.25488 17.7513 4.53809 17.0791C4.82129 16.4069 5.20833 15.8211 5.69922 15.3217C6.1901 14.8224 6.76595 14.4287 7.42676 14.1406C8.08756 13.8525 8.79557 13.7085 9.55078 13.7085H22.2383V7.68746C21.6908 7.36096 21.2565 6.90963 20.9355 6.33346C20.6146 5.75728 20.4447 5.1427 20.4258 4.48971C20.4258 3.97115 20.5202 3.49101 20.709 3.04928C20.8978 2.60754 21.1527 2.22343 21.4736 1.89693C21.7946 1.57043 22.1816 1.30155 22.6348 1.09029C23.0879 0.879028 23.5599 0.783 24.0508 0.802205C24.5605 0.802205 25.0326 0.898234 25.4668 1.09029C25.901 1.28235 26.2786 1.54163 26.5996 1.86812C26.9206 2.19462 27.1849 2.58834 27.3926 3.04928C27.6003 3.51021 27.6947 3.99036 27.6758 4.48971C27.6758 5.1427 27.5153 5.75728 27.1943 6.33346C26.8734 6.90963 26.4297 7.36096 25.8633 7.68746V13.7085H38.5508C39.306 13.7085 40.014 13.8525 40.6748 14.1406C41.3356 14.4287 41.9115 14.8224 42.4023 15.3217C42.8932 15.8211 43.2803 16.4069 43.5635 17.0791C43.8467 17.7513 43.9883 18.4715 43.9883 19.2397V24.771H47.6133ZM40.3633 19.2397C40.3633 18.7404 40.1839 18.3082 39.8252 17.9433C39.4665 17.5784 39.0417 17.396 38.5508 17.396H9.55078C9.0599 17.396 8.63509 17.5784 8.27637 17.9433C7.91764 18.3082 7.73828 18.7404 7.73828 19.2397V41.3647C7.73828 41.8641 7.91764 42.2962 8.27637 42.6611C8.63509 43.026 9.0599 43.2085 9.55078 43.2085H22.2383V49.7192L29.7148 43.2085H38.5508C39.0417 43.2085 39.4665 43.026 39.8252 42.6611C40.1839 42.2962 40.3633 41.8641 40.3633 41.3647V19.2397ZM16.2627 32.5493C17.3011 33.6056 18.4906 34.4122 19.8311 34.9692C21.1715 35.5262 22.5781 35.8142 24.0508 35.8335C25.5234 35.8335 26.93 35.555 28.2705 34.998C29.611 34.441 30.8005 33.6248 31.8389 32.5493L34.3877 35.1709C33.0094 36.5729 31.4329 37.6484 29.6582 38.3974C27.8835 39.1464 26.0143 39.521 24.0508 39.521C22.1061 39.521 20.2464 39.1464 18.4717 38.3974C16.6969 37.6484 15.111 36.5729 13.7139 35.1709L16.2627 32.5493Z" fill="#3C6BEB"/>
                </svg>
                  </div>
                </div>
                <h1 className="text-2xl font-semibold mb-2">Welcome to Datasaki</h1>
                <p className="text-gray-600">Explore your chat</p>
              </div>
            ) : (
              <div className="space-y-3">
                {currentChat.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex max-w-[80%] items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`flex-shrink-0  w-8 h-8 border border-gray-600 rounded-full flex items-center justify-center
                        ${msg.sender === 'user' ? 'bg-green-100' : 'bg-blue-600'}`}>
                        <span className={`text-xs font-medium
                          ${msg.sender === 'user' ? 'text-green-600' : 'text-blue-600'}`}>
                                    {msg.sender === 'user' ? 'U' :
                                        <svg width="22"  height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.2675 13.6742C11.2341 13.6742 10.3967 11.0912 10.3967 7.90492C10.3967 4.71869 11.2334 2.13533 12.2675 2.13533C12.8063 2.13533 13.2919 2.83916 13.6331 3.96384C13.2115 1.83932 12.456 0.42334 11.5938 0.42334C10.2712 0.42334 9.19922 3.75613 9.19922 7.86765C9.19922 11.9792 10.2712 15.312 11.5938 15.312C12.4258 15.312 13.158 13.9937 13.5876 11.9929C13.249 13.0318 12.7826 13.6742 12.2675 13.6742Z" fill="white"/>
                                        <path d="M13.8385 11.2178C13.3292 11.2178 13.0902 9.9183 13.0902 8.03841C13.0902 6.15851 13.4031 4.96255 13.9134 4.96255C14.1793 4.96255 14.2124 5.40909 14.3063 5.71161C14.0979 4.45811 13.7243 3.62256 13.2994 3.62256C12.6465 3.62256 12.1172 5.58894 12.1172 8.01453C12.1172 10.4401 12.6465 12.4069 13.2994 12.4069C13.7101 12.4069 14.0717 11.6292 14.2837 10.4484C14.115 11.0632 14.0931 11.2178 13.8385 11.2178Z" fill="white"/>
                                        <path d="M5.55714 2.3584H4.82962C4.76192 2.3584 4.70703 2.413 4.70703 2.48035V3.20408C4.70703 3.27143 4.76192 3.32603 4.82962 3.32603H5.55714C5.62484 3.32603 5.67972 3.27143 5.67972 3.20408V2.48035C5.67972 2.413 5.62484 2.3584 5.55714 2.3584Z" fill="white"/>
                                        <path d="M5.48294 4.81494H4.30618C4.23848 4.81494 4.18359 4.86954 4.18359 4.93689V6.10753C4.18359 6.17488 4.23848 6.22948 4.30618 6.22948H5.48294C5.55064 6.22948 5.60553 6.17488 5.60553 6.10753V4.93689C5.60553 4.86954 5.55064 4.81494 5.48294 4.81494Z" fill="white"/>
                                        <path d="M7.57934 5.63379H6.77688C6.70918 5.63379 6.6543 5.68839 6.6543 5.75574V6.55401C6.6543 6.62136 6.70918 6.67596 6.77688 6.67596H7.57934C7.64704 6.67596 7.70192 6.62136 7.70192 6.55401V5.75574C7.70192 5.68839 7.64704 5.63379 7.57934 5.63379Z" fill="white"/>
                                        <path d="M6.15605 10.6958H5.05423C4.98652 10.6958 4.93164 10.7504 4.93164 10.8177V11.9138C4.93164 11.9812 4.98652 12.0358 5.05423 12.0358H6.15605C6.22376 12.0358 6.27864 11.9812 6.27864 11.9138V10.8177C6.27864 10.7504 6.22376 10.6958 6.15605 10.6958Z" fill="white"/>
                                        <path d="M7.76667 8.90967H6.73977C6.67207 8.90967 6.61719 8.96427 6.61719 9.03162V10.0532C6.61719 10.1205 6.67207 10.1751 6.73977 10.1751H7.76667C7.83437 10.1751 7.88925 10.1205 7.88925 10.0532V9.03162C7.88925 8.96427 7.83437 8.90967 7.76667 8.90967Z" fill="white"/>
                                        <path d="M5.48311 12.4829H4.53079C4.46309 12.4829 4.4082 12.5375 4.4082 12.6049V13.5522C4.4082 13.6196 4.46309 13.6742 4.53079 13.6742H5.48311C5.55081 13.6742 5.6057 13.6196 5.6057 13.5522V12.6049C5.6057 12.5375 5.55081 12.4829 5.48311 12.4829Z" fill="white"/>
                                        <path d="M6.23185 14.0459H5.65384C5.58613 14.0459 5.53125 14.1005 5.53125 14.1678V14.7429C5.53125 14.8102 5.58613 14.8648 5.65384 14.8648H6.23185C6.29955 14.8648 6.35444 14.8102 6.35444 14.7429V14.1678C6.35444 14.1005 6.29955 14.0459 6.23185 14.0459Z" fill="white"/>
                                        <path d="M6.38173 7.04834H5.1304C5.0627 7.04834 5.00781 7.10294 5.00781 7.17029V8.41511C5.00781 8.48246 5.0627 8.53706 5.1304 8.53706H6.38173C6.44943 8.53706 6.50432 8.48246 6.50432 8.41511V7.17029C6.50432 7.10294 6.44943 7.04834 6.38173 7.04834Z" fill="white"/>
                                        <path d="M17.4078 6.03964H16.6439C16.6258 6.03963 16.6079 6.03569 16.5915 6.02809C16.575 6.02049 16.5605 6.0094 16.5488 5.99562C16.5371 5.98183 16.5286 5.96567 16.5239 5.94827C16.5191 5.93088 16.5183 5.91266 16.5213 5.89489L16.6592 5.11217C16.6643 5.08342 16.6794 5.05737 16.7019 5.03863C16.7244 5.01989 16.7528 5.00967 16.7821 5.00977H17.546C17.5642 5.00977 17.5821 5.01371 17.5985 5.02131C17.6149 5.02892 17.6295 5.04 17.6412 5.05378C17.6528 5.06757 17.6613 5.08373 17.6661 5.10113C17.6708 5.11853 17.6717 5.13675 17.6686 5.15451L17.5308 5.93687C17.5257 5.96565 17.5106 5.99175 17.4881 6.01055C17.4656 6.02934 17.4372 6.03965 17.4078 6.03964Z" fill="white"/>
                                        <path d="M16.4195 6.96282H15.8142C15.7909 6.96286 15.7678 6.95781 15.7467 6.94802C15.7255 6.93824 15.7068 6.92396 15.6918 6.9062C15.6767 6.88843 15.6658 6.86761 15.6598 6.8452C15.6537 6.82278 15.6527 6.79932 15.6567 6.77646L15.7658 6.15333C15.7724 6.11652 15.7918 6.08319 15.8206 6.05918C15.8494 6.03516 15.8858 6.02199 15.9233 6.02197H16.5308C16.5541 6.02199 16.5771 6.02708 16.5982 6.03689C16.6194 6.0467 16.6381 6.06098 16.653 6.07874C16.668 6.0965 16.6789 6.1173 16.6849 6.13969C16.691 6.16208 16.692 6.18551 16.688 6.20833L16.5788 6.83147C16.5723 6.86861 16.5526 6.90223 16.5235 6.92629C16.4943 6.95036 16.4574 6.96331 16.4195 6.96282Z" fill="white"/>
                                        <path d="M17.9213 6.81836H17.4215C17.406 6.81807 17.3907 6.81449 17.3767 6.80786C17.3627 6.80123 17.3503 6.79171 17.3403 6.77993C17.3302 6.76815 17.3229 6.75439 17.3186 6.73955C17.3144 6.72471 17.3134 6.70914 17.3156 6.69388L17.3989 6.19631C17.4034 6.17145 17.4165 6.14892 17.4359 6.1326C17.4553 6.11629 17.4798 6.10721 17.5052 6.10693H18.005C18.0205 6.10723 18.0357 6.11081 18.0497 6.11743C18.0637 6.12406 18.0762 6.13358 18.0862 6.14536C18.0962 6.15714 18.1036 6.17091 18.1078 6.18575C18.1121 6.20058 18.1131 6.21615 18.1108 6.23142L18.0275 6.72898C18.023 6.75385 18.01 6.77638 17.9906 6.79269C17.9712 6.80901 17.9467 6.81808 17.9213 6.81836Z" fill="white"/>
                                        <path d="M18.6801 5.94986H18.113C18.099 5.94985 18.0852 5.94685 18.0726 5.94107C18.0599 5.93529 18.0486 5.92687 18.0394 5.91637C18.0303 5.90587 18.0235 5.89354 18.0196 5.88022C18.0156 5.86689 18.0146 5.85288 18.0166 5.83913L18.0977 5.27317C18.1011 5.25009 18.1126 5.22897 18.1303 5.21368C18.148 5.19839 18.1707 5.18997 18.1941 5.18994H18.7612C18.7752 5.1899 18.789 5.19285 18.8018 5.19861C18.8145 5.20437 18.8258 5.2128 18.835 5.22331C18.8441 5.23382 18.8509 5.24618 18.8548 5.25953C18.8587 5.27288 18.8597 5.28691 18.8576 5.30067L18.7765 5.86663C18.7732 5.88972 18.7616 5.91084 18.7439 5.92612C18.7262 5.94141 18.7035 5.94984 18.6801 5.94986Z" fill="white"/>
                                        <path d="M19.172 6.60134H18.8163C18.8054 6.60134 18.7946 6.59902 18.7847 6.59453C18.7748 6.59005 18.766 6.58351 18.7589 6.57534C18.7518 6.56718 18.7465 6.55759 18.7434 6.54721C18.7403 6.53684 18.7395 6.52593 18.741 6.51522L18.7923 6.1595C18.7947 6.1415 18.8037 6.12501 18.8175 6.11309C18.8313 6.10117 18.8489 6.09465 18.8672 6.09473H19.2229C19.2338 6.09473 19.2446 6.09705 19.2545 6.10153C19.2644 6.10602 19.2732 6.11256 19.2803 6.12073C19.2875 6.12889 19.2928 6.13848 19.2958 6.14885C19.2989 6.15923 19.2998 6.17014 19.2983 6.18085L19.2473 6.53657C19.2447 6.55457 19.2356 6.57102 19.2218 6.58292C19.208 6.59481 19.1903 6.60135 19.172 6.60134Z" fill="white"/>
                                        <path d="M19.8632 5.95259H19.4518C19.4349 5.95242 19.4183 5.94848 19.4031 5.94108C19.3879 5.93367 19.3746 5.92298 19.3642 5.9098C19.3537 5.89661 19.3464 5.88126 19.3426 5.86487C19.3389 5.84848 19.3389 5.83147 19.3427 5.81509L19.4405 5.38627C19.4461 5.36153 19.4599 5.33938 19.4797 5.32342C19.4995 5.30746 19.5242 5.29862 19.5496 5.29834H19.9611C19.9779 5.29852 19.9946 5.30245 20.0097 5.30986C20.0249 5.31726 20.0382 5.32795 20.0487 5.34114C20.0591 5.35433 20.0665 5.36968 20.0702 5.38607C20.0739 5.40246 20.0739 5.41947 20.0702 5.43585L19.9727 5.86502C19.967 5.88973 19.9531 5.9118 19.9332 5.92769C19.9133 5.94357 19.8887 5.95235 19.8632 5.95259Z" fill="white"/>
                                        <path d="M20.5383 6.42024H20.216C20.2008 6.42028 20.1859 6.41704 20.1721 6.41074C20.1583 6.40444 20.1461 6.39524 20.1363 6.38378C20.1265 6.37231 20.1193 6.35886 20.1152 6.34434C20.1111 6.32983 20.1103 6.31461 20.1127 6.29974L20.1658 5.96537C20.1696 5.94086 20.1821 5.91852 20.2011 5.90239C20.22 5.88626 20.2442 5.87741 20.2691 5.87744H20.5914C20.6065 5.8774 20.6215 5.88065 20.6353 5.88694C20.649 5.89324 20.6612 5.90244 20.6711 5.9139C20.6809 5.92537 20.6881 5.93883 20.6922 5.95334C20.6963 5.96785 20.6971 5.98307 20.6947 5.99794L20.6419 6.33231C20.638 6.35682 20.6254 6.37913 20.6064 6.39524C20.5874 6.41135 20.5632 6.42021 20.5383 6.42024Z" fill="white"/>
                                        <path d="M21.0273 5.85428H20.7752C20.7633 5.85433 20.7516 5.85181 20.7409 5.84691C20.7301 5.842 20.7206 5.83481 20.7129 5.82586C20.7052 5.8169 20.6996 5.80639 20.6964 5.79505C20.6932 5.78371 20.6925 5.77182 20.6944 5.7602L20.7359 5.49893C20.7389 5.47975 20.7486 5.46227 20.7634 5.44965C20.7783 5.43703 20.7971 5.43012 20.8166 5.43018H21.0687C21.0806 5.43013 21.0923 5.43264 21.103 5.43755C21.1138 5.44246 21.1233 5.44965 21.131 5.4586C21.1387 5.46755 21.1443 5.47807 21.1475 5.48941C21.1507 5.50075 21.1514 5.51264 21.1495 5.52426L21.108 5.78553C21.1051 5.80471 21.0953 5.82219 21.0805 5.83481C21.0656 5.84743 21.0468 5.85433 21.0273 5.85428Z" fill="white"/>
                                        <path d="M21.4126 6.16672H21.2543C21.2469 6.16671 21.2396 6.1651 21.2329 6.16201C21.2262 6.15892 21.2202 6.15441 21.2154 6.14881C21.2106 6.1432 21.2071 6.13663 21.205 6.12954C21.203 6.12245 21.2026 6.11502 21.2038 6.10774L21.2296 5.94345C21.2315 5.93141 21.2377 5.92044 21.247 5.91254C21.2564 5.90464 21.2682 5.90033 21.2805 5.90039H21.4387C21.4462 5.90035 21.4535 5.90192 21.4603 5.90499C21.4671 5.90806 21.4731 5.91256 21.4779 5.91817C21.4828 5.92378 21.4863 5.93037 21.4883 5.93749C21.4904 5.9446 21.4908 5.95207 21.4897 5.95938L21.4635 6.12366C21.4615 6.13568 21.4553 6.1466 21.446 6.15449C21.4366 6.16238 21.4248 6.16671 21.4126 6.16672Z" fill="white"/>
                                        <path d="M17.1168 8.31942H16.3529C16.3348 8.31942 16.3169 8.31548 16.3004 8.30787C16.284 8.30027 16.2695 8.28919 16.2578 8.2754C16.2461 8.26162 16.2376 8.24546 16.2329 8.22806C16.2281 8.21066 16.2272 8.19244 16.2303 8.17467L16.3682 7.39196C16.3732 7.36321 16.3884 7.33716 16.4109 7.31842C16.4334 7.29968 16.4618 7.28946 16.4911 7.28955H17.255C17.2731 7.28955 17.2911 7.29349 17.3075 7.3011C17.3239 7.3087 17.3385 7.31978 17.3501 7.33357C17.3618 7.34736 17.3703 7.36351 17.3751 7.38091C17.3798 7.39831 17.3807 7.41653 17.3776 7.4343L17.2397 8.21665C17.2347 8.24544 17.2196 8.27153 17.1971 8.29033C17.1746 8.30913 17.1462 8.31943 17.1168 8.31942Z" fill="white"/>
                                        <path d="M16.1285 9.24261H15.5232C15.4999 9.24264 15.4768 9.23759 15.4557 9.22781C15.4345 9.21802 15.4158 9.20375 15.4007 9.18598C15.3857 9.16822 15.3748 9.1474 15.3688 9.12498C15.3627 9.10257 15.3617 9.07911 15.3657 9.05625L15.4748 8.43312C15.4814 8.39631 15.5008 8.36298 15.5296 8.33896C15.5584 8.31495 15.5948 8.30178 15.6323 8.30176H16.2398C16.2631 8.30178 16.2861 8.30687 16.3072 8.31668C16.3283 8.32648 16.347 8.34076 16.362 8.35852C16.377 8.37628 16.3879 8.39708 16.3939 8.41947C16.3999 8.44186 16.401 8.46529 16.397 8.48812L16.2878 9.11125C16.2813 9.1484 16.2616 9.18201 16.2324 9.20608C16.2033 9.23014 16.1664 9.24309 16.1285 9.24261Z" fill="white"/>
                                        <path d="M17.6303 9.09815H17.1305C17.115 9.09785 17.0997 9.09427 17.0857 9.08764C17.0717 9.08102 17.0593 9.0715 17.0492 9.05972C17.0392 9.04794 17.0319 9.03417 17.0276 9.01933C17.0234 9.00449 17.0223 8.98893 17.0246 8.97366L17.1079 8.4761C17.1124 8.45123 17.1255 8.4287 17.1449 8.41239C17.1642 8.39607 17.1887 8.387 17.2141 8.38672H17.7139C17.7294 8.38701 17.7447 8.39059 17.7587 8.39722C17.7727 8.40384 17.7852 8.41337 17.7952 8.42514C17.8052 8.43692 17.8126 8.45069 17.8168 8.46553C17.8211 8.48037 17.8221 8.49594 17.8198 8.5112L17.7365 9.00877C17.732 9.03363 17.7189 9.05616 17.6996 9.07248C17.6802 9.08879 17.6557 9.09787 17.6303 9.09815Z" fill="white"/>
                                        <path d="M18.3891 8.22965H17.822C17.808 8.22963 17.7942 8.22663 17.7815 8.22086C17.7688 8.21508 17.7575 8.20665 17.7484 8.19615C17.7393 8.18565 17.7325 8.17333 17.7286 8.16C17.7246 8.14667 17.7236 8.13266 17.7256 8.11891L17.8067 7.55296C17.81 7.52987 17.8216 7.50875 17.8393 7.49347C17.857 7.47818 17.8797 7.46975 17.9031 7.46973H18.4702C18.4842 7.46968 18.498 7.47264 18.5107 7.4784C18.5235 7.48416 18.5348 7.49258 18.5439 7.50309C18.5531 7.51361 18.5599 7.52596 18.5638 7.53931C18.5677 7.55266 18.5686 7.5667 18.5666 7.58046L18.4855 8.14642C18.4822 8.1695 18.4706 8.19062 18.4529 8.20591C18.4352 8.22119 18.4125 8.22962 18.3891 8.22965Z" fill="white"/>
                                        <path d="M18.881 8.88064H18.5253C18.5144 8.88064 18.5036 8.87832 18.4937 8.87383C18.4838 8.86935 18.475 8.8628 18.4679 8.85464C18.4607 8.84648 18.4555 8.83688 18.4524 8.82651C18.4493 8.81614 18.4484 8.80523 18.45 8.79451L18.5012 8.4388C18.5037 8.4208 18.5127 8.4043 18.5265 8.39239C18.5402 8.38047 18.5579 8.37394 18.5762 8.37402H18.9319C18.9428 8.37402 18.9536 8.37634 18.9635 8.38083C18.9734 8.38531 18.9822 8.39186 18.9893 8.40002C18.9964 8.40819 19.0017 8.41778 19.0048 8.42815C19.0079 8.43852 19.0087 8.44943 19.0072 8.46015L18.9563 8.81586C18.9537 8.83386 18.9446 8.85032 18.9308 8.86221C18.917 8.87411 18.8993 8.88065 18.881 8.88064Z" fill="white"/>
                                        <path d="M19.5722 8.23238H19.1608C19.1439 8.2322 19.1273 8.22827 19.1121 8.22086C19.0969 8.21346 19.0836 8.20277 19.0732 8.18958C19.0627 8.17639 19.0553 8.16104 19.0516 8.14465C19.0479 8.12826 19.0479 8.11125 19.0516 8.09487L19.1495 7.66606C19.1551 7.64131 19.1689 7.61917 19.1887 7.60321C19.2085 7.58725 19.2331 7.57841 19.2586 7.57812H19.67C19.6869 7.5783 19.7036 7.58223 19.7187 7.58964C19.7339 7.59705 19.7472 7.60774 19.7576 7.62092C19.7681 7.63411 19.7755 7.64946 19.7792 7.66585C19.7829 7.68224 19.7829 7.69925 19.7792 7.71563L19.6817 8.14481C19.676 8.16951 19.662 8.19159 19.6422 8.20747C19.6223 8.22336 19.5977 8.23213 19.5722 8.23238Z" fill="white"/>
                                        <path d="M20.2473 8.70003H19.925C19.9098 8.70006 19.8949 8.69682 19.8811 8.69052C19.8673 8.68423 19.8551 8.67503 19.8453 8.66356C19.8354 8.6521 19.8282 8.63864 19.8242 8.62413C19.8201 8.60962 19.8192 8.5944 19.8217 8.57952L19.8748 8.24516C19.8786 8.22064 19.8911 8.1983 19.9101 8.18217C19.929 8.16604 19.9531 8.15719 19.9781 8.15723H20.3004C20.3155 8.15719 20.3305 8.16043 20.3443 8.16673C20.358 8.17302 20.3702 8.18222 20.3801 8.19369C20.3899 8.20515 20.3971 8.21861 20.4012 8.23312C20.4053 8.24763 20.4061 8.26286 20.4037 8.27773L20.3509 8.61209C20.347 8.63661 20.3344 8.65892 20.3154 8.67503C20.2964 8.69114 20.2722 8.7 20.2473 8.70003Z" fill="white"/>
                                        <path d="M20.7362 8.13407H20.4842C20.4723 8.13412 20.4606 8.1316 20.4499 8.12669C20.4391 8.12178 20.4295 8.1146 20.4219 8.10564C20.4142 8.09669 20.4085 8.08618 20.4054 8.07484C20.4022 8.0635 20.4015 8.0516 20.4034 8.03998L20.4449 7.77871C20.4478 7.75954 20.4576 7.74205 20.4724 7.72944C20.4872 7.71682 20.5061 7.70991 20.5256 7.70996H20.7777C20.7895 7.70991 20.8013 7.71243 20.812 7.71734C20.8228 7.72225 20.8323 7.72943 20.84 7.73838C20.8477 7.74734 20.8533 7.75785 20.8565 7.76919C20.8597 7.78053 20.8604 7.79242 20.8585 7.80405L20.817 8.06531C20.814 8.08449 20.8043 8.10198 20.7894 8.11459C20.7746 8.12721 20.7558 8.13412 20.7362 8.13407Z" fill="white"/>
                                        <path d="M21.1215 8.44651H20.9633C20.9559 8.4465 20.9486 8.44489 20.9419 8.44179C20.9351 8.4387 20.9292 8.4342 20.9244 8.42859C20.9196 8.42299 20.916 8.41642 20.914 8.40933C20.912 8.40224 20.9116 8.3948 20.9127 8.38753L20.9386 8.22324C20.9405 8.21119 20.9467 8.20022 20.956 8.19232C20.9654 8.18442 20.9772 8.18011 20.9895 8.18018H21.1477C21.1552 8.18014 21.1625 8.18171 21.1693 8.18478C21.176 8.18785 21.1821 8.19234 21.1869 8.19795C21.1917 8.20356 21.1953 8.21016 21.1973 8.21727C21.1994 8.22439 21.1998 8.23186 21.1987 8.23916L21.1725 8.40345C21.1705 8.41546 21.1643 8.42639 21.1549 8.43428C21.1456 8.44216 21.1338 8.4465 21.1215 8.44651Z" fill="white"/>
                                        <path d="M17.0074 10.4542H16.2435C16.2254 10.4542 16.2075 10.4502 16.1911 10.4426C16.1746 10.435 16.1601 10.424 16.1484 10.4102C16.1367 10.3964 16.1282 10.3802 16.1235 10.3628C16.1187 10.3454 16.1179 10.3272 16.1209 10.3094L16.2588 9.52672C16.2639 9.49797 16.279 9.47192 16.3015 9.45318C16.324 9.43444 16.3524 9.42422 16.3818 9.42432H17.1456C17.1638 9.42432 17.1817 9.42826 17.1981 9.43586C17.2145 9.44347 17.2291 9.45455 17.2408 9.46834C17.2524 9.48212 17.261 9.49828 17.2657 9.51568C17.2704 9.53308 17.2713 9.5513 17.2682 9.56906L17.1304 10.3514C17.1253 10.3802 17.1102 10.4063 17.0877 10.4251C17.0652 10.4439 17.0368 10.4542 17.0074 10.4542Z" fill="white"/>
                                        <path d="M16.0191 11.3779H15.4138C15.3905 11.3779 15.3674 11.3728 15.3463 11.3631C15.3251 11.3533 15.3064 11.339 15.2914 11.3212C15.2764 11.3035 15.2654 11.2827 15.2594 11.2602C15.2533 11.2378 15.2523 11.2144 15.2563 11.1915L15.3654 10.5684C15.372 10.5316 15.3914 10.4982 15.4202 10.4742C15.449 10.4502 15.4854 10.437 15.523 10.437H16.1304C16.1537 10.437 16.1767 10.4421 16.1979 10.4519C16.219 10.4617 16.2377 10.476 16.2526 10.4938C16.2676 10.5115 16.2785 10.5323 16.2845 10.5547C16.2906 10.5771 16.2916 10.6005 16.2876 10.6234L16.1784 11.2465C16.1719 11.2837 16.1523 11.3173 16.1231 11.3413C16.0939 11.3654 16.057 11.3783 16.0191 11.3779Z" fill="white"/>
                                        <path d="M17.5209 11.2329H17.0211C17.0056 11.2326 16.9903 11.229 16.9763 11.2224C16.9623 11.2158 16.9499 11.2063 16.9399 11.1945C16.9299 11.1827 16.9225 11.1689 16.9182 11.1541C16.914 11.1393 16.913 11.1237 16.9152 11.1084L16.9985 10.6109C17.003 10.586 17.0161 10.5635 17.0355 10.5472C17.0549 10.5308 17.0794 10.5218 17.1048 10.5215H17.6046C17.6201 10.5218 17.6353 10.5254 17.6493 10.532C17.6634 10.5386 17.6758 10.5481 17.6858 10.5599C17.6958 10.5717 17.7032 10.5855 17.7074 10.6003C17.7117 10.6151 17.7127 10.6307 17.7104 10.646L17.6271 11.1435C17.6226 11.1684 17.6096 11.1909 17.5902 11.2072C17.5708 11.2236 17.5463 11.2326 17.5209 11.2329Z" fill="white"/>
                                        <path d="M18.2797 10.3644H17.7126C17.6987 10.3644 17.6849 10.3614 17.6722 10.3556C17.6595 10.3498 17.6482 10.3414 17.639 10.3309C17.6299 10.3204 17.6231 10.3081 17.6192 10.2948C17.6153 10.2814 17.6142 10.2674 17.6162 10.2537L17.6973 9.68772C17.7007 9.66464 17.7122 9.64352 17.7299 9.62823C17.7476 9.61295 17.7703 9.60452 17.7937 9.60449H18.3608C18.3748 9.60445 18.3886 9.60741 18.4014 9.61316C18.4141 9.61892 18.4254 9.62735 18.4346 9.63786C18.4437 9.64837 18.4505 9.66073 18.4544 9.67408C18.4583 9.68743 18.4593 9.70147 18.4572 9.71522L18.3761 10.2812C18.3728 10.3043 18.3612 10.3254 18.3435 10.3407C18.3258 10.356 18.3032 10.3644 18.2797 10.3644Z" fill="white"/>
                                        <path d="M18.7716 11.0159H18.4159C18.405 11.0159 18.3942 11.0136 18.3844 11.0091C18.3745 11.0046 18.3656 10.9981 18.3585 10.9899C18.3514 10.9817 18.3461 10.9721 18.343 10.9618C18.3399 10.9514 18.3391 10.9405 18.3406 10.9298L18.3919 10.5741C18.3943 10.5561 18.4033 10.5396 18.4171 10.5276C18.4309 10.5157 18.4485 10.5092 18.4668 10.5093H18.8226C18.8334 10.5093 18.8442 10.5116 18.8541 10.5161C18.864 10.5206 18.8728 10.5271 18.8799 10.5353C18.8871 10.5434 18.8924 10.553 18.8955 10.5634C18.8985 10.5738 18.8994 10.5847 18.8979 10.5954L18.8469 10.9511C18.8443 10.9691 18.8353 10.9856 18.8214 10.9975C18.8076 11.0094 18.7899 11.0159 18.7716 11.0159Z" fill="white"/>
                                        <path d="M19.4628 10.3671H19.0514C19.0345 10.367 19.0179 10.363 19.0027 10.3556C18.9876 10.3482 18.9742 10.3375 18.9638 10.3243C18.9533 10.3112 18.946 10.2958 18.9422 10.2794C18.9385 10.263 18.9385 10.246 18.9423 10.2296L19.0401 9.80082C19.0457 9.77608 19.0595 9.75393 19.0793 9.73797C19.0991 9.72201 19.1238 9.71317 19.1492 9.71289H19.5607C19.5776 9.71307 19.5942 9.717 19.6093 9.72441C19.6245 9.73181 19.6378 9.7425 19.6483 9.75569C19.6587 9.76888 19.6661 9.78423 19.6698 9.80062C19.6735 9.81701 19.6735 9.83402 19.6698 9.8504L19.5723 10.2796C19.5666 10.3043 19.5527 10.3264 19.5328 10.3422C19.513 10.3581 19.4883 10.3669 19.4628 10.3671Z" fill="white"/>
                                        <path d="M20.1379 10.8348H19.8156C19.8005 10.8348 19.7855 10.8316 19.7717 10.8253C19.758 10.819 19.7457 10.8098 19.7359 10.7983C19.7261 10.7869 19.7189 10.7734 19.7148 10.7589C19.7107 10.7444 19.7099 10.7292 19.7123 10.7143L19.7654 10.3799C19.7692 10.3554 19.7817 10.3331 19.8007 10.3169C19.8196 10.3008 19.8438 10.292 19.8687 10.292H20.191C20.2061 10.292 20.2211 10.2952 20.2349 10.3015C20.2486 10.3078 20.2609 10.317 20.2707 10.3285C20.2805 10.3399 20.2877 10.3534 20.2918 10.3679C20.2959 10.3824 20.2967 10.3976 20.2943 10.4125L20.2416 10.7469C20.2376 10.7714 20.225 10.7937 20.206 10.8098C20.187 10.8259 20.1628 10.8348 20.1379 10.8348Z" fill="white"/>
                                        <path d="M20.6269 10.2688H20.3748C20.3629 10.2689 20.3512 10.2664 20.3405 10.2615C20.3297 10.2565 20.3202 10.2494 20.3125 10.2404C20.3048 10.2315 20.2992 10.2209 20.296 10.2096C20.2928 10.1983 20.2921 10.1864 20.294 10.1747L20.3355 9.91348C20.3385 9.8943 20.3482 9.87682 20.363 9.8642C20.3779 9.85158 20.3967 9.84468 20.4163 9.84473H20.6683C20.6802 9.84468 20.6919 9.8472 20.7026 9.8521C20.7134 9.85701 20.7229 9.8642 20.7306 9.87315C20.7383 9.8821 20.7439 9.89262 20.7471 9.90396C20.7503 9.9153 20.751 9.92719 20.7491 9.93881L20.7076 10.2001C20.7047 10.2193 20.6949 10.2367 20.6801 10.2494C20.6652 10.262 20.6464 10.2689 20.6269 10.2688Z" fill="white"/>
                                        <path d="M21.0122 10.5818H20.8539C20.8465 10.5817 20.8392 10.5801 20.8325 10.577C20.8258 10.574 20.8198 10.5695 20.815 10.5638C20.8102 10.5582 20.8067 10.5517 20.8047 10.5446C20.8027 10.5375 20.8022 10.5301 20.8034 10.5228L20.8292 10.3585C20.8311 10.3464 20.8373 10.3355 20.8466 10.3276C20.856 10.3197 20.8679 10.3154 20.8801 10.3154H21.0383C21.0458 10.3154 21.0531 10.317 21.0599 10.32C21.0667 10.3231 21.0727 10.3276 21.0775 10.3332C21.0824 10.3388 21.0859 10.3454 21.088 10.3525C21.09 10.3596 21.0904 10.3671 21.0893 10.3744L21.0631 10.5387C21.0611 10.5507 21.0549 10.5616 21.0456 10.5695C21.0362 10.5774 21.0244 10.5818 21.0122 10.5818Z" fill="white"/>
                                        <path d="M3.6122 9.65381H2.36087C2.29317 9.65381 2.23828 9.70841 2.23828 9.77576V11.0206C2.23828 11.0879 2.29317 11.1425 2.36087 11.1425H3.6122C3.6799 11.1425 3.73479 11.0879 3.73479 11.0206V9.77576C3.73479 9.70841 3.6799 9.65381 3.6122 9.65381Z" fill="white"/>
                                        <path d="M2.71499 6.75049H2.06204C1.99434 6.75049 1.93945 6.80509 1.93945 6.87244V7.52199C1.93945 7.58934 1.99434 7.64394 2.06204 7.64394H2.71499C2.78269 7.64394 2.83757 7.58934 2.83757 7.52199V6.87244C2.83757 6.80509 2.78269 6.75049 2.71499 6.75049Z" fill="white"/>
                                        <path d="M8.02749 11.0684H7.37454C7.30684 11.0684 7.25195 11.123 7.25195 11.1903V11.8399C7.25195 11.9072 7.30684 11.9618 7.37454 11.9618H8.02749C8.09519 11.9618 8.15007 11.9072 8.15007 11.8399V11.1903C8.15007 11.123 8.09519 11.0684 8.02749 11.0684Z" fill="white"/>
                                        <path d="M3.38899 8.09033H2.96048C2.89277 8.09033 2.83789 8.14493 2.83789 8.21228V8.63856C2.83789 8.70591 2.89277 8.76051 2.96048 8.76051H3.38899C3.45669 8.76051 3.51157 8.70591 3.51157 8.63856V8.21228C3.51157 8.14493 3.45669 8.09033 3.38899 8.09033Z" fill="white"/>
                                        <path d="M1.29257 8.76025H0.938993C0.87129 8.76025 0.816406 8.81485 0.816406 8.8822V9.23394C0.816406 9.30129 0.87129 9.35589 0.938993 9.35589H1.29257C1.36027 9.35589 1.41515 9.30129 1.41515 9.23394V8.8822C1.41515 8.81485 1.36027 8.76025 1.29257 8.76025Z" fill="white"/>
                                        <path d="M1.816 9.65381H1.46243C1.39473 9.65381 1.33984 9.70841 1.33984 9.77576V10.1275C1.33984 10.1948 1.39473 10.2494 1.46243 10.2494H1.816C1.88371 10.2494 1.93859 10.1948 1.93859 10.1275V9.77576C1.93859 9.70841 1.88371 9.65381 1.816 9.65381Z" fill="white"/>
                                        <path d="M5.63313 9.13281H5.20462C5.13692 9.13281 5.08203 9.18741 5.08203 9.25476V9.68104C5.08203 9.74839 5.13692 9.80299 5.20462 9.80299H5.63313C5.70083 9.80299 5.75571 9.74839 5.75571 9.68104V9.25476C5.75571 9.18741 5.70083 9.13281 5.63313 9.13281Z" fill="white"/>
                                        <path d="M4.06086 11.7383H3.63235C3.56465 11.7383 3.50977 11.7929 3.50977 11.8602V12.2865C3.50977 12.3539 3.56465 12.4085 3.63235 12.4085H4.06086C4.12856 12.4085 4.18345 12.3539 4.18345 12.2865V11.8602C4.18345 11.7929 4.12856 11.7383 4.06086 11.7383Z" fill="white"/>
                                        </svg>
}
                        </span>
                      </div>

                      {/* Message content */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-medium">{msg.name}</span>
                          <span className="text-xs text-gray-500">{formatTimestamp(msg.timestamp)}</span>
                        </div>
                        <div className={`py-1.5 px-2.5 border border-gray-300 rounded-lg ${
                          msg.sender === 'user' 
                            ? 'bg-green-100 border-1 border-green-500' 
                            : 'bg-white'
                        }`}>
                          <p className="text-sm text-gray-800">{msg.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Show typing animation when bot is "typing" */}
                {isTyping && <TypingAnimation />}
              </div>
            )}
          </div>

          {/* Chat Input */}
         
                  


{currentChat && (
  <div className="flex-none border-t bg-white p-3">
    <div className="max-w-3xl mx-auto flex items-center gap-2 py-1.5 px-2 bg-white rounded-full border border-gray-200">
      {/* Attachment Button */}
      <div className="relative">
        <button 
          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors duration-200"
          onClick={(e) => {
            e.stopPropagation();
            setShowFileOptions(!showFileOptions);
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/>
          </svg>
        </button>
        
        {/* File Options Dropdown */}
        {showFileOptions && (
          <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 w-64">
            <button className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 text-left">
              <img src="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg" alt="Google Drive" className="w-5 h-5" />
              <span className="text-sm text-gray-700">Add From Google Drive</span>
            </button>
            <button className="w-full px-4 py-2 flex items-center gap-3 hover:bg-gray-50 text-left">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-600">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              <span className="text-sm text-gray-700">Upload From Computer</span>
            </button>
          </div>
        )}
      </div>

      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
        placeholder="Customize visualizations to tell your story."
        className="flex-1 px-3 py-1.5 bg-transparent focus:outline-none text-sm"
      />
      <button 
        onClick={handleChatSubmit}
        className="p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-200"
      >
        <Send size={16} />
      </button>
    </div>
  </div>
)}
        </div>
      </div>

      {/* Saved Charts Drawer */}
      <SavedChartsDrawer />
    </div>
  );
};

export default Explore;