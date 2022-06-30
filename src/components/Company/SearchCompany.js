import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import toast, { Toaster } from "react-hot-toast";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import { Card } from "semantic-ui-react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
export default function Test() {
  const [searchValue, setSearchValue] = useState('');
  const [searchArray, setSetSearchArray] = useState([]);
  const [cidArray, setCidSearchArray] = useState([]);
  const [htmlResponse, setHtmlResponse] = useState("<div> </div>");
  let navigate = useNavigate();

  useEffect(() => {
    if (searchValue.length > 2) {
      searchCompany(searchValue);
    }
  }, [searchCompany, searchValue]);

  async function searchCompany(searchValue) {
    try {
      const response = await axios.post("/custom-search", {
        search: searchValue,
        filter: "company",
      });

      setHtmlResponse(response.data);
      return test();
    } catch (error) {
      console.log(error);
    }
  }

  function test() {
    let htmlObject = document.createElement("div");
    htmlObject.innerHTML = htmlResponse;
    let companyData = Object.keys(
      htmlObject.getElementsByClassName("show")
    ).map(
      (key) =>
        htmlObject
          .getElementsByClassName("show")
          [key].getAttribute("id")
          .split("/")[1]
    );
    let cidData = Object.keys(htmlObject.getElementsByClassName("show")).map(
      (key) =>
        htmlObject
          .getElementsByClassName("show")
          [key].getAttribute("id")
          .split("/")[2]
    );
    return setSetSearchArray(companyData), setCidSearchArray(cidData);
  }
  const insertResponse = (toastHandler = toast) =>
    toastHandler.success(`company inserted to Database successfully!`, {
      style: {
        background: "#04111d",
        color: "#fff",
      },
    });
  const changeHandler = (event) => {
    return setSearchValue(event.target.value);
  };
  const clickHandler = (event) => {
    setSearchValue(event.target.textContent);
  };
  const submitHandler = (event) => {
    event.preventDefault();
    console.log(searchArray, cidArray);
    axios
      .post("http://localhost:8080/api/company", {
        company_name: searchArray[0],
        cin: cidArray[0],
      })
      .then((resp) => {
        insertResponse();
        navigate("/addCompany");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ margin: "30px 10px" }}>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
          }}
        >
          <InputBase
            options={searchArray}
            getOptionLabel={(option) => option}
            value={searchValue}
            onChange={changeHandler}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Companies..."
            inputProps={{ "aria-label": "search google maps" }}
          />
          <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
        <Paper>
          <Card.Group itemsPerRow={3} style={{ marginTop: 20 ,cursor:"pointer"}}>
            {searchValue.length > 1
              ? searchArray.map((item, i) => {
                  return (
                    <Card sty onClick={clickHandler} key={i}>
                      <Card.Content>
                        <Card.Header>{item}</Card.Header>
                      </Card.Content>
                    </Card>
                  );
                })
              : searchArray.map((item) => {
                  return (
                    <Card>
                      <Card.Content>
                        <Card.Header>{item}</Card.Header>
                      </Card.Content>
                    </Card>
                  );
                })}
          </Card.Group>
        </Paper>
      </div>
      <div>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success" onClick={submitHandler}>
            Submit
          </Button>
        </Stack>
      </div>{" "}
    </div>
  );
}
