import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import addAssign from './Assignment.js'


class AddAssignment extends React.Component {
    constructor(props) {
      super(props);
      this.state={ open:false};
    };
    
    handleClickOpen = () => {
      this.setState( {open:true, attempt:'', alias:this.props.alias} );
    };


    handleClose = () => {
      this.setState( {open:false} );
      // this.props.fetch();
    };


    handleChange = (event) =>  {
        this.setState({[event.target.name]: event.target.value});
     }
     

  // Save course and close modal form (fetch method)
    handleAdd = () => {
        console.log("button works");
        // this.setState({ [event.target.name]: event.target.value })
        // this.props.add(this.state.assignmentName,this.state.dueDate, this.state.courseId);
        this.handleClose();
        console.log("button underclose");
        this.addAssign();
    }
    


    render()  { 
      // const {a, b, message } = this.props;
      // const { open, attempt, alias } = this.state;
      return (
          <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
              Add Assignment
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>Add Assignment</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                    <TextField autoFocus fullWidth label= "Assignment name" name="assignmentName" 
                    onChange={this.handleChange} /> 
                    <TextField autoFocus fullWidth label= "Assignment DueDate" name="dueDate" 
                    onChange={this.handleChange} /> 
                    <TextField autoFocus fullWidth label= "Course id" name="courseId" 
                    onChange={this.handleChange} /> 
                    {/* <TextField style = {{width: 200}} label="alias" name="alias" 
                        onChange={this.handleChange} value={alias} /> 
                     */}
                </DialogContent>
                <DialogActions>
                  <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                  <Button color="primary" onClick={addAssign}>Add</Button>
                </DialogActions>
            </Dialog>      
          </div>
      ); 
    }
}
export default AddAssignment;