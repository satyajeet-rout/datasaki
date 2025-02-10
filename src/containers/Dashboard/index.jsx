import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BaseUrl, URIS } from '../../services/apis/apis';
import { Card, Col, Form, Input, message, Row, Tag, Skeleton,Tooltip, Tabs, Dropdown, Menu, Spin } from 'antd';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarOutlined, DeleteOutlined, EditOutlined, InfoCircleOutlined, LoadingOutlined, MoreOutlined  } from '@ant-design/icons';
import TabPane from 'antd/es/tabs/TabPane';
import { apiCall } from '../../utils';
import { useConfirmation } from '../../constants/ConfirmationDialog';

export default function Dashboard() {
    const [uploadFileShow, setUploadFileShow] = useState(false);
    const [cookies] = useCookies();
    const [allDatasets, setAllDatasets] = useState([]);
    const [file, setFile] = useState(null);
    const [showDatasets, setShowDatasets] = useState(true);
    const [loading, setLoading] = useState(true); // Loading state
    const inputRef = useRef();

    useEffect(() => {
        fetchAllDataSets();
    }, []);

    const fetchAllDataSets = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetch(`${BaseUrl}${URIS.ALL_DATASETS}`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${cookies.access_token}`
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            let data = await response.text();
            data = JSON.parse(data);
            if (data?.length > 0) {
                setAllDatasets(data);
            } else {
                setAllDatasets([]);
                message.warning("No datasets found");
            }
        } catch (err) {
            console.error("Fetch Error:", err.message);
            message.warning("Something went wrong!");
        } finally {
            setLoading(false); // End loading
        }
    };

    const handleClose = () => setUploadFileShow(false);
    const handleShow = () => setUploadFileShow(true);
    const [form] = Form.useForm();

    const resetForm = () => {
        form.resetFields(); // Reset form fields
        setFile(null); // Clear selected file
        inputRef.current.value = "";
    };

    const _submit = async (values) => {
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
                    body: formData, // Set FormData as body
                });
                const data = await response.json(); 
               
                if (data?.detail) {
                    message.warning(data?.detail);
                } else {
                    resetForm();
                    handleClose();
                    message.success("Success");
                    fetchAllDataSets();
                }
            } catch (err) {
                console.error(err?.message);
                message.warning("Something went wrong!");
            }
        }
    }

    const _handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div className='main-content'>
            <div className='content-heading d-flex align-items-center justify-between'>
                <div className='page-title-sec'><h2>Dashboard</h2></div>
                <div className="d-flex align-items-center gap-4 dashboardHr">
                    <div className="flow-button"><Link to="/create-data-flow"> Create New Flow </Link></div>
                    <div className="dataset-button">
                        <Button variant="primary" onClick={handleShow}>
                            Import Dataset
                        </Button>

                        <Modal show={uploadFileShow} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Dataset</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div>
                                    <Form
                                        form={form}
                                        name="basic"
                                        onFinish={_submit}
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
                                        <input type='file' ref={inputRef} accept=".csv, .xlsx" name='file' onChange={_handleFileChange} />
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
                    </div>
                    <div className="visua-button"><button> Model Visualization </button></div>
                </div>
            </div>
            <div className='dataset-block dashboardTabs mt-4'>
                {/* <div className="grid grid-cols-5 gap-6">
                    <div className={`dataset-sec ${showDatasets ? "active " : ""}`} onClick={() => { setShowDatasets(true) }}>
                        <div className='icon-secton'><img src='/images/Dataset-icon.svg' alt='Dataset-icon'></img></div>
                        <div className='dataset-headting'>Available Dataset <span>({allDatasets?.length || 0})</span></div>
                    </div>
                    <div className="dataset-sec model-sec">
                        <div className='icon-secton'><img src='/images/Model-icon.svg' alt='Dataset-icon'></img></div>
                        <div className='dataset-headting'>Model </div>
                    </div>
                    <div className="dataset-sec stats-sec">
                        <div className='icon-secton'><img src='/images/Stats-icon.svg' alt='Dataset-icon'></img></div>
                        <div className='dataset-headting'>Stats </div>
                    </div>
                    <div className="dataset-sec flow-sec">
                        <div className='icon-secton'><img src='/images/Flow-icon.svg' alt='Dataset-icon'></img></div>
                        <div className='dataset-headting'>Flow </div>
                    </div>
                    <div className="dataset-sec data-sec">
                        <div className='icon-secton'><img src='/images/Data-Connection-icon.svg' alt='Dataset-icon'></img></div>
                        <div className='dataset-headting'>Data Connection</div>
                    </div>
                </div> */}
                <Tabs defaultActiveKey="1">
                <TabPane 
                    tab={
                        <div className={`dataset-sec `}>
                            <div className='icon-secton'><img src='/images/Dataset-icon.svg' alt='Dataset-icon'></img></div>
                            <div className='dataset-headting'>Available Dataset <span>({allDatasets?.length || 0})</span></div>
                        </div>
                    } 
                    key="1">

                    <div className={`showDataBlock `}>
                        <h4 className='mb-2'>Datasets</h4>
                        <Row style={{ margin: "0 -15px" }}>
                            {loading ? (
                                // Show loading skeletons while loading
                                Array.from({ length: 4 }).map((_, index) => (
                                    <Col style={{ width: "25%", padding: "15px" }} key={index}>
                                        <Skeleton active paragraph={{ rows: 4 }} />
                                    </Col>
                                ))
                            ) : (
                                allDatasets?.length > 0 ? (
                                    allDatasets.map((dataset, index) => (
                                        <Col style={{ width: "25%", padding: "15px" }} key={index}>
                                            <DatasetCard dataset={dataset} fetchAllDataSets={fetchAllDataSets} />
                                        </Col>
                                    ))
                                ) : <></>
                            )}
                        </Row>
                    </div>
                </TabPane>
                <TabPane 
                        tab={
                            <div className="dataset-sec model-sec">
                                <div className='icon-secton'><img src='/images/Model-icon.svg' alt='Dataset-icon'></img></div>
                                <div className='dataset-headting'>Model </div>
                            </div>
                            } 
                    key="2">
                    Model
                </TabPane>
                <TabPane 
                        tab={
                            <div className="dataset-sec stats-sec">
                                <div className='icon-secton'><img src='/images/Stats-icon.svg' alt='Dataset-icon'></img></div>
                                <div className='dataset-headting'>Stats </div>
                            </div>
                        } 
                    key="3">

                    Stats
                </TabPane>
                <TabPane 
                    tab={
                        <div className="dataset-sec flow-sec">
                            <div className='icon-secton'><img src='/images/Flow-icon.svg' alt='Dataset-icon'></img></div>
                            <div className='dataset-headting'>Flow </div>
                        </div>
                    } 
                key="4">

                    Flow
                </TabPane>
                <TabPane 
                    tab={
                        <div className="dataset-sec data-sec">
                            <div className='icon-secton'><img src='/images/Data-Connection-icon.svg' alt='Dataset-icon'></img></div>
                            <div className='dataset-headting'>Data Connection</div>
                        </div>
                    } 
                key="5">

                    Data Connection
                </TabPane>
                </Tabs>
            </div>


            
        </div>
    )
}


const DatasetCard = ({ dataset,fetchAllDataSets }) => {
    const navigate = useNavigate();
    const [cookies] = useCookies();
    const [updateModalShow,setUpdateModateShow]= useState(false);
    const [selectedDatasetData,setSelectedDatasetData] = useState(null)
    const [loading,setLoading]= useState(false);
    const [file,setFile]= useState(null);
    const [form] = Form.useForm();
    const inputRef = useRef();
    const { showConfirm, dialog } = useConfirmation();

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const _updateDataset = async(dataset) =>{
        setSelectedDatasetData(dataset);
        setUpdateModateShow(true);
    }
    const _deleteDataset = async (dataset) =>{
        setSelectedDatasetData(dataset)
        showConfirm(handleDelete);
    }
    const handleDelete = async() =>{
        if(cookies?.access_token){
            const response = await apiCall("DELETE",URIS.DATASET+selectedDatasetData?.id,{},cookies.access_token);
            console.log("response : ",response)
        }
        else{
            message.warning("Please log in first!");
            navigate("/login");
        }
    }
    const _handleFileChange = (e) => {
        setFile(e.target.files[0]);
    }
    const resetForm = () => {
        form.resetFields(); // Reset form fields
        setFile(null); // Clear selected file
        inputRef.current.value = "";
    };

    const _submit = async (values) => {
        if (values.name?.length > 0 && cookies?.access_token) {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('description', values.description);
            formData.append('tenant_id', 1);
            if(file){
                formData.append('file', file); 
            }

            setLoading(true);
            
            try {
                const response = await fetch(BaseUrl + URIS.DATASET+selectedDatasetData?.id, {
                    method: 'PUT',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': `Bearer ${cookies?.access_token}`
                    },
                    body: formData, // Set FormData as body
                });
                const data = await response.json(); 
               
                if (data?.detail) {
                    message.warning(data?.detail);
                } else {
                    resetForm();
                    setUpdateModateShow(false)
                    message.success("Success");
                    setSelectedDatasetData(null);
                    fetchAllDataSets();
                }
                
            } catch (err) {
                console.error(err?.message);
                message.warning("Something went wrong!");
            }
            setLoading(false);
        }
    }

    return (
        <Card
            style={{
                width: "100%",
                margin: '0',
                borderRadius: '12px',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
                transition: 'transform 0.3s',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor:"default"
            }}
            bodyStyle={{ padding: '30px 20px 20px', flex: '1 0 auto' }}
            hoverable
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
             
            <div style={{position:"absolute",top:"10px",right:"10px",width:"max-content"}}>
                <Dropdown
                    trigger={['click']}
                    overlay={
                        <Menu>
                            <Menu.Item key="1" onClick={()=>_updateDataset(dataset)} icon={<EditOutlined />}>
                                Update
                            </Menu.Item>
                            <Menu.Item key="2" onClick={()=>_deleteDataset(dataset)} icon={<DeleteOutlined />}>
                                Delete
                            </Menu.Item>
                        </Menu>
                    }
                    placement="bottomRight" // Optional: change dropdown position
                >
                    <MoreOutlined style={{ fontSize: '24px', cursor: 'pointer' }} />
                </Dropdown>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{dataset?.name}</h3>
            <Tooltip title={dataset?.description} placement="topLeft">
                <p style={{
                    color: '#444',
                    lineHeight: '1.5',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1, // Limit to 1 line
                    cursor: 'pointer' // Cursor indicates that this is interactive
                }}>
                    {dataset?.description}
                </p>
            </Tooltip>
            <p style={{ display: 'flex', alignItems: 'center', color: '#777' }}>
                <CalendarOutlined style={{ marginRight: '5px' }} />
                Last Updated: {formatDate(dataset?.updated_at || dataset?.created_at)}
            </p>
            <Link to={`/mlops-solution/visualization?id=${dataset?.id}`}>
                <Button type="primary" style={{ width: '100%', borderRadius: '5px', marginTop: 'auto', fontSize: "16px" }}>
                    <InfoCircleOutlined style={{ marginRight: '5px' }} />
                    View
                </Button>
            </Link>

            {
                updateModalShow ?

                <Modal show={updateModalShow} onHide={()=>{setUpdateModateShow(false);setSelectedDatasetData(null);}}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Dataset</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{position:"relative"}}>
                        {    
                           loading ?
                                 <div style={{position:"absolute",width:"100%",height:"100%",left:"0",top:"0",backgroundColor:"#ffffffd1",display:"flex",alignItems:"center",justifyContent:"center",zIndex:'1'}}>
                                    <Spin indicator={<LoadingOutlined style={{ fontSize: 48}} spin />} size="large" />
                                </div>
                                : null
                        }
                        <div>
                            <Form
                                form={form}
                                name="basic"
                                onFinish={_submit}
                                layout="vertical"
                            >
                                <Form.Item
                                    label="Name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input your name!' }]}
                                    initialValue={selectedDatasetData?.name ||""}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Description"
                                    name="description"
                                    initialValue={selectedDatasetData?.description || ""}
                                >
                                    <Input.TextArea />
                                </Form.Item>

                                <label>Upload file</label>
                                <input type='file' ref={inputRef} accept=".csv, .xlsx" name='file' onChange={_handleFileChange} />
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

                : null
            }

        {dialog}
        </Card>
    );
};

