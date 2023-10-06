import React, { useState } from 'react';


function DeleteAssignments(props) { 

    const [assignmentGrades ,setAssignmentGrades] = useState('');
    let assignmentId=0;
    const [assignment, setAssignment] = useState('');
    const [name ,setName] = useState('');
    const [dueDate ,setDueDate] = useState('');
    const [message, setMessage] = useState('');

    

    return (
        <div>
          <h3>Assignments</h3>
          <div margin="auto" >
            <h4>{message}&nbsp;</h4>
                <table className="Center"> 
                  <thead>
                    <tr>
                      {headers.map((title, idx) => (<th key={idx}>{title}</th>))}
                    </tr>
                  </thead>
                  <tbody>
                    {assignments.map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.assignmentName}</td>
                        <td>{row.courseTitle}</td>
                        <td>{row.dueDate}</td>
                        <td>
                          <Link to={`/gradeAssignment/${assignments[idx].id}`} >Grade</Link>
                        </td>
                        <td>Edit</td>
                        <td>Delete</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
        </div>
      )
}
export default DeleteAssignments;