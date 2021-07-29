import React from 'react'
import { useState, useEffect } from 'react'
import { useQuery } from "react-query";
import { BeakerIcon, PencilAltIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid'
import AddStudent from '../components/AddStudent'


const Students = () => {

    const [students, setStudents] = useState([]);

    const callStudents = async () => {
        const baseUrl = "http://localhost:5000/graphql";
        const headers = {
            "Content-Type": "application/json"
        };

        const body = `
              { 
                students{
                    _id
                    name
                    email
                    phone
                    dob
                    subject{
                        name
                    }
                }
              } 
            `
          ;
          const res = await fetch(baseUrl,{
            method: "POST",
            headers: headers,
            body: JSON.stringify({query: body})
          });

          const result = await res.json();
          //console.log(result.data.students)
          setStudents(result.data.students)
          //console.log(students);
    }

    useEffect(()=>{
        callStudents();
    },[])

    const deleteStudent = async (id) => {
        const baseUrl = "http://localhost:5000/graphql";
        const headers = {
            "Content-Type": "application/json"
        };

        const body = `
                mutation{
                    deleteStudent(_id:"${id}")
                }
            `
          ;
          const res = await fetch(baseUrl,{
            method: "POST",
            headers: headers,
            body: JSON.stringify({query: body})
          });
          const result = await res.json();
          callStudents();
    }

    return (
        <div style={{padding: '30px 30px'}}>
            
            <div style={displayFlexItemSpaced}>
              <div>
                <AddStudent func="add" callStudents={callStudents}/>
              </div>

              <div style={title}>
                  Students
              </div>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Student Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Date of Birth</th>
                            <th>Assigned Subjects</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((student, index) => (
                                <tr key={student._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.dob}</td>
                                    <td>
                                        {
                                            student.subject.map(sub =>(
                                                <span>{sub.name} </span>
                                            ))
                                        
                                        }
                                    
                                    </td>
                                    <td style={flexIcon}>
                                        <AddStudent 
                                            func="update" 
                                            callStudents={callStudents}
                                            student_id = {student._id}
                                            student_name={student.name}
                                            student_email={student.email}
                                            student_phone={student.phone}
                                            student_dob={student.dob}
                                            student_sub={student.subject}
                                        />
                                        <TrashIcon onClick={()=>{deleteStudent(student._id)}} style={iconStyle}/>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Students

const displayFlexItemSpaced = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px'
}

const flexIcon = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
}

const title = {
    color: '#9A9696',
    fontSize: '24px',
    fontFamily: "Red Hat Text",
    fontWeight: "600",

}

const iconStyle = {
    width: '25px',
    cursor: 'pointer',
    color: '#333'
}

// export async function getServerSideProps() {

    
//     //After the server has rendered pass the result to the client...
//     return {
//         props:{
//             results: result
//         }
//     }
// }
