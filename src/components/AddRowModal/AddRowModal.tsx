import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Data } from "../../utils/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },

    form: {
      margin: theme.spacing(1),
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    input: {
      width: "90%",
      marginBottom: "10px",
    },
    button: {
      marginTop: "20px",
      maxWidth: "200px",
    },
  })
);

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function AddRowModal(props: {
  handleClose: () => void;
  open: boolean;
  handleAddRow: (data: Data) => void;
}) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const { handleClose, open, handleAddRow } = props;
  const [firstNameValue, setFirstNameValue] = useState<string>("");
  const [lastNameValue, setLastNameValue] = useState<string>("");
  const [groupValue, setGroupValue] = useState<string>("");
  const newRow = {
    id: 0,
    firstName: firstNameValue,
    lastName: lastNameValue,
    group: groupValue,
  };

  //Обработчики инпутов
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstNameValue(e.target.value);
  };
  const handleLastNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastNameValue(e.target.value);
  };
  const handleGroupInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGroupValue(e.target.value);
  };

  const handleClick = () => {
    handleAddRow(newRow);
    handleClose();
    setFirstNameValue("");
    setLastNameValue("");
    setGroupValue("");
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="First name"
          className={classes.input}
          autoFocus
          required
          value={firstNameValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
        />
        <TextField
          id="standard-basic"
          label="Last name"
          className={classes.input}
          required
          value={lastNameValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleLastNameInput(e)
          }
        />
        <TextField
          id="standard-basic"
          label="Group"
          className={classes.input}
          value={groupValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleGroupInput(e)
          }
        />
        <Button
          variant="outlined"
          size="small"
          className={classes.button}
          onClick={handleClick}
        >
          Add new row
        </Button>
      </form>
    </div>
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
}

export default AddRowModal;
