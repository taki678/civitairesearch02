import { Model } from '../../src/types';
import { mockModels } from '../data/mockModels';

export async function searchModels(query: string, filters: Record<string, string[]>): Promise<Model[]> {
  let results = [...mockModels];

  // テキスト検索
  if (query) {
    const searchTerms = query.toLowerCase().split(' ');
    results = results.filter(model =>
      searchTerms.every(term =>
        model.name.toLowerCase().includes(term) ||
        model.modelType.toLowerCase().includes(term) ||
        model.baseModel.toLowerCase().includes(term)
      )
    );
  }

  // フィルター適用
  if (Object.keys(filters).length > 0) {
    results = results.filter(model => {
      return Object.entries(filters).every(([section, values]) => {
        if (!values || values.length === 0) return true;

        switch (section) {
          case 'モデルタイプ':
            return values.some(value => model.modelType.toLowerCase() === value.toLowerCase());
          case 'ベースモデル':
            return values.some(value => model.baseModel.toLowerCase() === value.toLowerCase());
          case 'ライセンス':
            return values.every(value => {
              switch (value) {
                case 'useWithoutCredit':
                  return model.license.allowNoCredit;
                case 'sellImages':
                  return model.license.allowCommercialUse;
                case 'shareMerges':
                  return model.license.allowDerivatives;
                case 'differentPermissions':
                  return model.license.allowDifferentLicense;
                default:
                  return true;
              }
            });
          default:
            return true;
        }
      });
    });
  }

  return results;
}