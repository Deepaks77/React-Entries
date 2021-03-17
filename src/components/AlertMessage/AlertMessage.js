import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function AlertMassage({ message }) {
  const [open, setOpen] = React.useState(true);
  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        variant="danger"
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        action={[
          <IconButton key="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      >
        <Alert onClose={handleClose} severity="error">
          {message}!
        </Alert>
      </Snackbar>
    </div>
  );
}
