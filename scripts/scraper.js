import puppeteer from 'puppeteer';

const BASE_URL = 'https://civitai.com';

export async function scrapeModels(query, filters) {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.goto(`${BASE_URL}/models`);

    // 検索クエリの入力
    await page.type('input[type="search"]', query);
    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    // フィルターの適用
    if (filters.license?.includes('creativeml')) {
      await page.click('[data-testid="license-filter"]');
      await page.click('[data-value="creativeml"]');
    }

    if (filters.license?.includes('commercial')) {
      await page.click('[data-testid="commercial-use-filter"]');
      await page.click('[data-value="true"]');
    }

    // その他のフィルター適用...

    // 結果の取得
    const models = await page.evaluate(() => {
      const items = document.querySelectorAll('.model-card');
      return Array.from(items).map(item => ({
        id: item.getAttribute('data-model-id'),
        title: item.querySelector('.model-title')?.textContent,
        imageUrl: item.querySelector('img')?.src,
        license: {
          allowNoCredit: item.querySelector('.license-info')?.getAttribute('data-no-credit') === 'true',
          allowCommercialUse: item.querySelector('.license-info')?.getAttribute('data-commercial') === 'true',
          allowDerivatives: item.querySelector('.license-info')?.getAttribute('data-derivatives') === 'true',
          allowDifferentLicense: item.querySelector('.license-info')?.getAttribute('data-different-license') === 'true'
        },
        baseModel: item.querySelector('.base-model')?.textContent
      }));
    });

    return models;
  } catch (error) {
    console.error('Scraping error:', error);
    throw error;
  } finally {
    await browser.close();
  }
}