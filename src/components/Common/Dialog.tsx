import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface Props {
  open: boolean;
  handleClose: any;
  title: string;
  dialogContent: any;
  handleSubmit: any;
}

const AlertDialog: React.FC<Props> = ({open, handleClose, handleSubmit, title, dialogContent}) => {
  const handleAccept = () => {
    handleSubmit();
    handleClose();
  }
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAccept} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertDialog;
