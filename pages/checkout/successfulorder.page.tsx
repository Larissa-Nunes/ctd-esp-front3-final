import Head from "next/head";
import { useCheckoutState } from "context/Context";
import { CardMedia, Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";

export default function SuccessFullOrder() {
    const { checkout, order } = useCheckoutState()
    return (

        <Container sx={{marginTop: 3, display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
            <Head>
                <title>Marvel - Boas compras :D</title>
            </Head>
            <Box>
            <Container sx={{
                marginTop: 3, width: '450px', height: '80px', margin: '10px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor:'#b60c7d', color: 'white',
                borderRadius: '10px'
            }}>
                <Typography
                    gutterBottom
                    noWrap
                    variant="h4"
                    component="div"
                >
                    Aproveite suas compras!
                </Typography>
            </Container >

            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', margin: '20px', flexDirection: 'column' }}>
                <Typography
                    gutterBottom
                    noWrap
                    variant="h5"
                    component="div"
                >
                    {order?.title}
                </Typography>
                <CardMedia sx={{ marginTop: 1, borderRadius: '10px', boxShadow: 10, width: 400, height: 350 }}
                    component="img"
                    height="600"
                    image={`${order?.path}.${order?.extension}`}
                    alt={order?.title}
                />
                <Typography
                    sx={{marginTop: 5}}
                    gutterBottom
                    noWrap
                    variant="h6"
                    component="div"
                >Valor: R${order?.price}
                </Typography>

                <Typography
                    gutterBottom
                    noWrap
                    variant="h6"
                    component="div"
                >
                    Comprador: {checkout.name} {checkout.lastname}
                </Typography>
                <Typography
                    gutterBottom
                    noWrap
                    variant="h6"
                    component="div"
                >
                    Entrega: {checkout.address1}
                </Typography>
            </Container>
            </Box>
        </Container >
    )
}