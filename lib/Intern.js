const Employee = require("./Employee");

class Intern extends Employee {
  constructor(name, id, title, email, school) {
    super(name, id, title, email);
    this.school = school;
  }
  getSchool() {
    returns school
  }
  getRole() {
    returns 'Intern'
  }
}