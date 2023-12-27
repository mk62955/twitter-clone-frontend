import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal'
import {IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from "axios";


const style= {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height:600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 8,
}


function EditChild({dob,setDob}){
  const [open,setOpen] = React.useState(false);
  const handleOpen = ()=>{
    setOpen(true);
  };
  const handleClose = ()=>{
    setOpen(false);
  };
  return (
    <React.Fragment>

      <div className="birthdate-section text-sky-600 cursor-pointer" onClick={handleOpen}>
        <text>Edit</text>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{...style, width:350, height:275}}>
          <div className="text">
            <h2 className='font-bold'>Edit date of birth?</h2>
            <p>This can obly be changed a few times.<br/>
            make sure you enter the age of the <br/>
            person using account</p>
            <input type="date" className='w-full px-4 py-2' onChange={e =>setDob(e.target.value)} />
            <button className='e-button w-full bg-black text-white px-4 py-2 rounded-md' onClick={()=>setOpen(false)}>Cancel</button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default function EditProfile({user,loggedInUser}) {
  const [open,setOpen] = React.useState(false);
  const [name,setName] = React.useState('');
  const [bio,setBio]= React.useState('');
  const [location,setLocation] = React.useState('');
  const [website,setWebsite] = React.useState('');
  const [dob,setDob] = React.useState('');


  const HandleSave = async()=>{
    const editedInfo = {
      name,
      bio,
      location,
      website,
      dob,
    }
    if(editedInfo){
      await axios.patch(`http://localhost:5000/userUpdates/${user?.email}`,editedInfo)
      setOpen(false)
    }
  }

  return (
    <div>
      <button className='mr-4 px-4 py-2 bg-sky-500 text-white' onClick={()=>setOpen(true)}>Edit Profile</button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <div className='header'><IconButton onClick={()=>{setOpen(false)}}><CloseIcon/></IconButton></div>
          <div className='flex justify-between my-3 items-center'>
            <h3 className='text-[25px] font-semibold'>Edit Profile</h3>
            <button className='text-white px-4 py-2 rounded-md bg-black' onClick={HandleSave}>Save</button>
          </div>
          <form className='fill-content'>
            <TextField className='text-field' fullWidth label='Name' is='fullwidth' variant='filled' onChange={(e)=>setName(e.target.value)} defaultValue={loggedInUser[0]?.name?loggedInUser[0]?.name:''}/>
            <TextField className='text-field' fullWidth label='Bio'  is='fullwidth' variant='filled' onChange={(e)=>setBio(e.target.value)} defaultValue={loggedInUser[0]?.bio?loggedInUser[0]?.bio:''}/>
            <TextField className='text-field' fullWidth label='Location'  is='fullwidth' variant='filled' onChange={(e)=>setLocation(e.target.value)} defaultValue={loggedInUser[0]?.location?loggedInUser[0]?.location:''}/>
            <TextField className='text-field' fullWidth label='Website'  is='fullwidth' variant='filled' onChange={(e)=>setWebsite(e.target.value)} defaultValue={loggedInUser[0]?.website?loggedInUser[0]?.website:''}/>
          </form>
          <div className='birthdate-section flex mt-8'>
            <p className='text-[15px] font-semibold items-center'>Birth Date</p>
            <p className='mr-10'>.</p>
            <EditChild dob={dob} setDob={setDob}/>
          </div>
          <div className='last-section'>
            {
              loggedInUser[0]?.dob?
              <h2>{loggedInUser[0]?.dob}</h2>:
              <h2 className='text-[35px] font-bold px-4 py-2 hover:bg-slate-300'>{
                dob?dob:'Add your date of birth'
              }</h2>
            }
            <div className="last-btn flex justify-between items-center text-[35px] font-bold px-4 py-2 hover:bg-slate-300">
              <h2 className=''>Switch to professional</h2>
              <ChevronRightIcon/>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
