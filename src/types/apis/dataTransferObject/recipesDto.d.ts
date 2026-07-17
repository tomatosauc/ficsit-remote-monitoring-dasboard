type ItemsEntity = {
  Name: string;
  ClassName: string;
  Amount: number;
  MaxAmount: number;
  ManualRate: number;
  FactoryRate: number;
};

export type RecipesDto = {
  ID: string;
  Name: string;
  ClassName: string;
  Category: string;
  Events?: (string | null)[] | null;
  Ingredients?: (ItemsEntity | null)[] | null;
  Products?: (ItemsEntity | null)[] | null;
  ProducedIn?: string;
  ManualDuration: number;
  FactoryDuration: number; 
};
