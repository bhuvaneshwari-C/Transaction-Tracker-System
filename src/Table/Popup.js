// import React, { useState } from 'react';

// const Prompt = ({ initialValue, onCancel, onConfirm }) => {
//   const [value, setValue] = useState(initialValue);

//   const handleChange = (e) => {
//     setValue(e.target.value);
//   };

//   const handleCancel = () => {
//     onCancel();
//   };

//   const handleConfirm = () => {
//     onConfirm(value);
//   };

//   return (
//     <div className="prompt">
//       <input type="text" value={value} onChange={handleChange} />
//       <button onClick={handleCancel}>Cancel</button>
//       <button onClick={handleConfirm}>Update</button>
//     </div>
//   );
// };

// export default Prompt;

import './Popup.css';


import React, { useState } from 'react';

const Popup = ({ onClose, onUpdate, initialData }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div class="popup">
      <div class="popup-inner">
        <center>
        <h2>Update Transaction</h2>
        <form onSubmit={handleSubmit}>
          <label>Transaction Id:
          <input type="text" name="transactionId" value={formData.transactionId} onChange={handleChange} /></label>
          <label>Customer Name:
          <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} /></label>
          <label>Date:
          <input type="date" name="date" value={formData.date} onChange={handleChange} /></label>
          <label>Amount:
          <input type="text" name="amount" value={formData.amount} onChange={handleChange} /></label>
          <label>Status:
          <input type="text" name="status" value={formData.status} onChange={handleChange} /></label>
          <label>Invoice URL:
          <input type="text" name="url" value={formData.url} onChange={handleChange} /><br/></label>
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
        </center>
      </div>
    </div>
  );
};

export default Popup;

