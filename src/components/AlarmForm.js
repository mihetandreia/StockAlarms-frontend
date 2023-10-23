import React, { useState } from 'react';
import axios from "axios";

function AlarmForm({ user, onAddOrUpdate, hideForm }) {
  const [alarm, setAlarm] = useState(onAddOrUpdate.initialAlarmValues);
  const [isEditing, setIsEditing] = useState(onAddOrUpdate.isEditing);
 

  const handleChange = (e) => {
    setAlarm({ ...alarm, [e.target.name]: e.target.value, user });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (onAddOrUpdate.isEditing) {
        await axios.put(`http://localhost:8080/api/alarms/update/${alarm.id}`, alarm);
        alert("Updated Successfully");
        hideForm();
      } else {
        await axios.post("http://localhost:8080/api/alarms/add", alarm);
        alert("Added Successfully");
      }

      setAlarm({
        id: '',
        stock: '',
        upperTarget: 0,
        lowerTarget: 0,
        status: true,
      });

    } catch (err) {
      alert(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {isEditing && (
        <div>
          <input
            type="hidden"
            name="id"
            value={alarm.id} 
          />
        </div>
      )}

      <div className="form-row">
        <div className="col-md-4 mx-auto">
          <div className="form-group">
            <input
              type="text"
              name="stock"
              className="form-control"
              placeholder="Stock"
              value={alarm.stock}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-4 mx-auto">
          <div className="form-group">
            <input
              type="number"
              name="upperTarget"
              className="form-control"
              placeholder="Upper Target"
              value={alarm.upperTarget === 0 ? '' : alarm.upperTarget}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-4 mx-auto">
          <div className="form-group">
            <input
              type="number"
              name="lowerTarget"
              className="form-control"
              placeholder="Lower Target"
              value={alarm.lowerTarget === 0 ? '' : alarm.lowerTarget}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-primary mt-3">
        {isEditing ? "Update Alarm" : "Add Alarm"}
      </button>
    </form>
  );
}

export default AlarmForm;
