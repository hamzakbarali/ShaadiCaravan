import styled from "styled-components";
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Doli } from "./../../../assets/imports.js";
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { getAllUsersRequest, deleteUserRequest, editUserRequest, createUserRequest } from "./../../../api_requests/admin/import.js";
import { EditUserDialog, CreateUserDialog } from "./import.js";

const Container = styled.div`
  padding: 20px;
`;

const ButtonContainer = styled.div`
  margin-bottom: 20px;
`;

const CreateUserBtn = styled(IconButton)`
  background-color: #7b3f00;
  color: #fff;
`;
const UserTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 8px;
  text-align: left;
  background-color: #f3ead5;
  color: #7b3f00;
`;

const Title = styled.p`
  text-align: center;
  margin-top: 20px;
`;
const TitleStyle = 'font-secondary text-accent text-2xl font-black mt-3';

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f3ead5;
  }
`;

const TableCell = styled.td`
  padding: 8px;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

function AdminUsersList(props) {
  const [users, setUsers] = useState([]);
  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [createUserDialogOpen, setCreateUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    getAllUsersRequest(setUsers);
  }, []);

  const handleCreateUser = () => {
    setCreateUserDialogOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditUserDialogOpen(true);
  };

  const handleEditUserDialogClose = () => {
    setEditUserDialogOpen(false);
  };

  const handleCreateUserDialogClose = () => {
    setCreateUserDialogOpen(false);
  };

  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      const success = await deleteUserRequest(userId);
      if (success) {
        // User deleted successfully, update the user list
        getAllUsersRequest(setUsers);
      } else {
        // Failed to delete user
        console.log('Failed to delete user');
      }
    }
  };

  const handleUserCreated = () => {
    getAllUsersRequest(setUsers);
    setCreateUserDialogOpen(false);
  };

  return (
    <Container>
      <Title className={TitleStyle}>Users List</Title>
      <ButtonContainer>
        <CreateUserBtn onClick={handleCreateUser}>
          <Add />
        </CreateUserBtn>
      </ButtonContainer>

      <UserTable>
        <thead>
          <tr>
            <TableHeader>First Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Contact Number</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.contactNumber}</TableCell>
              <TableCell>
                <ActionButtonsContainer>
                  <IconButton onClick={() => handleEditUser(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user._id)}>
                    <Delete />
                  </IconButton>
                </ActionButtonsContainer>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </UserTable>

      <EditUserDialog
        open={editUserDialogOpen}
        onClose={handleEditUserDialogClose}
        user={selectedUser}
        onUserUpdated={() => {
          getAllUsersRequest(setUsers);
        }}
      />

      <CreateUserDialog
        open={createUserDialogOpen}
        onClose={handleCreateUserDialogClose}
        onUserCreated={handleUserCreated}
      />
    </Container>
  );
}

export default AdminUsersList;