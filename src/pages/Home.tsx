// import PageProps from "../utils/interfaces/PageProps";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormInterface from "../utils/interfaces/FormInterface";
import "../css/Home.css";
import NavBar from "../components/NavBar";

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
      <NavBar />

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
            <br />

            <div id="station">
              <label id="labelStationInput" htmlFor="stationInput">
                Station
              </label>
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
              onChange={(e) =>
                setFormInfo({ ...formInfo, date: e.target.value })
              }
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

            <label id="labelFileUpload" htmlFor="fileUpload">Upload .CSV file</label>
            <input type="file" id="fileUpload" name="filename"></input>

            {/* <div id="folder">
              <label id="labelFolderInput" htmlFor="folderInput">
                Folder
              </label>
              <fieldset id="folderInput">
                <input
                  id="folder1"
                  className="mt-0"
                  placeholder=""
                  onChange={(e) =>
                    setFormInfo({
                      ...formInfo,
                      station: [e.target.value, formInfo.station[1]],
                    })
                  }
                />
              </fieldset>
            </div> */}

            <div className="d-flex justify-content-end">
              <Link to="/dashboard">
                <button
                  onClick={() => console.log(formInfo)}
                  id="process"
                  className="btn btn-primary"
                >
                  Process
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
