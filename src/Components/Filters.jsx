const Filters=({filterPipe})=>{
    return(
        <>
                <tr>
                      <td>
                        <i className="fa-solid fa-filter filter-icon"></i>
                      </td>
                      <td></td>
                      <td>
                        <input
                          type="text"
                          placeholder="Search Task Title"
                          onChange={(event) => filterPipe('title', event.target.value)}
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
                        <select onChange={(event) => filterPipe('status', event.target.value)}>
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
        </>
    )
}

export default Filters;