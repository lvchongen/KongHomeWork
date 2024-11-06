

# KONG Manager Test Strategy



### Business Analysis

The primary test functionality in this scenario is the creation of a Service/Route, which involves three pages (only covering the main features).

#### OverView Page

* The Overview page primarily displays current system information, such as the number of Services/Routes. We need to test that these counts update accordingly after creating or deleting a Service/Route.![](https://lvchongen-1255888772.cos.ap-chengdu.myqcloud.com/202411051854241.png)

* When the Service count is 0, the page displays a shortcut button labeled ‘Add a gateway service’ for quick creation. ![](https://lvchongen-1255888772.cos.ap-chengdu.myqcloud.com/202411051855728.png)

* When a Service exists but the Route count is 0, the page displays ‘View Service’ (only shown after the first creation) and ‘Add a Route’ options. ![](https://lvchongen-1255888772.cos.ap-chengdu.myqcloud.com/202411051857983.png)

  

  

#### Service/Route Create Page

* The Service has a list table displaying basic information about existing Services, along with corresponding shortcut actions. ![](https://lvchongen-1255888772.cos.ap-chengdu.myqcloud.com/202411051901015.png)

* Creating a Service/Route consists of two form submissions, each containing the necessary information for setting up a Service or Route. ![](https://lvchongen-1255888772.cos.ap-chengdu.myqcloud.com/202411051903633.png)

   ![](https://lvchongen-1255888772.cos.ap-chengdu.myqcloud.com/202411051903155.png)

#### Key Test Points

* Verify the correctness of the quantity display on the Overview page.
* Verify that the quantities on the Overview page are updated correctly after adding or deleting Service/Route.
* Verify that the shortcut button to add a Service is displayed when the Service count is 0.
* Verify that the shortcut button to add a Route is displayed when the Route count is 0 (with Service existing).
* Verify that the shortcut button to add a Route is displayed when the Route count is 0 (with Service existing).
* Verify that after adding a Service/Route, the “View” button appears on the Overview page and disappears when clicked.
* Verify the correctness of the information displayed in the Service table on the Gateway Service page: correct quantity, synchronized after adding or deleting, and correct basic Service information.
* Verify the shortcut operations in the Service table on the Gateway Service page: Copy ID/JSON, View Detail, Edit, and Delete.
* Verify the fields in the Create Service form, including format, content, required fields, checkbox behavior, and corresponding changes.
* Verify the fields in the Create Route form, including format, content, required fields, checkbox behavior, and corresponding changes.
* Verify that the correct information results in a successful creation of Service/Route.
* Verify that errors are handled when incorrect information is provided.
* Verify the uniqueness of the name and error handling for duplicate names.
* Based on business requirements, verify the correctness of creating Service/Route by testing combinations of different fields.
* Other: Verify the correctness of the workspace and ensure Service/Route are under the correct workspace.
* Other: Verify the correct order of deleting Service/Route/Workspace.
* Other: Verify error handling when deleting a Service/Route that is in use.
* Other: Verify exception handling for simultaneous add/delete/edit operations.





#### Web UI Automation Testing

There are many UI automation testing frameworks, commonly including Selenium, Cypress, Playwright, etc. Although the principles of these three frameworks differ (WebDriver/proxy+inject/CDP), the process of writing automation scripts generally involves the following steps:

1. Element location, commonly using attributes such as id/class, etc. XPath is recommended here.
2. Interacting with elements, such as click, input, etc.
3. Assertions, to validate texts, results, etc.
4. Optimization and encapsulation, commonly using Page Object pattern.

Since the assignment requires using the Cypress framework and covering the business scenarios by completing the four steps mentioned, I have provided a demo encapsulation of several pages in the attached code, which includes only a few elements to showcase the framework structure (the other elements to be encapsulated are too many…).

* **Page Object (Locator and Operation) **

  Includes element location, using the XPath plugin to support XPath. Also includes operations corresponding to the elements, such as type, click, etc. Finally, any business logic that needs to be combined and reused can also be encapsulated in this class.

  ```shell
  npm install -D cypress-xpath
  ```

  ![](https://lvchongen-1255888772.cos.ap-chengdu.myqcloud.com/202411051922506.png)

* **Cases And Assertion**

  * After instantiating the PageObject, these ‘building blocks’ can be combined to complete the end-to-end business process.   ![](https://lvchongen-1255888772.cos.ap-chengdu.myqcloud.com/202411061146349.png)

* **Other**

  The URL is configured in cypress.config.js, where the default is actually the workspace. In real projects, it should be passed as a parameter in the case/fixture.

  ```javascript
  const { defineConfig } = require("cypress");
  
  module.exports = defineConfig({
    e2e: {
      baseUrl: 'http://localhost:8002/default/',
      setupNodeEvents(on, config) {
      },
    },
  });
  ```



#### Layered Testing Method

When performing operations on Service/Route, such as creation, two types of APIs are actually called: validate (optional) and create.

![](https://lvchongen-1255888772.cos.ap-chengdu.myqcloud.com/202411051933080.png)

The body of the Create API is essentially the information entered by the user in the fields on the web page, such as name, tag, URL, etc.

![](https://lvchongen-1255888772.cos.ap-chengdu.myqcloud.com/202411051936594.png)

So, how do we layer this? The frontend network requests are implemented by JavaScript. The common logic is to retrieve the values from these fields and place them in the HTTP Request Body. This involves several key testing points:

​	1.	**Correctness of Field Values**: The value retrieved from the field (e.g., input) should match the value entered by the user.

​	2.	**Correctness of HTTP Body Values**: For example, Parameter A and Parameter B should not have conflicting or reversed values.

​	3.	**Default Values for Empty Fields**: If the user does not input a value for a field, is there a default value, or is the field not included in the HTTP request?

​	4.	**Correctness of the HTTP Request**: The HTTP request should be sent correctly, including method, headers, body, etc.

These points can be tested on the web page to ensure functional coverage.

**If all the above functionalities are correct, we can proceed with layering the testing and test different business data via API requests.**

For example, different business combinations of data in the Create Service process can be tested using parameterized API requests. Tools like JMeter, Postman, or custom HTTP requests can be used. Additionally, Cypress can be combined with API requests to achieve this.

In Cypress, you can also modify the Request/Response flow to make the entire testing process more flexible, as the data displayed on the page is obtained from the Response.



#### Combining AI for API Testing

Integrating AI into API testing can significantly enhance the test automation process by providing smarter test generation, fault detection, and more dynamic testing approaches. Here are some key ways AI can improve API testing:

**Test Case Generation**:

​	•	**AI-driven test case generation** can automatically create API test cases based on the API documentation, such as Swagger or OpenAPI specs. AI can analyze these specifications and identify edge cases or hidden scenarios that might otherwise be missed.

​	•	AI can also analyze historical test data to suggest new test cases or optimize the test suite by focusing on the most critical or high-risk areas.

**Predicting API Failure**:

​	•	**Machine learning models** can be trained to predict potential failures based on past API responses, usage patterns, and other metrics. This can help testers focus on the most likely areas where bugs might occur.

​	•	AI can also flag common issues like inconsistent responses, missing parameters, or changes in API behavior over time.

**Automated Fault Localization**:

​	•	AI can assist in **automatically identifying the root cause of test failures** by analyzing patterns in the API responses and identifying the most likely sources of errors. For example, AI can help determine if a failure is caused by incorrect input, server errors, or network issues.

**Dynamic Test Execution**:

​	•	**AI can adapt test execution in real-time** based on API behavior and results. If an API responds unexpectedly, AI can automatically adjust subsequent requests or even generate new tests to cover the anomaly.

​	•	AI can also perform **load testing** based on usage data, simulating high-demand scenarios to identify performance bottlenecks.

**Natural Language Processing (NLP) for Test Automation**:

​	•	Using NLP, AI can **interpret user requirements in natural language** and convert them into API test cases, reducing the need for manual test case creation and increasing test coverage.

​	•	AI can analyze logs, responses, and other API-related data in natural language, providing testers with more intuitive insights into the API’s behavior.

**Test Maintenance**:

​	•	AI can help **automatically maintain API tests** by identifying deprecated endpoints, outdated API methods, or changes in data format. It can notify the testing team about necessary updates, reducing the overhead of manual test maintenance.

We can introduce the AI Agents framework, which can encapsulate tools to handle test data reading and network request sending. Additionally, based on the RAG approach, we can prepare the test data. For example, we can use crewAI for AI Agents Framework.

![](https://github.com/crewAIInc/crewAI/raw/main/docs/crewAI-mindmap.png)



#### CI/CD

Mainstream continuous integration tools like Jenkins and GitHub Actions primarily focus on task scheduling. Cypress, through its command-line interface, can integrate with these task schedulers to complete the entire task chain.

```yaml
name: Cypress Tests

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  cypress-run:
    runs-on: ubuntu-latest

    steps
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm install

      - name: Run Cypress tests
        uses: cypress-io/github-action@v5
        with:
          start: npm run start 
          wait-on: 'http://localhost:8002' 
          browser: chrome # 
        env:
          CI: true
```



