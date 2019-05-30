export default class Event {
  constructor({ name, when: { time, date }, location, details }) {
    this.name = name;
    this.time = time;
    this.date = date;
    this.location = location;
    this.details = details;
  }
}