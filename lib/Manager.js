const Employee = require("./Employee");

class Manager extends Employee {
  constructor(name, id, title, email, officeNumber) {
    super(name, id, title, email);
    this.officeNumber = officeNumber;
  }
  getRole() {
    returns 'Manager'
  }
}
