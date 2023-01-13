import React, { useState } from "react";
//REDUX
import { useDispatch } from "react-redux";
import { UploadDataAction } from "../redux/actions/UploadDataActions";
import { useSnackbar } from "notistack";

function UploadData() {
  const { enqueueSnackbar } = useSnackbar();

  const [file, setFile] = useState();
  const [communityName, setCommunityName] = useState("");
  const [communitySize, setCommunitySize] = useState("");

  const fileReader = new FileReader();

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(UploadDataAction(communityName, communitySize, file)).then(() => {
      enqueueSnackbar("Created Successfully");
    });

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        console.log(csvOutput);
      };
      fileReader.readAsText(file);
    }
  };

  //REDUX
  return (
    <div style={{ textAlign: "center" }}>
      <h1>REACTJS CSV IMPORT EXAMPLE </h1>
      <form>
        Community Name:
        <input
          type="text"
          value={communityName}
          onChange={(e) => setCommunityName(e.target.value)}
        />
        Community Size:
        <input
          type="text"
          value={communitySize}
          onChange={(e) => setCommunitySize(e.target.value)}
        />
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange} 
        />
        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
      </form>
    </div>
  );
}

export default UploadData;
