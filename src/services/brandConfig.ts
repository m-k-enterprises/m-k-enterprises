export type BrandKey = 'bearBelts' | 'pocketBearsApparel' | 'mythicalMoods';

export interface BrandConfig {
  key: BrandKey;
  name: string;
  clientKey: BrandKey;
}

export const activeBrands: BrandConfig[] = [
  {
    key: 'bearBelts',
    name: 'Bear Belts',
    clientKey: 'bearBelts',
  },
  {
    key: 'pocketBearsApparel',
    name: 'Pocket Bears Apparel',
    clientKey: 'pocketBearsApparel',
  },
  {
    key: 'mythicalMoods',
    name: 'Mythical Moods',
    clientKey: 'mythicalMoods',
  },
];
