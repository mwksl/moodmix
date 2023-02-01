import { test, expect, chromium } from '@playwright/test';
import type { Browser, Page } from '@playwright/test';

test.describe('Album search component', () => {
	let browser: Browser;
	let page: Page;

	test.beforeEach(async () => {
		browser = await chromium.launch();
		const context = await browser.newContext();
		page = await context.newPage();
		await page.goto('http://localhost:3000');
	});

	test.afterEach(async () => {
		await browser.close();
	});

	test('should display an input field for searching for albums', async () => {
		const input = await page.$('input');
		expect(input).toBeDefined();
	});

	test('should display a list of albums when typing a query in the input field', async () => {
		const input = await page.$('input');
		await input?.type('Moon & Antarctica by Modest Mouse');

		const list = await page.$('ul.menu');
		expect(list).toBeDefined();
	});

	test('should hide the list of albums when the query is empty', async () => {
		const input = await page.$('input');
		await input?.type('Moon & Antarctica by Modest Mouse');

		let list = await page.$('ul.menu');
		expect(list).toBeDefined();

		await input?.fill('');

		list = await page.$('ul.menu');
		expect(list).toBeNull();
	});
});
