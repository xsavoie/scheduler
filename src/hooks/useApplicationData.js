import { useState, useEffect } from 'react'
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

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
    // console.log("bookInterview------>", id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // setState(prev => ({...prev, appointments}))
    setState({ ...state, appointments }) // switch to .then
    return axios.put(`/api/appointments/${id}`, { interview })
  }

  
  function cancelInterview(interviewID , interview) {
    const appointment = {
      ...state.appointments[interviewID],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [interviewID]: appointment
    };

    return axios.delete(`/api/appointments/${interviewID}`)
      .then(() => setState({ ...state, appointments }))
  }

  return { state, setDay, bookInterview, cancelInterview }
}