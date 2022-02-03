// import PageProps from "../utils/interfaces/PageProps";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormInterface from "../utils/interfaces/FormInterface";

const styles = {
  header: {
    backgroundColor: "#fcca03"
  },
  label: {
    width : "15%",
    paddingLeft: "1%",
  },
  h4: {
    backgroundColor: "#fcca03",
    paddingLeft: "1%",
    marginBottom: 0
  },
  h5: {
    backgroundColor: "#dedede",
    paddingLeft: "1%"

  }
} as const;

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

      <div className="row align-items-center justify-content-center p-1" style={styles.header}>
        <h1 className="col-sm-10">OWL 1.0</h1>
        <div className="col-sm-1">
          <button className="btn btn-primary">Register</button>
        </div>
      </div>
      
      <div className="row p-4">
        <div className="col-sm-2">

        </div>
        <form className="col-sm-10">
          <h4 style={styles.h4}>INPUT DATA</h4>
          <h5 style={styles.h5}>INFORMATION</h5>

          <label htmlFor="sectionInput" style={styles.label}>Section</label>
          <input
            id="sectionInput"
            onChange={(e) =>
              setFormInfo({ ...formInfo, section: e.target.value })
            }
          />
          <br/>

          <label htmlFor="stationInput" style={styles.label}>Station</label>
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
          

          <label htmlFor="directionInput" style={styles.label}>Direction</label>
          <input
            id="directionInput"
            onChange={(e) =>
              setFormInfo({ ...formInfo, direction: e.target.value })
            }
          />

          <br />

          <label htmlFor="laneInput" style={styles.label}>Lane</label>
          <input
            id="laneInput"
            onChange={(e) =>
              setFormInfo({ ...formInfo, lane: parseInt(e.target.value) })
            }
          />
          <br />
          <label htmlFor="dateInput" style={styles.label}>Date</label>
          <input
            id="dateInput"
            onChange={(e) => setFormInfo({ ...formInfo, date: e.target.value })}
          />

          <br />

          <label htmlFor="surveyorInput" style={styles.label}>Name of surveyor</label>
          <input
            id="surveyorInput"
            onChange={(e) =>
              setFormInfo({ ...formInfo, surveyor_name: e.target.value })
            }
          />
          <br />

          <label htmlFor="fileInput" style={styles.label}>Input data</label>
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
