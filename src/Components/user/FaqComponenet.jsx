import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '7px',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
    backdropFilter: 'blur(4px)',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Adjust the opacity as needed
}));


const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.6rem' }} />}
        {...props}
    />
))(({ theme }) => ({

    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(0.7),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    textAlign: 'left',
}));

export default function CustomizedAccordions() {
    const [expanded, setExpanded] = React.useState(null);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel2d-content" id="panel1d-header">
                    <Typography>Determine how badly the animal is injured</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Some injuries need urgent care, like severe bleeding or serious distress. Minor injuries, like a mobile animal without distress, can be treated at home. Assess the situation and decide if the animal needs immediate medical attention based on its behavior.
                            <img src="./images/determining.jpeg" alt="" style={{ borderRadius: '10px' }} />
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel2d-header">
                    <Typography>Provide first aid, if possible </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        For minor injuries, clean cuts with soap and water, cover with a bandage. Treat minor burns with cool water and a dry cloth. If unconscious, check for injuries and provide aid as needed.
                        <img src="./images/petdoc.webp" alt="" style={{ borderRadius: '10px' }} />
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>Approach the streetie slowly and calmly</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        If a stray dog shows aggression like growling, keep your distance and seek professional help. Approach calmly if the dog seems friendly, speaking softly to reassure it.
                        <img src="./images/caution.jpeg" alt="" style={{ borderRadius: '10px' }} />
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}