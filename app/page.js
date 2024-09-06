'use client'

import Image from 'next/image'
import getStripe from '../utils/get-stripe'
import Head from 'next/head';

import {AppBar , Button ,Container,Toolbar,Typography,Box,Grid} from '@mui/material'
import { SignedIn ,SignedOut,UserButton } from '@clerk/nextjs'


export default function Home() {

  const handleSubmit =async()=>{
    const checkoutSession = await fetch('/api/checkoutsessions',{
      method :'POST',
      headers: {
        'Content-Type': 'application/json',
      },
  

    })

    const checkoutSessionJson =await checkoutSession.json()
   if(checkoutSession.statusCode === 500){
    console.error(checkoutSession.message)
    return
   }

   const stripe = await getStripe()
   const {error} =await stripe.redirectToCheckout({
    sessionId :checkoutSessionJson.id,
   })

   if(error){
    console.warn(error.message)
   }
  }

  
  return (
    <Container maxWidth="lg">
      <Head>
        <title>FLASHCARD SAAS</title>
        <meta name ="description" content ="Create flashcard from your text"/>
        </Head>

        <AppBar position="static">
          <Toolbar>
             <Typography variant="h6" style={{flexGrow: 1}}>
              Flashcard SaaS</Typography>
        <SignedOut>
          <Button color="inherit" href="/sign-in">{' '}Login</Button>
          <Button color="inherit" href="/sign-in">{' '}Sign Up</Button>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
       </Toolbar>
    </AppBar>


<Box sx={{textAlign: 'center', my: 4}}>
  <Typography variant="h2" component="h1" gutterBottom>
    Welcome to Flashcard SaaS
  </Typography>
  <Typography variant="h5" component="h2" gutterBottom>
    The easiest way to create flashcards from your text.
  </Typography>
  <Button variant="contained" color="primary" sx={{mt: 2, mr: 2}} href="/generate">
    Get Started
  </Button>
  <Button variant="outlined" color="primary" sx={{mt: 2}}>
    Learn More
  </Button>
</Box>

<Box sx={{textAlign:'center' ,my: 6}}>
  <Typography variant="h4" component="h2" gutterBottom>Features</Typography>

  <Grid container spacing={4}>
    <Grid item xs={4} md={4}>
    <Box sx= {{
        p:3,
        border:'1px solid',
        borderColor:'grey.300',
        borderRadius:2,

      }}>
      
      <Typography variant ="h6" gutterBottom>Easy text input</Typography>

      <Typography>{' '}
        Simply put your text and let our software do the job</Typography>
        </Box>
    </Grid>
    
  


  
    <Grid item xs={4} md={4}>
    <Box sx= {{
        p:3,
        border:'1px solid',
        borderColor:'grey.300',
        borderRadius:2,

      }}>
      
      <Typography variant ="h6" gutterBottom>Smart flashcards</Typography>

      <Typography>
        {' '}Our AI will intelligently breakdown your text into concise flashcards which will support your studies</Typography>
        </Box>
    </Grid>
    
  


  
    <Grid item xs={4} md={4}>
    <Box sx= {{
        p:3,
        border:'1px solid',
        borderColor:'grey.300',
        borderRadius:2,

      }}>
      
      <Typography variant ="h6" gutterBottom>Accesible anywhere</Typography>

      <Typography>
        {' '}Access your flashcards ,anytime,anywhere  and on any device</Typography>
        </Box>
    </Grid>
    
  </Grid>
</Box>

<Box sx={{my: 6, textAlign: 'center'}}>
  <Typography variant="h4" gutterBottom>Pricing</Typography>
  <Grid container spacing={4}>
    <Grid item xs={4} md={4}>
      <Box sx= {{
        p:3,
        border:'1px solid',
        borderColor:'grey.300',
        borderRadius:2,

      }}>
      
      <Typography variant ="h5" gutterBottom>Basic</Typography>
      <Typography variant ="h6" gutterBottom>$5 /month</Typography>

      <Typography>
        {'  '}
        access to basic flashcards and limited storage</Typography>
        <button variant="contained" color="primary">Choose Basic </button>
        </Box>
    </Grid>
    <Grid item xs={4} md={4}>
    <Box sx= {{
        p:3,
        border:'1px solid',
        borderColor:'grey.300',
        borderRadius:2,

      }}>
      
      <Typography variant ="h5" gutterBottom>Pro</Typography>
      <Typography variant ="h6" gutterBottom>$10 /month</Typography>

      <Typography>
        {'  '}
        access to more flashcards and better storage</Typography>
        <button variant="contained" color="primary"  sx={{ mt : 2}} onClick={handleSubmit}>Choose Pro </button>
        </Box>
      
    </Grid>
    <Grid item xs={4} md={4}>
      
    <Box sx= {{
        p:3,
        border:'1px solid',
        borderColor:'grey.300',
        borderRadius:2,

      }}>
      
      <Typography variant ="h5" gutterBottom>Advanced</Typography>
      <Typography variant ="h6" gutterBottom>$20 /month</Typography>

      <Typography>
        {'  '}
        access our ultimate flashcards with the best features</Typography>
        <Button variant="contained" color="primary">Choose Advanced </Button>
        </Box>
    </Grid>
    
  
  </Grid>
  
  
</Box>
</Container>
   
  )
}
