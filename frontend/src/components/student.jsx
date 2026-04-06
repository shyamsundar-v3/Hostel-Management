import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Student = ({ stuentDetails: student }) => {
  const getStatusClass = (status) => {
    if (!status) return 'status-badge--hostel';
    const lower = status.toLowerCase();
    if (lower === 'outside') return 'status-badge--outside';
    if (lower === 'home') return 'status-badge--home';
    return 'status-badge--hostel';
  };

  return (
    <Card className="student-card">
      <Link to={`/student/${student._id}`}>
        <div className="card-img-wrapper">
          <img src={student.image} alt={student.name} />
        </div>
      </Link>
      <Card.Body>
        <Link to={`/student/${student._id}`} className="student-name">
          {student.name}
        </Link>

        <div className="student-meta">
          <span>
            <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Room {student.roomNo}
          </span>
          <span>
            <svg className="meta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
            {student.category}
          </span>
          {student.status && (
            <span>
              <span className={`status-badge ${getStatusClass(student.status)}`}>
                <span className="status-badge__dot" />
                {student.status}
              </span>
            </span>
          )}
        </div>

        <div className="student-contact">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px', opacity: 0.5 }}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <a href={`tel:${student.contact}`}>{student.contact}</a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Student;
