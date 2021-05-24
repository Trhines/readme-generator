const inquirer = require('inquirer')
const render = {

    renderTitle: function(data){
      return `## ${data.toUpperCase()}\n`
    },
    
    renderDescription:function(data){
        return `\n\n## Description\n${data}`
    },

    renderTableOFContents: function(data){
        if(data){
        let completeTable =`\n\n## Table of Contents\n`
        for(i=0; i< data.length; i++){
            completeTable = completeTable.concat(`\n-${data[i]}\n`)
        }
        return completeTable
        }
        else{return null}
    },

    startTable: async function(){
        console.log("creating table of contents")
        const newEntry = await this.addTableContent()
        let completeTable = []
        newEntry.forEach((entry)=>completeTable.push(entry.contentLine))
        return completeTable
        
    },

    addTableContent: async function(entries = []){
        const prompts =[
            {
                type: 'input',
                name: 'contentLine',
                message: 'Add new table entry: '
            },
            {
                type: 'confirm',
                name: 'add',
                message: 'Would you like to add another item? '
            },
        ]
        const {add, ...newContent} = await inquirer.prompt(prompts)
        const newEntries = [...entries, newContent]
        return add ? this.addTableContent(newEntries) : newEntries
    },

    renderInstall:function(data){
    return `\n\n## Installation\n${data}`
    },
    
    renderUsage:function(data){
        return `\n\n## Usage\n${data}`
    },
    
    renderCredits:function(data){
        return `\n\n## Credits\n${data}`
    },
    
    renderLicense:function(data){
        switch(data){
            case 'MIT': return '\n[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n'
            case 'MPL 2.0':return '\n[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)\n'
            case 'Apache 2.0':return '\n[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)\n'
        }

    },
    
    renderBadges:function(data){
        return `\n## Badges\n${data}`
    },

    getBadgeUrl: async function(){
        const prompts =[
            {
                type: 'input',
                name: 'contentLine',
                message: ': '
            },
            {
                type: 'confirm',
                name: 'add',
                message: 'Would you like to add another item? '
            },
        ];
        // const {add, ...newContent} = await inquirer.prompt(prompts)

    },
    
    renderFeatures:function(data){
        return `\n## Features\n${data}`
    },
    
    renderContribute:function(data){
        return `\n## How to Contribute\n${data}`
    },
    
    renderTests:function(data){
        return `\n## Tests\n${data}`
    }
    }

    module.exports = render;