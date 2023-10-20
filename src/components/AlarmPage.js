import React, { useState } from 'react';
import { useQuery } from 'react-query'
import axios from "axios";
import AlarmForm from "./AlarmForm";


export default function AlarmPage({ user }) {
    const [showTable, setShowTable] = useState(false);


    const getUserAlarms = () => axios.get(`http://localhost:8080/api/alarms/getAllByUserId/${user.id}`).then(res => res.data);
  
    const editAlarm = (updatedAlarm) => {
      // TODO
    };
    
    const deleteAlarm = async (id) => {
      try {
          const result = await axios.delete(`http://localhost:8080/api/alarms/deleteById/${id}`,)
          refetch();
      } catch (error) {
      if (error.response) {
          console.log('Răspuns cu eroare:', error.response.data);
      } else if (error.request) {
          console.log('Eroare de rețea:', error.message);
      } else {
          console.error('Eroare:', error.message);
      }}};

      const toggleTable = () => {
        setShowTable(!showTable);
      };

      const handleDeleteClick = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this alarm?");
        
        if (confirmDelete) {
          deleteAlarm(id);
        }
      };      

      const { data, isLoading, isError, error, refetch } = useQuery('alarms', getUserAlarms);
     

      if (isLoading) {
        return 'Loading alarms...';
      }

      if (isError) {
        return 'Something went wrong!';
      }
  
      return (
  <div className="mx-auto">
    <h1 className="my-4">Add new alarm</h1>
    <div className="border p-4 mb-4">
      <AlarmForm user={user} />
   
    <button className="btn btn-outline-secondary my-3" onClick={toggleTable}>
      {showTable? 'Hide alarms' : 'Show alarms'}
    </button>
        {showTable && (
    <table className="table table-bordered table-sm mx-auto mb-4">
      <thead>
        <tr>
          <th>Stock</th>
          <th>Upper Target</th>
          <th>Lower Target</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((alarm, index) => (
          <tr key={index}>
            <td>{alarm.stock}</td>
            <td>{alarm.upperTarget}%</td>
            <td>{alarm.lowerTarget}%</td>
            <td>
              <button className="btn btn-primary mx-1" onClick={() => editAlarm(alarm)}>Edit</button>
              <button className="btn btn-danger mx-1" onClick={() => handleDeleteClick(alarm.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
     )}
    </div>
  </div>
  
    );
}
