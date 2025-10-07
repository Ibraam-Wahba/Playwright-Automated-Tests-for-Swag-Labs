# Playwright-Automated-Tests-for-Swag-Labs

This repository contains an automated end-to-end testing project for **Swag Labs** built using **Playwright** and **TypeScript**.  
The tests follow the **Page Object Model (POM)** design pattern to ensure scalability, readability, and maintainability.

## Prerequisites
Before running the tests, ensure you have:
- **Node.js** (v16 or later)
- **npm** (comes with Node.js)
- **Git** 
- **Playwright Browsers**: Install using  
  ```bash
  npx playwright install

## Installation & Setup

###  Clone the Repository
To get a local copy of the project, run:
```bash
git clone https://github.com/Ibraam-Wahba/Playwright-Automated-Tests-for-Swag-Labs
```
Then navigate to the project directory:
```bash
cd <your-repo-name>
```

### Install Dependencies

Install all required dependencies using npm:
```bash
npm install
```
Install Playwright 
```bash
npm init playwright@latest
```
### Running the Tests
Run All Tests in Headless Mode
```bash

npx playwright test
```
Run Tests in Headed Mode (with browser UI)
```bash

npx playwright test --headed

```
### Viewing the HTML Test Report

```bash

npx playwright show-report

```
This will open a detailed, interactive HTML report in your default browser.

### Challenges & Solutions

- Dynamic locators: Used robust locator strategies (getByRole, :has-text(), data-test attributes).
- Repeated setup steps: Moved common actions into beforeEach hooks to reduce duplication.
- Test structure optimization: Applied Page Object Model to enhance readability and maintainability.
- Assertions: Created reusable assertion methods in page objects.
