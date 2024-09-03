import { CommonPageObject } from "./CommonPageObject";

export class ProductPage extends CommonPageObject {
    constructor(page) {
        super(page);
        this.itemQantity = page.locator("#qty");
        this.addToCartBtn = page.locator("#product-addtocart-button");
    }

    async productSize(size) {
        const sizeSwitch = await this.page.locator(`.swatch-attribute.size .swatch-option.text[option-label="${size}"]`);
        await sizeSwitch.click();
    }

    async productColor(color) {
        const colorPicker = await this.page.locator(`.swatch-attribute.color .swatch-option.color[option-label="${color}"]`);
        await colorPicker.click();
    }

    async fillProductQuantity(quantity) {
        await this.itemQantity.waitFor();
        await this.itemQantity.clear();
        await this.itemQantity.fill(quantity);
    }

    async addProductToCart() {
        await this.addToCartBtn.waitFor();
        await this.addToCartBtn.click();
        await this.page.waitForLoadState("load");
    }
};