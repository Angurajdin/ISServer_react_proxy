import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbars(props) {
  const [openSnackbar, setOpenSnackbar] = React.useState(true);
  // const [severity, setSeverity] = React.useState('info');
  // const [message, setMessage] = React.useState('');

  // React.useEffect(()=>{
  //     console.log(props, "props useeff");
  //   setSeverity(props.severity);
  //   setMessage(props.message);
  // }, []);

  // const handleSnackbarClick = () => {
  //   setOpenSnackbar(true);
  // };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
      <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={props.severity==="" ? "info" : props.severity} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
  );
}