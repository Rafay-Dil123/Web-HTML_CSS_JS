
const form = document.getElementById('jobApplicationForm');
const viewAsTableBtn = document.getElementById('viewAsTable');
const applicationsTable = document.getElementById('table1');
let applicationsData = []; 

form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  if (validateForm()) {
    processFormData();
  }
});



function validateForm() {
  let isValid = true;
  const requiredFields = ['firstName', 'lastName', 'phoneNumber', 'email', 'street', 'city', 'state', 'zipCode', 'resume', 'coverLetter', 'educationLevel', 'school', 'major', 'graduationYear', 'jobTitle', 'company', 'employmentDates', 'jobResponsibilities', 'skills', 'startDate', 'workSchedule', 'referenceName', 'referenceContact', 'relationship', 'whyWorkHere', 'agreeTerms', 'privacyPolicy'];

  requiredFields.forEach(function(field) {
    const input = document.getElementById(field);
    console.log(field);

    if (field === 'phoneNumber' && !validatePhoneNumber(input.value)) {
      console.log("false aya hai")
      isValid = false;
      input.classList.add('error');
      input.style.border='1px solid red';
    } else if (!input.checkValidity()) {
      isValid = false;
      input.classList.add('error');
    } else {
      let isValid = true;
      input.classList.remove('error');
      input.style.border='1px solid black';
    }
  });

  return isValid;
}

function processFormData() {
  const formData = new FormData(form);
  const formObject = {};
  for (let pair of formData.entries()) {
    formObject[pair[0]] = pair[1];
  }
  const exists = applicationsData.some(app => JSON.stringify(app) === JSON.stringify(formObject));
  if (!exists) {
    applicationsTable.style.display="none";
    applicationsData.push(formObject); 
    alert("Application Submitted sucessfully."); 
  } else {
    alert("Application already submitted."); 
  }

}

viewAsTableBtn .addEventListener("click",()=>{
// let table1=document.getElementById("table1")
// console.log(table1)
// let tr1=document.createElement("tr")
// let tr2=document.createElement("tr")
// let inputarray=document.querySelectorAll("input")
// console.log(inputarray)
// inputarray.forEach((va,index)=>{
//     let td1=document.createElement("td")
//     td1.innerText=va.id;
//     tr1.appendChild(td1)
//     let td2=document.createElement("td")
//     td2.innerText=va.value;
//     tr2.appendChild(td2)

// });
//  if(document.querySelectorAll('tr'))
//  table1.appendChild(tr1)
//  table1.appendChild(tr2)

//  table1.style.display=""

applicationsTable.innerHTML = '';

// Create table header row
const headerRow = document.createElement('tr');
for (const key in applicationsData[0]) {
const columnHeader = document.createElement('th');
columnHeader.textContent = key;
headerRow.appendChild(columnHeader);
}
applicationsTable.appendChild(headerRow);

// Create table rows with form data
applicationsData.forEach(application => {
const dataRow = document.createElement('tr');
for (const key in application) {
const dataCell = document.createElement('td');
dataCell.textContent = application[key];
dataRow.appendChild(dataCell);
}
applicationsTable.appendChild(dataRow);
});

// Display the table
applicationsTable.style.display = 'table';

})

function validatePhoneNumber(phoneNumber) {
  var phoneRegex = /^\+\d{12}$/;
  return phoneRegex.test(phoneNumber);
}