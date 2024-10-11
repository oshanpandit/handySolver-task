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

  