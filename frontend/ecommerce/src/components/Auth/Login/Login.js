import React ,{Component}from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Modal from '../../Modal/Modal';
import {styles} from './useStyles';
import Box from '@material-ui/core/Box/Box';
import { red } from '@material-ui/core/colors';






class Login extends Component {
  state = { 
    error:{},
    value:{
      phone:'',
      password:''
    }
   }

   valueInputHandler=(e,name)=>{
     const newEventValue={
       ...this.state,
       ...this.state.value
      }
    newEventValue.value[name]=e.target.value
    this.setState({
      state:newEventValue
    })
   }
   
  render() {

  const {classes}= this.props
    
    return (

      <Modal>



      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="رقم الهاتف"
              name="phone"
              autoComplete="email"
              autoFocus
              placeholder='EX: 0122XXXXXXX'
              onChange={(e)=>this.valueInputHandler(e,'phone')}
            />

  <Box color={red}>
       input vaild username
  </Box>
 

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="كلمه السر"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>this.valueInputHandler(e,'password')}

              
            />

            <Box color={red}>
                input vaild username
           </Box>
 
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="تذكرني"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  نسيت كلمه السر؟
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"ليس لديك حساب ؟ للتسجيل "}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
       
      </Container>
  
      </Modal>
      
    );
  }
}

export default withStyles(styles)(Login);

