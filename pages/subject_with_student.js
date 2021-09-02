import React, {useEffect, useState} from 'react'

const subject_with_student = () => {

    const [subjectWiseStudents, setSubjectWiseStudents] = useState([]);

    useEffect( async () =>{
        const baseUrl = "https://student-subject-api.herokuapp.com/graphql";
        const headers = {
            "Content-Type": "application/json"
        };

        const body = `
            {
                subjects{
                name
                    students{
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
          console.log(result.data.subjects)
          setSubjectWiseStudents(result.data.subjects)

    },[])

    return (
        <div style={{padding: '30px 30px'}}>
            <div style={displayFlexItemSpaced}>
              <div style={title}>
                  Subject Wise Students
              </div>
              <div></div>
            </div>

            <div>
            <table className="table">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Subject Name</th>
                            <th>Students Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subjectWiseStudents.length>0 && subjectWiseStudents.map((item, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.name}</td>
                                    <td> 
                                        {
                                           item.students.length>0 ? item.students.map(student=>(
                                                <span>{student.name} </span>
                                                
                                            ))
                                            : <span>No Students assigned to this Subject.</span>
                                        }
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


export default subject_with_student

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
