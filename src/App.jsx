import { useEffect, useState } from 'react';
import TaskModal from './TaskModal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getTaskList } from './http';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTaskList, setCurrentTaskList] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false); // For tracking if filtering is applied
  const [filters, setFilters] = useState({
    assignedMember: '',
    creationDate: '',
    dueDate: '',
    estimatedHours: '',
    id: '',
    isAssigned: '',
    priorityType: '',
    status: '',
    title: ''
  });
  const itemsPerPage = 4;

  useEffect(() => {
    const getTasks = async () => {
      const resp = await getTaskList();
      setTaskList(resp);
      paginateTasks(resp, currentPage);
    };
    getTasks();
  }, [currentPage]);

  const paginateTasks = (tasks, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const currentTasks = tasks.slice(startIndex, startIndex + itemsPerPage);
    setCurrentTaskList(currentTasks);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) {
      return; // Dropped outside the list
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const sourceIndex = result.source.index + startIndex;
    const destinationIndex = result.destination.index + startIndex;

    const reorderedTasks = Array.from(taskList);
    const [movedTask] = reorderedTasks.splice(sourceIndex, 1);
    reorderedTasks.splice(destinationIndex, 0, movedTask);

    setTaskList(reorderedTasks);

    // If no filters, paginate the tasks
    if (!isFiltering) {
      paginateTasks(reorderedTasks, currentPage);
    } else {
      setCurrentTaskList(reorderedTasks); // Show filtered results without pagination
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filterPipe = (param, value) => {
    const updatedFilters = { ...filters, [param]: value };
    setFilters(updatedFilters);
    filterTasks(updatedFilters);
  };

  const filterTasks = (currentFilters) => {
    const hasFiltersApplied = Object.values(currentFilters).some((val) => val !== '' && val !== 'Select');

    if (hasFiltersApplied) {
      setIsFiltering(true);
      const filteredTasks = taskList.filter((task) => {
        return Object.keys(currentFilters).every((key) => {
          if (currentFilters[key] === '' || currentFilters[key] === 'Select') {
            return true; // Skip this filter if it's not set
          }
          return task[key].toString().toLowerCase().includes(currentFilters[key].toString().toLowerCase());
        });
      });

      if (filteredTasks.length === 0) {
        setCurrentTaskList([]); // Show no tasks if nothing matches the filters
      } else {
        setCurrentTaskList(filteredTasks);
      }
    } else {
      setIsFiltering(false);
      paginateTasks(taskList, currentPage); // Reset to paginated data when no filters
    }
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
                      <td></td>
                      <td>
                        <input
                          type="text"
                          placeholder="Search Task Title"
                          onChange={(e) => filterPipe('title', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          placeholder="Search ID"
                          onChange={(event) => filterPipe('id', event.target.value)}
                        />
                      </td>
                      <td>
                        <select onChange={(e) => filterPipe('status', e.target.value)}>
                          <option>Select</option>
                          <option>Uninitiated</option>
                          <option>In Progress</option>
                          <option>Completed</option>
                        </select>
                      </td>
                      <td>
                        <select onChange={(event) => filterPipe('assignedMember', event.target.value)}>
                          <option>Select</option>
                          <option>Team Member 1</option>
                          <option>Team Member 2</option>
                          <option>Team Member 3</option>
                          <option>Team Member 4</option>
                        </select>
                      </td>
                      <td>
                        <input type="date" onChange={(event) => filterPipe('dueDate', event.target.value)} />
                      </td>
                      <td>
                        <select onChange={(event) => filterPipe('isAssigned', event.target.value)}>
                          <option>Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </td>
                      <td>
                        <input type="time" placeholder="Hours" />
                      </td>
                      <td>
                        <select onChange={(event) => filterPipe('priorityType', event.target.value)}>
                          <option>Select</option>
                          <option>Low</option>
                          <option>Medium</option>
                          <option>High</option>
                        </select>
                      </td>
                      <td>
                        <input type="date" onChange={(event) => filterPipe('creationDate', event.target.value)} />
                      </td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTaskList.length === 0 ? (
                      <tr>
                        <td colSpan="12" style={{ textAlign: 'center' }}>No results found</td>
                      </tr>
                    ) : (
                      currentTaskList.map((item, index) => (
                        <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided) => (
                            <tr ref={provided.innerRef} {...provided.draggableProps}>
                              <td {...provided.dragHandleProps}>
                                <i className="fa-solid fa-bars"></i>
                              </td>
                              <td>{index + 1 + (currentPage - 1) * itemsPerPage}</td>
                              <td>{item.title}</td>
                              <td>{item.id}</td>
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
                      ))
                    )}
                    {provided.placeholder}
                  </tbody>
                </table>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        {/* Pagination */}
        {!isFiltering && currentTaskList.length > 0 && (
          <div className="pagination">
            {[...Array(Math.ceil(taskList.length / itemsPerPage)).keys()].map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber + 1)}
                className={pageNumber + 1 === currentPage ? 'active' : ''}
              >
                {pageNumber + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
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
