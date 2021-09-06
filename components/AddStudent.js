import { SaveIcon, PlusIcon, PencilAltIcon } from '@heroicons/react/solid';
import React, {useState, useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [sub, setSub] = useState('');
    const [studentId, setStudentId] = useState('');
    const [subjects, setSubjects] = useState([]);

    useEffect(() =>{
        get_subject();
    },[props.func, props.student_phone, props.student_dob])

    const get_subject = async () => {
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
          //console.log(result.data.subjects)
          setSubjects(result.data.subjects)
          console.log(subjects);

          if(props.func === "update"){
            setName(props.student_name)
            setEmail(props.student_email)
            setStudentId(props.student_id)
            
            if(props.student_phone === null){
                setPhone('')
            }else{
                setPhone(props.student_phone)
            }
            if(props.student_dob === null){
                setDob('')
            }else{
                setDob(props.student_dob)
            }
            
          }
    }

    const StudentAddOrUpdate = async (e) => {
        e.preventDefault();

        if(props.func==="add"){
            const body = `
                mutation
                {
                    addStudent(name:"${name}",email:"${email}", phone:"${phone}",dob:"${dob}", subject_id:"${sub}"){
                        _id
                        name
                    }
                }
                `
            ;
            const baseUrl = "https://student-subject-api.herokuapp.com/graphql";
            const headers = {
                "Content-Type": "application/json"
            };
            const res = await fetch(baseUrl,{
                method: "POST",
                headers: headers,
                body: JSON.stringify({query: body})
            });
            const result = await res.json();
            //console.log(result.data);
            props.callStudents()
            setName(''),
            setEmail('');
            setPhone('');
            setDob('');
            setSub('');
            props.modalDisplayFunc(false)

        }else if(props.func==="update"){

            const body = `
                mutation{
                    updateStudent(_id:"${studentId}",name:"${name}", email:"${email}",phone:"${phone}",dob:"${dob}")
                }
            `;
            const baseUrl = "https://student-subject-api.herokuapp.com/graphql";
            const headers = {
                "Content-Type": "application/json"
            };
            const res = await fetch(baseUrl,{
                method: "POST",
                headers: headers,
                body: JSON.stringify({query: body})
            });
            const result = await res.json();
            //console.log(result.data);studentId
            props.callStudents()
            // setName(''),
            // setEmail('');
            // setPhone('');
            // setDob('');
            // setSub('');
            props.modalDisplayFunc(false)
        }

        
        
    }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton style={{color: '#fff', backgroundColor: '#9A9696'}}>
          <Modal.Title id="contained-modal-title-vcenter">
            {
                props.func === "add" ? <span>Add Student</span>  :  <span>Update {props.student_name}</span>
            }
            
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <form onSubmit={StudentAddOrUpdate}>
            <div className="form-group" style={inputDiv}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="form-control" placeholder="Enter Name" required/>
            </div>
            <div className="form-group" style={inputDiv}>
                <label>Email</label>
                <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control" placeholder="Enter Email" required/>
            </div>
            <div className="form-group" style={inputDiv}>
                <label>Phone</label>
                <input type="text" value={phone} onChange={(e)=>{setPhone(e.target.value)}} className="form-control" placeholder="Enter Phone Number" />
            </div>
            <div className="form-group" style={inputDiv}>
                <label>Date of Birth</label>
                <input type="date" value={dob} onChange={(e)=>{setDob(e.target.value)}} className="form-control" />
            </div>
            {
                props.func === "add" ?
                <div className="form-group" style={inputDiv}>
                <label>Assign a Subject</label>
                <select value={sub} onChange={(e)=>{setSub(e.target.value)}} className="form-select" aria-label="Default select example">
                    <option selected>Choose Subject ....</option>
                    {
                      subjects.length > 0 && subjects.map((subject, index) =>(
                            <option key={index} value={subject._id}>{subject.name}</option>
                        ))
                    }
                </select>
            </div>
            : null
            }
            

            <div className="form-group" style={inputDiv}>
                <Button type="submit" style={saveButton}>
                    { props.func === "add" ? 
                       <> <SaveIcon style={{width:'20px'}}/> Save </>
                        : 
                        <> <SaveIcon style={{width:'20px'}}/> Update </>
                    }
                     
                </Button>
            </div>
            
        </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    );
  }

  

const AddStudent = (props) => {
    const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
    {
        props.func==="add" ? 
        <Button variant="primary" style={buttonStyle} onClick={() => setModalShow(true)}>
            <PlusIcon style={{width:'20px'}}/>
            Add Student
        </Button>
        : 
        <PencilAltIcon style={iconStyle} onClick={() => setModalShow(true)}/>
    }
      

      <MyVerticallyCenteredModal
        show={modalShow}
        modalDisplayFunc = {setModalShow}
        callStudents = {props.callStudents}
        onHide={() => setModalShow(false)}
        func = {props.func}
        student_id = {props.student_id}
        student_name = {props.student_name}
        student_email = {props.student_email}
        student_phone = {props.student_phone}
        student_dob = {props.student_dob}
        student_sub = {props.student_sub}
      />
    </>
  );
        
}

export default AddStudent

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

const saveButton = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9A9696',
    color: '#fff',
    border: 'none',
    borderRadius: '0px',
}

const inputDiv = {
    marginBottom: '20px',
}

const iconStyle = {
    width: '25px',
    cursor: 'pointer',
    color: '#333'
}