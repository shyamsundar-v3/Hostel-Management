import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Loading from "../components/loader";
import Message from "../components/message";
import {
  getStudentDetails,
  updateStudent,
  deleteStudent,
} from "../actions/studentActions";
import { STUDENT_UPDATE_RESET } from "../constants/studentConstant";

const StudentDetailsView = ({ match, history }) => {
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const studentDetails = useSelector((state) => state.studentDetails);
  const { loading, error, student } = studentDetails;
  const studentUpdate = useSelector((state) => state.studentUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = studentUpdate;
  const studentDelete = useSelector((state) => state.studentDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = studentDelete;

  useEffect(() => {
    if (successDelete) {
      history.push("/");
    }
    if (successUpdate) {
      dispatch({ type: STUDENT_UPDATE_RESET });
    }
    if (!student || !student._id || student._id !== match.params.id) {
      dispatch(getStudentDetails(match.params.id));
    }
    if (student && student._id && !status) {
      setStatus(student.status);
    }
  }, [dispatch, match, successUpdate, successDelete]);

  const navigateToEdit = () => {
    history.push({
      pathname: `/student/edit/${student._id}`,
      state: { studentProps: student },
    });
  };
  const updateStatus = () => {
    student.status = status;
    dispatch(updateStudent(student));
  };

  const deleteStuden = () => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(student._id));
    }
  };

  const getStatusClass = (s) => {
    if (!s) return 'status-badge--hostel';
    const lower = s.toLowerCase();
    if (lower === 'outside') return 'status-badge--outside';
    if (lower === 'home') return 'status-badge--home';
    return 'status-badge--hostel';
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading || loadingUpdate || loadingDelete ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {student && (
            <div className="hms-card" style={{ padding: '28px' }}>
              <Row>
                <Col md={3}>
                  <Image src={student.image} alt={student.name} fluid style={{ borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }} />
                </Col>
                <Col md={4}>
                  <h2 style={{ marginBottom: '16px', fontSize: '1.4rem' }}>{student.name}</h2>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.8.33 1.6.59 2.37a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.77.26 1.57.46 2.37.59A2 2 0 0 1 22 16.92z"/></svg>
                        Phone: <a href={`tel:${student.contact}`} style={{ fontWeight: 500 }}>{student.contact}</a>
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        Father: <a href={`tel:${student.fatherContact}`} style={{ fontWeight: 500 }}>{student.fatherContact}</a>
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        City: {student.city}
                      </span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        Address: {student.address}
                      </span>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>Room No</Col>
                          <Col style={{ fontWeight: 600 }}>{student.roomNo}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>Block No</Col>
                          <Col style={{ fontWeight: 600 }}>{student.blockNo}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>Status</Col>
                          <Col>
                            <Form.Control
                              size="sm"
                              as="select"
                              value={status}
                              onChange={(e) => setStatus(e.target.value)}
                            >
                              {["Hostel", "Outside", "Home"].map((x) => (
                                <option key={x} value={x}>
                                  {x}
                                </option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button
                          className="btn-block"
                          type="button"
                          onClick={updateStatus}
                        >
                          Update Status
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
                <Col md={2} style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '8px' }}>
                  <Button variant="secondary" onClick={navigateToEdit} style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={deleteStuden} style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    Delete
                  </Button>
                </Col>
              </Row>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default StudentDetailsView;
