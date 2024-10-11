import { useEffect, useState } from 'react';
import TaskModal from './TaskModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getTaskList } from './http';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const getTasks = async () => {
      const resp = await getTaskList();
      setTaskList(resp);
    };
    getTasks();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDragEnd = async(result) => {
    if (!result.destination) {
      return; // Dropped outside the list
    }

    // Calculate starting index for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;

    // Adjust the index to match the position in the full task list
    const sourceIndex = result.source.index + startIndex;
    const destinationIndex = result.destination.index + startIndex;

    const reorderedTasks = Array.from(taskList);
    const [movedTask] = reorderedTasks.splice(sourceIndex, 1);
    reorderedTasks.splice(destinationIndex, 0, movedTask);
    setTaskList(reorderedTasks);
  };

  // Calculate tasks for the current page
  const currentTasks = taskList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(taskList.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // filter condition

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
            <Droppable droppableId="droppable">
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
                        <input type="text" placeholder="Search Task Title" onChange={(e)=>filterCondtn(e.target.value)}/>
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
                    {currentTasks.map((item, index) => (
                      <Draggable
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                      >
                        {(provided) => (
                          <tr
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <td {...provided.dragHandleProps}>
                              <i className="fa-solid fa-bars"></i>
                            </td>
                            <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                            <td>{item.title}</td>
                            <td>TID-{item.id}</td>
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
                </table>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Pagination */}
        <div className="pagination">
          {[...Array(totalPages).keys()].map((pageNumber) => (
            <button
              key={pageNumber + 1}
              onClick={() => handlePageChange(pageNumber + 1)}
              className={`page-btn ${
                currentPage === pageNumber + 1 ? 'active' : ''
              }`}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
      </div>
      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        setTaskList={setTaskList}
        taskList={taskList}
      />
    </>
  );
}

export default App;
