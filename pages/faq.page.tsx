import Head from "next/head";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Container, Typography } from "@mui/material";
import { faqsData } from "dh-marvel/components/faqs/faqsData";

export default function Faq() {
    return (
        <Container sx={{ width: '100%', margin: '50px' }}>
            <Head>
                <title>Marvel - FAQ</title>
            </Head>
            <Typography
                gutterBottom
                noWrap
                variant="h4"
                component="div"
                align="center"
            >
                TIRE SUAS DÚVIDAS :D 
            </Typography>

            {faqsData.map(faq => (
                <Accordion key={faq.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {faq.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Container>
    )
}