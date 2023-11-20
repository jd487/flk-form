import { TextField, Button } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { Container } from "./Container";
import Header from "./Header";
import CustomSnackbar, { SnackBarConfig } from "./Snackbar";
import Table from "./Table";
import { FIELD_MAPPINGS, User } from "../types/user.types";

const Wrapper = styled.div`
  width: 80%;
  margin: 12px 0px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ActionWrapper = styled.div`
  width: 80%;
`;

const initialUserValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  email: "",
  isPrimary: false,
};

const StyledButton = styled(Button)`
  width: 60%;
`;

const UserForm = () => {
  const [currentUserValues, setCurrentUserValues] =
    useState<User>(initialUserValues);
  const [users, setUsers] = useState<Array<User>>([]);
  const [primary, setPrimary] = useState<string>();
  const [snackbarConfig, setSnackbarConfig] = useState<SnackBarConfig>();

  const handleFormFieldChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setCurrentUserValues({ ...currentUserValues, [name]: value });
  };

  const handleDeleteUser = (email: string) => {
    setUsers(users.filter((user) => user.email !== email));
  };

  const handlePrimaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrimary(event.target.name);
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const doesEmailExist = users.find(
      (user: User) => user.email === currentUserValues.email
    );
    if (doesEmailExist) {
      setSnackbarConfig({
        message: "A user with that email address already exists!",
        open: true,
        type: "error",
      });
      return;
    }

    setUsers((users) => [...users, currentUserValues]);
    setCurrentUserValues(initialUserValues);
  };

  const handleSubmitUsers = () => {
    if (!primary) {
      setSnackbarConfig({
        message: "Please elect a primary user.",
        open: true,
        type: "error",
      });
      return;
    }

    setUsers(
      users.map((user) =>
        user.email === primary ? { ...user, isPrimary: true } : user
      )
    );

    setSnackbarConfig({
      message: "Users successfully submitted!",
      open: true,
      type: "success",
    });
  };

  const handleSnackBarClose = () => {
    setSnackbarConfig({ ...snackbarConfig, open: false });
  };

  //PRINT USERS
  console.log("USERS:", users);

  return (
    <Container>
      <Header
        headerText="User Information Form"
        subtitle="Please enter in user details, you may add more than one user."
      />

      <Form onSubmit={(e: React.FormEvent) => handleAddUser(e)}>
        {FIELD_MAPPINGS.map((field) => {
          return (
            <Wrapper key={field.name}>
              <TextField
                variant="outlined"
                required={field.required}
                value={currentUserValues[field.name as keyof User]}
                type={field.type}
                name={field.name}
                onChange={handleFormFieldChange}
                fullWidth
                placeholder={field.placeholder}
              />
            </Wrapper>
          );
        })}
        <ActionWrapper>
          <Button variant="contained" type="submit">
            Add User
          </Button>
        </ActionWrapper>
      </Form>
      <Wrapper>
        <Header headerText="Current Users" />
        <Table
          data={users}
          deleteRow={handleDeleteUser}
          updateRow={handlePrimaryChange}
          primary={primary || ""}
        />
      </Wrapper>
      {users.length > 0 && (
        <>
          <StyledButton
            fullWidth
            variant="outlined"
            onClick={handleSubmitUsers}
          >
            Submit Users
          </StyledButton>
          <br />
          <StyledButton
            fullWidth
            variant="outlined"
            onClick={() => {
              setUsers([]);
              setPrimary("");
            }}
          >
            Refresh Form
          </StyledButton>
        </>
      )}
      <CustomSnackbar config={snackbarConfig} setOpen={handleSnackBarClose} />
    </Container>
  );
};

export default UserForm;
