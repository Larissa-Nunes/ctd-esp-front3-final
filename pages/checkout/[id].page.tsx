import { Button, CardMedia, Container, Input, InputLabel, TextField, Typography } from "@mui/material";
import { getComic } from "dh-marvel/services/marvel/marvel.service"
import { Comic } from "shared/types/api"
import { FormControl } from '@mui/material';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from "shared/yup/schemas";
import { useCheckout } from "dh-marvel/services/checkout/checkout.service";
import { success } from "helpers/messageSuccess";
import { useCheckoutDispatch, useCheckoutState } from "context/Context";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { formatCEP } from "utils/formatters/formatCEP";
import { formatCreditCard } from "utils/formatters/formatCreditCArd";
import { formatCreditCardExpiration } from "utils/formatters/formatCreditCardExpiration";
import Head from "next/head";


export const getStaticPaths = async () => {
    return {
        paths: [{ params: { id: "1996" } }],
        fallback: true
    };
}
export async function getStaticProps({ params }: any) {
    const data = await getComic(Number(params.id))
    return {
        props: {
            data
        }
    }
}

type PropsDetails = {
    data: Comic
}

export default function Checkout({ data }: PropsDetails) {
    
    const comic = data;

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const { mutate: createCheckout } = useCheckout()
    const router = useRouter()
    const { checkout } = useCheckoutState()
    const { registerCheckout, registerOrder } = useCheckoutDispatch()

    const onSubmit = (data: any) => {
        createCheckout(data, {
            onSuccess: () => {
                success("Parabéns pela compra!")
                registerCheckout(data)
                registerOrder({
                    title: comic.title,
                    price: comic.price,
                    path: comic.thumbnail.path,
                    extension: comic.thumbnail.extension
                })
                router.push('successfulorder')
            }
        })
    }

    useEffect(() => {
        console.log(checkout)
    }, [checkout])

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
            <Head>
                <title>Marvel - Checkout :D</title>
            </Head>

            <Container sx={{
                marginTop: '10px', width: '50%', margin: '0px auto', display: 'flex', flexDirection: 'column'
            }}>
                <FormControl
                    component='form'
                    onSubmit={handleSubmit(onSubmit)}
                    sx={{ marginTop: '30px', gap: '15px' }}>
                    <Typography
                        gutterBottom
                        noWrap
                        variant="h5"
                        component="div"
                        align="center"
                    >
                        Dados pessoais:
                    </Typography>
                    <TextField {...register("name")} id="name" label="Nome" variant="outlined" />
                    {errors.name?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.name?.message}`}
                        </Typography>
                        : ''}
                    <TextField {...register("lastname")} id="lastname" label="Sobrenome" variant="outlined" />
                    {errors.lastname?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.lastname?.message}`}
                        </Typography>
                        : ''}
                    <TextField {...register("email")} id="email" label="E-mail" variant="outlined" />
                    {errors.email?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.email?.message}`}
                        </Typography>
                        : ''}
                    <TextField {...register("address1")} id="address1" label="Endereço" variant="outlined" />
                    {errors.address1?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.address1?.message}`}
                        </Typography>
                        : ''}
                    <TextField {...register("address2")} id="address2" label="Complemento" variant="outlined" />
                    <TextField {...register("city")} id="city" label="Cidade" variant="outlined" />
                    {errors.city?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.city?.message}`}
                        </Typography>
                        : ''}
                    <TextField {...register("state")} id="state" label="Estado" variant="outlined" />
                    {errors.state?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.state?.message}`}
                        </Typography>
                        : ''}
                    <TextField  {...register('zipCode', {
                        onChange: e => {
                            setValue('zipCode', formatCEP(e.target.value));
                        },
                    })}
                        id="zipCode" label="CEP" variant="outlined" />
                    {errors.zipCode?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.zipCode?.message}`}
                        </Typography>
                        : ''}
                    <Typography
                        gutterBottom
                        noWrap
                        variant="h5"
                        component="div"
                        align="center"
                    >
                        Dados para pagamento:
                    </Typography>

                    <TextField {...register('number', {
                        onChange: e => {
                            setValue('number', formatCreditCard(e.target.value));
                        },
                    })} id="number" label="Número do cartão" variant="outlined" />
                    {errors.number?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.number?.message}`}
                        </Typography>
                        : ''}
                    <TextField {...register("namePrinted")} id="namePrinted" label="Nome cartão" variant="outlined" />
                    {errors.namePrinted?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.namePrinted?.message}`}
                        </Typography>
                        : ''}
                    <TextField {...register('date', {
                        onChange: e => {
                            setValue('date', formatCreditCardExpiration(e.target.value));
                        },
                    })} id="date" label="Data de validade" variant="outlined" />
                    {errors.date?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.date?.message}`}
                        </Typography>
                        : ''}

                    <TextField {...register("comp")} id="comp" label="Código de segurança" variant="outlined" />
                    {errors.comp?.message ?
                        <Typography
                            color="red"
                            gutterBottom
                            noWrap
                            variant="body1"
                            component="div"
                        >
                            {`${errors.comp?.message}`}
                        </Typography>
                        : ''}
                    <Button type="submit" variant="contained" sx={{ backgroundColor:"#b60c7d" }}>FINALIZAR</Button>
                </FormControl>
            </Container >
            <Typography
                gutterBottom
                noWrap
                variant="h5"
                component="div"
                sx = {{ marginTop: 5, justifyContent: 'center', display: 'flex', flexDirection: 'row'}}
            >
                Lista de Produtos:
            </Typography>

            <Container sx={{ margin: '20px', display: 'flex', flexDirection: 'row' }}>
                <CardMedia sx={{ marginBottom: 5, width: '400px', borderRadius: '10px',boxShadow: 10 }}
                    component="img"
                    height="200"
                    image={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
                    alt={comic?.title}
                />

                <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography
                        gutterBottom
                        noWrap
                        variant="h6"
                        component="div"
                    >
                        {comic?.title}
                    </Typography>

                    <Typography
                        gutterBottom
                        noWrap
                        variant="h6"
                        component="div"
                    >Preço: R$ {comic?.price}</Typography>
                </Container>
            </Container>
        </Container >
    )
}