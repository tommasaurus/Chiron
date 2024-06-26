import { auth } from "../Firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button, Container, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import BackgroundImage from './Home/BackgroundImage.jpg'
import { useLocation } from 'react-router-dom';


const Login = () => {
    const location = useLocation();
    const { feedback } = location.state || {}; // feedback will be your feedbackArray
  
    // Now you can use the feedback array in your Login component
    console.log(feedback);
    
    const handleGoogleLogin = ({ history }) => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div
        style={{
            backgroundImage: `url(${BackgroundImage})`,
            backgroundSize: '100% 100%',
            top: 0,
            left: 0,
            zIndex: -1}}>
        <Container maxWidth="xs">
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ height: '100vh' }}
            >
                <Grid item style={{ marginBottom: '-20px' }}>
                    <Typography variant="h1" align="center" className="mb-4 text-onyx font-bold">
                        Chiron.
                    </Typography>
                </Grid>
                <Grid item style={{ marginBottom: '20px' }}>
                    <Typography variant="h3" align="" className="mb-4 text-onyx">
                        Your Personalized AI Interviewer
                    </Typography>
                </Grid>
                <Grid item>

                    <Link to="/" onClick={handleGoogleLogin}>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            style={{ textTransform: 'none', fontWeight: 'bold', padding: '0.5rem', background: '#DB6C53', marginBottom: '2rem', color: "#32373B", fontSize: "16px"}}
                        >
                            <img
                                src="https://img.icons8.com/fluent/24/000000/google-logo.png"
                                alt="Google Logo"
                                style={{ marginRight: '15px'}}
                            />
                            Continue with Google
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
        </div>
    )
}

export default Login