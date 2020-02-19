const prompt = require('inquirer').createPromptModule()
const Employee = require('Employee')
const Engineer = require('Engineer')
const Intern = require('Intern')
const Manager = require('Manager')
let teamMembersArr = []
let teamLeader = ''
let teamLeaderAnswer = ''


let teamNumQues = [
  'Who is the team leader?',
  'How many team members?'
]

let questions = [
  '',
  'What is your favorite movie?',
  'When is your birthday?',
  'What is your favorite book?',
  ''
]
