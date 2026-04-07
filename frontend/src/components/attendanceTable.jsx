import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./loader";
import Message from "./message";
import AttendanceTableComponent from "./attendanceTableComponent";

const AttendanceTable = ({ roomNo }) => {
  const dispatch = useDispatch();
  const [attendanceMap, setAttendanceMap] = useState({});

  const getStudentsByRoomNo = useSelector((state) => state.getStudentsByRoomNo);
  const { loading, error, students, attendance } = getStudentsByRoomNo;
  const attendanceDataEnter = useSelector((state) => state.attendanceDataEnter);
  const {
    loading: loadingAttendance,
    error: errorAttendance,
  } = attendanceDataEnter;

  const arrangeTable = useCallback(() => {
    if (attendance) {
      var tempMap = { ...attendanceMap };
      students.forEach((student) => {
        if (attendance.data[student._id]) {
          tempMap[student._id] = attendance.data[student._id];
        } else {
          tempMap[student._id] = "Hostel";
        }
      });
      setAttendanceMap(tempMap);
    } else {
      var temp = { ...attendanceMap };
      students.forEach((student) => {
        temp[student._id] = "Hostel";
      });
      setAttendanceMap(temp);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attendance, students]);

  useEffect(() => {
    if (students) {
      arrangeTable();
    }
  }, [dispatch, attendance, students, arrangeTable]);

  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading || loadingAttendance ? (
        <Loading />
      ) : (
        <>
          {errorAttendance && (
            <Message variant="danger">{errorAttendance}</Message>
          )}
          {students && (
            <>
              <AttendanceTableComponent
                students={students}
                attendanceMap={attendanceMap}
                setAttendanceMap={setAttendanceMap}
                attendance={attendance}
                roomNo={roomNo}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default AttendanceTable;