import { AlertContext, AuthContext, BrandContext, Layout } from "@components";
import { useCreateCampaign } from "@dataAccess";
import { Box, Button, Grid, Loading, TextInput, Typography } from "@elements";
import { ICampaign } from "@types";
import { extractString } from "@utils";
import React, { useContext, useEffect } from "react";
import Slugify from "slugify";
import { useLocation } from "wouter";

export const CadastroCampanha = ({ params }: { params: { marca: string } }) => {

  const { selectedBrand: marca } = useContext(BrandContext);

  const { setOpenSuccess, setOpenError } = useContext(AlertContext)

  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!marca) setLocation("/marcas")
  }, [])

  const { mutateAsync, isLoading } = useCreateCampaign();

  const { user, agency, photographer } = useContext(AuthContext)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (!marca) throw Error("Não foi possível selecionar a marca")

    const campaign: ICampaign = {
      name: extractString(data.get('name') as string),
      slug: Slugify(extractString(data.get('name') as string)),
      year: extractString(data.get('year') as string),
      createdAt: new Date().toISOString(),
      createdBy: user.uid,
      createdByName: user.name,
      createdByAgency: agency?.cnpj || photographer?.cnpj || "admin",
      createdByAgencyName: agency?.name || photographer?.name || "admin",
      marca
    }

    mutateAsync(campaign).then(res => {
      console.log(res)
      setOpenSuccess("Cadastrado com sucesso.")
      event.currentTarget.reset()
    }).catch(error => {
      console.warn("erro: " + error)
      setOpenError("Erro ao salvar. Tente novamente.")
    })
  }

  return <Layout params={params}>
    <Grid container>
      <Grid item xs={12}>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Cadastro de campanha
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextInput
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nome"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextInput
              margin="normal"
              required
              fullWidth
              id="year"
              label="Ano"
              name="year"
              autoComplete="year"
              autoFocus
            />
            {isLoading ? <Loading /> : <Button
              type="submit"
              fullWidth
              sx={{ mt: 3, mb: 2 }}
            >
              Salvar
            </Button>}
          </Box>
        </Box>
      </Grid>
    </Grid>
  </Layout>
}

