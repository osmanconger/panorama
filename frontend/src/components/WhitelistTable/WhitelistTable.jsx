import { TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

import "../Form.css";

const WhitelistTable = props => {
  const { user } = useContext(AuthContext);
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);

  // get the list of users
  useEffect(() => {
    fetch(`https://api.panoramas.social/api/users`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        let temp = json.users
          .filter(item => item.email !== user.email)
          .map((item, idx) => {
            item.id = idx;
            item.isLinkedinUser = item.isLinkedinUser ? "Linkedin" : "Panorama";
            return item;
          });
        setOriginalRows(temp);
        setRows(temp);
      })
      .catch(err => console.error(err));
  }, []);

  const doSearch = e => {
    const filteredRows = originalRows.filter(row => {
      return (row.email + row.firstname + row.lastname + row.isLinkedinUser)
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setRows(filteredRows);
  };

  const columns = [
    { field: "email", headerName: "Email", width: 280 },
    { field: "firstname", headerName: "First name", width: 100 },
    { field: "lastname", headerName: "Last name", width: 100 },
    { field: "isLinkedinUser", headerName: "User Type", width: 100 }
  ];

  return (
    <div style={{ height: Math.min(400, rows.length * 52 + 110), width: 650 }}>
      <div className="formElement">
        Whitelist Users
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          placeholder="Search"
          onChange={doSearch}
        />
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={Math.min(rows.length, 5)}
        rowsPerPageOptions={[Math.min(rows.length, 5)]}
        checkboxSelection
        disableColumnMenu
        onSelectionModelChange={newSelection => {
          props.callback(newSelection.map(rowId => originalRows[rowId].email));
        }}
      />
    </div>
  );
};

export default WhitelistTable;
