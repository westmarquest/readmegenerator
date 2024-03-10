// Use dynamic import to import inquirer
import("inquirer")
  .then((module) => {
    const inquirer = module.default;
    const fs = require("fs");

    // Define a set of questions
    function generateReadme(answers) {
      // Define README template with placeholders
      const readmeTemplate = `
        # ${answers.title}
    
        ## Description
        ${answers.description}
    
        ## Table of Contents
        - [Installation](#installation)
        - [Usage](#usage)
        - [License](#license)
        - [Contributing](#contributing)
        - [Tests](#tests)
        - [Questions](#questions)
    
        ## Installation
        ${answers.installation}
    
        ## Usage
        ${answers.usage}
    
        ## License
        ${answers.licenseBadge}
        ${answers.licenseNotice}
    
        ## Contributing
        ${answers.contributing}
    
        ## Tests
        ${answers.tests}
    
        ## Questions
        GitHub: [@${answers.githubUsername}](https://github.com/${answers.githubUsername})
        Email: ${answers.email}
        `;

      // Write generated README content to README.md file
      fs.writeFile("README.md", readmeTemplate, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("README.md created successfully!");
        }
      });
    }

    // Function to prompt user for input and call generateReadme function
    function promptUser() {
      inquirer
        .prompt([
          {
            type: "input",
            name: "title",
            message: "Enter the title of your project:",
          },
          {
            type: "input",
            name: "description",
            message: "Enter a description of your project:",
          },
          {
            type: "input",
            name: "installation",
            message: "Enter installation instructions:",
          },
          {
            type: "input",
            name: "usage",
            message: "Enter usage information:",
          },
          {
            type: "list",
            name: "license",
            message: "Choose a license for your project:",
            choices: ["MIT", "GNU GPLv3", "Apache 2.0", "None"],
          },
          {
            type: "input",
            name: "contributing",
            message: "Enter contribution guidelines:",
          },
          {
            type: "input",
            name: "tests",
            message: "Enter test instructions:",
          },
          {
            type: "input",
            name: "githubUsername",
            message: "Enter your GitHub username:",
          },
          {
            type: "input",
            name: "email",
            message: "Enter your email address:",
          },
        ])
        .then((answers) => {
          // Call generateReadme function with user input
          generateReadme(answers);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    // Call promptUser function to start prompting user for input
    promptUser();
  })
  .catch((error) => {
    console.error(error);
  });
