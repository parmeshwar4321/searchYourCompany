import React, { useEffect, useState } from "react";
import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import axios from "axios";
import { CenterFocusStrong } from "@mui/icons-material";

const CompanyTable = () => {
  const [companyData, setCompanyData] = useState([]);

  let navigate = useNavigate();
  const handler = () => {
    navigate("/");
  };
  useEffect(() => {
    fetchCompanyData();
  }, []);
  async function fetchCompanyData() {
    const response = await axios.get(
      `http://localhost:8080/api/get_all_companies`
    );
    console.log(response.data.data);
    setCompanyData(response.data.data);
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>All Companies</h1>
      <Button
        variant="contained"
        color="success"
        startIcon={<Add />}
        onClick={handler}
      >
        Add Company
      </Button>
      <div
        style={{
          textAlign: "center",
          height: 631,
          maxWidth: "100%",
          padding: "1rem",
        }}
      >
        <DataGrid
          rows={companyData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
        />
      </div>
    </div>
  );
};

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "cin", headerName: "CIN", width: 300 },
  {
    field: "company_name",
    headerName: "Company Name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 500,
    valueGetter: (params) => `${params.row.company_name || ""}`,
  },
];

export default CompanyTable;
