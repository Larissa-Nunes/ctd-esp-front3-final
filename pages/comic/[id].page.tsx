import { Button, CardMedia, Container, Typography } from "@mui/material";
import { getComic } from "dh-marvel/services/marvel/marvel.service"
import Head from "next/head";
import Link from "next/link";
import { Comic } from "shared/types/api"

export const getStaticPaths = async () => {
    return {
        paths: [{ params: { id: "1996" } }],
        fallback: true
    };
}
export async function getStaticProps({ params }: any) {
    /* const { query } = useRouter() */
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

export default function ComicDetail(props: PropsDetails) {
    const data = props
    const comic = data?.data;

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
            <Head>
                <title>Marvel - Comic</title>
            </Head>

            <Typography
                sx={{ marginTop: 5, display: 'flex', justifyContent: 'center' }}
                component="div"
                gutterBottom
                noWrap
                variant="h5"
            >
                {comic?.title}
            </Typography>
            <CardMedia
                sx={{ marginTop: 3, width: 400, display: 'flex', justifyContent: 'center', align: 'center',  borderRadius: '10px', boxShadow: 10  }}
                component="img"
                height="350"
                image={`${comic?.thumbnail.path}.${comic?.thumbnail.extension}`}
                alt={comic?.title}
            />
            <Typography 
                sx={{ marginTop: 3}}
                gutterBottom
                noWrap
                variant="h6"
                component="div"
            >PREÇO: R$ {comic?.price}</Typography>
            {comic?.stock > 0 ?
                <Link href={`/checkout/${comic.id}`}>
                    <Button variant="contained" sx={{ width: 200, display: 'flex', justifyContent: 'center', align: 'center' }}>COMPRAR</Button>
                </Link>
                : <Typography
                    component="div"
                    gutterBottom
                    noWrap
                    variant="h6"
                    color="red"
                >NÃO HÁ ESTOQUE NESSE MOMENTO... DESCULPE!</Typography>
            }
            <Typography
                sx={{ marginTop: 5, color: '#b60c7d' }}
                gutterBottom
                noWrap
                variant="h6"
                component="div"
                
            >PERSONAGENS: </Typography>
            {comic?.characters.items.map((item) => (
                <Link href={`/characters/${item.resourceURI.split("characters/").pop()}`}>
                    <Typography key={item.name}
                        sx={{ cursor: 'pointer' }}
                        gutterBottom
                        noWrap
                        variant="h6"
                        component="div"
                    >{item.name}</Typography>
                </Link>
            ))}
        </Container>
    )
}