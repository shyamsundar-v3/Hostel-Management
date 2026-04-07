import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import {
  deleteAttendanceByDate,
  getAnalysisByDate,
} from "../actions/attendanceActions";
import AnalysisComponent from "../components/analysisComponent";
import Loading from "../components/loader";
import Message from "../components/message";

const AnalysisView = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [days, setDays] = useState(0);
  const [idList, setIdList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const attendanceAnalysis = useSelector((state) => state.attendanceAnalysis);
  const { attendance } = attendanceAnalysis;
  const attendanceDelete = useSelector((state) => state.attendanceDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = attendanceDelete;

  useEffect(() => {
    if (attendance) {
      var temp = [...idList];
      Object.entries(attendance.details).forEach((at) => {
        temp.push(at[0]);
      });
      setIdList(temp);
    } else {
      dispatch(getAnalysisByDate(startDate.toString().substring(0, 15)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendance, dispatch]);

  const changeDate = (date) => {
    dispatch(getAnalysisByDate(date.toString().substring(0, 15)));
    setStartDate(date);
  };
  const showModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const startDelete = () => {
    setModal(false);
    dispatch(deleteAttendanceByDate(days));
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <Link to="/" className="btn btn-light my-3" style={{ margin: 0 }}>
          Go Back
        </Link>
        <Button variant="outline-danger" size="sm" onClick={showModal} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
          Delete Attendance
        </Button>
      </div>

      {loadingDelete && <Loading />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {successDelete && <Message variant="success">Attendance Deleted</Message>}

      {/* Date selector card */}
      <div className="hms-card" style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <h1 style={{ margin: 0, display: "flex", alignItems: "center", gap: "10px", fontSize: "1.4rem" }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
              <line x1="18" y1="20" x2="18" y2="10"/>
              <line x1="12" y1="20" x2="12" y2="4"/>
              <line x1="6" y1="20" x2="6" y2="14"/>
            </svg>
            Analysis
          </h1>

          {/* Date controls - inline, properly aligned */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
                Date:
              </span>
              <span style={{ fontWeight: 700, color: "var(--accent)", fontSize: "14px" }}>
                {startDate.toISOString().substring(0, 10)}
              </span>
            </div>
            <div style={{ lineHeight: 1 }}>
              <DatePicker
                selected={startDate}
                onChange={(date) => changeDate(date)}
                dateFormat="yyyy-MM-dd"
                popperPlacement="bottom-end"
              />
            </div>
          </div>
        </div>
      </div>

      <Modal show={modal} animation={true} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Attendance Records</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "16px" }}>
            Enter the number of days before today to delete attendance records.
          </p>
          <Form>
            <Form.Group controlId="days">
              <Form.Label>Number of Days</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Cancel</Button>
          <Button variant="danger" onClick={startDelete} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {<AnalysisComponent />}
    </>
  );
};

export default AnalysisView;
