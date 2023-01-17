import "./App.css";
import { useRef  } from "react";
import Papa from "papaparse";
import Button from 'react-bootstrap/Button';

function Uploader(props) {
const btnRef = useRef(null);
const changeHandler = (event) => {
    Papa.parse(event.target.files[0], {
      header: false,
      skipEmptyLines: true,
      complete: function (results) {
        props.setRows(results.data);
        props.setIndex(0);
        event.target.value = null;
      },
    });
};

  return (
    <>
      <Button variant="btn btn-light" onClick={() => btnRef.current.click()}>
        Import Table
      </Button>
      <input 
        ref={btnRef}
        type="file"
        name="file"
        onChange={changeHandler}
        
        accept=".csv"
        variant="btn btn-light"
        style={{display:"none"}} />
    </>
  );
}

export default Uploader;