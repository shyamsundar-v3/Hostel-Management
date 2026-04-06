import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Student from "../components/student";
import Loading from "../components/loader.jsx";
import Message from "../components/message.jsx";
import { listStudents } from "../actions/studentActions";
import Paginate from "../components/paginate";
import {
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
  Container,
} from "react-bootstrap";
import StudentsTableView from "./studentTableView";

const HomeView = ({ match, history }) => {
  const [isGrid, setIsGrid] = useState(true);
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;
  const userLogin = useSelector((state) => state.userLogin);
  const { loading: userLoading, userInfo } = userLogin;

  const dispatch = useDispatch();

  const studentsList = useSelector((state) => state.studentsList);
  const { loading, error, students, page, pages } = studentsList;

  useEffect(() => {
    if (!userLoading && !userInfo) {
      history.push("/login");
    }
    dispatch(listStudents(keyword, pageNumber));
  }, [keyword, pageNumber]);

  return (
    <>
      <div className="hms-page-header">
        <h1>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '10px', verticalAlign: 'middle', opacity: 0.7 }}>
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Students
        </h1>
        <div className="hms-view-toggle">
          <ButtonGroup toggle>
            {["Grid", "Table"].map((type) => (
              <ToggleButton
                key={type}
                type="radio"
                variant="secondary"
                name="radio"
                value={type}
                checked={(isGrid ? "Grid" : "Table") === type}
                onChange={(e) =>
                  setIsGrid(e.target.value === "Grid" ? true : false)
                }
              >
                {type === "Grid" ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                    </svg>
                    Grid
                  </span>
                ) : (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                    </svg>
                    Table
                  </span>
                )}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : isGrid ? (
        <>
          <Row className="animate-stagger">
            {students.map((student) => (
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
      ) : (
        <StudentsTableView keyword={keyword} pageNumber={pageNumber} />
      )}
    </>
  );
};

export default HomeView;
