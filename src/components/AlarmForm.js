import React, { useEffect, useState } from 'react';
import axios from "axios";

function AlarmForm({ user }) {
  const [alarm, setAlarm] = useState({
    stock: '',
    upperTarget: 0,
    lowerTarget: 0,
    status: true,
  });

  const handleChange = (e) => {
    setAlarm({ ...alarm, [e.target.name]: e.target.value, user });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:8080/api/alarms/add", alarm);
        alert("Added Successfully");
        setAlarm({
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
      <button type="submit" className="btn btn-primary mt-3">Add Alarm</button>
    </form>
  );
  

}

export default AlarmForm;
