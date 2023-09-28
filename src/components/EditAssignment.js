import React, { useState } from 'react';


function EditAssignment(props) { 
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

  const headers = ['id','Assignment Name','Due Date','Course Title','Course ID'];

  const onChangeUpdate = (e) => {
    console.log("onChangeUpdate "+e.target.value);
    setAssignment(e.target.value);
  }

  return (
    <div>
      <h3>Add Edit Assignment</h3>
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
        <button id="sedit" type="button" margin="auto" onClick={saveAssignment}>Edit Assignment</button>
      </div>
    </div>
  );
}

export default EditAssignment;