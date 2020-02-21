const prompt = require('inquirer').createPromptModule()
const Employee = require('./lib/Employee')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')
const Manager = require('./lib/Manager')
const fs = require('fs')
const Handlebars = require('handlebars')
let teamMembersArr = []
let gHTML = ''

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
  'What is your email?',
  'What is your role?'
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
    .then(({ teamNumber, managerName, managerOffice, managerId, managerEmail }) => {
      teamNumber = teamNumber
      let lead = new Manager(managerName, managerId, managerEmail, managerOffice)
      teamMembersArr.push(lead)
      askTeamMembers(teamNumber - 1)


    })
    .catch(e => console.error(e))
}

async function askTeamMembers(teamNumber) {
  for (let i = 0; i < teamNumber; i++) {
    let currentRole
    let currentName

    const internEngineer = await prompt([{
      type: 'input',
      name: `memberName`,
      message: questions[0]
    },
    {
      type: 'list',
      name: `memberRole`,
      message: questions[3],
      choices: ["Engineer", "Intern"]
    }])
      .then(({ memberName, memberRole }) => {
        currentName = memberName
        currentRole = memberRole
      })

    if (currentRole === 'Engineer') {
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

        let engineerMember = new Engineer(currentName, memberId, memberEmail, memberGithub)

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

        let internMember = new Intern(currentName, memberId,
          memberEmail, memberSchool)

        teamMembersArr.push(internMember)
      }
      )

    }
  }


  // display each team member
  let htmlData = ''

  teamMembersArr.forEach((elem, i) => {
    if (elem instanceof Manager) {
      let managerSrc = readTemplateFile('./templates/manager.html')
      let managerTemplate = Handlebars.compile(managerSrc)
      let resultManager = managerTemplate(elem);
      htmlData += resultManager
    }
    else if (elem instanceof Intern) {
      let InternSrc = readTemplateFile('./templates/intern.html')
      let InternTemplate = Handlebars.compile(InternSrc)
      let resultIntern = InternTemplate(elem);
      htmlData += resultIntern
    }
    else {
      let EngineerSrc = readTemplateFile('./templates/engineer.html')
      let EngineerTemplate = Handlebars.compile(EngineerSrc);
      let resultEngineer = EngineerTemplate(elem);
      htmlData += resultEngineer

    }

  })

  let mainSrc = readTemplateFile('./templates/main.html')
  let mainTemplate = Handlebars.compile(mainSrc);
  let data = { data: htmlData }
  let resultMain = mainTemplate(data);


  writeToFile('./output/Team.html', resultMain)
}

const readTemplateFile = (fileName) => {
  return fs.readFileSync(fileName, 'utf8');
}

const writeToFile = (fileName, data) => {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log('Saved!');
  });
}

startQuestions()