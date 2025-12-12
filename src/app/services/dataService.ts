import { Injectable } from '@angular/core';
import { Bird, Food, Habitat } from '../bird';
import { RealBirds } from '../birds';

@Injectable({
    providedIn: 'root'
  })
export class DataService
{
    birdData: Bird[] = [];

    GetBirds(): Bird[] 
    {
        if (this.birdData.length != 0)
        {
            return this.birdData;
        }
        const jsonData = JSON.parse(JSON.stringify(RealBirds));
        let idCounter = 0;
        this.birdData = jsonData.map((jsonBird: any) =>
            ({
                id: idCounter++,
                name: jsonBird['Common name'],
                wingspan: typeof(jsonBird['Wingspan']) == "number" ? jsonBird['Wingspan'] : 0,
                expansion: jsonBird['Expansion'],
                powerColor: jsonBird['Color'],
                powerCategory: jsonBird['PowerCategory'],
                victoryPoints: jsonBird['Victory points'],
                nestType: jsonBird['Nest type'],
                eggCapacity: jsonBird['Egg capacity'],
                habitats: this.GetHabitats(jsonBird),
                foodCost: this.GetFoodCost(jsonBird),
                foodsInCost: this.GetFoodsInCost(jsonBird),

            })
            
        );

        return this.birdData;
    }

    GetHabitats(jsonBird: any): Habitat[]
    {
        let habitats: Habitat[] = [];
        if (jsonBird['Forest'] == "X")
        {
            habitats.push(Habitat.Forest);
        }
        if (jsonBird['Grassland'] == "X")
        {
            habitats.push(Habitat.Grassland);
        }
        if (jsonBird['Wetland'] == "X")
        {
            habitats.push(Habitat.Wetland);
        }
        return habitats;
    }

    GetFoodCost(jsonBird: any): number
    {
        if (jsonBird['\/ (food cost)'] == "X")
        {
            return 1;
        }

        let foodCount = 0;
        if (jsonBird['Invertebrate']) { foodCount += jsonBird['Invertebrate']; }
        if (jsonBird['Seed']) { foodCount += jsonBird['Seed']; }
        if (jsonBird['Fruit']) { foodCount += jsonBird['Fruit']; }
        if (jsonBird['Rodent']) { foodCount += jsonBird['Rodent']; }
        if (jsonBird['Fish']) { foodCount += jsonBird['Fish']; }
        if (jsonBird['Wild (food)']) { foodCount += jsonBird['Wild (food)']; }
        if (jsonBird['Nectar']) { foodCount += jsonBird['Nectar']; }

        return foodCount;
    }

    GetFoodsInCost(jsonBird: any): Food[]
    {
        let foods: Food[] = []

        if (jsonBird['Invertebrate']) { foods.push(Food.Worm);}
        if (jsonBird['Seed']) { foods.push(Food.Wheat);}
        if (jsonBird['Fruit']) { foods.push(Food.Berry);}
        if (jsonBird['Rodent']) { foods.push(Food.Rat);} 
        if (jsonBird['Fish']) { foods.push(Food.Fish);}
        if (jsonBird['Wild (food)']) { foods.push(Food.Wild);}
        if (jsonBird['Nectar']) { foods.push(Food.Nectar);}

        return foods;
    }
}