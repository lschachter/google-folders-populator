# Google Folders Populator

Scrape team data from a Google sheet and create, populate, and share team folders 

This code was created via [Google Apps Scripts](https://www.google.com/script/start/) in Google Drive, to automate folder creation for each incoming cohort of students in Columbia University's [Justice Through Code](https://centerforjustice.columbia.edu/justicethroughcode) program. All identifying data has been scrubbed out of it.

For their capstone project, students join into teams, populating a Google Sheet formatted like the one seen below. As long as the format of the sheet is maintained, this code can be run to

- Scrape that data
- Create whatever number of folders there are teams in the sheet, named via the team name found in the sheet
- Populate those folders with copies of template files
- Share those folders with all team members found in the sheet
- Link the new folders via the sheet (via the team names)

<img width="1136" alt="Screenshot 2023-02-07 at 4 37 35 PM" src="https://user-images.githubusercontent.com/7146649/217372092-cdb66f34-9e95-4788-98ad-cdb87a0f5a22.png">
