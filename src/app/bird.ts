export interface Bird {
    id: number;
    name: string;
    wingspan: number;
    expansion: Expansion;
    powerColor: string;
    powerCategory: string;
    victoryPoints: number;
    nestType: string;
    eggCapacity: number;
    habitats: Habitat[];
    foodCost: number;
    foodsInCost: Food[];
    scientificName: string;
    powerDescription: string;
  }

export enum Expansion {
    BaseGame = "originalcore",
    SwiftStart = "swiftstart",
    European = "european",
    Oceania = "oceania"
}

export enum Food {
    Worm,
    Wheat,
    Berry,
    Rat,
    Fish,
    Wild,
    Nectar
}

export enum Habitat {
    Forest,
    Grassland,
    Wetland
}