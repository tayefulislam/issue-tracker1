document.getElementById('issueInputForm').addEventListener('submit', submitIssue);



function submitIssue(e) {

  //arrow funtion

  let getInputValue = id => document.getElementById(id).value;







  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';


  const issue = { id, description, severity, assignedTo, status };

  let issues = [];


  if (description == '' || assignedTo == '') {

    return;

  }

  else {

    if (localStorage.getItem('issues')) {
      issues = JSON.parse(localStorage.getItem('issues'));


    }
    issues.push(issue);

    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    e.preventDefault();
  }





}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));

  console.log(id)


  const currentIssue = issues.find(issue => issue.id === id + '');
  console.log(currentIssue.status);
  currentIssue.status = 'Closed';

  // console.log(currentIssue);

  localStorage.setItem('issues', JSON.stringify(issues));
  // console.log(issues)
  fetchIssues();
}

const deleteIssue = (index) => {

  const issues = JSON.parse(localStorage.getItem('issues'));

  issues.splice(index, 1)
  // console.log(issues);
  // console.log(issues[index]);

  localStorage.setItem('issues', JSON.stringify(issues))
  fetchIssues();



  // const currentIssue = issues.find(issue => issue.id === id + '');

  // console.log(localStorage.getItem(issues, index))

  // console.log(currentIssue);
  // currentIssue.status = 'Delete';

  // localStorage.setItem('issues', JSON.stringify(issues));

  // fetchIssues();

}

const fetchIssues = () => {

  const issues = JSON.parse(localStorage.getItem('issues'));

  const issuesList = document.getElementById('issuesList');

  issuesList.innerHTML = '';


  for (let i = 0; i < issues.length; i++) {

    const { id, description, severity, assignedTo, status } = issues[i];
    console.log(id)
    console.log(i);


    if (status === 'Closed') {

      issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> <del>${description}</del></h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${i})" class="btn btn-danger">Delete</a>
                              </div>`;
    }


    else {

      issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${i})" class="btn btn-danger">Delete</a>
                              </div>`;
    }





  }


}
