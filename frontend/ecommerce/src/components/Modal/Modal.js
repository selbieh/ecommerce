import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';


  function getModalStyle() {
    const top = 50 
    const left = 50
  
    return {
      top: `50%`,
      left: `50%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 450,
      height:'auto',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      outline: 'none',
    },
  }));


  function SimpleModal(props) {
    const [open, setOpen] = React.useState(true);
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
  
    
  
    const handleClose = () => {
      setOpen(false);
      //console.log(props.children._self.props.history.push)
      props.children._self.props.history.push('/')
    };

   
  
    const classes = useStyles();
  
    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div style={modalStyle} className={classes.paper} >
            {props.children}
          </div>
        </Modal>
      </div>
    );
  }
  
  export default SimpleModal;