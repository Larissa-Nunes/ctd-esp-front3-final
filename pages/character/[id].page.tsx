import Head from "next/head";
import { CardMedia, Container, Typography } from "@mui/material";
import { Character } from "shared/types/api"
import { getCharacter } from "dh-marvel/services/marvel/marvel.service"

export const getStaticPaths = async () => {
    return {
        paths: [{ params: { id: "1009170" } }],
        fallback: true
    };
}

export async function getStaticProps({ params }: any) {
    const data = await getCharacter(Number(params.id))
    return {
        props: {
            data
        }
    }
}

type PropsDetails = {
    data: Character
}

export default function CharacterDetail({ data }: PropsDetails) {

    const character = data;

    return (
        <Container>
            <Head>
                <title>Marvel - Personagens :D</title>
            </Head>
            <Typography
                component="div"
                gutterBottom
                noWrap
                variant="h4"
            >
                {character?.name}
            </Typography>
            <CardMedia
                component="img"
                height="400"
                image={`${character?.thumbnail.path}.${character?.thumbnail.extension}`}
                alt={character?.name}
            />
            <Typography
                variant="subtitle1"
                gutterBottom
                noWrap
                component="div"
            >
                {character?.description}
            </Typography>
        </Container>
    )
}