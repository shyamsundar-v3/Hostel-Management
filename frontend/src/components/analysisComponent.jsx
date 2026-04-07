import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loading from "./loader";
import Message from "./message";
import { CSVLink } from "react-csv";

const AnalysisComponent = () => {
  const attendanceAnalysis = useSelector((state) => state.attendanceAnalysis);
  const { loading, error, attendance } = attendanceAnalysis;
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);
  useEffect(() => {
    if (attendance) {
      setHeaders([
        { label: "Name", key: "name" },
        { label: "Contact", key: "contact" },
        { label: "Room No", key: "roomNo" },
        { label: "Status", key: "attendance" },
      ]);
      var csvMapList = [];
      Object.entries(attendance.details).forEach((student) => {
        var csvMap = {};
        csvMap["name"] = student[1].name;
        csvMap["contact"] = student[1].contact;
        csvMap["roomNo"] = student[1].roomNo;
        csvMap["attendance"] = attendance.data[student[0]];
        csvMapList.push(csvMap);
      });

      setData(csvMapList);
    }
  }, [attendance]);

  const getStatusBadge = (status) => {
    if (!status) return <span className="status-badge status-badge--hostel"><span className="status-badge__dot" />Hostel</span>;
    const lower = status.toLowerCase();
    if (lower === 'outside') return <span className="status-badge status-badge--outside"><span className="status-badge__dot" />{status}</span>;
    if (lower === 'home') return <span className="status-badge status-badge--home"><span className="status-badge__dot" />{status}</span>;
    return <span className="status-badge status-badge--hostel"><span className="status-badge__dot" />{status}</span>;
  };

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading ? (
        <Loading />
      ) : (
        <>
          {attendance && (
            <>
              <div className="hms-table">
                <Table responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact No</th>
                      <th>Room No</th>
                      <th>Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance &&
                      Object.entries(attendance.details).map((student) => (
                        <tr key={student[0]}>
                          <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{student[1].name}</td>
                          <td>
                            <a href={`tel:${student[1].contact}`}>{student[1].contact}</a>
                          </td>
                          <td>{student[1].roomNo}</td>
                          <td>{getStatusBadge(attendance.data[student[0]])}</td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
              <div style={{ marginTop: '20px' }}>
                <CSVLink
                  data={data}
                  headers={headers}
                  filename={`attendance_${Date()
                    .toString()
                    .substring(0, 15)}.csv`}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download CSV
                </CSVLink>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AnalysisComponent;