// Scrape data (emails, team member names, team names, etc) from a google sheet
// Create, share, and populate team folders based on the data found there
// Written via Google Scripts


const rootFolder = DriveApp.getFolderById('#');
const ss = SpreadsheetApp.openById('#');

function createFolders() {
  // Create a folder for each group, populate it, and share it with its team members
  // MAKE SURE your Google Sheet format matches the image shared in the README--
  // - 3 lines per team
  // - Team name on line 1
  // - email addresses on line 2
  let numGroups = getNumGroups(ss);
  let row = 2;
  let i, nameCell, teamName, teamFolder;
  for (i = 1; i <= numGroups; i ++) {
    nameCell = ss.getRange("B" + row.toString());
    teamName = nameCell.getValue();
    teamFolder = DriveApp.createFolder(teamName);
    teamFolder.moveTo(rootFolder);

    // Link this new folder on the Groups Spreadsheet
    let link = SpreadsheetApp.newRichTextValue().setText(teamName).setLinkUrl(teamFolder.getUrl()).build();
    nameCell.setRichTextValue(link);
    
    // Add starting files
    addFiles(teamFolder);

    // Add editors
    shareFolder(teamFolder, row + 1);

    row += 3;
  }
}


function addFiles(teamFolder) {
  // Add each template file in the Template Files folder to each team folder

  // This folder does not need to be changed as long as the templates are not moved
  let templatesFolder = DriveApp.getFolderById('#');
  let templates = templatesFolder.getFiles();
  let file;
  while (templates.hasNext()) {
    file = templates.next();
    addFile(file, teamFolder);
  }
}


function addFile(file, folder) {
  // Given a template file, make a copy, rename it (it will say 'copy' and 'template' otherwise),
  // and move it to the appropriate folder
  let newFile = file.makeCopy();

  let prefixLen = 'Copy of '.length;
  let postfixLen = ' Template'.length;
  let name = newFile.getName();
  name = name.substring(prefixLen, (name.length - postfixLen));
  newFile.setName(name);

  newFile.moveTo(folder);
}


function shareFolder(folder, rowNum) {
  // while there's another email in the email row (SpreadsheetApp.Direction.NEXT), 
  // add that email as an editor of the folder
  let col = 3;
  let ss = ss.getSheets()[0];
  
  for (col; col < 15; col ++) {
    let email = ss.getRange(rowNum, col).getValue();
    if (email != '') {
      folder.addEditor(email);
    }
  }
}


function getNumGroups(ss) {
  // Find the lowest row of column A with a number in it: this is the number of groups
  let row = 2;
  while (getNextValue("A", row.toString(), SpreadsheetApp.Direction.DOWN, ss) != '') {
      row += 3;
  }
  return +(getNextValue("A", (row - 3).toString(), SpreadsheetApp.Direction.DOWN, ss)); 
}


function getNextValue(colStr, rowStr, direction, ss) {
  return ss.getRange(colStr + rowStr + ":" + colStr).getNextDataCell(direction).getValue();
}


function addAdditionalFile() {
  // Sometimes a file needs to be added a few days into the project (for instance, the design worksheet)
  // Update the file id and run this function to add it to the cohort's folders
  let newFile = DriveApp.getFileById('#');

  let teamFolders = rootFolder.getFolders();

  let folder;
  while (teamFolders.hasNext()) {
    folder = teamFolders.next();
    addFile(newFile, folder);
  }
}
