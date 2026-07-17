import type { RecipesDto } from "../types/apis/dataTransferObject/recipesDto";
import type { RecipesFm } from "../types/apis/frontModel/recipesFm"; 
import { enumDtoToFmMapper } from "./enumDtoToFm.mapper";
import { GameClassNamesEnum } from "../enums/gameClassNames.enum";

export const recipesDtoToFmMapper = (dto: RecipesDto[],): RecipesFm[] => {
  return dto.map((recipesDto) => {
    const ClassName = enumDtoToFmMapper(
			recipesDto.ClassName,
			GameClassNamesEnum,
			"GameClassNamesEnum",
    );
    
    return {
			Name: recipesDto.Name,
			ClassName,
			Category: recipesDto.Category,
			ManualDuration: recipesDto.ManualDuration,
			FactoryDuration: recipesDto.FactoryDuration,
			ProducedIn: recipesDto.ProducedIn ? recipesDto.ProducedIn : "Other",
			Ingredients: recipesDto.Ingredients,
			Products: recipesDto.Products,
    }
  });
};
