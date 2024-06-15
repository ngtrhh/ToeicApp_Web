import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import api from "../../api/Api";
import { useNavigate } from "react-router-dom";

function User() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    const list = await api.getUsers();
    console.log(list);
    for (let data of list) {
      if (data.currentScore) {
        if (data.currentScore >= 0 && data.currentScore <= 250) {
          data.level = "0 (Basic Proficiency)";
        } else if (data.currentScore <= 400) {
          data.level = "1 (Elementary Proficiency)";
        } else if (data.currentScore <= 600) {
          data.level = "2 (Elementary Proficiency Plus)";
        } else if (data.currentScore <= 780) {
          data.level = "3 (Limited Working Proficiency)";
        } else if (data.currentScore <= 900) {
          data.level = "4 (Working Proficiency Plus)";
        } else if (data.currentScore <= 990) {
          data.level = "5 (International Professional Proficiency)";
        }
      }
    }

    let parseList = [];
    list?.map((item) => {
      if (!item.hasOwnProperty("type") || item?.type !== "Teacher")
        parseList.push(item);
    });

    const addKey = parseList?.map((item) => ({ ...item, userId: item.id }));
    const temp = addKey?.map((item, index) => ({ ...item, id: index + 1 }));

    setUsers(temp);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "#",
      width: 50,
      headerClassName: "bg-primary text-white",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerClassName: "bg-primary text-white",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      headerClassName: "bg-primary text-white",
    },
    // {
    //   field: "birthdate",
    //   headerName: "DOB",
    //   align: "center",
    //   headerAlign: "center",
    //   headerClassName: "bg-primary text-white",
    //   valueGetter: (value) => (value ? value : "----"),
    // },
    // {
    //   field: "score",
    //   headerName: "Entry Score",
    //   align: "center",
    //   headerAlign: "center",
    //   headerClassName: "bg-primary text-white",
    //   valueGetter: (value) => (value ? value : "----"),
    // },
    {
      field: "currentScore",
      headerName: "Current Score",
      align: "center",
      headerAlign: "center",
      headerClassName: "bg-primary text-white",
      valueGetter: (value) => (value ? value : "----"),
    },
    {
      field: "targetScore",
      headerName: "Target Score",
      align: "center",
      headerAlign: "center",
      headerClassName: "bg-primary text-white",
      valueGetter: (value) => (value && value.length > 0 ? value : "----"),
    },
    {
      field: "HistoryPractice",
      headerName: "Practice History",
      headerClassName: "bg-primary text-white",
      valueGetter: (value) => (value ? value.length : 0),
    },
    {
      field: "PracticeTime",
      headerName: "Practice Time",
      headerClassName: "bg-primary text-white",
      valueGetter: (value) => (value ? value : "00:00:00"),
    },
    {
      field: "level",
      headerName: "Expected Level",
      headerClassName: "bg-primary text-white",
      flex: 1,
      valueGetter: (value) => (value ? value : "----"),
    },
    {
      field: "actions",
      headerName: "",
      align: "center",
      headerClassName: "bg-primary text-white",
      cellClassName: "d-flex justify-content-center",
      renderCell: (params) => {
        return (
          <Button
            onClick={() =>
              navigate("/user/" + params.id, {
                state: { userId: params.id },
              })
            }
          >
            See
          </Button>
        );
      },
    },
  ];

  return (
    <div className="d-flex flex-column p-4 gap-4">
      <div className="text-primary fw-semibold fs-5 text-uppercase">
        Students
      </div>

      <div className="d-flex flex-column bg-white">
        <DataGrid
          columns={columns}
          rows={users}
          disableColumnMenu
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              printOptions: { disableToolbarButton: true },
              csvOptions: { disableToolbarButton: true },
            },
          }}
          sx={{
            "& .MuiDataGrid-footerContainer": { display: "none" },
            "& .MuiDataGrid-root": {
              borderTopLeftRadius: "0 !important",
              borderTopRightRadius: 0,
            },
            "& .MuiDataGrid-overlayWrapper": {
              minHeight: "50px !important",
            },
            "& .MuiDataGrid-filler": {
              display: "none",
            },
          }}
        />
      </div>
    </div>
  );
}

export default User;
