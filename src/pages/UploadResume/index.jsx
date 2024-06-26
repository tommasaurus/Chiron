import React, {useEffect, useRef, useState} from 'react';
import { pdfjs } from 'react-pdf';
import { Box, Button, Modal, Typography, IconButton, TextField } from "@mui/material";
import { Close } from '@mui/icons-material';
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "../../Firebase";

// Configure PDFJS worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const UploadResume = ({ open, onClose, onSubmit }) => {
    const [file, setFile] = useState(null);
    const [extractedText, setExtractedText] = useState("");
    const fileInputRef = useRef(null);

    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        handleExtractText();
    }, [file]);

    const onFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleExtractText = async () => {
        if (!file) return;
        const textContent = await extractTextFromPDF(file);
        setExtractedText(textContent);
    };

    const extractTextFromPDF = async (pdfFile) => {
        try {
            const loadingTask = pdfjs.getDocument(URL.createObjectURL(pdfFile));
            const pdf = await loadingTask.promise;
            let textContent = "";

            for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
                const page = await pdf.getPage(pageNumber);
                const textContentForPage = await page.getTextContent();
                textContent += textContentForPage.items.map(item => item.str).join(" ");
            }

            return textContent;
        } catch (error) {
            console.error("Error extracting text:", error);
            return "";
        }
    };

    const handleReset = () => {
        setFile(null);
        setExtractedText("");
    };

    const handleSubmit = async() => {
        if(file) {
            await setDoc(doc(firestore, "resumes", user.uid), {
                resume_string: extractedText
            });
        }
        onClose();
    }

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
                    width: 600,
                    maxWidth: '90%',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    borderRadius: 4,
                    p: 3,
                    backgroundColor: "#FFE8E0",
                }}
            >
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <Close/>
                </IconButton>
                <Typography variant="h4" gutterBottom>
                    Upload Resume
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Upload PDF file to Chiron for Interview Testing
                </Typography>
                <TextField
                    type="file"
                    onChange={onFileChange}
                    variant="outlined"
                    fullWidth
                    sx={{mt: 2}}
                />
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={onFileChange}
                    style={{display: 'none'}} // Hide the default input
                />
                <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 2}}>
                    <button onClick={handleSubmit} className="bg-sienna p-2 hover:bg-onyx hover:text-seasalt rounded-md">
                        Submit
                    </button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UploadResume;
