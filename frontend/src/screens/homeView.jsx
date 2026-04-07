import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ButtonGroup, ToggleButton } from "react-bootstrap";
import StudentsTableView from "./studentTableView";
import Student from "../components/student";
import { listStudents } from "../actions/studentActions";
import Message from "../components/message";
import Loader from "../components/loader";
import Paginate from "../components/paginate";

const HomeView = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const [viewMode, setViewMode] = useState("grid");

  const dispatch = useDispatch();
  const studentsList = useSelector((state) => state.studentsList);
  const { loading, error, students, page, pages } = studentsList;

  React.useEffect(() => {
    dispatch(listStudents(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <div className="hms-page-header">
        <h1>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginRight: "10px", verticalAlign: "middle", opacity: 0.7 }}
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          Students
        </h1>

        {/* View Toggle */}
        <div className="hms-view-toggle">
          <ButtonGroup toggle>
            <ToggleButton
              type="radio"
              name="view"
              value="grid"
              checked={viewMode === "grid"}
              onChange={() => setViewMode("grid")}
              className={viewMode === "grid" ? "active" : ""}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "6px" }}
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Grid
            </ToggleButton>
            <ToggleButton
              type="radio"
              name="view"
              value="table"
              checked={viewMode === "table"}
              onChange={() => setViewMode("table")}
              className={viewMode === "table" ? "active" : ""}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginRight: "6px" }}
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              Table
            </ToggleButton>
          </ButtonGroup>
        </div>
      </div>

      {viewMode === "table" ? (
        <StudentsTableView keyword={keyword} pageNumber={pageNumber} />
      ) : loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="animate-stagger">
            {students &&
              students.map((student) => (
                <Col key={student._id} sm={12} md={6} lg={4} xl={3}>
                  <Student stuentDetails={student} />
                </Col>
              ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeView;
