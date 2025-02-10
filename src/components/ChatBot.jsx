
// ----------------------------> final code

import React, { useState, useEffect, useRef } from "react";
import { Button, message, Input, Form, Select, Row, Col } from "antd";
import Modal from 'react-bootstrap/Modal';
import { DownloadOutlined, SelectOutlined, SendOutlined } from "@ant-design/icons";
import EditableTable from "../containers/Mlops-Solution/Visualization/EditableTable";
import SurveyChart from "./Charts";
import { BaseUrl, URIS } from "../services/apis/apis";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../utils";
import chatbot from "../assets/images/chatbot.png";

const ChatBot = () => {

    const navigate = useNavigate();
    const [cookies] = useCookies();
    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [uploadFileShow, setUploadFileShow] = useState(false);
    const [selectDatasetVisible, setSelectDatasetVisible] = useState(false);    
    const [allDatasets,setAllDatasets] = useState([]);
    const [nextStage,setNextStage] = useState("Initial");
    const [allStreams,setAllStreams] = useState(null);
    const [streamId,setStreamId] = useState(null);
    const [currentDatasetId,setCurrentDatasetId] = useState(null);
    const chatContainerRef = useRef(null);

    useEffect(()=>{
        fetchAllDataSets();
        _fetchAllStreams();
    },[])

    useEffect(()=>{

        if(allStreams && streamId === null){
            let stream_id = 0;
            let lastStream = allStreams?.[allStreams?.length-1];
            let lastStreamId = lastStream?.id ? parseInt(lastStream.id) : 0;
            if(lastStreamId>0){
                stream_id= lastStreamId+1;
            }
            else{
                stream_id=1;
            }

            if(stream_id===1){
                _createNewStream(stream_id);
            }
            else{
                setStreamId(lastStreamId)
            }
        }
        
    },[allStreams])

    useEffect(()=>{
        if(streamId && nextStage==="Initial"){
            _fetchChatbotResponse("Initial",null,"")
        }
    },[streamId])

    const fetchAllDataSets = async () => {
        try {
            const response = await fetch(`${BaseUrl}${URIS.ALL_DATASETS}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${cookies.access_token}`
                },
            });

            if(response?.details==="Could not validate credentials"){
                navigate("/login");
            }

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            let data = await response.text();
            data = JSON.parse(data);
            if(data?.length>0){
                setAllDatasets(data);
            }
            else{
                setAllDatasets([]);
                message.warning("No datasets found")
            }
        } catch (err) {
            console.error("Fetch Error:", err.message);
            message.warning("Something went wrong!");
            setAllDatasets([]);
        }
    };

    const _resetChatToUpload = () =>{
        let updatedChat = [];

        for(let i=0;i<=chatHistory?.length;i++){

            if(chatHistory[i]?.widget?.type){
                updatedChat.push(chatHistory[i]);
                break;
            }
            else{
                updatedChat.push(chatHistory[i]);
            }
        }
        setChatHistory(updatedChat);
    }

    const _fetchChatbotResponse = async (stage,dataset_id,user_message,bypass) =>{
        let payload = {
            stage,
            dataset_id,
            user_message,
            "bypass": bypass || false,
            "type": "ai"
            }
        if(stage && streamId){
            const response = await apiCall("POST",URIS.AI_MESSAGE+streamId,payload,cookies?.access_token);

            if(Array.isArray(response)){
                showMessages(response,dataset_id);
            }
            else{
                message.warning("Something went wrong!");
            }
        }
        else{
            message.warning("Something went wrong!");
        }
     
        setSelectDatasetVisible(false);

    }

    const _fetchAllStreams = async() =>{
        const response = await apiCall("GET",URIS.AI_STREAM,null,cookies?.access_token);
        if(Array.isArray(response)){
            setAllStreams(response)
        }else{
            setAllStreams(null)
        }
    }
    const _createNewStream = async(stream_id) => {
        const response = await apiCall("POST",URIS.AI_STREAM+"/"+stream_id,null,cookies?.access_token);
        if(Array.isArray(response)){
            setStreamId(stream_id);
        }else{
            message.warning("Something went wrong!")
        }
    }
    
    const _byPassIndustry = (dataset_id) =>{
        if(dataset_id){
            _fetchChatbotResponse("industry_update",dataset_id,"",true)
        }
        else{
            message.warning("Select a dataset first!")
        }
    }


//     const showMessages = (dataArray, dataset_id) => {
//     if (dataset_id) {
//         setCurrentDatasetId(dataset_id);
//     }

//     if (Array.isArray(dataArray)) {
//         const nextStageObj = dataArray.find(item => item.hasOwnProperty("next_stage"))?.next_stage;
//         if (nextStageObj?.length > 0) {
//             setNextStage(nextStageObj);
//         }

//         // Create a single message object to combine all related content
//         let combinedMessage = {
//             sender: "bot",
//             text: [],
//             widget: null  // Changed from widgets array to single widget
//         };

//         dataArray.forEach((data) => {
//             if (data?.type === "text") {
//                 combinedMessage.text.push(data.message);
//             }
//             // Handle the buttons widget case
//             else if (data?.type === "button" && data?.message === "upload") {
//                 combinedMessage.widget = (
//                     <div className="flex items-center gap-4 mt-4">
//                         <Button 
//                             icon={<SelectOutlined style={{color:"#3C6BEB", fontSize:"18px"}} />} 
//                             onClick={() => setSelectDatasetVisible(true)}
//                             className="border border-[#3C6BEB] text-[#3C6BEB] px-3 py-2 h-auto bg-[#3C6BEB0D]"
//                         >
//                             Select Data
//                         </Button>
//                         <Button 
//                             icon={<DownloadOutlined style={{color:"#3C6BEB", fontSize:"18px"}} />} 
//                             onClick={() => setUploadFileShow(true)}
//                             className="border border-[#3C6BEB] text-[#3C6BEB] px-3 py-2 h-auto bg-[#3C6BEB0D]"
//                         >
//                             Import Data
//                         </Button>
//                     </div>
//                 );
//             }
//             // Handle other widget types...
//             else if (data?.type === "table") {
//                 const tableColumns = Object.keys(data?.dataset)?.map((key) => ({
//                     title: key,
//                     dataIndex: key,
//                     key: key,
//                 }));
//                 combinedMessage.widget = <TableWidget columns={tableColumns} data={data?.dataset} />;
//             }
//             else if (data?.type === "button" && data?.message === "continue") {
//                 combinedMessage.widget = (
//                     <Button type="primary" onClick={() => _fetchChatbotResponse(nextStageObj, dataset_id, "", true)}>
//                         Continue
//                     </Button>
//                 );
//             }
//             else if (data?.type === "select") {
//                 combinedMessage.widget = (
//                     <Form onFinish={(formdata) => _fetchChatbotResponse("target_set", dataset_id, formdata.target, false)}>
//                         <Row>
//                             <Form.Item name="target" style={{margin: "0"}}>
//                                 <Select style={{minWidth: 200, maxWidth: "100%"}} placeholder="Select target">
//                                     {data?.action?.length > 0 ?
//                                         data.action.map(action => (
//                                             <Select.Option key={action?.name} value={action?.name}>{action?.name}</Select.Option>
//                                         ))
//                                         : null
//                                     }
//                                 </Select>
//                             </Form.Item>
//                             <Form.Item style={{margin: "0 0 0 10px"}}>
//                                 <Button type="primary" htmlType="submit">Submit</Button>
//                             </Form.Item>
//                         </Row>
//                     </Form>
//                 );
//             }
//             else if (data?.type === "details") {
//                 combinedMessage.widget = (
//                     <div style={{maxHeight: "400px", overflowY: "auto"}}>
//                         {data?.dataset?.map((item, index) => (
//                             <Row key={index}>
//                                 <Col span={4}>
//                                     <p style={{fontWeight: 500}}>{item?.name}</p>
//                                 </Col>
//                                 <Col span={1}>
//                                     <p>:</p>
//                                 </Col>
//                                 <Col span={19}>
//                                     <p>{item?.feature_use}</p>
//                                 </Col>
//                             </Row>
//                         ))}
//                     </div>
//                 );
//             }
//         });

//         // Add the combined message to chat history if it has content
//         if (combinedMessage.text.length > 0 || combinedMessage.widget) {
//             setChatHistory(prev => [...prev, combinedMessage]);
//         }
//     } else {
//         message.warning("Invalid Data!");
//     }
// };


    //     const showMessages = (dataArray,dataset_id) =>{

    //     if(dataset_id){
    //         setCurrentDatasetId(dataset_id)
    //     }

    //     if(Array.isArray(dataArray)){
    //         const nextStageObj = dataArray.find(item => item.hasOwnProperty("next_stage"))?.next_stage;
    //         if(nextStageObj?.length>0){
    //             setNextStage(nextStageObj);
    //         }
    //         dataArray.forEach((data)=>{

    //             if(data?.type==="text"){
    //                 setChatHistory((prev) => [...prev, { sender: "bot", text:data?.message }]);
    //             }
    //             else if(data?.type==="table"){
    //                 const tableColumns = Object.keys(data?.dataset)?.map((key) => ({
    //                     title: key,
    //                     dataIndex: key,
    //                     key: key,
    //                 }));
    //                 addBotMessage("",<TableWidget columns={tableColumns} data={data?.dataset} />);
    //             }
    //             else if(data?.type==="button" && data?.message==="continue"){
    //                 addBotMessage("",<Button type="primary"  onClick={()=> _fetchChatbotResponse(nextStageObj,dataset_id,"",true)}>Continue</Button>);
    //             }
    //             else if(data?.type==="button" && data?.message==="upload"){
    //                 addBotMessage("",
    //                     <div style={{display:"flex",alignItems:"center",gap:"15px"}}>
    //                         <Button
    //                             icon={<SelectOutlined style={{color:"#3C6BEB",fontSize:"18px"}} />}
    //                             onClick={()=>setSelectDatasetVisible(true)}
    //                             style={{border:"1px solid #3C6BEB",color:"#3C6BEB",padding:"8px 12px",height:"auto",background:"#3C6BEB0D"}}
    //                             >
    //                                 Select Data
    //                         </Button>
    //                         <Button
    //                             icon={<DownloadOutlined style={{color:"#3C6BEB",fontSize:"18px"}} />}
    //                             onClick={()=>setUploadFileShow(true)}
    //                             style={{border:"1px solid #3C6BEB",color:"#3C6BEB",padding:"8px 12px",height:"auto",background:"#3C6BEB0D"}}
    //                             >
    //                                 Import Data
    //                         </Button>
    //                     </div>
    //                     )
    //                 ;
    //             }
    //             else if(data?.type==="select"){
    //                 addBotMessage("",
    //                     <Form onFinish={(formdata)=>_fetchChatbotResponse("target_set",dataset_id,formdata.target,false)}>
    //                         <Row>
    //                             <Form.Item name="target" style={{margin:"0"}}>
    //                                 <Select style={{minWidth:200,maxWidth:"100%"}} placeholder="Select target" >
    //                                     {
    //                                         data?.action?.length>0 ?
    //                                             data.action.map(action=>(
    //                                                 <Select.Option key={action?.name} value={action?.name}>{action?.name}</Select.Option>
    //                                             ))
    //                                         :null
    //                                     }
    //                                 </Select>
    //                             </Form.Item>
    //                             <Form.Item style={{margin:"0 0 0 10px"}}>
    //                                 <Button type="primary" htmlType="submit">Submit</Button>
    //                             </Form.Item>
    //                         </Row>

    //                     </Form>
    //             );
    //             }
    //             else if(data?.type==="details"){
    //               console.log("JSON :",data?.dataset)
    //               let detailsWidget =      <div style={{maxHeight:"400px",overflowY:"auto"}}>
    //               {data?.dataset?.map((item, index) => (
    //                 <Row key={index}>
    //                     <Col span={4}>
    //                     <p style={{fontWeight:500}}>{item?.name}</p>
    //                     </Col>
    //                     <Col span={1}>
    //                     <p>:</p>
    //                     </Col>
    //                     <Col span={19}>
    //                          <p>{item?.feature_use}</p>
    //                     </Col>
    //                 </Row>
                         
    //               ))}
    //             </div>
    //             addBotMessage("",detailsWidget);

    //             }
                
    //         })
    //     }
    //     else{
    //         message.warning("Invalid Data!")
    //     }
    // }

// const showMessages = (dataArray, dataset_id) => {
//     if (dataset_id) {
//         setCurrentDatasetId(dataset_id)
//     }

//     if (Array.isArray(dataArray)) {
//         const nextStageObj = dataArray.find(item => item.hasOwnProperty("next_stage"))?.next_stage;
//         if (nextStageObj?.length > 0) {
//             setNextStage(nextStageObj);
//         }

//         let combinedMessage = {
//             sender: "bot",
//             text: [],
//             widgets: []
//         };

//         dataArray.forEach((data) => {
//             if (data?.type === "text") {
//                 combinedMessage.text.push(data?.message);
//             }
//             else if (data?.type === "table") {
//                 const tableColumns = Object.keys(data?.dataset)?.map((key) => ({
//                     title: key,
//                     dataIndex: key,
//                     key: key,
//                 }));
//                 combinedMessage.widgets.push(
//                     <TableWidget 
//                         key={`table-${Date.now()}`} 
//                         columns={tableColumns} 
//                         data={data?.dataset} 
//                     />
//                 );
//             }
//             else if (data?.type === "button" && data?.message === "continue") {
//                 combinedMessage.widgets.push(
//                     <Button 
//                         key={`continue-${Date.now()}`}
//                         type="primary" 
//                         onClick={() => _fetchChatbotResponse(nextStageObj, dataset_id, "", true)}
//                     >
//                         Continue
//                     </Button>
//                 );
//             }
//             else if (data?.type === "button" && data?.message === "upload") {
//                 combinedMessage.widgets.push(
//                     <div 
//                         key={`upload-${Date.now()}`} 
//                         style={{display: "flex", alignItems: "center", gap: "15px"}}
//                     >
//                         <Button
//                             icon={<SelectOutlined style={{color: "#3C6BEB", fontSize: "18px"}} />}
//                             onClick={() => setSelectDatasetVisible(true)}
//                             style={{
//                                 border: "1px solid #3C6BEB",
//                                 color: "#3C6BEB",
//                                 padding: "8px 12px",
//                                 height: "auto",
//                                 background: "#3C6BEB0D"
//                             }}
//                         >
//                             Select Data
//                         </Button>
//                         <Button
//                             icon={<DownloadOutlined style={{color: "#3C6BEB", fontSize: "18px"}} />}
//                             onClick={() => setUploadFileShow(true)}
//                             style={{
//                                 border: "1px solid #3C6BEB",
//                                 color: "#3C6BEB",
//                                 padding: "8px 12px",
//                                 height: "auto",
//                                 background: "#3C6BEB0D"
//                             }}
//                         >
//                             Import Data
//                         </Button>
//                     </div>
//                 );
//             }
//             else if (data?.type === "select") {
//                 combinedMessage.widgets.push(
//                     <Form 
//                         key={`select-${Date.now()}`}
//                         onFinish={(formdata) => _fetchChatbotResponse("target_set", dataset_id, formdata.target, false)}
//                     >
//                         <Row>
//                             <Form.Item name="target" style={{margin: "0"}}>
//                                 <Select style={{minWidth: 200, maxWidth: "100%"}} placeholder="Select target">
//                                     {data?.action?.length > 0 ?
//                                         data.action.map(action => (
//                                             <Select.Option key={action?.name} value={action?.name}>
//                                                 {action?.name}
//                                             </Select.Option>
//                                         ))
//                                         : null
//                                     }
//                                 </Select>
//                             </Form.Item>
//                             <Form.Item style={{margin: "0 0 0 10px"}}>
//                                 <Button type="primary" htmlType="submit">Submit</Button>
//                             </Form.Item>
//                         </Row>
//                     </Form>
//                 );
//             }
//             // else if (data?.type === "details") {
//             //     combinedMessage.widgets.push(
//             //         <div key={`details-${Date.now()}`} style={{maxHeight: "400px", overflowY: "auto"}}>
//             //             {data?.dataset?.map((item, index) => (
//             //                 <Row key={index}>
//             //                     <Col span={4}>
//             //                         <p style={{fontWeight: 500}}>{item?.name}</p>
//             //                     </Col>
//             //                     <Col span={1}>
//             //                         <p>:</p>
//             //                     </Col>
//             //                     <Col span={19}>
//             //                         <p>{item?.feature_use}</p>
//             //                     </Col>
//             //                 </Row>
//             //             ))}
//             //         </div>
//             //     );
//             // }


// //             else if (data?.type === "details") {
// //     combinedMessage.widgets.push(
// //         <div key={`details-${Date.now()}`} 
// //             style={{
// //                 maxHeight: "400px", 
// //                 overflowY: "auto",
// //                 background: "#fff",
// //                 padding: "16px",
// //                 borderRadius: "8px",
// //             }}>
// //             {data?.dataset?.map((item, index) => (
// //                 <Row 
// //                     key={index} 
// //                     style={{
// //                         padding: "8px 0",
// //                         borderBottom: "1px solid #f0f0f0",
// //                         alignItems: "center"
// //                     }}
// //                 >
// //                     <Col span={8}>
// //                         <p style={{
// //                             margin: 0,
// //                             fontWeight: 500,
// //                             color: "#3C6BEB"
// //                         }}>
// //                             {item?.name}
// //                         </p>
// //                     </Col>
// //                     <Col span={16}>
// //                         <p style={{
// //                             margin: 0,
// //                             color: "#333"
// //                         }}>
// //                             {item?.feature_use}
// //                         </p>
// //                     </Col>
// //                 </Row>
// //             ))}
// //         </div>
// //     );
//             // }
            
//             else if (data?.type === "shape") {
//     const [rows, columns] = data.message[0];
//     combinedMessage.widgets.push(
//         <div key={`shape-${Date.now()}`} 
//             style={{
//                 background: "#fff",
//                 padding: "16px",
//                 borderRadius: "8px",
//                 border: "1px solid #f0f0f0"
//             }}>
//             <Row gutter={16}>
//                 <Col span={12}>
//                     <div style={{
//                         padding: "5px",
//                         textAlign: "center",
//                         background: "#f8f9fa",
//                         borderRadius: "6px"
//                     }}>
//                         <div style={{color: "#666", marginBottom: "4px"}}>Total Columns</div>
//                         <div style={{fontSize: "18px", fontWeight: "600", color: "#3C6BEB"}}>{columns}</div>
//                     </div>
//                 </Col>
//                 <Col span={12}>
//                     <div style={{
//                         padding: "5px",
//                         textAlign: "center",
//                         background: "#f8f9fa",
//                         borderRadius: "6px"
//                     }}>
//                         <div style={{color: "#666", marginBottom: "4px"}}>Total Rows</div>
//                         <div style={{fontSize: "18px", fontWeight: "600", color: "#3C6BEB"}}>{rows}</div>
//                     </div>
//                 </Col>
//             </Row>
//         </div>
//     );
//             }
                
                
// // else if (data?.type === "details") {
// //     combinedMessage.widgets.push(
// //         <div key={`details-${Date.now()}`} 
// //             style={{
// //                 maxHeight: "400px", 
// //                 overflowY: "auto",
// //                 background: "#fff",
// //                 padding: "16px 20px",
// //                 borderRadius: "8px",
// //                 border: "1px solid #f0f0f0"
// //             }}>
// //             {data?.dataset?.map((item, index) => (
// //                 <Row 
// //                     key={index} 
// //                     style={{
// //                         padding: "10px 0",
// //                         borderBottom: index < data.dataset.length - 1 ? "1px solid #f0f0f0" : "none",
// //                         alignItems: "center",
// //                         background: index % 2 === 0 ? '#fafafa' : '#fff',
// //                         margin: 0,
// //                         borderRadius: "4px"
// //                     }}
// //                 >
// //                     <Col span={8}>
// //                         <div style={{
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             gap: '8px'
// //                         }}>
// //                             <span style={{
// //                                 margin: 0,
// //                                 fontWeight: 500,
// //                                 color: "#3C6BEB"
// //                             }}>
// //                                 {item?.name}
// //                             </span>
// //                             <span style={{
// //                                 fontSize: '12px',
// //                                 padding: '2px 8px',
// //                                 background: '#f0f7ff',
// //                                 borderRadius: '12px',
// //                                 color: '#3C6BEB'
// //                             }}>
// //                                 {item?.dtype}
// //                             </span>
// //                         </div>
// //                     </Col>
// //                     <Col span={16}>
// //                         <div style={{
// //                             display: 'flex',
// //                             alignItems: 'center'
// //                         }}>
// //                             <span style={{
// //                                 margin: 0,
// //                                 color: "#333"
// //                             }}>
// //                                 {item?.feature_use}
// //                             </span>
// //                             {item?.is_categorical && (
// //                                 <span style={{
// //                                     fontSize: '12px',
// //                                     padding: '2px 8px',
// //                                     background: '#e6f4ff',
// //                                     borderRadius: '12px',
// //                                     color: '#1677ff',
// //                                     marginLeft: '8px'
// //                                 }}>
// //                                     categorical
// //                                 </span>
// //                             )}
// //                         </div>
// //                     </Col>
// //                 </Row>
// //             ))}
// //         </div>
// //     );
//             // }
            
//             else if (data?.type === "details") {
//     combinedMessage.widgets.push(
//         <div key={`details-${Date.now()}`} 
//             style={{
//                 maxHeight: "400px", 
//                 overflowY: "auto",
//                 background: "#fff",
//                 padding: "16px 20px",
//                 borderRadius: "8px",
//                 border: "1px solid #f0f0f0"
//             }}>
//             {/* Header Row */}
//             <Row 
//                 style={{
//                     padding: "12px 0",
//                     background: "#fafafa",
//                     borderBottom: "2px solid #e8e8e8",
//                     marginBottom: "8px",
//                     fontWeight: 600,
//                     color: "#333",
//                     margin: 0,
//                     borderRadius: "4px"
//                 }}
//             >
//                 <Col span={8}>
//                     <span className="ml-[10px]">Feature</span>
//                 </Col>
//                 <Col span={16}>
//                     <span className="ml-[30px]">Feature Use</span>
//                 </Col>
//             </Row>

//             {/* Data Rows */}
//             {data?.dataset?.map((item, index) => (
//                 <Row 
//                     key={index} 
//                     style={{
//                         padding: "10px 0",
//                         borderBottom: index < data.dataset.length - 1 ? "1px solid #f0f0f0" : "none",
//                         alignItems: "center",
//                         background: index % 2 === 0 ? '#fafafa' : '#fff',
//                         margin: 0,
//                         borderRadius: "4px"
//                     }}
//                 >
//                     <Col span={8}>
//                         <div style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '8px'
//                         }}>
//                             <span style={{
//                                 marginLeft: '10px',
//                                 fontWeight: 500,
//                                 color: "#3C6BEB"
//                             }}>
//                                 {item?.name}
//                             </span>
//                             <span style={{
//                                 fontSize: '12px',
//                                 padding: '2px 8px',
//                                 background: '#DCFCE6',
//                                 borderRadius: '12px',
//                                 color: '#166434'
//                             }}>
//                                 {item?.dtype}
//                             </span>
//                         </div>
//                     </Col>
//                     <Col span={16}>
//                         <div style={{
//                             display: 'flex',
//                             alignItems: 'center'
//                         }}>
//                             <span style={{
//                                 marginLeft: "30px",
//                                 color: "#333"
//                             }}>
//                                 {item?.feature_use}
//                             </span>
//                             {/* {item?.is_categorical && (
//                                 <span style={{
//                                     fontSize: '12px',
//                                     padding: '2px 8px',
//                                     background: '#e6f4ff',
//                                     borderRadius: '12px',
//                                     color: '#1677ff',
//                                     marginLeft: '8px'
//                                 }}>
//                                     categorical
//                                 </span>
//                             )} */}
//                         </div>
//                     </Col>
//                 </Row>
//             ))}
//         </div>
//     );
// }
//         });

//         // Add the combined message to chat history with increased spacing
//         setChatHistory(prev => [...prev, {
//             sender: "bot",
//             text: combinedMessage.text.length > 0 ? (
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
//                     {combinedMessage.text.map((message, index) => (
//                         <div key={index} className="text-[15px]">{message}</div>
//                     ))}
//                 </div>
//             ) : "",
//             widget: combinedMessage.widgets.length > 0 ? (
//                 <div style={{ 
//                     display: "flex", 
//                     flexDirection: "column", 
//                     gap: "16px", 
//                     marginTop: combinedMessage.text.length > 0 ? "16px" : "0" 
//                 }}>
//                     {combinedMessage.widgets.map((widget, index) => (
//                         <div key={index}>{widget}</div>
//                     ))}
//                 </div>
//             ) : null
//         }]);
//     } else {
//         message.warning("Invalid Data!")
//     }
// }

    
    const showMessages = (dataArray, dataset_id) => {
    if (dataset_id) {
        setCurrentDatasetId(dataset_id)
    }

    if (Array.isArray(dataArray)) {
        const nextStageObj = dataArray.find(item => item.hasOwnProperty("next_stage"))?.next_stage;
        if (nextStageObj?.length > 0) {
            setNextStage(nextStageObj);
        }

        // Create an array to store elements in order
        let orderedElements = [];

        // Process each element in the array order
        dataArray.forEach((data) => {
            if (data?.type === "text") {
                orderedElements.push({
                    type: 'text',
                    content: <div className="text-[15px]">{data.message}</div>
                });
            }
            else if (data?.type === "table") {
                const tableColumns = Object.keys(data?.dataset)?.map((key) => ({
                    title: key,
                    dataIndex: key,
                    key: key, 
                }));
                orderedElements.push({
                    type: 'widget',
                    content: <TableWidget columns={tableColumns} data={data?.dataset} />
                });
            }
            else if (data?.type === "button" && data?.message === "continue") {
                orderedElements.push({
                    type: 'widget',
                    content: (
                        <Button type="primary" onClick={() => _fetchChatbotResponse(nextStageObj, dataset_id, "", true)}>
                            Continue
                        </Button>
                    )
                });
            }
            else if (data?.type === "button" && data?.message === "upload") {
                orderedElements.push({
                    type: 'widget',
                    content: (
                        <div style={{display:"flex", alignItems:"center", gap:"15px"}}>
                            <Button 
                                icon={<SelectOutlined style={{color:"#3C6BEB", fontSize:"18px"}} />} 
                                onClick={() => setSelectDatasetVisible(true)}
                                style={{border:"1px solid #3C6BEB", color:"#3C6BEB", padding:"8px 12px", height:"auto", background:"#3C6BEB0D"}}
                            >
                                Select Data
                            </Button>
                            <Button 
                                icon={<DownloadOutlined style={{color:"#3C6BEB", fontSize:"18px"}} />} 
                                onClick={() => setUploadFileShow(true)}
                                style={{border:"1px solid #3C6BEB", color:"#3C6BEB", padding:"8px 12px", height:"auto", background:"#3C6BEB0D"}}
                            >
                                Import Data
                            </Button>
                        </div>
                    )
                });
            }
            else if (data?.type === "select") {
                orderedElements.push({
                    type: 'widget',
                    content: (
                        <Form onFinish={(formdata) => _fetchChatbotResponse("target_set", dataset_id, formdata.target, false)}>
                            <Row>
                                <Form.Item name="target" style={{margin:"0"}}>
                                    <Select style={{minWidth:200, maxWidth:"100%"}} placeholder="Select target">
                                        {data?.action?.length > 0 ?
                                            data.action.map(action => (
                                                <Select.Option key={action?.name} value={action?.name}>{action?.name}</Select.Option>
                                            ))
                                            : null
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item style={{margin:"0 0 0 10px"}}>
                                    <Button type="primary" htmlType="submit">Submit</Button>
                                </Form.Item>
                            </Row>
                        </Form>
                    )
                });
            }
            else if (data?.type === "shape") {
                orderedElements.push({
                    type: 'widget',
                    content: (
                        <div style={{
                            background: "#fff",
                            padding: "16px",
                            borderRadius: "8px",
                            border: "1px solid #f0f0f0"
                        }}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <div style={{
                                        padding: "5px",
                                        textAlign: "center",
                                        background: "#f8f9fa",
                                        borderRadius: "6px"
                                    }}>
                                        <div style={{color: "#666", marginBottom: "4px"}}>Total Columns</div>
                                        <div style={{fontSize: "18px", fontWeight: "600", color: "#3C6BEB"}}>{data.message[0][1]}</div>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div style={{
                                        padding: "5px",
                                        textAlign: "center",
                                        background: "#f8f9fa",
                                        borderRadius: "6px"
                                    }}>
                                        <div style={{color: "#666", marginBottom: "4px"}}>Total Rows</div>
                                        <div style={{fontSize: "18px", fontWeight: "600", color: "#3C6BEB"}}>{data.message[0][0]}</div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )
                });
            }
            else if (data?.type === "details") {
                orderedElements.push({
                    type: 'widget',
                    content: (
                        <div style={{
                            maxHeight: "400px", 
                            overflowY: "auto",
                            background: "#fff",
                            padding: "16px 20px",
                            borderRadius: "8px",
                            border: "1px solid #f0f0f0"
                        }}>
                            <Row style={{
                                padding: "12px 0",
                                background: "#fafafa",
                                borderBottom: "2px solid #e8e8e8",
                                marginBottom: "8px",
                                fontWeight: 600,
                                color: "#333",
                                margin: 0,
                                borderRadius: "4px"
                            }}>
                                <Col span={8}>
                                    <span className="ml-[10px]">Feature</span>
                                </Col>
                                <Col span={16}>
                                    <span className="ml-[30px]">Feature Use</span>
                                </Col>
                            </Row>
                            {data?.dataset?.map((item, index) => (
                                <Row key={index} style={{
                                    padding: "10px 0",
                                    borderBottom: index < data.dataset.length - 1 ? "1px solid #f0f0f0" : "none",
                                    alignItems: "center",
                                    background: index % 2 === 0 ? '#fafafa' : '#fff',
                                    margin: 0,
                                    borderRadius: "4px"
                                }}>
                                    <Col span={8}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}>
                                            <span style={{
                                                marginLeft: '10px',
                                                fontWeight: 500,
                                                color: "#3C6BEB"
                                            }}>
                                                {item?.name}
                                            </span>
                                            <span style={{
                                                fontSize: '12px',
                                                padding: '2px 8px',
                                                background: '#DCFCE6',
                                                borderRadius: '12px',
                                                color: '#166434'
                                            }}>
                                                {item?.dtype}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col span={16}>
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <span style={{
                                                marginLeft: "30px",
                                                color: "#333"
                                            }}>
                                                {item?.feature_use}
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                            ))}
                        </div>
                    )
                });
            }
        });

        // Add a single message with all elements in order
        setChatHistory(prev => [...prev, {
            sender: "bot",
            widget: (
                <div style={{ 
                    display: "flex", 
                    flexDirection: "column", 
                    gap: "5px"
                }}>
                    {orderedElements.map((element, index) => (
                        <div key={index}>{element.content}</div>
                    ))}
                </div>
            )
        }]);
    } else {
        message.warning("Invalid Data!")
    }
}

    const addBotMessage = (text, widget = null, type) => {
        if(type ==="new data"){
            setChatHistory([{ sender: "bot", text, widget,type }]);
        }
        else{
            setChatHistory((prev) => [...prev, { sender: "bot", text, widget,type }]);
        }
    };

    const handleChatSubmit = () => {
        if (!userInput.trim()) return;
        const userMessage = { sender: "user", text: userInput };
        setChatHistory((prev) => [...prev, userMessage]);

        if(nextStage!=="Initial" && currentDatasetId){
            _fetchChatbotResponse(nextStage,currentDatasetId,userInput,false)
        }
        else if (userInput.toLowerCase().includes("hi")) {
            addBotMessage("Hello! How can I assist you?");
        } else {
            addBotMessage(
                "I am here to help. You can upload a file or ask about functions."
            );
        }

        setUserInput("");
    };

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, [chatHistory]);   

    const handleFunctionClick = (funcName) =>{
        console.log("function Name : ",funcName)
    }

    return (
        <div
            style={{
                height: "94vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#F3F3F3",
                // backgroundColor: "black",
                
                
                
            }}
            className="border border-gray-200 rounded-lg"

        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-white border-gray-200 rounded-t-lg h-20">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-white overflow-hidden">
                        <img 
                            src={chatbot} 
                            alt="chat" 
                            className="w-12 h-12 rounded-full object-cover object-center"
                        />
                    </div>
                        <div className="leading-tight">
                            <h2 className="text-lg text-blue-600 font-semibold mb-0">Datasaki</h2>
                            <span className="text-md  text-green-500"><span className="text-md font-extrabold text-green-500">•</span> Your Datascience Chatbot</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div
                className="chatboxChat"
                ref={chatContainerRef}
                style={{
                    flex: 1,
                    padding: 20,
                    overflowY: "auto",
                    backgroundColor: "#F3F3F3",
                    // borderRadius: "10px",
                    // boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    marginBottom:"10px"
                }}
            >
                {chatHistory?.map((msg, idx) => (
                    <div key={idx} style={{ marginBottom: 10 }}>
                        {msg.sender === "bot" && (
                            <BotMessage
                                text={msg?.text}
                                functions={msg?.functions}
                                widget={msg.widget}
                                onFunctionClick={handleFunctionClick}
                            />
                        )}
                        {msg.sender === "user" && <UserMessage text={msg.text} />}
                    </div>
                ))}
            </div>
            <div
                // style={{
                //     padding: "10px",
                //     backgroundColor: "white",
                //     borderTop: "1px solid #ddd",
                //     borderBottom: "1px solid #ddd",
                //     borderLeft: "1px solid #ddd",
                //     borderRight: "1px solid #ddd",
                //     display: "flex",
                //     alignItems: "center",
                // }}
                className="p-3 bg-white border border-gray-200 rounded-b-lg flex items-center"
            >
                <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onPressEnter={handleChatSubmit}
                    placeholder="Type your message"
                    style={{ flex: 1, border:"none"}}
                />
                <Button
                    onClick={handleChatSubmit}
                    style={{ marginLeft: 10, border: "none" }}
                >
                    <svg width="30" height="30" viewBox="0 0 42 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.6217 16.1017L16.6417 8.255C6.57924 2.975 2.44924 7.30167 7.48924 17.8433L9.01174 21.0333C9.44924 21.9683 9.44924 23.05 9.01174 23.985L7.48924 27.1567C2.44924 37.6983 6.56174 42.025 16.6417 36.745L31.6217 28.8983C38.3417 25.3783 38.3417 19.6217 31.6217 16.1017ZM25.9692 23.875H16.5192C15.8017 23.875 15.2067 23.2517 15.2067 22.5C15.2067 21.7483 15.8017 21.125 16.5192 21.125H25.9692C26.6867 21.125 27.2817 21.7483 27.2817 22.5C27.2817 23.2517 26.6867 23.875 25.9692 23.875Z" fill="#3369FF"/>
                    </svg>
                </Button>
            </div>

            <UploadDataset 
                uploadFileShow={uploadFileShow}
                setUploadFileShow={setUploadFileShow}
                _fetchChatbotResponse={_fetchChatbotResponse}
                _resetChatToUpload={_resetChatToUpload}
            />

            <SelectDatasets 
                selectDatasetVisible={selectDatasetVisible} 
                setSelectDatasetVisible={setSelectDatasetVisible} 
                allDatasets={allDatasets}
                _fetchChatbotResponse={_fetchChatbotResponse}
                _resetChatToUpload={_resetChatToUpload}
            />
        </div>
    );
};

const BotMessage = ({ text, widget }) => (
    <div
        style={{
            marginBottom: 10,
            backgroundColor: "#fff",
            padding: "10px",
            borderRadius: "10px",
            width: "max-content",
            maxWidth: "100%",
            float: "left",
            clear: "both",
        }}
    >
        {Array.isArray(text) ? text.map((msg, idx) => (
            <div key={idx} style={{marginBottom: idx < text.length - 1 ? "10px" : "0"}}>
                {msg}
            </div>
        )) : <div >{text}</div>}
        
        {widget && <div className="mt-2">{widget}</div>}
    </div>
);

const UserMessage = ({ text }) => (
    <div
        style={{
            marginBottom: 10,
            // backgroundColor: "#F4F4DB",
            // backgroundColor: "aquamarine",
            backgroundColor: "#3b6beb",
            // backgroundColor: "#C6FBFF",
            // backgroundColor: "#D0F6FF",
            padding: "10px",
            borderRadius: "10px",
            width: "max-content",
            maxWidth: "70%",
            float: "right",
            clear: "both",
            color: "#fff",
        }}
    >
        {text}
    </div>
);

const TableWidget = ({ columns, data }) => {
    const [tableData,setTableData] = useState(data || [])
    const paginationConfig = {
        pageSize: 10, 
        total: data?.length, 
        showSizeChanger: false, 
    };

    const _updateTable = () =>{
        console.log("updated data : ",tableData)
    }

    return (
        <div>
            <div style={{ maxWidth: "100%", overflowX: "auto", background: "#fff",marginTop:"20px" }}>
                <EditableTable data={tableData} setData={setTableData} _ColumnDetails={()=>{}} />
            </div>
            <Button type="primary" onClick={_updateTable} style={{margin:"20px 0 10px"}}>Update</Button>
        </div>
    );
};

const ChartWidget = ({data }) => {

    return (
        <div>
            <div style={{ maxWidth: "100%", overflowX: "auto", background: "#fff",marginTop:"20px" }}>
                <SurveyChart data={data} />
            </div>
        </div>
    );
};

const SelectDatasets = ({selectDatasetVisible,setSelectDatasetVisible,allDatasets,_fetchChatbotResponse,_resetChatToUpload}) =>{

    const _submitDataset = (formData) => {
        _resetChatToUpload(); 
        _fetchChatbotResponse("data_selection",formData?.dataset,"");
    }

    return (
        <Modal show={selectDatasetVisible} onHide={()=>setSelectDatasetVisible(false)} style={{zIndex:1050}}>
                <Modal.Header closeButton>
                    <Modal.Title style={{fontSize:"18px"}}>Select Dataset</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Form
                            onFinish={_submitDataset}
                            layout="vertical"
                        >
                            <Form.Item
                                label="Dataset"
                                name="dataset"
                                rules={[{ required: true, message: 'Select a Dataset!' }]}
                            >
                                <Select placeholder="Select Dataset" style={{zIndex:100000}} >
                                    {
                                        allDatasets?.length>0 ?
                                            allDatasets.map((dataset)=>(
                                                <Select.Option key={dataset?.id} value={dataset?.id}>{dataset?.name}</Select.Option>
                                            ))
                                        :null
                                    }
                                </Select>
                            </Form.Item>
                            <br />
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
    )
}

const UploadDataset =({_fetchChatbotResponse,uploadFileShow,setUploadFileShow,_resetChatToUpload}) => {

    const [cookies] = useCookies();
    const [file, setFile] = useState(null);

    const _submitDataset = async (values) => {
        if (values.name?.length > 0 && file && cookies?.access_token) {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('tenant_id', 1);
            formData.append('file', file); 
            
            try {
                const response = await fetch(BaseUrl + URIS.DATASET, {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${cookies?.access_token}`
                    },
                    body: formData,
                });
                const data = await response.json(); 
                _resetChatToUpload(); 
                _fetchChatbotResponse("data_selection",data?.id,"");
            } catch (err) {
                console.error(err?.message);
                message.warning("Something went wrong!");
            }
        }
        setUploadFileShow(false)
    }

    return(
        <Modal show={uploadFileShow} onHide={()=>setUploadFileShow(false)}>
        <Modal.Header closeButton>
            <Modal.Title style={{fontSize:"20px"}}>Add Dataset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <Form
                    name="basic"
                    onFinish={_submitDataset}
                    layout="vertical"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <label>Upload file</label>
                    <input type='file' accept=".csv, .xlsx" name='file' onChange={(e)=>setFile(e.target.files[0])} />

                    <br /><br />

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal.Body>
    </Modal>
    )
}

export default ChatBot;


// -------------------> final code above <-------------------

