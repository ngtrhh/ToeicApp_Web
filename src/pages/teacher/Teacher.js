import React, { useState, useEffect } from "react";
import clsx from "clsx";

import { Button } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";
import Api from "../../api/Api";
import { useNavigate } from "react-router-dom";

const USER=[{
  name:"Nguyễn Minh Anh",
  email:"ma231@gmail.com",
  birthdate:"1/3/2003",
  score:"910",
  otherCertificate:["ielts-8.0"],
  university:"UIT",
  id:"7rjshr988328489385"
},
{
  name:"Trần Hồng Kha",
  email:"hongkha@gmail.com",
  birthdate:"1/2/2005",
  score:"890",
  otherCertificate:["ielts-7.0"],
  university:"USSH",
  id:"7rjshr988328489386"
},
{
  name:"Trần Hoa",
  email:"hoa@gmail.com",
  birthdate:"2/2/2001",
  score:"880",
  otherCertificate:["toeic sw"],
  university:"UIT",
  id:"7rjshr988328489387"
},
{
  name:"Trương Thị Kim",
  email:"kim@gmail.com",
  birthdate:"30/5/1999",
  score:"900",
  otherCertificate:["toeic sw"],
  university:"UIT",
  id:"7rjshr988328489388"
},
{
  name:"Trương Mỹ Lan ",
  email:"mylan@gmail.com",
  birthdate:"2/2/2000",
  score:"880",
  otherCertificate:["toeic sw"],
  university:"UIT",
  id:"7rjshr988328489389"
}
]

const Teacher = () => {
  const [sign, setSign] = useState("1");
  const [users, setUsers] = useState([]);
  const UserRow = ({ user }) => {
    const navigate = useNavigate();
  const viewTopic = (item) => {
    navigate("/Teacher/" +  user.id, {
      state: { userId: user.id },
    });
  };
  const allowfunc = async()=>{
    await Api.updateUser(user.id,{allow:true});
    getTests()
  }
    return (
      <TableRow>
        <TableCell>{user.name ? user.name : "unk"}</TableCell>
        <TableCell>{user.email ? user.email : "unk"}</TableCell>
        <TableCell>{user.birthdate ? user.birthdate : "unk"}</TableCell>
        <TableCell>{user.score ? user.score : "unk"}</TableCell>
        <TableCell>
          {user.otherCertificate ? user.otherCertificate[0] : "no"}
        </TableCell>
        <TableCell>
          {user.university ? user.university : "unk"}
        </TableCell>
        <TableCell><Button  onClick={() => {viewTopic()}}>See</Button></TableCell>
        <TableCell><Button onClick={() => {allowfunc()}}>Allow</Button></TableCell>
        <TableCell><Button>Delete</Button></TableCell>
      </TableRow>
    );
  };
  const UserTable = ({ users }) => {
    return (
      <Paper>
        <Table>
          <TableHead style={{ backgroundColor: "#62A912" }}>
            <TableRow>
              <TableCell style={{ color: "#fff", fontSize: 15 }}>Name</TableCell>
              <TableCell style={{ color: "#fff", fontSize: 15 }}>Email</TableCell>
              <TableCell style={{ color: "#fff", fontSize: 15 }}>Age</TableCell>
              <TableCell style={{ color: "#fff", fontSize: 15 }}>
                Score
              </TableCell>
              <TableCell style={{ color: "#fff", fontSize: 15 }}>
                Certificates
              </TableCell>
              <TableCell style={{ color: "#fff", fontSize: 15 }}>
                University
              </TableCell>
              <TableCell style={{ color: "#fff", fontSize: 15 }}>
                
              </TableCell>
              <TableCell style={{ color: "#fff", fontSize: 15 }}/>
              <TableCell style={{ color: "#fff", fontSize: 15 }}/>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user, index) => (
              <UserRow key={index} user={user} />
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  };
  const getTests = async () => {
    const list = await Api.getAllTeachers()
    let filtered= list?.filter(function(item) {
      return item?.allow===false||item?.allow===undefined
     })
     setUsers(filtered)
  };

  useEffect(() => {
    getTests();
  }, []);
  
  return (
    <div className="d-flex flex-column p-4 gap-4">
      <div className="text-primary fw-semibold fs-5 text-uppercase">Teacher Profile</div>

      <div className="d-flex flex-row justify-content-center">
        <Button
          onClick={() => {
            setSign("1")
            let filtered= users?.filter(function(item) {
              return item?.allow===false||item?.allow===undefined
             })
             setUsers(filtered)
          }}
          className={clsx(
            "shadow-none rounded-0",
            sign === "1" ? "bg-primary text-white" : "text-dark bg-white"
          )}
          variant="contained"
        >
          Pending Approval 
        </Button>
        <Button
          onClick={() => {
            setSign("2")
            let filtered= users?.filter(function(item) {
              return item?.allow===true
             })
             setUsers(filtered)
          }}
          className={clsx(
            "shadow-none rounded-0",
            sign === "2" ? "bg-primary text-white" : "text-dark bg-white"
          )}
          variant="contained"
        >
          Approved
        </Button>
      </div>
      <UserTable users={users} />
</div>
  )
}

export default Teacher