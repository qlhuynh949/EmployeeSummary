const prompt = require('inquirer').createPromptModule()
const Employee = require('Employee')
const Engineer = require('Engineer')
const Intern = require('Intern')
const Manager = require('Manager')
let teamMembersArr = []


let teamNumQues = [
  'How many total team members are there?'
]

let managerQuestions = [
  'Please enter the name of the manager?',
  'What is the office number?'
]

let engineerQuestions = [
  'What is your gitHub? '
]

let internQuestions = [
  'What is the school that you attend?'
]

let questions = [
  'What is your name?',
  'What is id?',
  'What is your email?'
  'What is your role?',
]

async function startQuestions() {
  const initPrompt = await prompt([{
    type: 'input',
    name: 'teamNumber',
    message: teamNumQues[0]
  },
  {
    type: 'input',
    name: 'managerName',
    message: managerQuestions[0]
  },
  {
    type: 'input',
    name: 'managerOffice',
    message: managerQuestions[1]
  },
  {
    type: 'input',
    name: 'managerId',
    message: questions[1]
  },
  {
    type: 'input',
    name: 'managerEmail',
    message: questions[2]
  }
  ])
    .then({ teamNumber, managerName, managerOffice, managerId, managerEmail } => {
    teamNumber = response.teamNumber
    let lead = new Manager(managerName, managerId, managerEmail, managerOffice)
    teamMembersArr.push(lead)
    askTeamMembers(teamNumber - 1)


  })
    .catch (e => console.error(e))
}

async function askTeamMembers(teamNumber) {
  for (let i = 0; i < teamNumber; i++) {
    const internEngineer = await prompt([{
      type: 'input',
      name: `memberName`,
      message: questions[0]
    }, {
      type: 'input',
      name: `memberRole`,
      message: questions[3]
    }])
      .then(({ memberName, memberRole }) => {
        if (memberRole === 'Engineer') {
          const engineerPrompt = await prompt([{
            type: 'input',
            name: `memberId`,
            message: questions[1]
          }, {
            type: 'input',
            name: `memberEmail`,
            message: questions[2]
          },
          {
            type: 'input',
            name: `memberGithub`,
            message: engineerQuestions[0]
          }
          ]).then(({ memberId, memberEmail, memberGithub }) => {

            let engineerMember = new Engineer(memberName, memberId, memberEmail, memberGithub)

            teamMembersArr.push(engineerMember)

          }
          )
        }
        else {
          const internPrompt = await prompt([{
            type: 'input',
            name: `memberId`,
            message: questions[1]
          }, {
            type: 'input',
            name: `memberEmail`,
            message: questions[2]
          },
          {
            type: 'input',
            name: `memberSchool`,
            message: internQuestions[0]
          }
          ]).then(({ memberId, memberEmail, memberSchool }) => {

            let internMember = new Engineer(memberName, memberId, memberEmail, memberSchool)

            teamMembersArr.push(internMember)


          }
          )
        }

      })
  }

  // display each team member
  teamMembersArr.forEach((elem, i) => {
    console.log(elem)

  })

  startQuestions()

}