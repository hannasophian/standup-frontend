// import PageProps from "../utils/interfaces/PageProps";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormInterface from "../utils/interfaces/FormInterface";
import styles from "../stylesheets/Home.module.css";

export default function Home(): JSX.Element {
  const [formInfo, setFormInfo] = useState<FormInterface>({
    section: "",
    station: ["", ""],
    direction: "",
    lane: 0,
    date: "2022-11-01",
    surveyor_name: "",
    uploadFile: "",
  });

  return (
    <div>

      <div className="row align-items-center justify-content-center p-1" id="header">
        <h1 className="col-sm-10">OWL 1.0</h1>
        <div className="col-sm-1">
          <button className="btn btn-primary">Register</button>
        </div>
      </div>
      
      <div className="row p-4">
        <div className="col-sm-2">

        </div>

        <form className="col-sm-10">
          <h4>INPUT DATA</h4>
          <h5>INFORMATION</h5>

          <label htmlFor="sectionInput">Section</label>
          <input
            id="sectionInput"
            onChange={(e) =>
              setFormInfo({ ...formInfo, section: e.target.value })
            }
          />
          <br/>

          <label htmlFor="stationInput">Station</label>
          <fieldset id="stationInput">
            <input
              id="1"
              onChange={(e) =>
                setFormInfo({
                  ...formInfo,
                  station: [e.target.value, formInfo.station[1]],
                })
              }
            />
            <p>to</p>
            <input
              id="2"
              onChange={(e) =>
                setFormInfo({
                  ...formInfo,
                  station: [formInfo.station[0], e.target.value],
                })
              }
            />
          </fieldset>          
          

          <label htmlFor="directionInput">Direction</label>
          <input
            id="directionInput"
            onChange={(e) =>
              setFormInfo({ ...formInfo, direction: e.target.value })
            }
          />

          <br />

          <label htmlFor="laneInput">Lane</label>
          <input
            id="laneInput"
            onChange={(e) =>
              setFormInfo({ ...formInfo, lane: parseInt(e.target.value) })
            }
          />
          <br />
          <label htmlFor="dateInput">Date</label>
          <input
            id="dateInput"
            onChange={(e) => setFormInfo({ ...formInfo, date: e.target.value })}
          />

          <br />

          <label htmlFor="surveyorInput">Name of surveyor</label>
          <input
            id="surveyorInput"
            onChange={(e) =>
              setFormInfo({ ...formInfo, surveyor_name: e.target.value })
            }
          />
          <br />

          <label htmlFor="fileInput">Input data</label>
          <fieldset id="fileInput">
            <button>Upload Here</button>
            <button>Upload Here</button>
          </fieldset>

          <Link to="/dashboard">
            <button onClick={() => console.log(formInfo)} className="btn btn-info">Process</button>
          </Link>
        </form>
        

      </div>
    </div>
  );
}
