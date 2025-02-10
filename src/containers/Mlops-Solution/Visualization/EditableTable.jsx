import React, { useState } from 'react';
import { Table, Input } from 'antd';

const ResizableTitle = ({ onResize, children, width, ...restProps }) => {
    return (
        <th {...restProps} style={{ width, position: 'relative' }}>
            {children}
            <span
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: '10px',
                    height: '100%',
                    cursor: 'col-resize',
                    zIndex: 1,
                }}
                onMouseDown={onResize}
            />
        </th>
    );
};

const EditableTable = ({ data, setData, _ColumnDetails }) => {
    const [editingCell, setEditingCell] = useState({ rowIndex: -1, columnKey: '' });
    const [columnWidths, setColumnWidths] = useState({}); // Track column widths

    const columns = Object.keys(data[0] || {}).map((columnKey, index) => {
        if (columnKey === 'key') return null;

        return {
            title: (
                <span
                    key={index}
                    onClick={() => { _ColumnDetails(columnKey !== "Sl#" ? columnKey : false); }}
                    style={{ cursor: columnKey !== "Sl#" ? "pointer" : "default" }}
                >
                    {columnKey}
                </span>
            ),
            dataIndex: columnKey,
            width: columnWidths[columnKey] || 120, // Set width from state or default
            render: (text, record, rowIndex) => {
                const editable = isEditing(rowIndex, columnKey);
                return editable ? (
                    <Input
                        key={rowIndex}
                        defaultValue={text}
                        onChange={(e) => handleInputChange(e, rowIndex, columnKey)}
                        onBlur={handleInputBlur}
                        onKeyDown={(e) => handleInputKeyDown(e, rowIndex, columnKey)}
                    />
                ) : (
                    <div key={rowIndex} style={{ cursor: "pointer" }} onClick={() => handleCellClick(rowIndex, columnKey)}>
                        {text}
                    </div>
                );
            },
            onHeaderCell: (column) => ({
                onResize: (e) => handleResize(e, columnKey),
            }),
        };
    }).filter(Boolean);

    const isEditing = (rowIndex, columnKey) =>
        rowIndex === editingCell.rowIndex && columnKey === editingCell.columnKey;

    const handleCellClick = (rowIndex, columnKey) => {
        setEditingCell({ rowIndex, columnKey });
    };

    const handleInputChange = (e, rowIndex, columnKey) => {
        const newData = [...data];
        if (rowIndex > -1) {
            const item = newData[rowIndex];
            newData.splice(rowIndex, 1, { ...item, [columnKey]: e.target.value });
            setData(newData);
        }
    };

    const handleInputBlur = () => {
        setEditingCell({ rowIndex: -1, columnKey: '' });
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleInputBlur();
        }
    };

    const handleResize = (e, columnKey) => {
        const th = e.currentTarget;
        const startWidth = th.parentNode.offsetWidth;
        const startX = e.clientX;

        const doDrag = (event) => {
            const newWidth = Math.max(startWidth + event.clientX - startX, 50);
            setColumnWidths((prev) => ({ ...prev, [columnKey]: newWidth })); // Update width in state
        };

        const stopDrag = () => {
            document.removeEventListener('mousemove', doDrag);
            document.removeEventListener('mouseup', stopDrag);
        };

        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', stopDrag);
    };

    return (
        <Table
            components={{
                header: {
                    cell: ResizableTitle,
                },
            }}
            dataSource={data}
            columns={columns}
            pagination={{pageSize:10}}
            rowKey="key"
            scroll={{ x: 'max-content', y: 300 }}
            className="editableTableData"
        />
    );
};

export default EditableTable;
