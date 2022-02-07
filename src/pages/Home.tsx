// import PageProps from "../utils/interfaces/PageProps";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormInterface from "../utils/interfaces/FormInterface";
import "../css/Home.css";

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
          <button className="btn btn-secondary">Register</button>
        </div>
      </div>
      
      <div className="row p-4">
        <div className="col-sm-2">
          <div className="row sidebar">
            <h5>DASHBOARD</h5>
            <h6>Executive Summary</h6>
          </div>

          <div className="row sidebar">
            <h5>PERFORMANCE</h5>
            <h6>All data</h6>
            <h6>Potholes</h6>
          </div>

          <div className="row sidebar">
            <h5>REPORT</h5>
            <h6>My Report</h6>
          </div>
        </div>

        <form className="col-sm-10 p-0">
          <h4>INPUT DATA</h4>
          <h5>INFORMATION</h5>

          <div id="inputFields" className="p-4 pt-2">
            <label htmlFor="sectionInput">Section</label>
            <input
              id="sectionInput"
              onChange={(e) =>
                setFormInfo({ ...formInfo, section: e.target.value })
              }
            />
            <br/>
            
            <div id="station">
              <label id="labelStationInput" htmlFor="stationInput">Station</label>
              <fieldset id="stationInput">
                <input
                  id="stationFrom"
                  onChange={(e) =>
                    setFormInfo({
                      ...formInfo,
                      station: [e.target.value, formInfo.station[1]],
                    })
                  }
                />
                &nbsp;&nbsp;<p id="station">to</p>&nbsp;&nbsp;
                <input
                  id="stationTo"
                  onChange={(e) =>
                    setFormInfo({
                      ...formInfo,
                      station: [formInfo.station[0], e.target.value],
                    })
                  }
                />
              </fieldset>  
            </div>

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
              <button>Upload Here</button>&nbsp;&nbsp;
              <button>Upload Here</button>
            </fieldset>
            
            <div className="d-flex justify-content-end">
              <Link to="/dashboard">
                <button onClick={() => console.log(formInfo)} id="process" className="btn btn-primary">Process</button>
              </Link>
            </div>
          </div>
        </form>
        

      </div>
    </div>
  );
}
