import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'


const style2 = {
  display: 'grid',
  gridTemplateColumns: '20% 80%',
  width:  'fit-content'
}

export default function Modals({ icon, color, para1, para2, button, action, close }) {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: 'white',
    border: '2px solid ' + color,
    boxShadow: 2,
    borderRadius: '10px',
    p: 4,
  }
  
  const submit = () => {
    action()
    close()
  }

  return (
    <div>
      <Modal
        open={true}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div style={style2}>
            {icon}
            <div style={{width: '100%'}}>
              <Typography id="modal-modal-title" variant="h6" component="h4" sx={{ color: 'rgb(38 38 38)' }}>
                {para1}
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 1, color: 'rgb(95 95 95)', mb: 2 }}>
                {para2}
              </Typography>
            </div>
          </div>
          <div style={{width: '95%', height: '2px', margin: 'auto', marginTop: '10px', marginBottom: '30px',backgroundColor: 'rgb(202 202 202)', borderRadius: '999px'}}></div>

          <Button onClick={submit}
            sx={{
              border: '1px solid' + color,
              backgroundColor: color,
              color: 'white',
              borderRadius: '5px',
              width: 'fit-content',
              marginLeft: '5%',
              float: 'right',
              '&:hover' : {
                backgroundColor: color+'d5'
              }
            }}
          >
            {button}
          </Button>

          <Button onClick={close}
            sx={{
              border: '1px solid',
              color: 'gray',
              backgroundColor: 'white',
              borderRadius: '5px',
              width: 'fit-content',
              marginLeft: 'auto',
              float: 'right',
              '&:hover' : {
                backgroundColor: 'rgba(128, 128, 128, 0.2)'
              }
            }}
          >
            Annuler
          </Button>

        </Box>
      </Modal>
    </div>
  );
}