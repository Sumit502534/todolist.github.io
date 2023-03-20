import React, { useContext, useEffect, useRef, useState }from 'react'
import noteContext from "../context/notes/noteContext"
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import  { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const {notes, getNotes, editNote} = context;

    useEffect(() => {
      if(localStorage.getItem('token')){
        getNotes()
      }
      else{
        navigate("/login");
      }
        // eslint-disable-next-line
    }, [])
    const ref = useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id:"",utitle:"", udescription:""})

    const updateNote = (currentNote)=>{
      ref.current.click();
      setNote({id:currentNote._id, utitle:currentNote.title, udescription:currentNote.description});
    }
    const handleClick = (e)=>{
      editNote(note.id, note.utitle, note.udescription);
      refClose.current.click();
      props.showAlert("Updated Successfully", "success");
    }
    const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
    }
  return (
    <>
        <AddNote showAlert={props.showAlert}/>
    <button ref={ref}  type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
    Launch demo modal
    </button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="utitle" name="utitle" value={note.utitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="udescription" name="udescription"value={note.udescription} onChange={onChange} minLength={5} required/>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled ={note.utitle.length < 3 || note.udescription.length < 5} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
        <div className="row my-3">
            <h2>Your Notes</h2>
            <div className="container">
            {notes.length === 0 && "No notes to display"}
            </div>
            {notes.map((note)=>{
              return <NoteItem key={note._id} updateNote={updateNote}note ={note} showAlert={props.showAlert}/>;
            })}
        </div>
    </>
  )
}

export default Notes
