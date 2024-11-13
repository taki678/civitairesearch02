export interface Model {
  id: string;
  name: string;
  imageUrl: string;
  modelType: string;
  baseModel: string;
  url: string;
  license: {
    allowNoCredit: boolean;
    allowCommercialUse: boolean;
    allowDerivatives: boolean;
    allowDifferentLicense: boolean;
  };
  savedAt?: string;
}

export interface FilterOption {
  value: string;
  label: string;
  labelEn: string;
}

export interface FilterSection {
  title: string;
  titleEn: string;
  options: FilterOption[];
}