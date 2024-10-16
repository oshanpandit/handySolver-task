import React, { useState } from 'react';
import { addToTaskList } from '../http';
import { v4 as uuidv4 } from 'uuid';
import './TaskModal.scss'

const Modal = ({ isOpen, onClose,setTaskList,taskList}) => {
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData=new FormData(e.target);
    let formObject=Object.fromEntries(formData.entries());
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year }-${month}-${day}`;
    formObject={...formObject,id:uuidv4().slice(0, 4),creationDate:formattedDate}
    console.log(formObject);
    const resp=await addToTaskList(formObject);
    if(resp){
      setTaskList((prev)=>[...prev,formObject]);
    }
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Task</h2>
        <button className="close-modal" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <div className='form-field-title'>Task Title</div>
            <div className='form-field-input'>
            <input
              type="text"
              name="title"
              placeholder='Enter Title'
              required
            /></div>
          </div>

          <div className="form-group">
            <div className='form-field-title'>Status</div>
            <div className='form-field-input'>
            <select
              name="status"
              required
            >
            <option selected value={'N/A'}>Select Status</option>
            <option>Uninitiated</option>
            <option>In Progress</option>
            <option>Completed</option>
            </select>
            </div>
          </div>

          <div className="form-group">
            <div className='form-field-title'>Assigned Member</div>
            <div className='form-field-input'>
            <select
              name="assignedMember"
            >
            <option selected value={'N/A'}>Select Team Member</option>
            <option>Team Member 1</option>
            <option>Team Member 2</option>
            <option>Team Member 3</option>
            <option>Team Member 4</option>
            </select>
            </div>
          </div>

          <div className="form-group">
            <div className='form-field-title'>Due Date</div>
            <div className='form-field-input'>
            <input
              name="dueDate"
              type='date'
              placeholder=''
              required
            />
            </div>
          </div>

          <div className="form-group">
            <div className='form-field-title'>Is Assigned</div>
            <div className='form-field-input'>
            <select
              name="isAssigned"
              required
            >
            <option selected value={'N/A'}>Select is Assigned</option>
            <option>Yes</option>
            <option>No</option>
            </select>
            </div>
          </div>

          <div className="form-group">
            <div className='form-field-title'>Estimated Hours</div>
            <div className='form-field-input'>
            <input
              type='time'
              name="estimatedHours"
              required
            />
            </div>
          </div>

          <div className="form-group">
            <div className='form-field-title'>Is Priority</div>
            <div className='form-field-input'>
            <select
              name="priorityType"
              required
            >
            <option selected value={'N/A'}>Select Priority</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            </select>
            </div>
          </div>

          <button type="submit" className="submit-btn">Create Task</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
