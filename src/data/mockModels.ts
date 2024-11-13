import { Model } from '../types';

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
  },
  {
    id: '3',
    name: 'Photorealistic Portrait',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    modelType: 'Checkpoint',
    baseModel: 'SDXL 1.0',
    url: 'https://civitai.com/models/4203',
    license: {
      allowNoCredit: true,
      allowCommercialUse: false,
      allowDerivatives: true,
      allowDifferentLicense: false
    }
  },
  {
    id: '4',
    name: 'Artistic Style LoRA',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5',
    modelType: 'LoRA',
    baseModel: 'SD 1.5',
    url: 'https://civitai.com/models/4204',
    license: {
      allowNoCredit: false,
      allowCommercialUse: true,
      allowDerivatives: false,
      allowDifferentLicense: true
    }
  },
  {
    id: '5',
    name: 'Fantasy Character Generator',
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477',
    modelType: 'Checkpoint',
    baseModel: 'SD 2.1',
    url: 'https://civitai.com/models/4205',
    license: {
      allowNoCredit: true,
      allowCommercialUse: true,
      allowDerivatives: true,
      allowDifferentLicense: true
    }
  }
];