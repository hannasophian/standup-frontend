// import PageProps from "../utils/interfaces/PageProps";
import { useState } from "react";
import { Link } from "react-router-dom";
import FormInterface from "../utils/interfaces/FormInterface";

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
      <h1>OWL 1.0</h1>
      <button className="btn btn-primary">Register</button>
      <form>
        <label htmlFor="sectionInput">Section</label>
        <input
          id="sectionInput"
          onChange={(e) =>
            setFormInfo({ ...formInfo, section: e.target.value })
          }
        />
        <br />
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
      </form>
      <Link to="/dashboard">
        <button onClick={() => console.log(formInfo)}>Process</button>
      </Link>
    </div>
  );
}
