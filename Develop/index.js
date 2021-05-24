

const fs = require('fs')
const inquirer = require("inquirer");
inquirer.registerPrompt('recursive', require('inquirer-recursive'))
const markDown = require("./utils/generateMarkdown");
const { addTableContent } = require('./utils/renderText');
const render = require("./utils/renderText")


const questions = inquirer
                    .prompt([
                        
                               {
                                type: 'input',
                                message: 'What is your project title?',
                                name: 'title',
                              },
                              {
                                type: 'input',
                                message: 'Describe yor project.',
                                name: 'describe',
                              },
                              {
                                type: 'confirm',
                                message: 'Do you need a table of contents?',
                                name: 'toc',
                              },
                              {
                                type: 'input',
                                message: 'How do you install this?',
                                name: 'install',
                              },
                              {
                                type: 'input',
                                message: 'How do you use this?',
                                name: 'use',
                              },
                              {
                                type: 'input',
                                message: 'Who worked on this?',
                                name: 'credits',
                              },
                              {
                                type: 'list',
                                message: 'What license does this need?',
                                name: 'license',
                                choices: ['MIT', 'Apache 2.0', 'MPL 2.0']
                              },
                              {
                                type: 'input',
                                message: 'What features does this have?',
                                name: 'features',
                              },
                              {
                                type: 'input',
                                message: 'How can others contribute to this project?',
                                name: 'contribute',
                              },
                              {
                                type: 'input',
                                message: 'How do you run tests for this project?',
                                name: 'tests',
                              },
                            
                            ]).then(async(response)=>{
                                console.log("then")
                                let table = null
                                if (response.toc === true){
                                    console.log("table func")
                                    table = await render.startTable()   
                                }
                                
                                
                                response.contents = table
                                response.badge = "badge goes here"
                                appendText(response)
                            })

// TODO: Create a function to write README file
function appendText(input){
console.log("generating README")
    let text = [render.renderTitle(input.title), 
                render.renderDescription(input.describe),
                render.renderTableOFContents(input.contents),
                render.renderInstall(input.install),
                render.renderUsage(input.use),
                render.renderCredits(input.credits),
                render.renderLicense(input.license),
                render.renderFeatures(input.features),
                render.renderContribute(input.contribute)]
    
    const reducer = (accumulator, currentText) => accumulator + currentText
    writeToFile("README.md", text.reduce(reducer)) 
}

function writeToFile(fileName, data) {
    console.log("write to file")
    fs.writeFile(fileName, data, function(err){if(err){console.log(err)}})
}

