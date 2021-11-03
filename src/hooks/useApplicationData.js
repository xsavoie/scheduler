import { useState, useEffect } from 'react'
import axios from 'axios';
// import { getAppointmentsForDay } from 'helpers/selectors';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = day => setState({ ...state, day });


  const updateSpots = function (state, appointments, id) {
    const day = state.days.find((d) => d.name === state.day);

    let spots = 0;

    for (const id of day.appointments) {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      };
    };

    const newDay = { ...day, spots };
    const newDays = state.days.map(d => d.name === state.day ? newDay : d);

    return newDays;
  };


  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      // console.log(state)
    })
  }, []);


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState(prev => ({...prev, appointments}))
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        const days = updateSpots(state, appointments, id);
        setState({ ...state, appointments, days });
      })
  };


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        const days = updateSpots(state, appointments, id);
        setState({ ...state, appointments, days });
      })
  }

  return { state, setDay, bookInterview, cancelInterview }
}