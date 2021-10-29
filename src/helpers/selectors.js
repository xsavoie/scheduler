export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(oneDay => oneDay.name === day);
  // Early return if array is empty
  if (filteredDays.length === 0) {
    return filteredDays;
  };
  const appointmentArr = filteredDays[0].appointments;

  const allAppointments = Object.values(state.appointments);
  const appointmentsToReturn = [];

  appointmentArr.map((appointmentId) => {
    const filteredApp = allAppointments.filter(appointment => appointment.id === appointmentId);
    return appointmentsToReturn.push(filteredApp[0]);
  })

  return appointmentsToReturn;

};


export function getInterview(state, interview) {
  // Early return if no interview
  if (!interview) {
    return null
  }

  const interviewersArray = Object.values(state.interviewers)
  const filteredInterviewer = interviewersArray.filter(interviewer => interviewer.id === interview.interviewer);

  return { ...interview, interviewer: filteredInterviewer[0] }
};