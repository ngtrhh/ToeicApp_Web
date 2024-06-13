import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api";

const Courses = () => {
  const [sign, setSign] = useState(1);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  const getCourses = async () => {
    const list = await Api.getAllClasses();
    const parseList = list.map((item, index) =>
      item.hasOwnProperty("allow")
        ? { ...item, id: index + 1 }
        : { ...item, allow: false, id: index + 1 }
    );
    // let filtered;
    // if (sign === 1)
    //   filtered = parseList
    //     .filter((item) => item.allow === false || item.allow === undefined)
    //     .map((item2, index) => ({ ...item2, id: index + 1 }));
    // else if (sign === 2)
    //   filtered = parseList
    //     .filter((item) => item.allow === true)
    //     .map((item2, index) => ({ ...item2, id: index + 1 }));

    setCourses(parseList);
  };

  useEffect(() => {
    getCourses();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 50,
      headerClassName: "bg-primary text-white",
    },
    {
      field: "ClassName",
      headerName: "Title",
      flex: 1,
      headerClassName: "bg-primary text-white",
    },
    {
      field: "Start_Date",
      headerName: "Start date",
      align: "center",
      headerAlign: "center",
      headerClassName: "bg-primary text-white",
      valueGetter: (value) => (value ? value : "----"),
    },
    {
      field: "Finish_Date",
      headerName: "Finish date",
      align: "center",
      headerAlign: "center",
      headerClassName: "bg-primary text-white",
      valueGetter: (value) => (value ? value : "----"),
    },
    {
      field: "MaximumStudents",
      headerName: "Maximum student",
      width: 150,
      align: "center",
      headerAlign: "center",
      headerClassName: "bg-primary text-white",
      valueGetter: (value) => (value ? value : "----"),
    },
    {
      field: "Skill",
      headerName: "About skill",
      headerClassName: "bg-primary text-white",
      width: 150,
      align: "center",
      headerAlign: "center",
      valueGetter: (value) => (value && value.length > 0 ? value : "----"),
    },
    {
      field: "Tuition",
      headerName: "Fee",
      headerClassName: "bg-primary text-white",
      align: "center",
      headerAlign: "center",
      width: 150,
      valueGetter: (value) =>
        value
          ? value.toLocaleString("it-IT", {
              style: "currency",
              currency: "VND",
            })
          : "----",
    },
    {
      field: "actions",
      headerName: "",
      align: "center",
      width: 300,
      headerClassName: "bg-primary text-white",
      cellClassName: "d-flex justify-content-center",
      renderCell: (params) => {
        return (
          <strong className="d-flex w-100 flex-row justify-content-end align-items-center gap-4">
            <Button
              className="text-primary"
              onClick={async () => {
                await Api.updateClass(params.row.classId, { allow: true });
                getCourses();
              }}
            >
              {sign === 1 && "Allow"}
            </Button>
            <Button
              onClick={() =>
                navigate("/courses/" + params.row.classId, {
                  state: {
                    classId: params.row.classId,
                  },
                })
              }
            >
              See
            </Button>
            <Button
              className="text-secondary"
              onClick={async () => {
                const shouldDelete = window.confirm(
                  "Are you sure you want to delete this course?"
                );

                if (shouldDelete) {
                  await Api.deleteClass(params.row.classId);
                  setCourses(
                    courses.filter(
                      (record) => record.classId != params.row.classId
                    )
                  );
                }
              }}
            >
              Delete
            </Button>
          </strong>
        );
      },
    },
  ];

  return (
    <div className="d-flex flex-column p-4 gap-4">
      <div className="text-primary fw-semibold fs-5 text-uppercase">
        Courses
      </div>

      <div className="d-flex flex-row justify-content-center">
        <Button
          onClick={() => setSign(1)}
          className={clsx(
            "shadow-none rounded-0",
            sign === 1 ? "bg-primary text-white" : "text-dark bg-white"
          )}
          variant="contained"
        >
          Pending Approval
        </Button>
        <Button
          onClick={() => setSign(2)}
          className={clsx(
            "shadow-none rounded-0",
            sign === 2 ? "bg-primary text-white" : "text-dark bg-white"
          )}
          variant="contained"
        >
          Approved
        </Button>
      </div>
      <DataGrid
        className="bg-white"
        columns={columns}
        rows={
          sign === 1
            ? courses
                .filter(
                  (item) => item.allow === false || item.allow === undefined
                )
                .map((item2, index) => ({ ...item2, key: index + 1 }))
            : sign === 2 &&
              courses
                .filter((item) => item.allow === true)
                .map((item2, index) => ({ ...item2, key: index + 1 }))
        }
        disableColumnMenu
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-footerContainer": { display: "none" },
          "& .MuiDataGrid-overlayWrapper": {
            minHeight: "50px !important",
          },
          "& .MuiDataGrid-filler": {
            display: "none",
          },
        }}
      />
    </div>
  );
};

export default Courses;
