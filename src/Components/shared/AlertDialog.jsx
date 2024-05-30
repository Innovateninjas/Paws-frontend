import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ open , handleClose}) {
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ textAlign: "center"  , width : 500 , margin : 'auto' }}
      
    >
      <DialogTitle id="alert-dialog-title">You've successfully registered.</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Would you like to upload a profile picture to personalize your
          account?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' , paddingBottom : '20px' }}>
        <button
          className="px-4 py-4 text-white bg-gradient-to-b from-green-600 to-green-700  bg-opacity-35 rounded-[35px] drop-shadow-md shadow-buttonShadow text-[1rem] leading-[1rem] tracking-widest"
          onClick={() => handleClose(true)}
        >
          Skip for Now
        </button>
        <button
          className="px-4 py-4 text-white bg-gradient-to-b from-green-600 to-green-700  bg-opacity-35 rounded-[35px] drop-shadow-md shadow-buttonShadow text-[1rem] leading-[1rem] tracking-widest"
          onClick={() => handleClose(false)}
        >
          Upload Picture
        </button>
      </DialogActions>
    </Dialog>
  );
}