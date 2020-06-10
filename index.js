const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
let userData = {};

inquirer.prompt([
    {
        type: "input",
        message: "Enter Github username",
        name: "github",
    },
    {
        type: "input",
        message: "Project Title",
        name: "pTittle",
    },
    {
        type: "input",
        message: "Description",
        name: "pDescription",
    },
    {
        type: "input",
        message: "What is the installation requirements",
        name: "cInstallation",
    },
    {
        type: "input",
        message: "What is the usage requirements",
        name: "nUsage",
    },
    {
        type: "list",
        choices: ["MIT", "ISC", "APACHE"],
        message: "What is the license",
        name: "gLicense",
    },
    {
        type: "input",
        message: "Contributors to the project",
        name: "lContribution",
    },
    {
        type: "input",
        message: "Enter testing requirements",
        name: "iTest",
    }
])
    .then(response => {
        console.log(response)
        userData = response
        return axios.get(`https://api.github.com/users/${response.github}
    `)
    })
    .then(githubData => {
        console.log("GithubData",githubData.data)
        console.log("Userdata",userData)
        let readmeData = `
# Github Username:${userData.github}
## Project Title:${userData.pTittle}

#  User Profile
![My-image](./images/proPic.jpg)

Description    | Value
---------------|----------------------
Followers  |${githubData.data.followers}
Following  |${githubData.data.following}
Blog     |${githubData.data.blog}
Bio      |${githubData.data.bio}
Email    |${githubData.data.email}

## Description  :${userData.pDescription}
## Installation:${userData.cInstallation}
## Usage:${userData.nUsage}
## license:${userData.gLicense}

(https://img.shields.io/badge/license-${userData.gLicense}-blue.svg)


## Contribution:${userData.lContribution}
## Test:${userData.iTest}
       
        `
    
    fs.writeFileSync("./README.md", readmeData)
    })