import { useState } from 'react';
import TaskModal from './TaskModal';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskList, setTaskList] = useState([
    {
      serialNo: '1',
      title: "Task 1",
      status: "Uninitiated",
      assignedMember: "Team Member 2",
      dueDate: "2024-10-06",
      isAssigned: "Yes",
      estimatedHours: "13:16",
      priorityType: "Low",
      creationDate: "2024-10-10"
    },
    {
      serialNo: '2',
      title: "Task 2",
      status: "In Progress",
      assignedMember: "Team Member 1",
      dueDate: "2024-10-12",
      isAssigned: "Yes",
      estimatedHours: "08:30",
      priorityType: "High",
      creationDate: "2024-10-09"
    },
    {
      serialNo: '3',
      title: "Task 3",
      status: "Completed",
      assignedMember: "Team Member 3",
      dueDate: "2024-10-15",
      isAssigned: "No",
      estimatedHours: "05:00",
      priorityType: "Medium",
      creationDate: "2024-10-08"
    }
  ]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return; // Dropped outside the list
    }

    const reorderedTasks = Array.from(taskList);
    const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    reorderedTasks.splice(result.destination.index, 0, movedTask);

    setTaskList(reorderedTasks);
  };

  return (
    <>
      <div className="task-container">
        <div className="task-header">
          <button className="create-task-btn" onClick={handleOpenModal}>
            <span>Create New Task</span>
            <span className="plus-icon">+</span>
          </button>
        </div>

        <div className="task-table">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided) => (
                <table ref={provided.innerRef} {...provided.droppableProps}>
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Serial No.</th>
                      <th>Task Title</th>
                      <th>Task ID</th>
                      <th>Status</th>
                      <th>Assigned Members</th>
                      <th>Due Date</th>
                      <th>Is Assigned</th>
                      <th>Estimated Hours</th>
                      <th>Priority</th>
                      <th>Created On</th>
                      <th>Actions</th>
                    </tr>
                    <tr>
                      <td>
                        <i className="fa-solid fa-filter filter-icon"></i>
                      </td>
                      <td>
                        {/* <input type="text" placeholder="Serial No." /> */}
                      </td>
                      <td>
                        <input type="text" placeholder="Search Task Title" />
                      </td>
                      <td>
                        <input type="text" placeholder="Search ID" />
                      </td>
                      <td>
                        <select>
                          <option>Select Status</option>
                          <option>Uninitiated</option>
                          <option>In Progress</option>
                          <option>Completed</option>
                        </select>
                      </td>
                      <td>
                        <select>
                          <option>Assign Team Member</option>
                          <option>Team Member 1</option>
                          <option>Team Member 2</option>
                          <option>Team Member 3</option>
                          <option>Team Member 4</option>
                        </select>
                      </td>
                      <td>
                        <input type="date" />
                      </td>
                      <td>
                        <select>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </td>
                      <td>
                        <input type="time" placeholder="Hours" />
                      </td>
                      <td>
                        <select>
                          <option>Select Priority</option>
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </td>
                      <td>
                        <input type="date" />
                      </td>
                      <td>
                        {/* Action Buttons if any */}
                      </td>
                    </tr>
                  </thead>
                  <tbody>
                    {taskList.map((item, index) => (
                      <Draggable key={item.serialNo} draggableId={item.serialNo} index={index}>
                        {(provided) => (
                          <tr ref={provided.innerRef} {...provided.draggableProps}>
                            <td {...provided.dragHandleProps}><i className="fa-solid fa-bars"></i></td>
                            <td>{item.serialNo}</td>
                            <td>{item.title}</td>
                            <td>TID-20231001</td>
                            <td>{item.status}</td>
                            <td>{item.assignedMember}</td>
                            <td>{item.dueDate}</td>
                            <td>{item.isAssigned}</td>
                            <td>{item.estimatedHours}</td>
                            <td>{item.priorityType}</td>
                            <td>{item.creationDate}</td>
                            <td>
                              <div className="icon-container">
                                <i className="fa-solid fa-pencil"></i>
                                <i className="fa-solid fa-trash"></i>
                              </div>
                            </td>
                          </tr>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </tbody>
                  {provided.placeholder}
                </table>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <TaskModal isOpen={isModalOpen} onClose={handleCloseModal} setTaskList={setTaskList} taskList={taskList} />
    </>
  );
}

export default App;
