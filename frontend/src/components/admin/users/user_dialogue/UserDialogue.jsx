import { editUserRequest } from './../../../../api_requests/admin/import';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function EditUserDialog(props) {
  const { open, onClose, user, onUserUpdated } = props;
  console.log(user);
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [contactNumber, setContactNumber] = useState(user?.contactNumber || '');
  const [password, setPassword] = useState('');
  const [deletionApproved, setDeletionApproved] = useState(false);

  const handleSave = () => {
    // Handle save button click and update user
    const updatedUser = {
      _id: user._id,
      firstName: firstName !== '' ? firstName : user.firstName,
      lastName: lastName !== '' ? lastName : user.lastName,
      email: email !== '' ? email : user.email,
      contactNumber: contactNumber !== '' ? contactNumber : user.contactNumber,
      password: password !== '' ? password : undefined,
      deletionApproved: deletionApproved
    };
  
    // Perform API request to update the user
    // Assuming there's an editUserRequest function available
    editUserRequest(user._id, updatedUser)
      .then(() => {
        // User updated successfully
        onUserUpdated();
        onClose();
      })
      .catch((error) => {
        console.log('Failed to update user:', error);
      });
  };  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        {user && (
          <TextField
            label="First Name"
            defaultValue={user.firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
          />
        )}
        {user && (
          <TextField
            label="Last Name"
            defaultValue={user.lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
          />
        )}
        {user && (
          <TextField
            label="Email"
            defaultValue={user.email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        )}
        {user && (
          <TextField
            label="Contact Number"
            defaultValue={user.contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            fullWidth
          />
        )}
        {user && (
          <TextField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
        )}
        <div>
          <input type="checkbox" checked={deletionApproved} onChange={() => setDeletionApproved(!deletionApproved)} />
          <label>Deletion Approved</label>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditUserDialog;