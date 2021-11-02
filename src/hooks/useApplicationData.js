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

  // const updateSpots = (state, appointments) => {
  //   const dailyAppointments = getAppointmentsForDay(state, state.day);
  //   const availableSpots = dailyAppointments.filter(app => !app.interview);
  //   const spotsToDisplay = availableSpots.length;
  //   console.log("SPOTS", spotsToDisplay);

  //   const dayToUpdate = state.days[0]
  //   console.log("----------->", dayToUpdate)
  //   // setState(prev => ({...prev,}))
  //   // return spotsToDisplay
  // };

  // // test run
  // updateSpots(state)

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
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {

        setState({ ...state, appointments })
        // updateSpots()

      })
      //.then with spots update
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
      //.then with spots update
  }

  // const onlyDays = state.days;
  // console.log("*********", onlyDays)

  return { state, setDay, bookInterview, cancelInterview }
}