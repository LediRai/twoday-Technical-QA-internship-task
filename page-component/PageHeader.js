import { expect } from "@playwright/test";

export class PageHeader {
    constructor(page){
        this.page = page;
        this.basketCounter = page.locator('.counter-number');
        this.loadingIndicator = page.locator('.blockLoader');
        this.cartIcon = page.locator('a.action.showcart');
        this.checkoutBtn = page.getByRole('button', { name: 'Proceed to Checkout' });
        this.removeBtn = page.locator('a[title="Remove item"]');
        this.btnOK = page.getByRole('button', { name: 'OK' });
    }

    async navigateMenuItem(itemName) {
        const item = await this.page.getByRole('menuitem', { name: itemName }).all();
        if([...item].length > 1) {
            this.page.getByRole('menuitem', { name: itemName }).nth(1).hover();
        } else {
            this.page.getByRole('menuitem', { name: itemName }).nth(0).hover();
        }
    }

    async clickMenuItem(itemName) {
        const item = await this.page.getByRole('menuitem', { name: itemName });
        await item.click();
    }

    async openCart(){
        await this.page.waitForLoadState("load");
        await this.cartIcon.click();
    }

    async assertProductInCart(productName) {
        await this.page.waitForLoadState("load");
        const productInCart = await this.page.locator('#mini-cart').getByText(productName);
        await expect(productInCart).toHaveText(productName);
    }

    async proceedToCheckout(){
        await this.page.waitForLoadState("load");
        await this.checkoutBtn.click();
    }

    async removeItem(index){
        await this.removeBtn.nth(index).click();
        await this.btnOK.waitFor()
        await this.btnOK.click();
    }

    async assertBasketIsEmpty() {
        await expect(this.basketCounter).toBeHidden();
    }

    async assertBasketProductCount(expectedValue) {
        await this.page.waitForFunction(expectedValue => {
            const counterElement = document.querySelector('.counter.qty .counter-number');
            if (!counterElement || counterElement.classList.contains('blockLoader')) {
                return false;
            }
            const currentBasketCount = parseInt(counterElement.innerText.trim(), 10);
            return currentBasketCount === expectedValue;
        }, expectedValue, { timeout: 15000 });
    
        const currentBasketCount = await this.basketCounter.innerText();
        const basketCountAfterAdding = parseInt(currentBasketCount, 10);    
        expect(basketCountAfterAdding).toBe(expectedValue, { timeout: 10000 });
    }
}