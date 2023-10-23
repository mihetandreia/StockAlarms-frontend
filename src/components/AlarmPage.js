import React, { useState } from 'react';
import { useQuery } from 'react-query'
import axios from "axios";
import AlarmForm from "./AlarmForm";


export default function AlarmPage({ user }) {
    const [showTable, setShowTable] = useState(false);
    const [initialAlarm, setInitialAlarm] = useState(
      {stock: '',
      upperTarget: 0,
      lowerTarget: 0,
      status: true,
  }); 
    const [onAddOrUpdate, setOnAddOrUpdate] = useState({isEditing: false, initialAlarmValues: initialAlarm});
    const [showForm, setShowForm] = useState(true);
    const hideForm = () => {
      setShowForm(false);
};
    const getUserAlarms = () => axios.get(`http://localhost:8080/api/alarms/getAllByUserId/${user.id}`).then(res => res.data);
  
    const editAlarm = (alarm) => {
     setOnAddOrUpdate({
      isEditing: true,
      initialAlarmValues: alarm
     })
     refetch();
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
    <div className="border p-4 mb-4">
    <h1 className="my-4">Add new alarm</h1>
      <AlarmForm user={user} onAddOrUpdate={
        {isEditing: false, 
         initialAlarmValues: initialAlarm
        }} 
        hideForm={hideForm}/>
   
    <button className="btn btn-outline-secondary my-3" onClick={toggleTable}>
      {showTable? 'Hide alarms' : 'Show alarms'}
    </button>
        {showTable && (
    <table className="table table-bordered table-sm mx-auto mb-4">
      <thead>
        <tr>
          <th>Stock</th>
          <th>Initial price</th>
          <th>Current price</th>
          <th>Variance</th>
          <th>Upper target</th>
          <th>Lower target</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((alarm, index) => (
          <tr key={index}>
            <td>{alarm.stock}</td>
            <td>{alarm.priceWhenAlarmWasDefined}</td>
            <td>{alarm.status ? alarm.currentPrice : "-"}</td>
            <td>{alarm.status ? (alarm.changePercent > 0 ? `+${alarm.changePercent}%` : `${alarm.changePercent}%`) : "-"}</td>
            <td>+{alarm.upperTarget}%</td>
            <td>-{alarm.lowerTarget}%</td>
            <td>{alarm.status ? "Active" : "Inactive"}</td>
            <td>
              <button className="btn btn-primary mx-1" onClick={() => editAlarm({stock: alarm.stock, upperTarget: alarm.upperTarget, lowerTarget: alarm.lowerTarget, status: alarm.status})}>Edit</button>
              <button className="btn btn-danger mx-1" onClick={() => handleDeleteClick(alarm.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
     )}
     {onAddOrUpdate.isEditing && showForm &&
     <div>
      <h2 className="my-4">Update alarm</h2>
      <AlarmForm user={user} onAddOrUpdate={onAddOrUpdate} hideForm={hideForm}/>
     </div> }
    </div>

  </div>
  
    );
}
