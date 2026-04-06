import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/message";
import Loader from "../components/loader";
import Paginate from "../components/paginate";
import { listStudents } from "../actions/studentActions";
import { Link } from "react-router-dom";

const getStatusBadge = (status) => {
  if (!status) return <span className="status-badge status-badge--hostel"><span className="status-badge__dot" />Hostel</span>;
  const lower = status.toLowerCase();
  if (lower === 'outside') return <span className="status-badge status-badge--outside"><span className="status-badge__dot" />{status}</span>;
  if (lower === 'home') return <span className="status-badge status-badge--home"><span className="status-badge__dot" />{status}</span>;
  return <span className="status-badge status-badge--hostel"><span className="status-badge__dot" />{status}</span>;
};

const StudentsTableView = ({ keyword, pageNumber }) => {
  const dispatch = useDispatch();

  const studentsList = useSelector((state) => state.studentsList);
  const { loading, error, students, page, pages } = studentsList;
  useEffect(() => {
    if (!students) {
      dispatch(listStudents(keyword, pageNumber));
    }
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <div className="hms-table">
            <Table responsive className="table-sm">
              <thead>
                <tr>
                  <th>Stream</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Contact</th>
                  <th>Room No</th>
                  <th>City</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id}>
                    <td>{student.category}</td>
                    <td>
                      <Link to={`/student/${student._id}`} style={{ fontWeight: 600 }}>
                        {student.name}
                      </Link>
                    </td>
                    <td>{getStatusBadge(student.status)}</td>
                    <td>
                      <a href={`tel:${student.contact}`}>{student.contact}</a>
                    </td>
                    <td>{student.roomNo}</td>
                    <td>{student.city}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default StudentsTableView;
