// import { useEffect, useState } from "react";
// import fetchPreviousStandups from "../utils/fetch/fetchPreviousStandups";
import toStringDate from "../utils/helpers/toStringDate";
import StandupInterface from "../utils/interfaces/StandupInterface";

interface FutureStandupsProps {
  team_id: number;
  standups: StandupInterface[];
}

export default function FutureStandups(
  props: FutureStandupsProps
): JSX.Element {
  const standupCards = props.standups.map((standup) => {
    return (
      <div className="future-standup-card" key={standup.id}>
        <div className="row">
          <p>{toStringDate(standup.time)}</p>
          <br />
          <p>{standup.chair_name}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="future-standups">
      <h3>Future Standups</h3>
      {standupCards}
    </div>
  );
}
