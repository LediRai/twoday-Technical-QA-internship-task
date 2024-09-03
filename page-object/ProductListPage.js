import { expect } from "@playwright/test";
import { CommonPageObject } from "./CommonPageObject";
import { count } from "console";
export class ProductListPage extends CommonPageObject{
    constructor(page){
        super(page);
        this.sortByBtn = page.getByLabel('Sort By');
        this.sortBtn = page.locator('a[data-role="direction-switcher"]');
        this.itemQtyInPage = page.locator("#limiter").nth(1);
        this.pantsPrice = page.locator(".price-container .price");
        this.productContainer = page.locator('div[data-container="product-grid"]').all();
        this.band = this.page.locator('span.price-container > span.price-wrapper').all();        
    }

    async openProduct(productName) {
        await this.page.waitForLoadState("load");
        const productCard = await this.page.getByRole('link', { name: productName }).first();
        productCard.click();
    }

    async verifyProductCountMatchesSelection(){
        await this.page.waitForLoadState("load");
        const products = await this.page.locator(".product-item-info").all();
        const productCount = products.length
        const selectedCount =  await this.itemQtyInPage.inputValue()
        expect(productCount.toString()).toEqual(selectedCount);
    }

    async selectExtraItem1(){
        await this.top1.waitFor();
        await this.top1.click();
      }
    
    async selectExtraItem2(){
        await this.top2.waitFor();
        await this.top2.click();
    }

    async productLimiterPerPage(showQty){
        await this.page.waitForLoadState("load");    
        await this.itemQtyInPage.waitFor();
        await this.itemQtyInPage.selectOption({ value: showQty });
        await this.page.waitForLoadState("load");
    }

    async sortBy(value) {
        await this.sortByBtn.waitFor()
        await this.sortByBtn.selectOption(value);
    }

    async setSortOrder(direction) {
        await this.page.waitForLoadState("load");
        const currentSortValue = await this.sortBtn.first().getAttribute('data-value');
        if (currentSortValue === direction) {
            await this.sortBtn.first().click();
        }
    }

    async assertSortOrder(direction) {
        await this.page.waitForLoadState("load");
        await expect(this.sortBtn.first()).toHaveClass(`action sorter-action sort-${direction}`);
    }

    async selectCheapestProduct(){
        const price = await this.pantsPrice.allInnerTexts();
        const priceNumb = price.map((text) => {
            return parseFloat(text.replace("$", "").trim());
        });
        const minPrice = Math.min(...priceNumb);
        const minPriceIndex = priceNumb.indexOf(minPrice);
        await this.page.locator(".product-item-info").nth(minPriceIndex).click();
    }
}
