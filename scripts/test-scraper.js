import { scrapeModels } from './scraper.js';

async function testScraper() {
  try {
    console.log('テストを開始します / Starting test...');
    
    const testQuery = 'realistic';
    const testFilters = {
      modelTypes: ['Checkpoint'],
      baseModel: ['SD 1.5']
    };

    console.log(`検索クエリ / Search query: "${testQuery}"`);
    console.log('フィルター / Filters:', JSON.stringify(testFilters, null, 2));

    const results = await scrapeModels(testQuery, testFilters);
    
    console.log('\n検索結果 / Search results:');
    console.log(JSON.stringify(results, null, 2));
    
    console.log(`\n取得したモデル数 / Number of models found: ${results.length}`);
    
    if (results.length === 0) {
      console.warn('警告: 結果が見つかりませんでした / Warning: No results found');
    }
    
    console.log('\nテスト完了 / Test completed');
  } catch (error) {
    console.error('テストエラー / Test error:', error);
  }
}