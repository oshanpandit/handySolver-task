import React from "react";
import { getTaskList } from "../http";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useEffect,useState } from "react";
import Filters from "./Filters";
import './Table.scss'

const Table=({taskList,setTaskList})=>{
    const [currentPage, setCurrentPage] = useState(1); //stores the value of current page
    const [currentTaskList, setCurrentTaskList] = useState([]);   //currentlist shows the list in accordance to the paginated task
    const [isFiltering, setIsFiltering] = useState(false); // For tracking if filtering is applied
    // made to check the current applied filters 
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
        };
        getTasks();
      }, []);

      useEffect(()=>{
        paginateTasks(taskList,currentPage);
      },[taskList,currentPage]);

      const handleDragEnd = async (result) => {
        
        if (!result.destination) {
          return; 
        }
    
        const startIndex = (currentPage - 1) * itemsPerPage;
        const sourceIndex = result.source.index + startIndex;
        const destinationIndex = result.destination.index + startIndex;
    
        const reorderedTasks = Array.from(taskList);
        const [movedTask] = reorderedTasks.splice(sourceIndex, 1);
        reorderedTasks.splice(destinationIndex, 0, movedTask);

         setTaskList(reorderedTasks);
      };
    
      const paginateTasks = (tasks, page) => {
        const startIndex = (page - 1) * itemsPerPage;
        const currentTasks = tasks.slice(startIndex, startIndex + itemsPerPage);
        setCurrentTaskList(currentTasks);
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
                return true; // Skip this filter if it's not set i.e no filteraion
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

    return(
        <>
        <div className="task-table">
          <DragDropContext onDragEnd={!isFiltering?handleDragEnd:null}>
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
                    <Filters filterPipe={filterPipe}></Filters>
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
                              {/* if pagination applied then show the relative order like (1,2,3) else show paginated one */}
                              <td>{isFiltering ? index + 1 : index + 1 + (currentPage - 1) * itemsPerPage}</td>
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
                                  <i className="fa-solid fa-trash" onClick={()=>handleTaskDelete(item.id)}></i>
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

        {/* pagination */}
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
        </>
    )
}

export default Table;