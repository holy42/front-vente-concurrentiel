import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function Snackbars({ icon, para, color, show }) {
    const [state, setState] = React.useState({
        open: true,
        vertical: 'bottom',
        horizontal: 'right',
    });
    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => () => {
        setState({ ...newState, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const buttons = (
        <Grid item xs={6} textAlign="right">
            <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })}>
                Bottom-Right
            </Button>
        </Grid>
    );

    return (
        <Box sx={{ width: 500, }}>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                autoHideDuration={6000}
                key={vertical + horizontal}
            >
                <Alert
                    onClose={handleClose}
                    sx={{ width: '100%', border: '2px solid ' + color, color: color, backgroundColor: 'white' }}
                    icon={icon}
                >
                    {para}
                </Alert>
            </Snackbar>
        </Box>
    );
}