import Appointment from "@models/Appointment";
import AppointmentRepository from "../repositories/AppointmentsRepository";
import { startOfHour } from "date-fns";

interface Request {
  provider: String;
  date: Date;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;
  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentRepository.findByDate(
      appointmentDate
    );

    if (!!findAppointmentInSameDate) {
      throw Error("This appointment already booked!");
    }

    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
