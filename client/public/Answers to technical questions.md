_1. How long did you spend on the coding test?_

- I spent approx 3 days to complete this test.

_2. What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add._

- I would have added a more featues to dashboard such as alerts of invoices with upcoming due dates, invoice comparison graphs. Morever, I'd have build out a 'Reports' page providing access to different type of reports for the user.

_3. What was the most useful feature that was added by you in the application? Did you use any existing library for it? If yes, please share the link. Please include a snippet of code that shows how you've used it._

- I believe the most useful feature were the Summary cards "Dashbaord" page which showed the user a summary of all their invices based on status and included the total amount and the number of clients in each status. This provides a pretty useful overview of the whole data in the system.
  The UI was created via Material UI > Card component. The calculation logic was pretty simple and I used lodash's SumBy function to sum all the values present again "total" key in the invoices array. I also used the Set object combined with object spreading to get unique client names present in the array
  You can view the complete code in ./client/src/components/SummaryCard.jsx
  https://github.com/m4y4nkd/react-invoice-app/blob/master/client/src/components/SummaryCard.jsx

- Snippet of the exact code logic-
  <br />

  _const clients = [...new Set(invoices.map((invoice) => invoice.clientName))];_

  _const amount = \_.sumBy(invoices, "total");_

_4. How would you track down a performance issue in production? Have you ever had to do this?_

- There's a chrome extension called "React Developer Tools" which provides a comprehensive set of tools that I'd have used to track down performance issues in a workflow.
  To be more specific, I'd have used the 'Profiler' to record the suspected workflow and the analysis of that would have given us the time taken to render each component in the UI.

_5. List of all the libraries and packages used to complete the assignement_

- List of all Liraries used is also present in packages.json. The libraries that I used to complete the assignment were -
  a. Material UI (core, lab, pickers and icons)
  b. Lodash
  c. Moment
  d. uuid
  e. clsx
  f. react-google-login
  g. react-router-dom
  h. @date-io/moment (dependency for Mui-Pickers)
  i. react
  j. webpack
