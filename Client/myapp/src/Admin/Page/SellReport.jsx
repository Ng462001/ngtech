import React, { useState } from 'react';
import Header from '../components/Header';
import '../css/Admin.css';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SellReport = () => {
  const [startdate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState('');
  const [sellreport, setSellReport] = useState([]);

  const fetchSellReport = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/sellreport`, { startdate, enddate })
      .then(response => {
        setSellReport(response.data);
        if (response.data.length === 0) {
          toast.error("No Record Found");
        }
      })
      .catch(error => console.log(error));
  }

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    setSellReport([]);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Order ID", "Course ID", "Student Email", "Order Date", "Amount"];
    const tableRows = [];

    sellreport.forEach(report => {
      const reportData = [
        report.order_id,
        report.course_id,
        report.email,
        formatDate(report.date),
        report.amount,
      ];
      tableRows.push(reportData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.text("Sell Report", 14, 15);
    doc.save(`sell_report_${startdate}_to_${enddate}.pdf`);
  };

  return (
    <>
      <Header />

      <div className="container-fluid mb-5 admin">
        <div className="row">
          <Sidebar />

          <div className="col-sm-9 mt-5 sellreport">
            <form method='post' className='d-print-none' onSubmit={fetchSellReport}>
              <div className='form-row'>
                <div className='form-group col-md-2'>
                  <label htmlFor="from" className='fw-bold mt-2'>From</label>
                  <input
                    type="date"
                    className='form-control'
                    required
                    name='startdate'
                    id='startdate'
                    value={startdate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className='form-group col-md-2'>
                  <label htmlFor="to" className='fw-bold mt-2'>To</label>
                  <input
                    type="date"
                    required
                    className='form-control'
                    name='enddate'
                    id='enddate'
                    value={enddate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <input type="submit" className='btn btn-primary' value="Submit" />
                </div>
                <div className='form-group'>
                  <input type='reset' className='btn btn-secondary' value="Reset" onClick={handleReset} />
                </div>
              </div>
            </form>

            {sellreport.length > 0 && (
              <div className="col-12 mt-5">
                <p className="bg-dark text-white p-2 text-center">Sell Report</p>
                <div className="table-responsive">
                  <table className="table table-striped table-hover text-center">
                    <thead>
                      <tr>
                        <th className="col">Order ID</th>
                        <th className="col">Course ID</th>
                        <th className="col">Student Email</th>
                        <th className="col">Order Date</th>
                        <th className="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sellreport.map((report, index) => (
                        <tr key={index}>
                          <td>{report.order_id}</td>
                          <td>{report.course_id}</td>
                          <td>{report.email}</td>
                          <td>{formatDate(report.date)}</td>
                          <td>{report.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div>
                    <button type="button" className='btn btn-success' onClick={generatePDF}>Download PDF</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SellReport;
