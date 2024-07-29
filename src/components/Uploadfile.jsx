import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx';

const Uploadfile = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const [selectedColumns, setSelectedColumns] = useState({});
    const [searchTerm, setSearchTerm] = useState(""); 
    const [selectedDropdownColumn, setSelectedDropdownColumn] = useState("");
    const [selectedRowIndex, setSelectedRowIndex] = useState(null);
    const [formData, setFormData] = useState({});
    const [suggestions, setSuggestions] = useState([]);
    const [formdataArr, setFormDataArr] = useState([]);
    const [suggestionsVisible, setSuggestionsVisible] = useState(false); 
    const suggestionsBoxRef = useRef(null);

    const addIndexToFormData = (index) => {
        setFormDataArr(prevArray => {
            if (!prevArray.includes(index)) {
                return [...prevArray, index];
            }
            return prevArray;
        });
    };

    const removeIndexFromData = (index) => {
        setFormDataArr(prevArray => prevArray.filter(item => item !== index));
    };

    useEffect(() => {
        if (selectedRowIndex !== null && data[selectedRowIndex]) {
            const row = data[selectedRowIndex];
            const newFormData = {};
            formdataArr.forEach(index => {
                newFormData[headers[index]] = row[index];
            });
            setFormData(newFormData);
        } else {
            setFormData({});
        }
    }, [selectedRowIndex, headers, data, formdataArr]);

    useEffect(() => {
        if (selectedDropdownColumn && searchTerm !== null) {
            const columnIndex = headers.indexOf(selectedDropdownColumn);
            const lowerCaseSearchTerm = String(searchTerm).toLowerCase(); 
            const filteredSuggestions = data
                .map(row => {
                    const value = row[columnIndex];
                    return value != null ? String(value).toLowerCase() : ''; 
                })
                .filter(value => value.includes(lowerCaseSearchTerm))
                .filter((value, index, self) => self.indexOf(value) === index); 
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [searchTerm, selectedDropdownColumn, data, headers]);
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsBoxRef.current && !suggestionsBoxRef.current.contains(event.target)) {
                setSuggestionsVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileType = file?.type;
        const allowedTypes = [
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "text/csv"
        ];

        if (file && allowedTypes.includes(fileType)) {
            setSelectedFile(file);
            setErrorMessage("");
            parseFile(file);
        } else {
            setSelectedFile(null);
            setErrorMessage("Please upload a valid Excel or CSV file.");
        }
    };

    const parseFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
            setHeaders(jsonData[0]);
            setData(jsonData.slice(1));
            setDefaultSelectedColumns(jsonData[0]);
        };
        reader.readAsArrayBuffer(file);
    };

    const setDefaultSelectedColumns = (headers) => {
        let initialSelectedColumns = {};
        if (headers.length > 0) {
            initialSelectedColumns[0] = headers[0];
        }
        if (headers.length > 1) {
            initialSelectedColumns[1] = headers[1];
        }
        setSelectedColumns(initialSelectedColumns);
        setSelectedDropdownColumn(headers[0]);
        setFormDataArr([0, 1]); 
    };

    const handleCheckboxChange = (index) => {
        setSelectedColumns(prevState => {
            const newState = { ...prevState };
            if (newState[index]) {
                removeIndexFromData(index);
                delete newState[index];
            } else {
                addIndexToFormData(index);
                newState[index] = headers[index];
            }
            return newState;
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value || ''); 
    };

    const handleDropdownChange = (event) => {
        setSelectedDropdownColumn(event.target.value);
        setSearchTerm('');
        setSuggestions([]);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion);
        const columnIndex = headers.indexOf(selectedDropdownColumn);
        const filteredIndex = data.findIndex(row => String(row[columnIndex]).toLowerCase() === suggestion.toLowerCase()); 
        handleRowClick(filteredIndex);
        setSuggestions([]);
    };

    const handleRowClick = (rowIndex) => {
        setSelectedRowIndex(rowIndex);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        if (selectedRowIndex !== null) {
            const updatedData = [...data];
            const updatedRow = headers.map((header, index) => formData[header] || '');
            updatedData[selectedRowIndex] = updatedRow;
            setData(updatedData);
            setSelectedRowIndex(null);
            setFormData({});
        }
    };

    const downloadAndSave = () => {
        const workbook = XLSX.utils.book_new();
        const sheetData = [headers, ...data];
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
        XLSX.writeFile(workbook, 'Payroll.xlsx');
    };

    const generatePayroll = () => {
        console.log("Generate Payroll clicked");
        alert("not my work   ");
    };

    const filteredData = data
    .map((row, index) => ({ row, originalIndex: index }))
    .filter(({ row }) => {
        const columnIndex = headers.indexOf(selectedDropdownColumn);
        const value = row[columnIndex];
        return value != null ? String(value).toLowerCase().includes(searchTerm.toLowerCase()) : false;
    });

    return (
        <div className="upload-container">
            <div className="uploadHeader">
                <div className="formInput">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="file"
                            accept=".xlsx, .csv"
                            id="fileInput"
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="fileInput" className="upload-button">
                            Upload File
                        </label>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
                <div className="checkbox-container">
                    {headers.length > 0 && (
                        headers.map((header, index) => (
                            <div className="checkbox-item" key={index}>
                                <input
                                    type="checkbox"
                                    id={`checkbox-${index}`}
                                    checked={formdataArr.includes(index)}
                                    onChange={() => handleCheckboxChange(index)}
                                />
                                <label htmlFor={`checkbox-${index}`}>{header}</label>
                            </div>
                        ))
                    )}
                </div>
            </div>
            {selectedFile &&
            <div className="main-content">
                <div className="left-panel">
                    <div className="dropdown-filter">
                        <select onChange={handleDropdownChange} value={selectedDropdownColumn}>
                            {headers.filter(header => header.toLowerCase() !== "id").map((header, index) => (
                                <option key={index} value={header}>{header}</option>
                            ))}
                        </select>
                    </div>
                    <div className="search-filter">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            onFocus={() => setSuggestionsVisible(true)} 
                        />
                        {suggestionsVisible && suggestions.length > 0 && (
                            <div className="suggestions-box" ref={suggestionsBoxRef}>
                                {suggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="suggestion-item"
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {formdataArr.length > 0 && (  
                        <div className="form-container">
                            <div className="form-grid">
                                {formdataArr.map((index) => (
                                    <div key={index} className="form-field">
                                        <label>{headers[index]}</label>
                                        <input
                                            type="text"
                                            name={headers[index]}
                                            value={formData[headers[index]] || ''}
                                            onChange={handleInputChange}
                                            disabled={selectedRowIndex === null}
                                        />
                                    </div>
                                ))}
                            </div>
                            {selectedRowIndex !== null && (
                                <button className="save-button" onClick={handleSave}>Save</button>
                            )}
                        </div>
                    )}
                </div>
                <div className="vertical-line"></div> 
                <div className="right-panel">
                    <div className="selected-data">
                        <table>
                            <thead>
                                <tr>
                                    {Object.keys(selectedColumns).map(colIndex => (
                                        <th key={colIndex}>{selectedColumns[colIndex]}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map(({ row, originalIndex }, rowIndex) => (
                                    <tr key={rowIndex} onClick={() => handleRowClick(originalIndex)}>
                                        {Object.keys(selectedColumns).map(colIndex => (
                                            <td key={colIndex}>{row[colIndex]}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="generate-payroll-container">
                        <button className="download-button" onClick={downloadAndSave}>Download & Save</button>
                    </div>
                    <div>  
                        <center><button className="generate-payroll-button" onClick={generatePayroll}>Generate Payroll</button></center> 
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Uploadfile;