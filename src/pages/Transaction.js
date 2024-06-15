import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import Api from "../api/Api";

const Transaction = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);

  const getTransactions = async () => {
    const list = await Api.getAllTransaction();
    const parseList = list.map((item, index) => ({
      ...item,
      key: index + 1,
      id: item.Id,
    }));
    setTransactions(parseList);
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const converttime = (timestamp) => {
    const date = new Date(timestamp);

    // Chuyển đổi đối tượng Date thành chuỗi có định dạng dễ đọc
    const formattedDate = date.toLocaleString();
    return formattedDate || "unk";
  };

  console.log(transactions);

  const columns = [
    {
      field: "key",
      headerName: "#",
      width: 50,
      headerClassName: "bg-primary text-white",
    },
    {
      field: "orderId",
      headerName: "Transaction ID",
      width: 200,
      headerClassName: "bg-primary text-white",
    },
    {
      field: "orderInfo",
      headerName: "Transaction Info",
      width: 200,
      headerClassName: "bg-primary text-white",
    },
    {
      field: "orderType",
      headerName: "Transaction Type",
      width: 200,
      align: "center",
      headerAlign: "center",
      headerClassName: "bg-primary text-white",
    },
    {
      field: "responseTime",
      headerName: "Response Time",
      width: 200,
      align: "center",
      headerAlign: "center",
      headerClassName: "bg-primary text-white",
      valueGetter: (value) => converttime(value),
    },
    {
      field: "amount",
      headerName: "Fee",
      align: "center",
      headerAlign: "center",
      width: 150,
      headerClassName: "bg-primary text-white",
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
      flex: 1,
      headerClassName: "bg-primary text-white",
      cellClassName: "d-flex justify-content-center",
      renderCell: (params) => {
        return (
          <strong className="d-flex w-100 flex-row justify-content-end align-items-center gap-5">
            <Button
              className="text-primary"
              onClick={async () =>
                navigate("/user/" + params.row.userId, {
                  state: { userId: params.row.userId },
                })
              }
            >
              View User Details
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
              View Course Details
            </Button>
          </strong>
        );
      },
    },
  ];

  return (
    <div className="d-flex flex-column p-4 gap-4">
      <div className="text-primary fw-semibold fs-5 text-uppercase">
        Transactions
      </div>

      <DataGrid
        className="bg-white"
        columns={columns}
        rows={transactions}
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

export default Transaction;
