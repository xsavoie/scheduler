import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "components/Appointment";
import DayList from "./DayList";
import "components/Appointment"
import "components/Application.scss";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      console.log(all[0].data)
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data}));
    })
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const parsedAppointments = dailyAppointments.map((appointment) => (
    <Appointment key={appointment.id} {...appointment} />
  ));

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment time="5pm" />
      </section>
    </main>
  );
}
