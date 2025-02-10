import { message,Form, Modal, Input, Select, Slider, Button } from "antd";
import React, {useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  ReactFlowProvider,
  Handle,
  Controls,
} from "react-flow-renderer";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl, URIS } from "../../../services/apis/apis";
import { apiCall } from "../../../utils";
import { useCookies } from "react-cookie";
import jsonData from "./data.json";

const iconData = [
    { id: 'sync', label: 'Sync', image: "./images/Sync-icon.svg" },
    { id: 'prepare', label: 'Prepare', image: "./images/Prepare-icon.svg" },
    { id: 'sampleFilter', label: 'Sample / Filter', image: "./images/filter-icon.svg" },
    { id: 'group', label: 'Group', image: "./images/Group-icon.svg" },
    { id: 'distinct', label: 'Distinct', image: "./images/Distinct-icon.svg" },
    { id: 'joinWith', label: 'Join with..', image: "./images/Join-with-icon.svg" },
    { id: 'fuzzyJoin', label: 'Fuzzy join', image: "./images/Fuzzy-join-icon.svg" },
    { id: 'geoJoin', label: 'Geo join', image: "./images/Geo-join-icon.svg" },
    { id: 'split', label: 'Split', image: "./images/Split-icon.svg" },
    { id: 'topN', label: 'Top N', image: "./images/Top-N-icon.svg" },
    { id: 'pivot', label: 'Pivot', image: "./images/Pivot-icon.svg" },
    { id: 'stack', label: 'Stack', image: "./images/Stack-icon.svg" },
    { id: 'generateFeatures', label: 'Generate features', image: "./images/Generate-icon.svg" },
    { id: 'window', label: 'Window', image: "./images/Window-icon.svg" },
    { id: 'sort', label: 'Sort', image: "./images/Sort-list-icon.svg" },
];

const initialNodes = [
    { id: '1', data: { label: 'Sync', image: '/images/Sync-icon.svg' }, position: { x: 0, y: 0 }, type: 'custom' },
    { id: '2', data: { label: 'Prepare', image: './images/Prepare-icon.svg' }, position: { x: 100, y: 100 }, type: 'custom' }
  ];
  
  const initialEdges = [
    { id: 'e1-2', source: '1', target: '2' }
  ];

export default function CreateDataFlow() {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [allDatasets,setAllDatasets] = useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(); 
  const [selectedDataset,setSelectedDataset] = useState(null); 
  const [selectedFunctionData,setSelectedFunctionData] = useState(null);
  const [showFunction,setShowFunction] = useState(false);
  const [allColumns,setAllColumns] = useState([]);
  const [datasetId,setDatasetId] = useState(null);
  const [formattedData, setFormattedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allFunctions,setAllFuncitons] = useState(jsonData);
  const [clickTimeout, setClickTimeout] = useState(null);
  const navigate = useNavigate();

    const handleNodeClick = (event, node) => {
    if (clickTimeout) {
        clearTimeout(clickTimeout);
        setClickTimeout(null); 
        removeNode(node.id);
    } else {
        setClickTimeout(
        setTimeout(() => {
            nodeClick(node);
            setClickTimeout(null); 
        }, 200)  
        );
    }
    };

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges]
  );

  useEffect(()=>{
    if(formattedData?.length>0){
        setAllColumns(Object.keys(formattedData[0]));
    }
    else{
        setAllColumns([]);
    }
  },[formattedData])

  useEffect(()=>{
    if(cookies?.access_token){
        (async()=>{
            const response = await apiCall("GET",URIS.ALL_DATASETS,null,cookies?.access_token);

            if(response?.statusText==="Unauthorized"){
                message.warning("Login is required!")
                navigate("/login");
            }
            if(response?.error){
                setAllDatasets([]);
            }
            else if(response?.length>0){
                setAllDatasets(response);
            }

        })()
    }
    else{
        message.warning("Login is required!")
        navigate("/login");
    }
  },[cookies?.access_token])

  function getDatasetByName(name) {
    let result = null;
  
    for (const [key, constructors] of Object.entries(allFunctions)) {
      for (const constructor of constructors) {
        if (constructor.name === name) {
          result = constructor
        }
      }
    }
  
    return result;
  }

  const nodeClick = (node)=>{
    if(node?.data?.label){
        let icon = getDatasetByName(node.data.label);        
        _functionModal(icon,node?.id);
    }
  }

  const onDrop = useCallback((event) => {
    event.preventDefault();
    if(selectedDataset?.id=== undefined){
        message.warning("Please select a dataset first!");
        return;
    }
    const iconName = event.dataTransfer.getData("text/plain");
    
    let icon = getDatasetByName(iconName);
    
    _functionModal(icon,nodes?.length+1);
    if (icon) {
        const bounds = event.target.getBoundingClientRect();
        const x = event.clientX - bounds.left; // x position relative to the ReactFlow container
        const y = event.clientY - bounds.top;  // y position relative to the ReactFlow container

        // Adjust for the size of the icon (assuming a standard size for the nodes)
        const nodeWidth = 60;  // Width of the custom node
        const nodeHeight = 60; // Height of the custom node

        setNodes((nds) => nds.concat({
            id: `${nds.length + 1}`,
            type: 'custom',
            data: { label: icon.name, image: icon?.image||"./images/Prepare-icon.svg" },
            position: { x: x - nodeWidth / 2, y: y - nodeHeight / 2 }, // Center the icon
            draggable: true,
            connectable: true,
        }));
    }
}, [setNodes,selectedDataset]);

    const removeNode = (nodeId) => {
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
    };

    const _changeDataset = (event)=>{
        let dataset = allDatasets.find((e)=>e.id == event.target.value);

        if(dataset?.id){
            fetchDataset(dataset.id);
            setSelectedDataset(dataset);
        }
        else{
            setSelectedDataset("")
        }
    }


    const saveFlow = () => {
        const flowData = { nodes, edges };
        message.success("Flow saved")
        console.log('Flow Data:', JSON.stringify(flowData)); // Here you can implement saving logic (e.g., API call)
    };

  
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

        if(response?.statusText==="Unauthorized"){
            message.warning("Login is required!")
            navigate("/login");
        }

        if (!response.ok) {
            setFormattedData([])
            throw new Error('Network response was not ok');
        }

        const data = await response.text();
        let parsedData = JSON.parse(data); 
        setFormattedData(parsedData);
    } catch (err) {
        console.error("Fetch Error:", err.message);
        setFormattedData([]);
    }finally {
        setLoading(false); // Set loading to false after fetch is done
    }
    };
    const _functionModal = (functionData,nodeId) =>{
        setSelectedFunctionData({...functionData,nodeId});
        setShowFunction(true);
    }


  return (
    <ReactFlowProvider>
    <div className="createFlowPage">
      <div className="cfHeader" style={{
        padding: "28px 25px",
        background: "#5482FF",
        margin: "0 0 18px 0",
        display: "flex",
        color: "#fff"
      }}>
      <Link to={'/'} > <span><img src="./images/leftArrowWhite.svg" alt="left arrow" width="30px" /></span></Link>
        <span style={{ fontSize: "17px", lineHeight: "20px", margin: "0 0 0 10px" }}>Create Data Flow</span>
      </div>
      <div className='container-fluid createflow-block'>
        <div className='row'>
          <div className='col-sm-1'>
            <div className='shortcut-nav'>
              <div className='expand-arrow'><img src="./images/leftArrowWhite.svg" alt="left arrow" width="10px" /></div>
              <ul>
                <li><img src="./images/add-icon.svg" alt="Add Icon" /></li>
                <li><img src="./images/info-icon.svg" alt="Info Icon" /></li>
                <li><img src="./images/list-icon.svg" alt="List Icon" /></li>
                <li><img src="./images/message-icon.svg" alt="Message Icon" /></li>
                <li><img src="./images/history-icon.svg" alt="History Icon" /></li>
              </ul>
            </div>
          </div>
          <div className='col-sm-3'>
            <div className='scoring-block'>
              <div className='scoring-heading'>
                <img src="./images/folder-icon.svg" alt="Folder" />
                <span> scoring </span>
              </div>
              <div className='expore-tab-block'>
                <nav>
                  <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">
                        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_454_860)">
                            <path d="M19.822 20.8588H2.59486C1.34543 20.8588 0.328125 19.8415 0.328125 18.5921V3.17829C0.328125 1.92887 1.34543 0.91156 2.59486 0.91156H19.822C21.0714 0.91156 22.0887 1.92887 22.0887 3.17829V18.5921C22.0887 19.8415 21.0714 20.8588 19.822 20.8588ZM2.59486 1.81825C1.84502 1.81825 1.23482 2.42846 1.23482 3.17829V18.5921C1.23482 19.3419 1.84502 19.9521 2.59486 19.9521H19.822C20.5718 19.9521 21.1821 19.3419 21.1821 18.5921V3.17829C21.1821 2.42846 20.5718 1.81825 19.822 1.81825H2.59486Z" fill="black"/>
                            <path d="M21.6354 7.25844H0.781471C0.531224 7.25844 0.328125 7.05534 0.328125 6.80509C0.328125 6.55484 0.531224 6.35175 0.781471 6.35175H21.6354C21.8856 6.35175 22.0887 6.55484 22.0887 6.80509C22.0887 7.05534 21.8856 7.25844 21.6354 7.25844Z" fill="black"/>
                            <path d="M21.6354 11.7919H0.781471C0.531224 11.7919 0.328125 11.5888 0.328125 11.3385C0.328125 11.0883 0.531224 10.8852 0.781471 10.8852H21.6354C21.8856 10.8852 22.0887 11.0883 22.0887 11.3385C22.0887 11.5888 21.8856 11.7919 21.6354 11.7919Z" fill="black"/>
                            <path d="M21.6354 16.3253H0.781471C0.531224 16.3253 0.328125 16.1222 0.328125 15.872C0.328125 15.6217 0.531224 15.4186 0.781471 15.4186H21.6354C21.8856 15.4186 22.0887 15.6217 22.0887 15.872C22.0887 16.1222 21.8856 16.3253 21.6354 16.3253Z" fill="black"/>
                            <path d="M6.22166 20.8588C5.97141 20.8588 5.76831 20.6557 5.76831 20.4055V6.80509C5.76831 6.55484 5.97141 6.35175 6.22166 6.35175C6.4719 6.35175 6.675 6.55484 6.675 6.80509V20.4055C6.675 20.6557 6.4719 20.8588 6.22166 20.8588Z" fill="black"/>
                            <path d="M11.2085 20.8588C10.9582 20.8588 10.7551 20.6557 10.7551 20.4055V6.80509C10.7551 6.55484 10.9582 6.35175 11.2085 6.35175C11.4587 6.35175 11.6618 6.55484 11.6618 6.80509V20.4055C11.6618 20.6557 11.4587 20.8588 11.2085 20.8588Z" fill="black"/>
                            <path d="M16.1953 20.8588C15.945 20.8588 15.7419 20.6557 15.7419 20.4055V6.80509C15.7419 6.55484 15.945 6.35175 16.1953 6.35175C16.4455 6.35175 16.6486 6.55484 16.6486 6.80509V20.4055C16.6486 20.6557 16.4455 20.8588 16.1953 20.8588Z" fill="black"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_454_860">
                            <rect width="21.7606" height="21.7606" fill="white" transform="translate(0.328125 0.00488281)"/>
                            </clipPath>
                            </defs>
                        </svg>

                      <span>Expore</span>
                      </button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
                        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.8594 7.89249L3.51674 0.298662C2.10141 -0.509346 0.658447 0.37433 0.658447 1.96337V17.8163C0.658447 19.1625 1.53489 19.7764 2.34947 19.7764C2.73308 19.7764 3.12392 19.6553 3.51214 19.4191L16.9147 11.2153C17.5885 10.8015 17.9668 10.1889 17.955 9.53417C17.9438 8.87881 17.545 8.28004 16.8594 7.89249ZM16.0165 9.74999L2.61464 17.9518C2.5245 18.0071 2.45344 18.0347 2.40475 18.0485C2.39159 17.9998 2.37843 17.9248 2.37843 17.8163V1.96403C2.37843 1.80085 2.40803 1.7186 2.40803 1.6982C2.46067 1.70149 2.55279 1.72847 2.6686 1.79427L16.0093 9.3881C16.1738 9.48219 16.2225 9.56378 16.2383 9.54601C16.2297 9.56838 16.1738 9.65195 16.0165 9.74999Z" fill="#010002"/>
                        </svg>
                      <span>Build</span>
                    </button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                    <svg fill="#000000" width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path d="M31.999 13.008l-0-10.574c0-1.342-1.092-2.434-2.433-2.434h-10.793c-0.677 0-1.703 0-2.372 0.67l-15.81 15.811c-0.38 0.38-0.59 0.884-0.59 1.421 0 0.538 0.209 1.043 0.589 1.423l12.088 12.085c0.379 0.381 0.883 0.59 1.421 0.59s1.042-0.209 1.421-0.589l15.811-15.812c0.678-0.677 0.674-1.65 0.67-2.591zM29.915 14.186l-15.826 15.811-12.086-12.101 15.794-15.797c0.159-0.099 0.732-0.099 0.968-0.099l0.45 0.002 10.35-0.002c0.239 0 0.433 0.195 0.433 0.434v10.582c0.002 0.38 0.004 1.017-0.084 1.169zM24 4c-2.209 0-4 1.791-4 4s1.791 4 4 4c2.209 0 4-1.791 4-4s-1.791-4-4-4zM24 10c-1.105 0-2-0.896-2-2s0.895-2 2-2 2 0.896 2 2-0.895 2-2 2z"></path>
                    </svg>


                      <span>Tag</span>
                    </button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-Export" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">
                        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.71829 19.6333C4.45086 19.63 3.23612 19.1259 2.33873 18.2309C1.44132 17.3359 0.933979 16.1225 0.927246 14.8551V11.661C0.927221 11.4058 1.02777 11.1607 1.20711 10.9789C1.38645 10.7973 1.63015 10.6934 1.88546 10.6901C2.13856 10.6934 2.38036 10.7953 2.55936 10.9743C2.73834 11.1533 2.84036 11.3952 2.84366 11.6483V14.8423C2.85033 15.6026 3.15534 16.33 3.693 16.8676C4.23065 17.4053 4.95796 17.7103 5.71829 17.7169H18.4944C18.8713 17.7169 19.2445 17.6424 19.5925 17.4978C19.9407 17.3532 20.2566 17.1414 20.5226 16.8742C20.7885 16.6071 20.999 16.2901 21.1421 15.9414C21.2851 15.5928 21.3579 15.2192 21.3563 14.8423V11.6483C21.3491 11.5177 21.3692 11.3871 21.4152 11.2646C21.461 11.1422 21.5319 11.0307 21.6232 10.937C21.7144 10.8434 21.8241 10.7697 21.9452 10.7206C22.0665 10.6714 22.1966 10.648 22.3273 10.6517C22.4535 10.6464 22.5793 10.6672 22.6971 10.7125C22.8149 10.758 22.9221 10.8273 23.0121 10.9159C23.1019 11.0047 23.1726 11.1109 23.2197 11.2282C23.2667 11.3454 23.289 11.4709 23.2855 11.5972V14.7912C23.2888 15.422 23.1673 16.0471 22.9279 16.6306C22.6884 17.2141 22.3359 17.7444 21.8906 18.1911C21.4451 18.6376 20.9157 18.9916 20.3328 19.2326C19.7499 19.4735 19.1252 19.5967 18.4944 19.595H5.71829V19.6333Z" fill="black"/>
                            <path d="M12.1062 15.1489C11.8531 15.1456 11.6113 15.0437 11.4323 14.8647C11.2533 14.6857 11.1514 14.4438 11.148 14.1907V2.69221C11.1464 2.56591 11.1699 2.44054 11.2175 2.32351C11.2651 2.20647 11.3356 2.10016 11.4249 2.01084C11.5142 1.92151 11.6205 1.85099 11.7375 1.80344C11.8546 1.7559 11.9799 1.73229 12.1062 1.734C12.3582 1.73399 12.6 1.83319 12.7793 2.01013C12.9587 2.18707 13.0611 2.42753 13.0644 2.67944V14.1779C13.0644 14.4332 12.9639 14.6784 12.7847 14.8601C12.6053 15.0417 12.3615 15.1456 12.1062 15.1489Z" fill="black"/>
                            <path d="M6.66383 7.49603C6.47706 7.49016 6.29596 7.43049 6.14225 7.32424C5.98852 7.21799 5.86873 7.06964 5.79725 6.89699C5.72577 6.72434 5.70561 6.53473 5.73922 6.35091C5.77282 6.1671 5.85876 5.99687 5.9867 5.86069L11.391 0.418061C11.5745 0.240856 11.8195 0.141815 12.0745 0.141815C12.3295 0.141815 12.5746 0.240856 12.758 0.418061L18.1879 5.82236C18.3674 6.00202 18.4681 6.24557 18.4681 6.4995C18.4681 6.75342 18.3674 6.99696 18.1879 7.17663C18.0083 7.35601 17.7647 7.45681 17.5108 7.45681C17.2569 7.45681 17.0133 7.35601 16.8336 7.17663L12.1065 2.44946L7.35374 7.20218C7.26398 7.29445 7.15675 7.36789 7.0383 7.41835C6.91986 7.46882 6.79258 7.49527 6.66383 7.49603Z" fill="black"/>
                        </svg>

                      <span>Export</span>
                    </button>
                  </div>
                </nav>
                <div className="tab-content p-3 border bg-light" id="nav-tabContent">
                  <div className="tab-pane fade active show" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">

                    <div className="accordion" id="accordionExample">
                      <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Visual recipes
                          </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            <ul>
                            {/* {iconData && 
                                iconData.map((icon,index) => (
                                    <li className="cursor-pointer" key={index} draggable
                                    onDragStart={(e) => e.dataTransfer.setData("text/plain", icon.id)}>
                                        <span><img src={icon.image} alt={icon.label} /></span>
                                        <p>{icon.label}</p>
                                    </li>
                                ))
                            } */}
                            {Object.entries(allFunctions).map(([key, funcitons]) => (                                                                    
                                funcitons?.length > 0 ? (
                                    funcitons.map((_function, arrayIndex) => (
                                        <li className="cursor-pointer" key={arrayIndex} draggable
                                        onDragStart={(e) => e.dataTransfer.setData("text/plain", _function.name)}>
                                            <span><img src={_function?.logo?.length>0 ? _function.logo :"./images/Prepare-icon.svg"} alt={_function?.name} /></span>
                                            <p>{_function?.name}</p>
                                        </li>
                                    ))
                                ) : null
                            ))}
                            </ul>
                            <div style={{ display: 'flex', marginBottom: '10px' }}>
                      
                            </div>
                          </div>
                        </div>
                      </div>
					</div>
					  
					<div className="accordion" id="accordionExample-2">
						<div className="accordion-item code-recipes-sec">
						<h2 className="accordion-header">
							<button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
							Code recipes
							</button>
						</h2>
						<div id="collapseTwo" className="accordion-collapse collapse show" data-bs-parent="#accordionExample-2">
							<div className="accordion-body">
							<ul>
								<li><span><img src="./images/Python-icon.svg" alt="Python Icon" /></span><p>Python</p></li>
								<li><span><img src="./images/r-icon.svg" alt="R Icon" /></span><p>R</p></li>
								<li><span><img src="./images/sql-icon.svg" alt="SQL Icon" /></span><p>SQL</p></li>
								<li><span><img src="./images/Shell-icon.svg" alt="Shell Icon" /></span><p>Shell</p></li>
							</ul>
							</div>
						</div>
						</div>
					</div>
                  </div>
                  <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <p className="px-3 py-2"><strong>This is some placeholder content the Profile tab's associated content.</strong>
                      Clicking another tab will toggle the visibility of this one for the next.
                      The tab JavaScript swaps classes to control the content visibility and styling. You can use it with
                      tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
                  </div>
                  <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <p className="px-3"><strong>This is some placeholder content the Contact tab's associated content.</strong>
                      Clicking another tab will toggle the visibility of this one for the next.
                      The tab JavaScript swaps classes to control the content visibility and styling. You can use it with
                      tabs, pills, and any other <code>.nav</code>-powered navigation.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className='col-sm-8' >
            <div className='top-filter-block'>
            <div className='top-filter-bar'>
              <div className='row'>
                <div className='col-sm-10 search-filter-sec'>
                  <div className="custom-select search-section"><img src="./images/search-icon.svg" alt="Python Icon" /> <input type="text" placeholder="Search.."></input></div>
                  <div className="custom-select all-filter-section">
                  <img src="./images/filter-blue-icon.svg" alt="Python Icon" /> 
                    <select>
                      <option value="0">All</option>
                      <option value="1">Audi</option>
                      <option value="2">BMW</option>
                      <option value="3">Citroen</option>
                      <option value="4">Ford</option>
                      <option value="5">Honda</option>
                      <option value="6">Jaguar</option>
                      <option value="7">Land Rover</option>
                      <option value="8">Mercedes</option>
                      <option value="9">Mini</option>
                      <option value="10">Nissan</option>
                      <option value="11">Toyota</option>
                      <option value="12">Volvo</option>
                    </select>
                  </div>
                  <div className="custom-select zone-section"><button datatype='button'> + Zone </button></div>
                  <div className="custom-select recipe-section">
                    <select>
                      <option value="0">+ Recipe</option>
                      <option value="1">Audi</option>
                      <option value="2">BMW</option>
                      <option value="3">Citroen</option>
                      <option value="4">Ford</option>
                      <option value="5">Honda</option>
                      <option value="6">Jaguar</option>
                      <option value="7">Land Rover</option>
                      <option value="8">Mercedes</option>
                      <option value="9">Mini</option>
                      <option value="10">Nissan</option>
                      <option value="11">Toyota</option>
                      <option value="12">Volvo</option>
                    </select>
                  </div>
                  <div className="custom-select dataset-section">
                    <select onChange={_changeDataset} value={selectedDataset?.id}>
                      <option value="">+ Dataset</option>
                      {
                        allDatasets?.length>0 ?
                            allDatasets.map((dataset,index)=>(
                                <option key={index} value={dataset?.id}>{dataset?.name}</option>
                            ))
                         :<></>
                      }
                    </select>
                  </div>

                </div>
                <div className='col-sm-2 view-tags-sec'>
                  <div className="custom-select view-section">
                  <img src="./images/view-eye-icon.svg" alt="Python Icon" /> 
                    <select>
                      <option value="0">View : Tags</option>
                      <option value="1">Audi</option>
                      <option value="2">BMW</option>
                      <option value="3">Citroen</option>
                      <option value="4">Ford</option>
                      <option value="5">Honda</option>
                      <option value="6">Jaguar</option>
                      <option value="7">Land Rover</option>
                      <option value="8">Mercedes</option>
                      <option value="9">Mini</option>
                      <option value="10">Nissan</option>
                      <option value="11">Toyota</option>
                      <option value="12">Volvo</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="strutureArea " >
                <div className="saDetails">
                    <p>
                    9 <span>datasets</span>
                    7 <span>recipes</span>
                    1 <span>model</span>
                    2 <span>datasets</span>
                    </p>
                </div>
                <div
                    style={{ height: "80vh", margin: "20px 0" }}
                    onDrop={onDrop}
                    onDragOver={(event) => event.preventDefault()}
                >
                   

                    <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                    nodeTypes={nodeTypes}
                    connectionLineType={ConnectionLineType.SmoothStep}
                    onNodeClick={handleNodeClick} 
                    >
                    </ReactFlow>
                </div>
                    <button onClick={saveFlow} style={{  
                        background: '#5482FF',
                        borderRadius: '5px',
                        border: '1px solid #5482FF',
                        color: '#fff',
                        padding: '10px 12px',
                        textAlign: 'center',
                        lineHeight: '1em',
                        textDecoration: 'none',
                        marginTop:"20px"
                        }}>
                        Save Flow
                    </button>
                
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {
        selectedFunctionData ? 
            <FunctionModal setNodes={setNodes} selectedFunctionData={selectedFunctionData} showFunction={showFunction} setShowFunction={setShowFunction} allColumns={allColumns} datasetId = {selectedDataset?.id} fetchDataset = {fetchDataset} />
            :null
    }
    
    </ReactFlowProvider>
  )
}


const CustomNode = ({ data }) => {
  return (
    <div>
        <div style={{
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#3C6BEB0D',
        color: '#fff',
        position: 'relative',
        padding: '7px',
        }}>
        <Handle
            type="source"
            position="right"
            style={{ background: '#2BBABA' }}
        />
        <Handle
            type="target"
            position="left"
            style={{ background: '#2BBABA' }}
        />
            <div style={{
                    backgroundColor: "#2BBABA",
                    width: "100%",
                    height: "100%",
                    padding: "0px",
                    borderRadius: "50%",
                    margin: "0",
                    display: "flex",
                    justifyContent:"center",
                    alignItems:"center",
                    overflow:"hidden",
                    position:"relative"
            }}>
                <img src={data.image} alt={data.label} 
                style={{ width: '80%', height: '50%', margin: '0',objectFit:"contain",display:"block" }} 
                />
                <div style={{
                    position:"absolute",
                    left:"0",
                    top:"0",
                    width:"100%",
                    height:"100%",
                    zIndex:"1",
                }}>

                </div>

            </div>        
        </div>
        <div className="text-center" style={{
            fontSize:"13px",
            width: '60px',
        }}>{data.label}</div>
    </div>
  );
};
const nodeTypes = {
    custom: CustomNode,
  };

  const FunctionModal = ({setNodes,selectedFunctionData,showFunction,setShowFunction,allColumns,datasetId,fetchDataset})=>{

    const [form] = Form.useForm();
    const [cookies, setCookie, removeCookie] = useCookies();  
    const [activeSectionIndex,setActiveSectionIndex] = useState(1);

    useEffect(()=>{
        if(showFunction){
            form.resetFields();
        }
    },[showFunction])

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

        setNodes((nodes)=>nodes.map((node)=>{
            if(node.id == selectedFunctionData.nodeId){
                return {...node,functionData:{...finalPayload}}
            }
            return node;
        }))

        setShowFunction(false);

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
                                            allColumns?.length>0 ?
                                              allColumns.map((column,index)=>(
                                                <Select.Option key={index} value={column} style={{textTransform:"capitalize"}}>
                                                    {column}
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
                                            allColumns?.length>0 ?
                                              allColumns.map((column,index)=>(
                                                <Select.Option key={index} value={column} style={{textTransform:"capitalize"}}>
                                                    {column}
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
                                                                    allColumns?.length>0 ?
                                                                    allColumns.map((column,index)=>(
                                                                        <Select.Option key={index} value={column} style={{textTransform:"capitalize"}}>
                                                                            {column}
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
                                                                    allColumns?.length>0 ?
                                                                    allColumns.map((column,index)=>(
                                                                        <Select.Option key={index} value={column} style={{textTransform:"capitalize"}}>
                                                                            {column}
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
