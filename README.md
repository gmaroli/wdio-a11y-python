# wdio-accessibility-test-reports-azure-pipelines
Sample project that performs accessibility testing on a webpage and compoenets and reports the error in a html file

<b>This test is integrated into the Azure pipeline Refer to the azure-pipelines.yml for details</b>

Axe-core library from [Deque](https://www.deque.com/axe/) is used for a11y tests
API reference: [Axe-Core-Api](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#section-2-api-reference)
It applies the wcag2aa standard and best=practice to determine the accessiblity issues on the web page

The results are stored in individual csv files. Python pandas library is used to extract the reports and write them into individual html files which can be shared to the team

# Running the test locally

### Running the A11y Tests
Follow the below steps:
1.	Clone the project https://aquagem@dev.azure.com/aquagem/WebdriverIOA11y/_git/WebdriverIOA11y
2.	Install dependencies using npm install in the terminal.
3.	Execute npm test to run the test

### Generating A11y Html report using python
1.  In the terminal open the PythonA11yResults folder
2.  Activate the venv and install dependencies - pip install requirements.txt
3.  Execute the script create_a11y_reports.py
4.  Two report files will be created under AutomationPracticeWebpage/results/a11y-results folder:
        a.  A11y_PageDetailedReport.html
        b.  A11yResults.html

#### A11y_PageDetailedReport.html
Result file have the following details:
Description of the issue
Impact: Critical, Serious, Medium or low
HTML: The component that has the issue
Failure Summary: details of failure
Id: type of element(button, link)
Help
HelpUrl: Url to the issue which will give what the issue was and how it can be fixed

#### A11yResults.html
This file contains the summary of count of violdations sorted by impact level (critical to minor)
