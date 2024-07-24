# cypress-gherkin

> This project is a template that integrates Cypress with Gherkin, allowing you to write and execute automated tests in a clear and understandable manner for all team members. Using Gherkin syntax to describe test cases and Cypress for execution, this template enhances the efficiency and quality of testing.


- ## Pre-requisites

1. Node JS

## **Installation**

We use [Node](https://nodejs.org/en), Node.js is an open-source JavaScript runtime built on Chrome's V8 engine. It enables server-side execution of JavaScript, making it ideal for building fast and scalable network applications. Its non-blocking, event-driven architecture excels at handling concurrent connections, perfect for real-time apps like chat servers and online games. 

* `git clone https://github.com/athan3350/cypress-gherkin.git` this repository
* change into the new directory `cd cypress-gherkin`.

## **project structure**

```plaintext
cypress-project/
├── cypress/                      # Main folder containing all Cypress resources and configurations.
│   ├── fixtures/                 # Contains static data files to be used in tests.
│   │   └── example.json          # Example of a fixture file in JSON format.
e2e/                    # Optional folder used for the Page Object Model (POM) design pattern.
│   │───└── features        # File that defines the login page.
│   ├───└──step_definitions                 # Contains plugin configuration files.
│   └── support/                  # Contains files that run before tests for setup and custom commands.
│       ├── commands.js           # File to define custom Cypress commands.
│       └── index.js              # File for global Cypress configuration.
├── cypress.json                  # Main configuration file for Cypress.
└── package.json                  # Npm configuration file that includes project dependencies.


## Install the project

Install project dependencies with: npm install

## **Example usage**

```bash  
 Execution: 
   npm run cypress:runner -> Run the test with the web platform
   npm run cypress:execution -> Run the test without the web platform
   npm run cypress:execution-tags -> Run the test without the web platform filtering with the tags specified
```


##  Sample repo to generate an allure report as an artifact using GH Actions

> Authors:  
> **Sebastian Suarez**
> That's it, I hope you like it :sunglasses::metal: