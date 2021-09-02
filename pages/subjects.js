import React, {useEffect, useState} from 'react'
import { TrashIcon, PlusIcon } from '@heroicons/react/solid'
import AddEditSubject from '../components/AddEditSubject'

const Subjects = () => {

    const [subjects, setSubjects] = useState([]);

    useEffect(()=>{
        callSubjects();
    },[])

    const callSubjects = async () =>{
        const baseUrl = "https://student-subject-api.herokuapp.com/graphql";
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
          //console.log(result.data.subjects);
          setSubjects(result.data.subjects)
          //console.log(subjects);
    }

    const deleteSubject = async (id) => {
        const baseUrl = "https://student-subject-api.herokuapp.com/graphql";
        const headers = {
            "Content-Type": "application/json"
        };

        const body = `
                mutation{
                    deleteSubject(_id:"${id}")
                }
            `
          ;
          const res = await fetch(baseUrl,{
            method: "POST",
            headers: headers,
            body: JSON.stringify({query: body})
          });
          const result = await res.json();
          callSubjects();
    }

    return (
        <div style={{padding: '30px 30px'}}>
            
            <div style={displayFlexItemSpaced}>
              <div>
                <AddEditSubject func="add" callSubjects={callSubjects}/>
              </div>

              <div style={title}>
                  Subject List
              </div>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Subject Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            subjects.length>0 && subjects.map((subject, index) => (
                                <tr key={subject._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{subject.name}</td>
                                    <td style={flexIcon}>
                                    <AddEditSubject 
                                        func="update" 
                                        callSubjects={callSubjects}
                                        subject_id = {subject._id}
                                        subject_name={subject.name}
                                    />
                                        <TrashIcon onClick={()=>{deleteSubject(subject._id)}} style={iconStyle}/>
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

export default Subjects

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

const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9A9696',
    color: '#fff',
    padding: '7px 15px',
    border: 'none',
    borderRadius: '0px'
}