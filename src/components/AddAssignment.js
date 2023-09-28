import React, { useState } from 'react';

function AddAssignment(props) { 

  // const [id ,setId] = useState('');
  // const [course, setCourse] = useState('');
  const [assignmentGrades ,setAssignmentGrades] = useState('');
  let assignmentId=0;
  const [assignment, setAssignment] = useState('');
  const [name ,setName] = useState('');
  const [dueDate ,setDueDate] = useState('');
  const [message, setMessage] = useState('');



  const path = window.location.pathname;  // /gradebook/123
  const s = /\d+$/.exec(path)[0];
  console.log("Grade assignmentId="+s);
  assignmentId=s;

  useEffect(() => {
    fetchAssignments()
   }, [] )

 
  const fetchAssignments = ( ) => {
      setMessage('');
      console.log("fetchAssignments "+assignmentId);
      fetch(`${SERVER_URL}/assignments/${assignmentId}`)
      .then((response) => response.json()) 
      .then((data) => { setAssignment(data) })        
      .catch(err => { 
        setMessage("Exception. "+err);
        console.error("fetch grades error "+ err);
      });
    }
  
    // when submit button pressed, send updated grades to back end 
    //  and then fetch the new grades.
    const saveAssignment = ( ) => {
      setMessage(''); 
      console.log("Assignment.save ");     
      fetch(`${SERVER_URL}/assignment/${assignmentId}` , 
          {  
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json', }, 
            body: JSON.stringify( assignment )
          } )
      .then(res => {
          if (res.ok) {
            fetchAssignments(assignmentId);
            setMessage("Assignment saved.");
          } else {
            setMessage("Save error. "+res.status);
            console.error('Save assignment error =' + res.status);
      }})
        .catch(err => {
            setMessage("Exception. "+err);
            console.error('Save assignment exception =' + err);
        });
   }; 


  const onChangeGrades = (e) => {
    console.log("onChangeGrades "+e.target.value);
    setAssignmentGrades(e.target.value);
  }

  const onChangeAssignment = (e) => {
    console.log("onChangeAssignment "+e.target.value);
    setAssignment(e.target.value);
  }

  const onChangeName = (e) => {
    console.log("onChangeName "+e.target.name);
    setName(e.target.name);
  }
  const onChangeDate = (e) => {
    console.log("onChangeDate "+e.target.value);
    setDueDate(e.target.value);
  }

  const handleSubmit = (e) => {
    // if fields are not empty, add assignment.
    // else set message: Fields have not been filled.
    if(/assignment/.test(assignment)){
    props.postName(assignment ,name);
    props.postDueDate(assignment, dueDate);
    props.postGrade(assignment, grade);
    } else {
      setMessage("All fields have not been filled out.")
    }
  }


  const headers = ['id','Assignment Name','Due Date','Course Title','Course ID'];

    return (
      <div>
        <h3>Add Assignments</h3>
        <div margin="auto" >
          <h4 id="amessage" >{message}&nbsp;</h4>
          <table className="Center"> 
            <thead>
              <tr>
                {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
              </tr>
            </thead>
            <tbody>
              {assignment.map((row,idx) => (
                <tr key={idx}>
                  <td>{row.id}</td>
                  <td>{row.name}</td>
                  <td>{row.dueDate}</td>
                  <td>{row.courseTitle}</td>
                  <td>{row.courseId}</td>
                  <td>
                  <input
                      name="assignment"
                      value={(row.assignment)? row.assignment : ""}  
                      type="text"
                      onChange={(e) => onChangeInput(e, idx)}
                  />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button id="sassignment" type="button" margin="auto" onClick={saveAssignment}>Add Assignment</button>
        </div>
      </div>
    )
}

export default AddAssignment;