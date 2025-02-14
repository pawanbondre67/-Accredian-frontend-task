import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Accordian: React.FC = () => {
  return (
    <Container sx={{mt:20}}>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontSize: { xs: '2rem', sm: '3rem' },
            fontWeight: 'bold',
           
          }}
        >
          Frequently Asked 
          <Typography
          variant="h2"
          component="h1"
          sx={{
            fontSize: { xs: '2rem', sm: '3rem' },
            fontWeight: 'bold',
            color: 'primary.main',
          }}
        >Questions</Typography>
        </Typography>
      </Box>
      <div>
        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">Who is eligible for the referal bonus?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            The referrer (the person making the referral) is eligible for the bonus if they refer a family member or friend to an Accredian program, and that person completes the admission process and enrolls in one of Accredian’s programs.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">What are the conditions for eligibility in Accredian's referral program</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            The referred individual must be a new inquiry, having had no prior contact with Accredian for any intake or program.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">How can I submit a referral to Accredian</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            Referrals can be submitted via Accredian's website’s referral section.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">Do both the referrer and the referred individual become eligible for the referral bonus?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            No, only the referrer is eligible for the referral bonus.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
}

export default Accordian;