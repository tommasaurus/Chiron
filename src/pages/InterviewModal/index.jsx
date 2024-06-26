import React, { useState } from 'react';
import { Modal, Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AdzunaSearch from "./components/AdzunaSearch";
import EnterJob from "./components/EnterJob";
import Index from "../UploadResume";
import ModalStart from "./components/ModalStart";

const InterviewModal = ({ open, onClose, setJob, setRequirements, setCompany }) => {
    const [currentComponent, setCurrentComponent] = useState(1);

    const setNextComponent = (comp) => {
        setCurrentComponent(comp)
    }
    const handleClose = () => {
        setCurrentComponent(1);
        onClose();
    };
    const handleNext = (next) => {
        console.log(next)
        setCurrentComponent(next);
    };

    const renderComponent = () => {
        switch (currentComponent) {
            case 1:
                return <ModalStart handleNext={handleNext}/>;
            case 2:
                return <AdzunaSearch handleNext={handleNext}
                                     handleClose={handleClose}
                                     setJob={setJob}
                                     setCompany={setCompany}
                                     setRequirements={setRequirements}
                />;
            case 3:
                return <EnterJob handleNext={handleNext}/>;
            case 4:
                return <Index handleNext={handleNext}/>;
            default:
                return null;
        }
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    width: 800, // Adjust the width as needed
                    maxWidth: '90%', // Ensure it's responsive
                    maxHeight: '90vh', // Set max height
                    overflowY: 'auto', // Enable vertical scroll if needed
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 4,
                }}
            >
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
                {renderComponent()}
            </Box>
        </Modal>
    );
};

export default InterviewModal