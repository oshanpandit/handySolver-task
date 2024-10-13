export const getTaskList=async()=>{
   const resp=await fetch('http://localhost:8000/taskList');
   if(!resp.ok){
     throw new Error('Failed to fetch tasks');
   }
   const taskList=await resp.json();
   return taskList
}

export const addToTaskList = async (payload) => {
    const resp = await fetch('http://localhost:8000/taskList', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  
    if (!resp.ok) {
      throw new Error('Failed to add task');
    }
  
    const newTask = await resp.json();
    return newTask;
 };

 export const updateTask = async (updatedTask, id) => {
  try {
    const response = await fetch(`http://localhost:8000/taskList/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      throw new Error("Failed to update the task on the server");
    }
    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error updating the task:", error);
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await fetch(`http://localhost:8000/taskList/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete the task from the server");
    }

    return "Task successfully deleted";
  } catch (error) {
    console.error("Error deleting the task:", error);
  }
};

