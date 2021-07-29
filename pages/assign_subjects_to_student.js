import { BackspaceIcon, PlusIcon, UserRemoveIcon } from '@heroicons/react/solid'
import React, {useState, useEffect} from 'react'

const assign_subjects_to_student = () => {

    const [subjectWiseStudent, setSubjectWiseStudent] = useState([]);
    const [allSubjects, setAllSubjects] = useState([]);
    const [subjectId, setSubjectId] = useState('');

    const removeSubFromStudent = async (subject_id, student_id) => {
        const baseUrl = "http://localhost:5000/graphql";
        const headers = {
            "Content-Type": "application/json"
        };

        const body = `
                mutation{
                    deleteSubjectFromStudent(student_id:"${student_id}", subject_id:"${subject_id}")
                }
            `
          ;
          const res = await fetch(baseUrl,{
            method: "POST",
            headers: headers,
            body: JSON.stringify({query: body})
          });
          const result = await res.json();
          getData();
    }

    const AssignSubject = async (student_id) => {
        if(student_id === " " || subjectId === " "){
            return;
        }
        const baseUrl = "http://localhost:5000/graphql";
        const headers = {
            "Content-Type": "application/json"
        };

        const body = `
                mutation{
                    addSubjectToStudent(_id: "${student_id}", subject_id:"${subjectId}"){
                    student_subject{
                        subject_id
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
          setSubjectId('')
          getData();

    }

    const getData = async () => {
        const baseUrl = "http://localhost:5000/graphql";
        const headers = {
            "Content-Type": "application/json"
        };

        const body = `
            {
                students{
                _id
                name
                subject{
                    _id
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
          //console.log(result.data.subjects)
          setSubjectWiseStudent(result.data.students)
    }

    

    const callSubjects = async () =>{
        const baseUrl = "http://localhost:5000/graphql";
        const headers = {
            "Content-Type": "application/json"
        };

        const body = `
                {
                    subjects{
                        _id
                        name
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
          setAllSubjects(result.data.subjects)

    }

    useEffect(()=>{
        getData();
        callSubjects();

    },[])


    return (
        <div style={{padding: '30px 30px'}}>
            
            <div style={displayFlexItemSpaced}>
              <div style={title}>
                  Assign Subjects to Students
              </div>
              <div></div>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Student Name</th>
                            <th>Assigned Subject</th>
                            <th>Assign a New Subject</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subjectWiseStudent.length > 0 && subjectWiseStudent.map((item, index)=>(

                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td style={gridStyle}>
                                        {
                                            item.subject.length > 0 ? item.subject.map(sub=>(
                                                <p style={spanStyle}>
                                                    <span>{sub.name}</span>  
                                                    <BackspaceIcon onClick={()=>{removeSubFromStudent(sub._id,item._id)}} 
                                                    style={{width:'25px', cursor: 'pointer',}}/>
                                                </p>
                                            ))
                                            : <p> 
                                                <span>No Subject Assigned Yet</span> 
                                                <span></span>
                                            </p>
                                        }
                                        
                                        
                                    </td>

                                    <td>
                                        <div className="form-group" style={FlexItem}>
                                            <select onChange={(e)=>{setSubjectId(e.target.value)}} className="form-select" aria-label="Default select example">
                                                <option selected>Choose Subject ....</option> 
                                                {
                                                    allSubjects.map(sub=>(
                                                        <option value={sub._id}>{sub.name}</option>
                                                    ))
                                                }
                                                
                                            </select>
                                            <button onClick={()=>{AssignSubject(item._id)}} style={spanStyle}>
                                                <PlusIcon style={{width: '25px', color: '#fff'}}/>
                                            </button>
                                            
                                        </div>
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

export default assign_subjects_to_student

const displayFlexItemSpaced = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '40px'
}

const title = {
    color: '#9A9696',
    fontSize: '24px',
    fontFamily: "Red Hat Text",
    fontWeight: "600",

}

const FlexItem = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const spanStyle ={
    backgroundColor: 'rgb(175 174 174)',
    border: '1px solid #ccc',

    color: '#fff',
    marginRight: '2px',
    padding: '5px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
}

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridColumnGap: '5px',
    gridRowGap: '5px',
    alignItems: 'center',
    justifyContent: 'center',
}


                     {/* {
                                                    item.subject.map(subject => (
                                                        allSubjects.map(sub=>(
                                                            sub === subject ? <option>{subject.name}</option> : null
                                                        ))
                                                        
                                                    ))
                                                } */}