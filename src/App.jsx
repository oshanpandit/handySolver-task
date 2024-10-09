import { useState } from 'react';

function App() {
  return (
    <>
      <div className="task-container">
        <div className="task-header">
          <button className="create-task-btn">
            <span>Create New Task</span>
            <span className="plus-icon">+</span>
          </button>
        </div>

        <div className="task-table">
          <table>
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
                  <input type="text" placeholder="Assign Members" />
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
                  <input type="number" placeholder="Hours" />
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
          
              <tr>
                <td><i className="fa-solid fa-bars"></i></td>
                <td>1001</td>
                <td>Design Login Page</td>
                <td>TID-20231001</td>
                <td>In Progress</td>
                <td>John Doe</td>
                <td>2023-10-15</td>
                <td>Yes</td>
                <td>5</td>
                <td>High</td>
                <td>2023-10-10</td>
                <td>
                  <div className="icon-container">
                    <i className="fa-solid fa-pencil"></i>
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </td>
              </tr>

              <tr>
                <td><i className="fa-solid fa-bars"></i></td>
                <td>1001</td>
                <td>Design Login Page khalli walli i love you</td>
                <td>TID-20231001</td>
                <td>In Progress</td>
                <td>John Doe</td>
                <td>2023-10-15</td>
                <td>Yes</td>
                <td>5</td>
                <td>High</td>
                <td>2023-10-10</td>
                <td>
                  <div className="icon-container">
                    <i className="fa-solid fa-pencil"></i>
                    <i className="fa-solid fa-trash"></i>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
