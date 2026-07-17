import type { GameClassNamesEnum } from "../../../enums/gameClassNames.enum";
import type { RecipeItemFm } from "./recipeItemFm";

export type RecipesFm = {
    Name: string;
    ClassName: GameClassNamesEnum;
    Category: string;
    Ingredients?: (RecipeItemFm | null)[] | null;
    Products?: (RecipeItemFm | null)[] | null;
    ProducedIn?: (string | null)[] | null;
    ManualDuration: number;
    FactoryDuration: number; 
}