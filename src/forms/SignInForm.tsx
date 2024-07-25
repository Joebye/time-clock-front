import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import User from '../model/User';

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.linkedin.com/in/evg-prs/">
                Created
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();
type Props = {
    submitFn: (user: User) => void
}

const SignInForm: React.FC<Props> = ({ submitFn }) => {
   
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const teudatZeut: string = data.get('tz')! as string;
        const password: string = data.get('password')! as string;
        submitFn({ teudatZeut, password });
  
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: { xs: 8, sm: -4, md: 8 },

                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <Grid container justifyContent={'center'} spacing={3}>
                            <Grid item xs={12} sm={6} md={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="tz"
                                    label="Teuadat Zeut"
                                    name="tz"
                                    autoComplete="tz"
                                    autoFocus

                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={12}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"

                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"

                                >
                                    Sign In
                                </Button>
                            </Grid>
                           </Grid>
                    </Box>
                   </Box>
                <Copyright sx={{ mt: 4, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
export default SignInForm;