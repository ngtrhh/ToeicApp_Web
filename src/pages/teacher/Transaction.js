import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Api from '../../api/Api';
import { useNavigate } from "react-router-dom";
// const transactions = [
//   {
//     id: 'TXN12345',
//     info: 'Payment for Advanced React Course',
//     type: 'Credit',
//     fee: '$500',
//     time: '2024-06-09 12:34:56',
//   },
//   {
//     id: 'TXN67890',
//     info: 'Refund for JavaScript Basics',
//     type: 'Debit',
//     fee: '$200',
//     time: '2024-06-08 10:20:30',
//   },
//   // Thêm các giao dịch khác ở đây
// ];

const Transaction = () => {
    const navigate = useNavigate();
    const [transactions, setTransaction] = useState([])
    const getTests = async () => {
        const list = await Api.getAllTransaction()
        
        setTransaction(list);
      };
    
      useEffect(() => {
        getTests();
      }, []);
  const handleViewUserDetails = (transactionId) => {
    // Function to view user details
    console.log('View details for transaction:', transactionId);
  };

  const handleViewCourseDetails = (transactionId) => {
    // Function to view course details
    console.log('View course details for transaction:', transactionId);
    navigate("/course/" + transactionId, {
        state: { classId: transactionId, teacherId:''},
      });
  };
  const converttime=(timestamp)=>{
    const date = new Date(timestamp);

// Chuyển đổi đối tượng Date thành chuỗi có định dạng dễ đọc
const formattedDate = date.toLocaleString();
return formattedDate||"unk"
  }

  return (
    <div className="d-flex flex-column p-4 gap-4">
      <div className="text-primary fw-semibold fs-5 text-uppercase">Transactions</div>
    <Container>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Transaction Info</TableCell>
              <TableCell>Transaction Type</TableCell>
              <TableCell>Fee</TableCell>
              <TableCell>Transaction Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions?.map((transaction) => (
              <TableRow key={transaction?.orderId}>
                <TableCell>{transaction?.orderId}</TableCell>
                <TableCell>{transaction?.orderInfo}</TableCell>
                <TableCell>{transaction?.orderType}</TableCell>
                <TableCell>{transaction?.amount}</TableCell>
                <TableCell>{converttime(transaction?.responseTime)}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleViewUserDetails(transaction?.userId)}
                    sx={{ mr: 1 }}
                  >
                    View User Details
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => handleViewCourseDetails(transaction?.classId)}
                  >
                    View Course Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
    </div>
  );
};

export default Transaction;
