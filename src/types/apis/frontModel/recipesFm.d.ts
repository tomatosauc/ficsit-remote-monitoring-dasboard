import type { GameClassNamesEnum } from "../../../enums/gameClassNames.enum";

type ItemsEntity = {
  Name: string;
  ClassName: string;
  Amount: number;
  MaxAmount: number;
  ManualRate: number;
  FactoryRate: number;
};


export type RecipesFm = {
    Name: string;
    ClassName: GameClassNamesEnum;
    Category: string;
    Ingredients?: (ItemsEntity | null)[];
    Products?: (ItemsEntity | null)[];
    ProducedIn: GameClassNamesEnum[];
    ManualDuration: number;
    FactoryDuration: number; 
}