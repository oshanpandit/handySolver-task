import React from "react";
import { useState,useEffect } from "react";
import {updateTask} from '../http';

const EditModal=({taskList,isOpen,onClose,setTaskList,editTaskIndex})=>{

    const selectedTask = taskList[editTaskIndex];

    const [taskData, setTaskData] = useState({
        title: '',
        status: 'N/A',
        assignedMember: 'N/A',
        dueDate: '',
        isAssigned: 'N/A',
        estimatedHours: '',
        priorityType: 'N/A'
      });

      useEffect(() => {
        if (selectedTask) {
          setTaskData(selectedTask);
        }
      }, [selectedTask]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
          ...taskData,
          [name]: value
        });
      };
     
      const handleSubmit = async(e) => {
        e.preventDefault();
        
        const updatedTaskList = taskList.map((task, index) =>
          index === editTaskIndex ? { ...task, ...taskData } : task
        );
    
        const resp=await updateTask(taskData,selectedTask.id);
        if(resp){
           setTaskList(updatedTaskList);
        }
        onClose();
      };
    
    

    if(!isOpen) return null;

    return(
        <>
     <div className="modal-overlay">
        <div className="modal-content">
          <h2>Edit Task</h2>
          <button className="close-modal" onClick={onClose}>
            &times;
          </button>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <div className="form-field-title">Task Title</div>
              <div className="form-field-input">
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  value={taskData.title}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-field-title">Status</div>
              <div className="form-field-input">
                <select
                  name="status"
                  value={taskData.status}
                  onChange={handleChange}
                  required
                >
                  <option value="N/A">Select Status</option>
                  <option>Uninitiated</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-field-title">Assigned Member</div>
              <div className="form-field-input">
                <select
                  name="assignedMember"
                  value={taskData.assignedMember}
                  onChange={handleChange}
                >
                  <option value="N/A">Select Team Member</option>
                  <option>Team Member 1</option>
                  <option>Team Member 2</option>
                  <option>Team Member 3</option>
                  <option>Team Member 4</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-field-title">Due Date</div>
              <div className="form-field-input">
                <input
                  name="dueDate"
                  type="date"
                  value={taskData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-field-title">Is Assigned</div>
              <div className="form-field-input">
                <select
                  name="isAssigned"
                  value={taskData.isAssigned}
                  onChange={handleChange}
                  required
                >
                  <option value="N/A">Select is Assigned</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <div className="form-field-title">Estimated Hours</div>
              <div className="form-field-input">
                <input
                  type="time"
                  name="estimatedHours"
                  value={taskData.estimatedHours}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="form-field-title">Is Priority</div>
              <div className="form-field-input">
                <select
                  name="priorityType"
                  value={taskData.priorityType}
                  onChange={handleChange}
                  required
                >
                  <option value="N/A">Select Priority</option>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <button type="submit" className="submit-btn">Save Changes</button>
          </form>
        </div>
      </div>
  </>
    )
}

export default EditModal;