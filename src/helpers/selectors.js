export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(oneDay => oneDay.name === day);
  // Early return if array is empty
  if (filteredDays.length === 0) {
    return filteredDays;
  };

  const appointmentArr = filteredDays[0].appointments;
  const allAppointments = Object.values(state.appointments);
  const appointmentToReturn = [];

  for (let appointmentId of appointmentArr) {
    const filteredApp = allAppointments.filter(appointment => appointment.id === appointmentId);
    appointmentToReturn.push(filteredApp[0]);
  };
  return appointmentToReturn;
}