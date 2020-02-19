const prompt = require('inquirer').createPromptModule()
const Employee = require('Employee')
const Engineer = require('Engineer')
const Intern = require('Intern')
const Manager = require('Manager')
let teamMembersArr = []
let teamLeader = ''
let teamLeaderAnswer = ''


let teamNumQues = [
  'How many total team members are there?'
]

let managerQuestions = [
  'Please enter the name of the manager?',
 'What is the office number?'
]

let engineerQuestions= [
  'What is your gitHub? '
]

let internQuestions = [
  'What is the school that you attend?'
]

let questions = [
  'What is your name?',
  'What is id?',
  'What is your email?'
  'What is role?',
]
