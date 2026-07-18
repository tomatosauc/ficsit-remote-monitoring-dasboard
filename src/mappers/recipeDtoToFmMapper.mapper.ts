import type { RecipesDto } from "../types/apis/dataTransferObject/recipesDto";
import type { RecipesFm } from "../types/apis/frontModel/recipesFm"; 
import { enumDtoToFmMapper } from "./enumDtoToFm.mapper";
import { GameClassNamesEnum } from "../enums/gameClassNames.enum";

export const recipesDtoToFmMapper = (dto: RecipesDto[],): RecipesFm[] => {
  return dto.map((recipesDto) => {
		let ClassName = GameClassNamesEnum.Undefined
		if (recipesDto.ClassName in GameClassNamesEnum) {
			ClassName = enumDtoToFmMapper(
				recipesDto.ClassName,
				GameClassNamesEnum,
				"GameClassNamesEnum",
			);
		}

		let ProducedIn = [GameClassNamesEnum.Undefined,]
		if (recipesDto.ProducedIn) {
			ProducedIn = []
			recipesDto.ProducedIn.map((machine) => {
				if (machine in GameClassNamesEnum) {
					ProducedIn.push(enumDtoToFmMapper(
						machine,
						GameClassNamesEnum,
						"GameClassNamesEnum",
					))
				} else {
					ProducedIn.push(GameClassNamesEnum.Undefined)
				}
			});
		}
    
    return {
			Name: recipesDto.Name,
			ClassName,
			Category: recipesDto.Category,
			ManualDuration: recipesDto.ManualDuration,
			FactoryDuration: recipesDto.FactoryDuration,
			ProducedIn: ProducedIn,
			Ingredients: recipesDto.Ingredients,
			Products: recipesDto.Products,
    }
  });
};
