import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { config } from 'dotenv';
import { Model } from '../../src/types';

// 環境変数の読み込み
config();

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!SPREADSHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  throw new Error('Required environment variables are not set');
}

// JWT認証クライアントの作成
const serviceAccountAuth = new JWT({
  email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: [
    'https://www.googleapis.com/auth/spreadsheets',
  ],
});

let doc: GoogleSpreadsheet;

// スプレッドシートの初期化
async function initializeSheet() {
  try {
    doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    // シートが存在しない場合は作成
    let sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      sheet = await doc.addSheet({
        headerValues: [
          '保存日時',
          'モデル名',
          'モデルタイプ',
          'ベースモデル',
          'URL',
          'クレジット表記不要',
          '商用利用可能',
          '派生作品許可',
          'ライセンス変更可',
          'サムネイルURL'
        ]
      });
    }

    console.log('スプレッドシートの初期化が完了しました / Spreadsheet initialized');
  } catch (error) {
    console.error('スプレッドシート初期化エラー / Spreadsheet initialization error:', error);
    throw error;
  }
}

// 初期化を実行
initializeSheet().catch(console.error);

export async function saveModelToSheet(model: Model): Promise<void> {
  try {
    if (!doc) {
      await initializeSheet();
    }

    const sheet = doc.sheetsByIndex[0];
    
    // スプレッドシートに保存するデータを整形
    const rowData = {
      '保存日時': new Date().toLocaleString('ja-JP'),
      'モデル名': model.name,
      'モデルタイプ': model.modelType,
      'ベースモデル': model.baseModel,
      'URL': model.url,
      'クレジット表記不要': model.license.allowNoCredit ? '○' : '×',
      '商用利用可能': model.license.allowCommercialUse ? '○' : '×',
      '派生作品許可': model.license.allowDerivatives ? '○' : '×',
      'ライセンス変更可': model.license.allowDifferentLicense ? '○' : '×',
      'サムネイルURL': model.imageUrl
    };

    await sheet.addRow(rowData);
    console.log(`モデル "${model.name}" を保存しました / Saved model "${model.name}"`);
  } catch (error) {
    console.error('保存エラー / Save error:', error);
    throw new Error('スプレッドシートへの保存に失敗しました / Failed to save to spreadsheet');
  }
}

export async function getSavedModels(): Promise<Model[]> {
  try {
    if (!doc) {
      await initializeSheet();
    }

    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    return rows.map(row => ({
      id: row.get('URL').split('/').pop() || String(row.rowNumber),
      name: row.get('モデル名'),
      modelType: row.get('モデルタイプ'),
      baseModel: row.get('ベースモデル'),
      url: row.get('URL'),
      imageUrl: row.get('サムネイルURL'),
      savedAt: row.get('保存日時'),
      license: {
        allowNoCredit: row.get('クレジット表記不要') === '○',
        allowCommercialUse: row.get('商用利用可能') === '○',
        allowDerivatives: row.get('派生作品許可') === '○',
        allowDifferentLicense: row.get('ライセンス変更可') === '○'
      }
    }));
  } catch (error) {
    console.error('読み込みエラー / Load error:', error);
    throw new Error('スプレッドシートからの読み込みに失敗しました / Failed to load from spreadsheet');
  }
}