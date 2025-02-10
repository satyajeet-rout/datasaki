import React, { useEffect, useState } from 'react';
import { BaseUrl, URIS } from '../../../services/apis/apis';
import {Button, Form, Input, message, Modal, Select, Skeleton, Slider, Spin, List,Table } from 'antd';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Dropdown, Tab, Tabs } from 'react-bootstrap';
import EditableTable from './EditableTable';
import { useCookies } from 'react-cookie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import jsonData from "./data.json";
import Plot from 'react-plotly.js';
import { LoadingOutlined } from '@ant-design/icons';


export default function Visualization() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();

    const [formattedData, setFormattedData] = useState([]);
    const [cookies] = useCookies();  
    const [datasetId,setDatasetId] = useState(null);
    const [allDatasets,setAllDatasets] = useState([]);
    const [allFunctions,setAllFuncitons] = useState(jsonData);
    const [showFunction,setShowFunction] = useState(false);
    const [selectedFunctionData,setSelectedFunctionData] = useState(null);
    const [allColumns,setAllColumns] = useState([]);
    const [selectedColumn,setSelectedColumn] = useState(null);
    const [columnModalVisible,setColumnModalVisible]= useState(false);

    const [columnData,setColumnData]=useState(null);
    const [loading, setLoading] = useState(true);
  

    useEffect(() => {
        fetchAllDataSets();
    }, []);

    useEffect(()=>{
        if(datasetId===null){
            if(queryParams.get('id')){
                setDatasetId(queryParams.get('id'));  
            }
            else{
                if(allDatasets?.length>0){
                    setDatasetId(allDatasets[0].id);    
                }
            }
        }
     
    },[allDatasets])

    useEffect(()=>{
        if(datasetId){
            fetchDataset(datasetId);
            _fetchDtypes(datasetId);
        }
    },[datasetId])

    const fetchDataset = async (id) => {
        try {
            setLoading(true)
            const response = await fetch(`${BaseUrl}${URIS.DATASET}${id}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${cookies.access_token}`
                },
            });

            if (!response.ok) {
                setFormattedData([])
                throw new Error('Network response was not ok');
            }

            const data = await response.text();
            let parsedData = JSON.parse(data); 
            setFormattedData(parsedData);
        } catch (err) {
            console.error("Fetch Error:", err.message);
            message.warning("Something went wrong!");
            setFormattedData([]);
        }finally {
            setLoading(false); // Set loading to false after fetch is done
        }
    };

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
        }
    };


    const handleUpdate = (updatedData) => {

        setFormattedData(updatedData);
        let CsvData = jsonToCsv(updatedData);
        jsonToCsv(CsvData);
    };

    const jsonToCsv = (jsonData) => {
        const csvRows = [];
        const headers = Object.keys(jsonData[0]);
        csvRows.push(headers.join(','));
    
        for (const row of jsonData) {
            const values = headers.map(header => {
                const escaped = ('' + row[header]).replace(/"/g, '""');
                return `"${escaped}"`;
            });
            csvRows.push(values.join(','));
        }
    
        return csvRows.join('\n');
    };

    const _functionModal = (functionData) =>{
        setSelectedFunctionData(functionData);
        setShowFunction(true);
    }

    const _updateTable = (table_data) =>{
        console.log("data : ",table_data)
    }

    const _ColumnDetails = (columnkey) =>{
        if(columnkey){
            setSelectedColumn(columnkey)
            setColumnModalVisible(true);
        }
    }  


    const _fetchDtypes = async (datasetId) => {
        if(cookies.access_token){
            try {
                const response = await fetch(`${BaseUrl}${URIS.DATASET}${datasetId}/dtypes`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${cookies.access_token}`,
                        'Content-Type': 'application/json'
                    },
                });

                if(response?.details==="Could not validate credentials"){
                    navigate("/login");
                }    
    
                if (response?.ok) {                
                    let parsedData = await response.json(); 
                    setAllColumns(parsedData)
                }
                else{
                    setAllColumns(null);
                }
    
    
            } catch (err) {
                console.error("Fetch Error:", err?.message);
            }

        }
        else{
            message.warning("Need login!")
        }
    }


    return (
        <div className='main-content'>
            <div className='content-heading'>
                <div className="data-preparation-block">
                    <div className='row'>
                        <div className='col-sm-6'>
                            <div className='inner-heading'><h4>Data Preparation</h4></div>
                            <div className="search-sec">
                                <input type="search" id="gsearch" name="gsearch" placeholder="Find Tools" />
                            </div>
                        </div>
                        <div className='col-sm-6'>
                            <div className='table-right-block'>
                                <ul className='d-flex justify-end align-items-center'>
                                    <li className="d-flex headerbtn">
                                        <Button onClick={()=>{_updateTable(formattedData)}} type="primary" style={{marginRight:"10px"}}>Update Table</Button>
                                    <Dropdown>
                                        <Dropdown.Toggle size="sm" variant="transparent" id="dropdown-basic">
                                            Select Dataset
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {
                                                allDatasets?.length>0 ?
                                                  allDatasets.map((dataset,index)=>(

                                                      <Dropdown.Item key={index} onClick={()=>{setDatasetId(dataset?.id)}} >{dataset?.name}</Dropdown.Item>
                                                  ))
                                                  :null
                                            }   
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    </li>
                                    <li className='active'><img src='/images/chat-icon.svg' alt="Chat Icon" /></li>
                                    <li><img src='/images/table-icon.svg' alt="Table Icon" /></li>
                                    <li><img src='/images/table-list-icon.svg' alt="Table List Icon" /></li>
                                    <li><img src='/images/bot-icon.svg' alt="Bot Icon" /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='connection-body-block'>
                    <div className='data-table-block'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className='mathematics-block'>
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li className="nav-item">
                                            <a className="nav-link active" data-bs-toggle="tab" href="#home">Mathematics</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-bs-toggle="tab" href="#menu1">Find and Replace</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" data-bs-toggle="tab" href="#menu2">Filters</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div id="home" className="tab-pane active">
                                            <div className='mathematics-sec'>
                                                <div className='mathematics-fliter-sec'>
                                                    <ul>
                                                        {Object.entries(allFunctions).map(([key, funcitons]) => (                                                                    
                                                            funcitons?.length > 0 ? (
                                                                funcitons.map((_function, arrayIndex) => (
                                                                    <li key={`${arrayIndex}`} style={{display:"inline-block"}}>

                                                                            {/* <Tooltip  title={_function?.description}> */}
                                                                                 <Button onClick={()=>_functionModal(_function)} style={{textTransform:"capitalize"}}>
                                                                                    <img src='/images/Input-Data-icon.svg' alt="Input Data" />
                                                                                    {_function?.name}
                                                                                 </Button>
                                                                            {/* </Tooltip> */}
                                                                    </li>
                                                                ))
                                                            ) : null
                                                        ))}

                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="menu1" className="tab-pane fade mt-2">
                                            <h5>Menu 1</h5>
                                            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                        </div>
                                        <div id="menu2" className="tab-pane fade mt-2">
                                            <h5>Menu 2</h5>
                                            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='content-table-block'>
                <div className='mathematics-fliter-table' style={{padding:"20px 20px 10px"}}>
                {loading ? (
                    // Show skeleton while loading
                    <Skeleton active paragraph={{ rows: 5 }} />
                ) : (
                    formattedData.length > 0 && (
                        <EditableTable key={formattedData} data={formattedData} setData={setFormattedData} _ColumnDetails={_ColumnDetails} />
                    )
                )}
                </div>
                <div className='graphs-block'>
                    <div className='row'>
                        <div className='col-sm-12 mt-3'>
                            <div className='script-tab-block'>
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link" data-bs-toggle="tab" href="#Script">Script</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link active" data-bs-toggle="tab" href="#sample-settings">Sample settings</a>
                                    </li>
                                </ul>
                                <div className="tab-content">
                                    <div id="Script" className="tab-pane fade mt-2">
                                        <h5>Menu 1</h5>
                                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                    <div id="sample-settings" className="tab-pane active mt-2">
                                        <h5>Menu 2</h5>
                                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FunctionModal selectedFunctionData={selectedFunctionData} showFunction={showFunction} setShowFunction={setShowFunction} allColumns={allColumns} datasetId = {datasetId} fetchDataset = {fetchDataset} />
            {
                columnModalVisible ?
                <ColumnModal selectedColumn={selectedColumn} setColumnModalVisible={setColumnModalVisible} columnModalVisible={columnModalVisible}
                columnData = {columnData} setColumnData={setColumnData}  datasetId = {datasetId} />
                : null
            }
         
        </div>
    );
}


const FunctionModal = ({selectedFunctionData,showFunction,setShowFunction,allColumns,datasetId,fetchDataset})=>{

    const [form] = Form.useForm();
    const [cookies, setCookie, removeCookie] = useCookies();  
    const [activeSectionIndex,setActiveSectionIndex] = useState(1);
    const [filteredColumns,setFilteredColumns] = useState(null)

    useEffect(()=>{

        if(selectedFunctionData?.name === "numeric" && Array.isArray(allColumns)){
            let columns = allColumns.map((e)=>e.dtype === "float64")
            setFilteredColumns(columns);
        }
        else{
            setFilteredColumns(allColumns);
        }

    },[allColumns,selectedFunctionData])

    useEffect(()=>{
        form.resetFields();
    },[])

    const fetch_applyFunction = async (id,payload) => {
        try {
            const response = await fetch(`${BaseUrl}${URIS.BUILD_COLUMN}${id}`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${cookies.access_token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload), 
            });

            if (!response.ok) {
                message.warning("Something went wrong!")
                throw new Error('Network response was not ok');
            }

            const data = await response.text();
            let parsedData = JSON.parse(data); 
            fetchDataset();
        } catch (err) {
            console.error("Fetch Error:", err.message);
            message.warning("Something went wrong!");
        }
    };


    const _save =(e)=>{

        let finalPayload = e;
        // converting object as per API needed
        const transformedObject = {
            name: finalPayload.name, 
            cfg: {} 
        };
        for (const key in finalPayload) {
            if (key !== 'name') {
                transformedObject.cfg[key] = finalPayload[key];
            }
        }
        finalPayload = transformedObject;

        // add type as per API need
        if(selectedFunctionData?.["inputs "]?.[0]?.type){
            finalPayload.type = selectedFunctionData["inputs "][0].type;
            finalPayload.saveAs = "new-col";
        }
        
        fetch_applyFunction(datasetId,finalPayload)

    }
    return(
        <Modal title={<span style={{ textTransform: 'capitalize' }}>{selectedFunctionData?.name}</span>} width={700} open={showFunction} onCancel={()=>{setShowFunction(false)}} footer={null}>
            <br />
            <Form form={form} onFinish={_save} layout="vertical" className="funcitonForm">
                <Form.Item name="name" label="New Column Name">
                    <Input type="text" />
                </Form.Item>
                {
                    selectedFunctionData?.["inputs "]?.[0] ?

                    Object.entries(selectedFunctionData?.["inputs "]?.[0].cfg).map(([key, value]) => {
                        if (key==="left" || key==="right" || key==="col" || value==="col") {
                            return (
                                <Form.Item key={key} name={key} label={<span style={{textTransform:"capitalize"}}>{key}</span>}>
                                    <Select>
                                        {
                                            filteredColumns?.length>0 ?
                                              filteredColumns.map((column,index)=>(
                                                <Select.Option key={index} value={column?.name} style={{textTransform:"capitalize"}}>
                                                    {column?.name}
                                                </Select.Option>
                                                ))

                                            :null
                                        }
                                    </Select>
                                </Form.Item>
                            );
                        }
                        else if (value?.[0] === "cols" ) {
                            return (
                                <Form.Item key={key} name={key} label={<span style={{textTransform:"capitalize"}}>{key}</span>}>
                                    <Select mode="multiple">
                                        {
                                            filteredColumns?.length>0 ?
                                              filteredColumns.map((column,index)=>(
                                                <Select.Option key={index} value={column?.name} style={{textTransform:"capitalize"}}>
                                                    {column?.name}
                                                </Select.Option>
                                                ))

                                            :null
                                        }
                                    </Select>
                                </Form.Item>
                            );
                        }
                        else if(Array.isArray(value) && value[0]!=="cols" && key!=="sections"){
                            return (
                                <Form.Item key={key} name={key} label={<span style={{textTransform:"capitalize"}}>{key}</span>}>
                                    <Select>
                                        {
                                            value?.length > 0 ? 
                                                value.map((e,index)=>(
                                                    <Select.Option key={index} value={e} style={{textTransform:"capitalize"}}>
                                                        {e}
                                                    </Select.Option>

                                                ))
                                            :null
                                        }
                                    </Select>
                                </Form.Item>
                            );
                        }
                        else if(value==="Bool" || value==="bool"){
                            return (
                                <div className="checkboxInputFlex" key={key}>
                                    <Form.Item key={key} name={key} label={<span style={{textTransform:"capitalize",cursor:"pointer"}} >{key}</span>}>
                                        <Input type="checkbox" style={{cursor:"pointer"}}  />
                                    </Form.Item>
                                </div>
                            );
                        }
                        else if(value==="str" || value==="string"){
                            return (
                                <Form.Item key={key} name={key} label={<span style={{textTransform:"capitalize",cursor:"pointer"}} >{key}</span>}>
                                    <Input type="text"  />
                                </Form.Item>
                            );
                        }
                        else if(value==="integer" || value==="int" || value==="float"){
                            return (
                                <Form.Item key={key} name={key} label={<span style={{textTransform:"capitalize",cursor:"pointer"}} >{key}</span>}>
                                    <Input type="number"  />
                                </Form.Item>
                            );
                        }
                        else if(value==="date"){
                            return (
                                <Form.Item key={key} name={key} label={<span style={{textTransform:"capitalize",cursor:"pointer"}} >{key}</span>}>
                                    <Input type="date"  />
                                </Form.Item>
                            );
                        }
                        else if(key==="limits"){
                            return (
                                <Form.Item key={key} name={key} label={<span style={{textTransform:"capitalize",cursor:"pointer"}} >{key}</span>}>
                                    <Slider 
                                        range 
                                        min={parseInt(value?.[0]?.split('-')[0], 10)} 
                                        max={parseInt(value?.[0]?.split('-')[1], 10)} 
                                        defaultValue={[
                                            parseInt(value?.[0]?.split('-')[0], 10), 
                                            parseInt(value?.[0]?.split('-')[1], 10)
                                        ]}
                                    />
                                </Form.Item>
                            );
                        }
                    })

                    

                    :null
                }

                {
                    selectedFunctionData?.["inputs "]?.[0].cfg?.["sections"]?.length>0 ?

                    <div className="mt-5 p-3" style={{border:"1px solid #00000040"}}>

                        <div className="sectionTabs d-flex gap-2 flex-wrap mb-3">
                        {
                            selectedFunctionData?.["inputs "]?.[0].cfg?.["sections"].map((section,index)=>(
                                <Button key={index} onClick={()=>{setActiveSectionIndex(index+1)}} 
                                    type={activeSectionIndex===index+1 ? "primary":"default"}>
                                    Section {index+1}
                                </Button>
                            ))

                        }
                        </div>

                        {
                             selectedFunctionData?.["inputs "]?.[0].cfg?.["sections"].map((section,index)=>(
                            

                                activeSectionIndex === index+1 ?
                                <div className="sectionContainer" key={index}>
                                    <div className="inputSection" style={{padding:"10px 0 0"}}>
    
                                        {
                                            Object.entries(section).map(([key, value]) => {
                                                if (key==="left" || key==="right" || key==="col" || value==="col") {
                                                    return (
                                                        <Form.Item name={key} key={key} label={<span style={{textTransform:"capitalize"}}>{key}</span>}>
                                                            <Select>
                                                                {
                                                                    filteredColumns?.length>0 ?
                                                                    filteredColumns.map((column,index)=>(
                                                                        <Select.Option key={index} value={column?.name} style={{textTransform:"capitalize"}}>
                                                                            {column?.name}
                                                                        </Select.Option>
                                                                        ))
    
                                                                    :null
                                                                }
                                                            </Select>
                                                        </Form.Item>
                                                    );
                                                }
                                                else if (value?.[0] === "cols" ) {
                                                    return (
                                                        <Form.Item name={key} label={<span style={{textTransform:"capitalize"}}>{key}</span>}>
                                                            <Select mode="multiple">
                                                                {
                                                                    filteredColumns?.length>0 ?
                                                                    filteredColumns.map((column,index)=>(
                                                                        <Select.Option key={index} value={column?.name} style={{textTransform:"capitalize"}}>
                                                                            {column?.name}
                                                                        </Select.Option>
                                                                        ))
    
                                                                    :null
                                                                }
                                                            </Select>
                                                        </Form.Item>
                                                    );
                                                }
                                                else if(Array.isArray(value) && value[0]!=="cols"){
                                                    return (
                                                        <Form.Item name={key} label={<span style={{textTransform:"capitalize"}}>{key}</span>}>
                                                            <Select>
                                                                {
                                                                    value?.length > 0 ? 
                                                                        value.map((e,i)=>(
                                                                            <Select.Option key={i} value={e} style={{textTransform:"capitalize"}}>
                                                                                {e}
                                                                            </Select.Option>
    
                                                                        ))
                                                                    :null
                                                                }
                                                            </Select>
                                                        </Form.Item>
                                                    );
                                                }
                                                else if(value==="Bool" || value==="bool"){
                                                    return (
                                                        <div className="checkboxInputFlex" key={index}>
                                                            <Form.Item name={key} label={<span style={{textTransform:"capitalize",cursor:"pointer"}} >{key}</span>}>
                                                                <Input type="checkbox" style={{cursor:"pointer"}}  />
                                                            </Form.Item>
                                                        </div>
                                                    );
                                                }
                                                else if(value==="str" || value==="string"){
                                                    return (
                                                        <Form.Item name={key} label={<span style={{textTransform:"capitalize",cursor:"pointer"}} >{key}</span>}>
                                                            <Input type="text"  />
                                                        </Form.Item>
                                                    );
                                                }
                                                else if(value==="integer" || value==="int" || value==="float"){
                                                    return (
                                                        <Form.Item name={key} label={<span style={{textTransform:"capitalize",cursor:"pointer"}} >{key}</span>}>
                                                            <Input type="number"  />
                                                        </Form.Item>
                                                    );
                                                }
                                                else if(value==="date"){
                                                    return (
                                                        <Form.Item name={key} label={<span style={{textTransform:"capitalize",cursor:"pointer"}} >{key}</span>}>
                                                            <Input type="date"  />
                                                        </Form.Item>
                                                    );
                                                }
                                                else if(key==="limits"){
                                                    return (
                                                        <Form.Item name={key} label={<span style={{textTransform:"capitalize",cursor:"pointer"}} >{key}</span>}>
                                                            <Slider 
                                                                range 
                                                                min={parseInt(value?.[0]?.split('-')[0], 10)} 
                                                                max={parseInt(value?.[0]?.split('-')[1], 10)} 
                                                                defaultValue={[
                                                                    parseInt(value?.[0]?.split('-')[0], 10), 
                                                                    parseInt(value?.[0]?.split('-')[1], 10)
                                                                ]}
                                                            />
                                                        </Form.Item>
                                                    );
                                                }
                                            })
    
                                        }
                                    </div>
    
                                </div>  
                                :<></>                      
        
                             ))
                        }

                    </div>

                   

                    :null
                }

                <br />
                <Form.Item >
                    <Button type="primary" htmlType="submit">Apply</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

const ColumnModal = React.memo(({columnModalVisible,setColumnModalVisible,selectedColumn,columnData,loader,setColumnData,datasetId})=>{

    const navigate = useNavigate();
    const [cookies] = useCookies(); 
    const [columnDataLoader,setColumnDataLoader] = useState(false);

    useEffect(()=>{
            fetchCharts(datasetId,"pie",selectedColumn)
            fetchCharts(datasetId,"count",selectedColumn)
            fetchCharts(datasetId,"hist",selectedColumn)
            _fetchColumnDescribe(datasetId,selectedColumn)
    },[datasetId])

    const fetchCharts = async (id,chartType,columnkey)=>{
        setColumnDataLoader(true)
        if(cookies.access_token){
            try {
                const response = await fetch(`${BaseUrl}${URIS.CHARTS}${id}/${chartType}`, {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${cookies.access_token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"col":columnkey}),
                });

                if(response?.details==="Could not validate credentials"){
                    navigate("/login");
                }    
    
                if (!response.ok) {
                    setColumnData(prev=>({...prev,[chartType]:null}))
                    setColumnDataLoader(false)
                    throw new Error('Network response was not ok');
                }
    
                const data = await response.text();
                let parsedData = JSON.parse(data); 
                setColumnData(prev=>({...prev,[chartType]:parsedData}))
                setColumnDataLoader(false)
    
            } catch (err) {
                console.error("Fetch Error:", err.message);
                message.warning("Something went wrong!");
                setColumnData(prev=>({...prev,[chartType]:null}))
                setColumnDataLoader(false)
            }

        }
        else{
            message.warning("Need login!")
            setColumnDataLoader(false)
        }
    }

    const _fetchColumnDescribe = async (datasetId,columnkey) =>{
        setColumnDataLoader(true)
        if(cookies.access_token){
            try {
                const response = await fetch(`${BaseUrl}${URIS.DATASET}${datasetId}/describe/${columnkey}`, {
                    method: 'POST',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${cookies.access_token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({}),
                });    
    
                if (response?.ok) {                
                    let parsedData = await response.json(); 
                    parsedData = await JSON.parse(parsedData);

                    setColumnData((prev)=>({...prev,describe:parsedData}))
                    setColumnDataLoader(false)
                }
                else{
                    setColumnData((prev)=>({...prev,describe:null}))
                    setColumnDataLoader(false)
                    throw new Error('Network response was not ok');
                }
    
    
            } catch (err) {
                console.error("Fetch Error:", err?.message);
                // message.warning("Something went wrong! describe");
                setColumnData((prev)=>({...prev,describe:null}))
                setColumnDataLoader(false)
            }

        }
        else{
            message.warning("Need login!")
            setColumnDataLoader(false)
        }
    }

    return (
        
        <Modal title={<span style={{ textTransform: 'capitalize' }}>{selectedColumn}</span>} width={1000} open={columnModalVisible} onCancel={()=>{setColumnModalVisible(false);setColumnData(null)}} footer={null}>

             {
                selectedColumn ?
                <div className="columnDataModal position-relative">
                    {
                        columnDataLoader?
                           <div className="w-100 h-100 position-absolute flex justify-content-center align-items-center" style={{background:"#ffffff88"}}>
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} size="large"/>
                           </div>
                           :null
                    }
                    <Tabs
                        defaultActiveKey="tab-1"
                        transition={false}
                        id="noanim-tab-example"
                        className="mb-3 px-4"
                        style={{
                            borderBottom:"none"
                        }}
                        >
                        
                        <Tab eventKey="tab-1" title="Pie Chart" className="px-4 overflow-auto">
                            {
                                columnData?.pie ?
                                    <Plot data= {columnData.pie?.data} layout={columnData.pie?.layout}/>
                                : <p>No data found.</p>
                            }
                        </Tab>
                        <Tab eventKey="tab-2" title="Hist Chart" className="px-4 overflow-auto">
                            {
                                columnData?.hist ?
                                    <Plot data= {columnData.hist?.data} layout={columnData.hist?.layout}/>
                                : <p>No data found.</p>
                            }
                        </Tab>
                        <Tab eventKey="tab-3" title="Count Chart" className="px-4 overflow-auto">
                            {
                                columnData?.count ?
                                    <Plot data= {columnData.count?.data} layout={columnData.count?.layout}/>
                                : <p>No data found.</p>
                            }
                        </Tab>


                        <Tab eventKey="tab-4" title="Describe" className="pl-4 pr-0 overflow-auto" >
                            {
                                columnData?.describe ? (
                                    <div className="columnDataDescribe">
                                        {Object.keys(columnData.describe?.describe).length > 0 ? (
                                            <Table
                                                bordered
                                                dataSource={Object.entries(columnData.describe.describe).map(([key, value]) => ({
                                                    key,  // unique key for each row
                                                    description: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
                                                    value: typeof value === 'object' ? JSON.stringify(value) : value,
                                                }))}
                                                columns={[
                                                    {
                                                        title: 'Description',
                                                        dataIndex: 'description',
                                                        key: 'description',
                                                    },
                                                    {
                                                        title: 'Value',
                                                        dataIndex: 'value',
                                                        key: 'value',
                                                    },
                                                ]}
                                                pagination={false} // Disable pagination for simplicity
                                                scroll={{ y: 200 }} // Set max height for the table
                                            />
                                        ) : null}

                                    <br />
                                    <br />
                                        <h5 className="mb-3">Unique Values Count</h5>
                                        {columnData?.describe?.uniques?.string?.data?.length > 0 ? (
                                            <List
                                                bordered
                                                dataSource={columnData.describe.uniques.string.data}
                                                renderItem={item => (
                                                    <List.Item key={item.value}>
                                                        {item.value} - Count: {item.count}
                                                    </List.Item>
                                                )}
                                                style={{ maxHeight: 200, overflowY: 'auto' }} // Set max height and enable scroll
                                            />
                                        ) : (
                                            <p>No unique values found.</p>
                                        )}

                                        <br />
                                        <br />

                                        <h5 className="mb-3">Count of Unique Values</h5>
                                        {columnData?.describe?.uniques?.string?.data?.length > 0 ? (
                                            <ResponsiveContainer width="100%" height={300}>
                                                <BarChart data={columnData.describe.uniques.string.data}>
                                                    <XAxis dataKey="value" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="count" fill="#8884d8" />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        ) : (
                                            <p>No data available for chart.</p>
                                        )}

                                        {
                                            columnData?.describe?.code && false ?
                                                <>
                                                    <h5 className="mb-3">Code Snippet</h5>
                                                    <pre>{columnData?.describe?.code}</pre>
                                                </>

                                            :null
                                        }
                                    </div>
                                ) : (
                                    <p>No data found.</p>
                                )
                            }
                        </Tab>



                    </Tabs>
                </div>
             :<></>
             }

        </Modal>
    )
})