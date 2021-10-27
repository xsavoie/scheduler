import React from "react";
import "./styles.scss"

export default function Appointment(props) {
  return (
    <article className="appointment">
      {!props.time && <h4 className="text--regular">No Appointments</h4>}
      {props.time && <h4 className="text--regular">Appointment at {props.time}</h4>}
      </article>
  );
}