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
    Ingredients?: (ItemsEntity | null)[] | null;
    Products?: (ItemsEntity | null)[] | null;
    ProducedIn: string;
    ManualDuration: number;
    FactoryDuration: number; 
}