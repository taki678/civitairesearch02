import { Model } from '../../src/types';

export const mockModels: Model[] = [
  {
    id: '1',
    name: 'Realistic Vision V5.1',
    imageUrl: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357',
    modelType: 'Checkpoint',
    baseModel: 'SD 1.5',
    url: 'https://civitai.com/models/4201',
    license: {
      allowNoCredit: true,
      allowCommercialUse: true,
      allowDerivatives: true,
      allowDifferentLicense: false
    }
  },
  {
    id: '2',
    name: 'Anime Pastel Dream',
    imageUrl: 'https://images.unsplash.com/photo-1682687220198-88e9bdea9931',
    modelType: 'LoRA',
    baseModel: 'SDXL 1.0',
    url: 'https://civitai.com/models/4202',
    license: {
      allowNoCredit: false,
      allowCommercialUse: true,
      allowDerivatives: true,
      allowDifferentLicense: true
    }
  }
];