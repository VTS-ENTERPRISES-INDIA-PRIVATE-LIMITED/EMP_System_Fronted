import React, { useState, useEffect, useRef } from 'react';

const pdfs = [
    { id: 1, title: 'Sample PDF 1', url: 'https://res.cloudinary.com/dalzs7bc2/image/upload/v1721889524/Ravi_Kiran_Varma_VTS_Assessment_Report_blan0f.pdf', date: '2024-02-15' },
    { id: 2, title: 'Sample PDF 2', url: 'https://res.cloudinary.com/dalzs7bc2/image/upload/v1721985427/Payslip_hipdwy.pdf', date: '2024-08-05' }
];

const Payslips = () => {
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const pdfRef = useRef();

    const handleDownload = (pdfUrl) => {   
        if (pdfUrl === "") {
            alert('No Data..!');
        } else {
            fetch(pdfUrl).then((response) => {
                response.blob().then((blob) => {
                    const fileURL = window.URL.createObjectURL(blob);
                    let alink = document.createElement("a");
                    alink.href = fileURL;
                    const filename = pdfUrl.split('/').pop() || 'document.pdf';
                    alink.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
                    alink.click();
                });
            })
            .catch(error => {
              console.error('There has been a problem with your fetch operation:', error);
              setSelectedPdf('');
            });
        }
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const filterPdfs = () => {
        let filteredPdfs = pdfs;

        if (selectedMonth) {
            const inputMonth = parseInt(selectedMonth, 10);
            filteredPdfs = filteredPdfs.filter((pdf) => {
                const pdfDate = new Date(pdf.date);
                const pdfMonth = pdfDate.getMonth() + 1; // getMonth returns 0-11
                return pdfMonth === inputMonth;
            });
        }

        if (selectedYear) {
            const inputYear = parseInt(selectedYear, 10);
            filteredPdfs = filteredPdfs.filter((pdf) => {
                const pdfDate = new Date(pdf.date);
                const pdfYear = pdfDate.getFullYear();
                return pdfYear === inputYear;
            });
        }

        return filteredPdfs;
    };

    useEffect(() => {
        return () => {
            if (selectedPdf) {
                URL.revokeObjectURL(selectedPdf);
            }
        };
    }, [selectedPdf]);
    
    const filteredPdfs = filterPdfs();

    return (
        <>
            <div className="payRollDetails">
                <div className='dateFilter'>
                    
                <label style={{marginRight: "30px"}}>
                        Month:
                        <select value={selectedMonth} onChange={handleMonthChange}>
                            <option value="">Select Month</option>
                            {[...Array(12)].map((_, index) => (
                                <option key={index + 1} value={index + 1}>
                                    {new Date(0, index).toLocaleString('en-US', { month: 'long' })}
                                </option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Year:
                        <select value={selectedYear} onChange={handleYearChange}>
                            <option value="">Select Year</option>
                            {Array.from(new Set(pdfs.map(pdf => new Date(pdf.date).getFullYear()))).map(year => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <table className='dataTable' border={'1px'}>
                        <thead>
                            <tr>
                                <th>S.No.</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {filteredPdfs.length > 0 ? (
                                filteredPdfs.map((pdf) => (
                                    <tr key={pdf.id}>
                                        <td>{pdf.id}</td>
                                        <td>{pdf.title}</td>
                                        <td>{pdf.date}</td>
                                        <td className="tableBtns">
                                            <img src={process.env.PUBLIC_URL + '/images/eye.png'} alt='view' onClick={() => setSelectedPdf(pdf.url)}/>
                                            <img src={process.env.PUBLIC_URL + '/images/download.png'} alt='download' onClick={() => handleDownload(pdf.url)}/>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">
                                        No Data Available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="payRollPreview">
                {selectedPdf ? (
                    <div ref={pdfRef}>
                        <iframe 
                            src={selectedPdf} 
                            width="100%" 
                            height="750px" 
                            title="PDF Viewer"
                        ></iframe>
                    </div>
                ) : (
                    <div className="noData">
                        <img src={process.env.PUBLIC_URL + '/images/box.png'} alt="No Data" />
                        <p>No Data</p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Payslips;
