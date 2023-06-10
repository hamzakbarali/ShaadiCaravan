import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { createUserRequest } from './../../../../api_requests/admin/import';

function CreateUserDialog(props) {
  const { open, onClose, onUserCreated } = props;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSave = () => {
    // Check if all fields are filled
    if (!firstName || !lastName || !email || !password || !contactNumber) {
      console.log('Please fill in all fields');
      return;
    }
  
    // Create the user object with the provided data
    const newUser = {
      firstName,
      lastName,
      email,
      password,
      accountType: 'user',
      language: 'en',
      contactNumber
    };
  
    // Perform API request to create the user
    createUserRequest(newUser)
      .then(() => {
        // User created successfully
        onUserCreated();
        onClose();
      })
      .catch((error) => {
        console.log('Failed to create user:', error);
      });
  };  

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create User</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <TextField
          label="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateUserDialog;
