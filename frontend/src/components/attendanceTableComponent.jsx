import React, { useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postAttendance } from "../actions/attendanceActions";
import { Link } from "react-router-dom";

const AttendanceTableComponent = ({
  students,
  attendanceMap,
  setAttendanceMap,
  attendance,
  roomNo,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {}, [dispatch, attendanceMap]);

  const getStatusBadge = (status) => {
    if (!status) return <span className="status-badge status-badge--hostel"><span className="status-badge__dot" />Hostel</span>;
    const lower = status.toLowerCase();
    if (lower === 'outside') return <span className="status-badge status-badge--outside"><span className="status-badge__dot" />{status}</span>;
    if (lower === 'home') return <span className="status-badge status-badge--home"><span className="status-badge__dot" />{status}</span>;
    return <span className="status-badge status-badge--hostel"><span className="status-badge__dot" />{status}</span>;
  };

  const updateAttendance = () => {
    if (attendance) {
      if (!attendance.roomNo.includes(roomNo)) {
        attendance.roomNo.push(roomNo);
      }
    }
    const roomData = attendance ? attendance.roomNo : roomNo;
    const dataData = attendanceMap;
    const detailsData = attendance ? attendance.details : {};
    students.forEach((student) => {
      detailsData[student._id] = {
        name: student.name,
        contact: student.contact,
        roomNo: student.roomNo,
      };
    });

    dispatch(
      postAttendance({
        roomNo: roomData,
        details: detailsData,
        data: dataData,
      })
    );
  };
  return (
    <>
      <div className="hms-table">
        <Table responsive className="table-sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Attendance</th>
              <th>Status</th>
              <th>Contact</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((student) => (
                <tr key={student._id}>
                  <td>
                    <Link to={`/student/${student._id}`} style={{ fontWeight: 600 }}>{student.name}</Link>
                  </td>
                  <td>
                    <Form>
                      <Form.Group controlId={`status-${student._id}`} style={{ marginBottom: 0 }}>
                        <Form.Control
                          as="select"
                          size="sm"
                          defaultValue={attendanceMap[student._id]}
                          onChange={(e) => {
                            var tempMap = attendanceMap;
                            tempMap[student._id] = e.target.value;
                            setAttendanceMap(tempMap);
                          }}
                          style={{ minWidth: '110px' }}
                        >
                          <option>Hostel</option>
                          <option>Home</option>
                          <option>outside</option>
                        </Form.Control>
                      </Form.Group>
                    </Form>
                  </td>
                  <td>{getStatusBadge(student.status)}</td>
                  <td>
                    <a href={`tel:${student.contact}`}>{student.contact}</a>
                  </td>
                  <td>{student.city}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Button variant="success" onClick={updateAttendance} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
            <polyline points="17 21 17 13 7 13 7 21"/>
            <polyline points="7 3 7 8 15 8"/>
          </svg>
          Update Attendance
        </Button>
      </div>
    </>
  );
};

export default AttendanceTableComponent;