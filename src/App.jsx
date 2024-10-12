import { useEffect, useState } from 'react';
import TaskModal from './Components/TaskModal';
import Table from './Components/Table';
import './App.scss';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskList, setTaskList] = useState([])

   const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      </div>

      <Table 
      taskList={taskList} 
      setTaskList={setTaskList}
      />

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
