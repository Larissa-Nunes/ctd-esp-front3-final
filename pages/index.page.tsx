import Head from "next/head";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Comic } from "shared/types/api";
import { useGetComics } from "dh-marvel/services/marvel/useGetComics";
import Box from '@mui/material/Box';
import { Button, CardMedia, Container, Link, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

export default function Home() {

  const { data, loadingMoreComics, loadingLessComics, isLoading } = useGetComics()

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Container sx={{ padding: '30px' }}>
      <Head>
        <title>Marvel - Home :D</title>
      </Head>

      <Typography
        component="div"
        gutterBottom
        align="center"
        noWrap
        variant="h3"
      >
        BEM-VINDXS À DH-MARVEL!
      </Typography>

      <Box sx={{ flexGrow: 1, margin: '20px' }}>
        <Grid sx={{ justifyContent: 'center' }} container spacing={5}>
          {data?.data?.results.map((comic: Comic) => (
            <Grid key={comic.id} width={250} item >
              <Typography
                gutterBottom
                noWrap
                variant="h6"
                align="center"
                component="div"
              >
                {comic.title}
              </Typography>
              <CardMedia
                sx={{ boxShadow: 10, borderRadius: '10px', width: '220px'}}
                component="img"
                height="200"
                image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                alt={comic.title}
              />
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 15, gap: 10 }}>
              <Link href={`/comic/${comic.id}`}>
                  <Button variant="outlined" sx = {{ textDecoration: "none"}}>
                    DETALHES
                  </Button>
                </Link>
                <Link href={`/checkout/${comic.id}`}>
                  <Button variant="contained">COMPRAR</Button>
                </Link>
              </div>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center'}}>
      <Button onClick={loadingLessComics} variant="outlined">
        -12
      </Button>
      <Button sx={{ marginLeft: "10px" }} onClick={loadingMoreComics} variant="outlined">
        +12
      </Button>
      </Box>
    </Container>
  );
};


