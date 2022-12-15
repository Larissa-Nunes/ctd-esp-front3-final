import * as React from "react";
import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import NextLink from "next/link";
import { Link as MUILink } from "@mui/material";

type Props = {
  variant?: "simple" | "general";
};

const Header: FC<Props> = ({ variant }: Props) => {
  return (
    <Container sx={{ backgroundColor: '#000000' }} maxWidth="xl">
      <Toolbar disableGutters>
        <NextLink href="/" passHref>
          <MUILink
            variant="h5"
            sx={{
              fontWeight: 600,
              mr: 2,
              flexGrow: 1,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            {" "}
            DH-Marvel
          </MUILink>
        </NextLink>
        {variant == "general" && (
          <Box>
            <NextLink href="/faq" passHref>
              <MUILink
                variant="body2"
                sx={{ color: "white", fontSize: 18, fontWeight: 600 }}
              >
                FAQ
              </MUILink>
            </NextLink>
          </Box>
        )}
      </Toolbar>
    </Container>
  );
};

const GeneralHeader: FC<Props> = ({ variant }: Props) => {
  return variant == "general" ? (
    <AppBar position="static">
      <Header variant={variant} />
    </AppBar>
  ) : (
    <Header variant={variant} />
  );
};
GeneralHeader.defaultProps = {
  variant: "general",
};

export default GeneralHeader;
