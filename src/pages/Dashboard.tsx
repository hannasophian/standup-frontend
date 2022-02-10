// import { UserInterface } from "../utils/interfaces/UserInterface";

import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../css/Dashboard.css";

export default function Dashboard(): JSX.Element {
  return (
    <div className="dashboard">
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

        <div className="col-sm-10 p-0">
          <h4>POTHOLE VIEWER</h4>
          <h5>SEGMENT INFORMATION</h5>

          <div id="inputFieldsDashboard" className="p-4 pt-2">
            <div className="col">
              <label htmlFor="sectionInput">Section</label>
              <input id="sectionInput" />
              <br />

              <div id="station">
                <label id="labelStationInput" htmlFor="stationInput">
                  Station
                </label>
                <fieldset id="stationInput">
                  <input id="stationFrom" />
                  &nbsp;&nbsp;<p id="station">to</p>&nbsp;&nbsp;
                  <input id="stationTo" />
                </fieldset>
              </div>

              <label htmlFor="directionInput">Total distance</label>
              <input id="directionInput" />
            </div>
            <div className="col">
              <label htmlFor="laneInput">Direction</label>
              <input id="laneInput" />
              <br />
              <label htmlFor="dateInput">Lane</label>
              <input id="dateInput" />

              <br />

              <label htmlFor="surveyorInput">Dates</label>
              <input id="surveyorInput" />
              <br />
            </div>
          </div>

          <br />

          <div className="p-4 pt-2">
            <h5>PROFILE SEGMENT</h5>
            <div className="image"></div>
          </div>

          <div className="p-4 pt-2">
            <div className="media">
              <div className="w-50 p-3">
                <h5>IMAGE</h5>
                <div className="image"></div>
              </div>
              <div className="w-50 p-3">
                <h5>VIDEO</h5>
                <div className="image"></div>
              </div>
            </div>
          </div>

          <div className="p-4 pt-2">
            <h5>SUMMARY</h5>
            <table>
              <tr>
                <th>Item</th>
                <th>ID</th>
                <th>Qty</th>
                <th>%</th>
              </tr>
              <tr>
                <td>Total area of pothole (m2)</td>
                <td>PO1</td>
                <td>75.3</td>
                <td>3.2</td>
              </tr>
              <tr>
                <td>Total volume of pothole (m3)</td>
                <td>PO2</td>
                <td>15.0</td>
                <td></td>
              </tr>
              <tr>
                <td>Average depth of pothole (cm)</td>
                <td>PO3</td>
                <td>2.1</td>
                <td></td>
              </tr>
              <tr>
                <td>Quantity of pothole</td>
                <td>PO4</td>
                <td>83</td>
                <td></td>
              </tr>
            </table>
          </div>

          <div className="p-4 pt-2">
            <h5> </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
