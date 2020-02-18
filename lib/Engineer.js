const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, title, email, github) {
    super(name, id, title, email);
    this.github = github;
  }
  getGithub() {
    returns github
  }
  getRole() {
    returns 'Engineer'
  }
}

