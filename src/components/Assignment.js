import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SERVER_URL} from '../constants.js'
// import AddAssignment from './AddAssignment.js'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import TextField from '@mui/material/TextField';

// NOTE:  for OAuth security, http request must have
//   credentials: 'include' 
//

class Assignment extends React.Component {
    constructor(props) {
      super(props);
      this.state = { open:false, selected: 0, assignments: [], assignmentName: '', dueDate: '', courseId: '', needsGrading: 1, };
    };
 
   componentDidMount() {
    this.fetchAssignments();
  }
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
  fetchAssignments = () => {
    console.log("Assignment.fetchAssignments");
    const token = Cookies.get('XSRF-TOKEN');
    fetch(`${SERVER_URL}/gradebook`, 
      {  
        method: 'GET', 
        headers: { 'X-XSRF-TOKEN': token }
      } )
    .then((response) => response.json()) 
    .then((responseData) => { 
      if (Array.isArray(responseData.assignments)) {
        //  add to each assignment an "id"  This is required by DataGrid  "id" is the row index in the data grid table 
        this.setState({ assignments: responseData.assignments.map((assignment, index) => ( { id: index, ...assignment } )) });
      } else {
        toast.error("Fetch failed.", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }        
    })
    .catch(err => console.error(err)); 
  }
  
   onRadioClick = (event) => {
    console.log("Assignment.onRadioClick " + event.target.value);
    this.setState({selected: event.target.value});
  }
   addAssign() {
    
    console.log("you see");
    const token = Cookies.get('XSRF-TOKEN');
    fetch(`${SERVER_URL}/assignment`,
      {
        method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-XSRF-TOKEN': token
        },
        body: JSON.stringify({
          assignmentName: this.state.assignmentName,
          dueDate: this.state.dueDate,
          courseId: this.state.courseId   
        })
      })
      // .then(response => response.json() )
      // .then(responseData => {
      //   const {correct} = responseData;
      // })
      .catch(err => console.error(err))
      this.handleClose();
      
  }

  
  render() {
     const columns = [
      {
        field: 'assignmentName',
        headerName: 'Assignment',
        width: 400,
        renderCell: (params) => (
          <div>
          <Radio
            checked={params.row.id == this.state.selected}
            onChange={this.onRadioClick}
            value={params.row.id}
            color="default"
            size="small"
          />
          {params.value}
          </div>
        )
      },
      { field: 'courseTitle', headerName: 'Course', width: 300 },
      { field: 'dueDate', headerName: 'Due Date', width: 200 }
      ];
      
      const assignmentSelected = this.state.assignments[this.state.selected];
      return (
          <div align="left" >
            <h4>Assignment(s) ready to grade: </h4>
              <div style={{ height: 450, width: '100%', align:"left"   }}>
                <DataGrid rows={this.state.assignments} columns={columns} />
              </div>                
            <Button component={Link} to={{pathname:'/gradebook',   assignment: assignmentSelected }} 
                    variant="outlined" color="primary" disabled={this.state.assignments.length===0}  style={{margin: 10}}>
              Grade
            </Button>
                 
            <ToastContainer autoClose={1500} /> 
            
             <div>
            <Button id = "b1" variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
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
                  <Button id = "handleAdd" color="primary" onClick={this.handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>      
          </div>
      
          </div>
          
          
      )
  }
}  

export default Assignment;
