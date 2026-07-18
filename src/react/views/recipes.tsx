import {
  Card,
  CardContent,
  Container,
  Grid,
  IconButton,
  Typography,
  Stack,
} from "@mui/joy";
import React from "react";
import { GiCargoCrate } from "react-icons/gi";

import { GameItemsEnum } from "../../enums/gameItems.enum";
import { useAutoRefetch } from "../../hooks/useAutoRefetch";
import { EndpointEnum } from "../../enums/endpoint.enum";
import { RecipesDto } from "../../types/apis/dataTransferObject/recipesDto";
import { RecipesFm } from "../../types/apis/frontModel/recipesFm";
import { enumDtoToFmMapper } from "../../mappers/enumDtoToFm.mapper";
import { gameItemsDictionary } from "../../dictionaries/gameItems.dictionary";
import { GameClassNamesEnum } from "../../enums/gameClassNames.enum";

export const Recipes: React.FC = () => {
  let { data: recipes } = useAutoRefetch<RecipesDto[], RecipesFm[]>(
    EndpointEnum.RECIPE,
    !EndpointEnum.RECIPE,
  );

  recipes = recipes ? recipes.filter(
    (item) => item.ProducedIn[0] !== "BP_EquipmentDescriptorBuildGun_C" && item.ProducedIn[0] !== "FGBuildGun" && item.ProducedIn[0] !== "Undefined" && item.ProducedIn[0]
  ) : undefined;

  return (
    <Container sx={{ paddingTop: "50px" }}>
      <Card
        variant="outlined"
        sx={{ marginBottom: "30px" }}
      >
        <CardContent>
          <Grid
            container
            display="flex"
            alignItems="center"
          >
            <Grid xs>
              <Typography
                level="h2"
                marginBottom="5px"
                fontWeight={600}
              >
                Available Factories
              </Typography>
            </Grid>
            <Grid>
              <IconButton size="lg">
                <GiCargoCrate
                  size="22px"
                  color="rgba(255,255,255,0.1)"
                />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {recipes ? (
        <Grid
          container
          spacing={2}
        >
          {recipes.map((recipe) => {
            let factory = gameItemsDictionary[recipe.ProducedIn[0]] ? gameItemsDictionary[recipe.ProducedIn[0]].name : gameItemsDictionary[GameClassNamesEnum.Undefined].name;
            factory = enumDtoToFmMapper(
              factory,
              GameItemsEnum,
              "GameItemsEnum",
            );

            const product_class_enum = recipe.Products ? recipe.Products.map((product) => {
              return (enumDtoToFmMapper(
                product ? (product.ClassName ? product.ClassName : "Undefined") : "Undefined",
                GameClassNamesEnum,
                "GameClassNamesEnum"
              ))
            }) : [GameClassNamesEnum.Undefined];
            const products = product_class_enum.map((product_class) => {return(product_class in gameItemsDictionary ? gameItemsDictionary[product_class] : gameItemsDictionary[GameClassNamesEnum.Undefined])})

            return (
              <Grid
                xs={3}
                key={recipe.ClassName}
              >
                <Card
                  variant="outlined"
                  sx={{
                    "&:hover": {
                      borderColor: "var(--joy-palette-neutral-700)",
                    },
                    "cursor": "pointer",
                  }}
                >
                  <CardContent>
                    <Stack alignItems="Center">
                        {products ? 
                          (
                            <Grid
                              container
                              spacing={2}
                            >
                              {products.map((product) => {
                                  return (
                                    <Grid xs={'auto'} key={product.name}>
                                      <img
                                        src={`/assets/${product.category}/${product.name}.png`}
                                        alt={product.name}
                                        style={{ height: "70px", width: "70px" }}
                                      />
                                    </Grid>
                                  );
                                })
                              }
                            </Grid>
                          ) : (
                            <img
                              src={`/assets/default/FGAnyUndefinedDescriptor.png`}
                              alt={"ImageNotFound"}
                              style={{ height: "70px", width: "70px" }}
                            />
                          )
                        }
                      {recipe.Name}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Grid
          container
          spacing={3}
          sx={{ opacity: 0.5 }}
        ></Grid>
      )};
    </Container>
  );
};
