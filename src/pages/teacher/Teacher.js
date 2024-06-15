import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Api from "../../api/Api";

const Teacher = () => {
  const [sign, setSign] = useState(1);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const getUsers = async () => {
    const list = await Api.getAllTeachers();
    const parseList = list?.map((item) =>
      item.hasOwnProperty("allow") ? item : { ...item, allow: false }
    );

    const temp1 = parseList?.map((item, index) => ({
      ...item,
      userId: item.id,
    }));
    const temp2 = temp1?.map((item, index) => ({ ...item, id: index + 1 }));
    setUsers(temp2);
  };

  useEffect(() => {
    getUsers();
  }, [sign]);

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
    {
      field: "birthdate",
      headerName: "DOB",
      align: "center",
      headerAlign: "center",
      headerClassName: "bg-primary text-white",
      valueGetter: (value) => (value ? value : "----"),
    },
    {
      field: "score",
      headerName: "TOEIC Score",
      align: "center",
      headerAlign: "center",
      headerClassName: "bg-primary text-white",
      valueGetter: (value) => (value ? value : "----"),
    },
    {
      field: "otherCertificate",
      headerName: "Certificates",
      headerClassName: "bg-primary text-white",
      width: 150,
      valueGetter: (value) => (value && value?.length > 0 ? value : "----"),
    },
    {
      field: "university",
      headerName: "University",
      headerClassName: "bg-primary text-white",
      flex: 1,
      valueGetter: (value) => (value ? value : "----"),
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
          <strong className="d-flex w-100 flex-row justify-content-end align-items-center gap-5">
            {sign === 1 && (
              <Button
                className="text-primary"
                onClick={async () => {
                  await Api.updateUser(params.userId.id, { allow: true });
                  getUsers();
                }}
              >
                Allow
              </Button>
            )}
            <Button
              onClick={() =>
                navigate("/teacher/" + params.userId.id, {
                  state: { userId: params.userId.id },
                })
              }
            >
              See
            </Button>
            <Button
              className="text-secondary"
              onClick={async () => {
                const shouldDelete = window.confirm(
                  "Are you sure you want to delete this user?"
                );

                if (shouldDelete) {
                  await Api.deleteUser(params.userId.id);
                  setUsers(
                    users?.filter((record) => record.id != params.userId.id)
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
        Teacher Profile
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
            ? users
                ?.filter(
                  (item) => item.allow === false || item.allow === undefined
                )
                ?.map((item2, index) => ({ ...item2, key: index + 1 }))
            : sign === 2 &&
              users
                ?.filter((item) => item.allow === true)
                ?.map((item2, index) => ({ ...item2, key: index + 1 }))
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

export default Teacher;
