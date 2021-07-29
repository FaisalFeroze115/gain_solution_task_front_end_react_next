import { SaveIcon, PlusIcon, PencilAltIcon } from '@heroicons/react/solid';
import React, {useState, useEffect} from 'react'
import { Modal, Button } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {

    const [subjectName, setSubjectName] = useState('');
    const [subjectId, setSubjectId] = useState('');


    useEffect( () =>{
        if(props.func === "update"){
            setSubjectName(props.subject_name)
            setSubjectId(props.subject_id)     
        }
    },[])

    const SubjectAddOrUpdate = async (e) => {
        e.preventDefault();

        if(props.func==="add"){
            const body = `
                mutation{
                    addSubject(name: "${subjectName}"){
                        _id
                        name
                    }
                }
                `
            ;
            const baseUrl = "http://localhost:5000/graphql";
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
            props.callSubjects()
            setSubjectName('')
            props.modalDisplayFunc(false)

        }else if(props.func==="update"){

            const body = `
                mutation{
                    updateSubject(_id:"${subjectId}", name:"${subjectName}")
                }
            `;
            const baseUrl = "http://localhost:5000/graphql";
            const headers = {
                "Content-Type": "application/json"
            };
            const res = await fetch(baseUrl,{
                method: "POST",
                headers: headers,
                body: JSON.stringify({query: body})
            });
            const result = await res.json();
            props.callSubjects()
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
                props.func === "add" ? <span>Add Subject</span>  :  <span>Update {props.subject_name}</span>
            }
            
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <form onSubmit={SubjectAddOrUpdate}>
            <div className="form-group" style={inputDiv}>
                <label>Subject Name</label>
                <input type="text" value={subjectName} onChange={(e)=>{setSubjectName(e.target.value)}} className="form-control" placeholder="Enter Subject Name" required/>
            </div>

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

const AddEditSubject = (props) => {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <>
        {
            props.func==="add" ? 
            <Button variant="primary" style={buttonStyle} onClick={() => setModalShow(true)}>
                <PlusIcon style={{width:'20px'}}/>
                Add Subject
            </Button>
            : 
            <PencilAltIcon style={iconStyle} onClick={() => setModalShow(true)}/>
        }
        

        <MyVerticallyCenteredModal
            show={modalShow}
            modalDisplayFunc = {setModalShow}
            callSubjects = {props.callSubjects}
            onHide={() => setModalShow(false)}
            func = {props.func}
            subject_name = {props.subject_name}
            subject_id = {props.subject_id}
        />
    </>
    )
}

export default AddEditSubject

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
