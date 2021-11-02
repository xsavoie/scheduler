/*eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Appointment from "components/Appointment";
import DayList from "./DayList";
import "components/Appointment";
import "components/Application.scss";
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewerForDay } from "helpers/selectors";

// BUG --> when deleting existing interview, changing days, and going to back initial day
// TypeError: Cannot read properties of undefined (reading 'name')
// Only the first time, refreshing the page fixes the issue

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    updateSpots
  } = useApplicationData();
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewerForDay(state, state.day);

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });


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
            updateSpots={updateSpots} //TEST
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />      </section>
      <section className="schedule">
        {schedule}
        <Appointment time="5pm" />
      </section>
    </main>
  );
}
