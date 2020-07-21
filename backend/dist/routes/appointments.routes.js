"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _uuidv = require("uuidv4");

var _dateFns = require("date-fns");

const appointmentsRouter = (0, _express.Router)();
const appointments = [];
appointmentsRouter.post("/", (request, response) => {
  const {
    provider,
    date
  } = request.body;
  const parsedDate = (0, _dateFns.startOfHour)((0, _dateFns.parseISO)(date));
  const findAppointmentInSameDate = appointments.find(appointment => (0, _dateFns.isEqual)(parsedDate, appointment.date));

  if (!!findAppointmentInSameDate) {
    return response.status(400).json({
      message: "This appointment already booked!"
    });
  }

  const appointment = {
    id: (0, _uuidv.uuid)(),
    provider,
    date: parsedDate
  };
  appointments.push(appointment);
  return response.json(appointment);
});
var _default = appointmentsRouter;
exports.default = _default;