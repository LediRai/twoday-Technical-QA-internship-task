import { test } from "@playwright/test";
import { HomePage } from "../page-object/homePage";
import { CheckoutPage } from "../page-object/CheckoutPage";
import { ProductPage } from "../page-object/ProductPage";
import { ProductListPage } from "../page-object/ProductListPage";
import { shippingDetails } from "../data/shippingDetails";

test.describe("Online Shop Test Suite", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });
  test("Scenario One: Add Men's Hoodie to Cart and Complete Order", async ({page}) => {
    test.setTimeout(120000);

    const homePage = new HomePage(page);
    const productListPage = new ProductListPage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.pageHeader.navigateMenuItem("Men");
    await homePage.pageHeader.navigateMenuItem("Tops");
    await homePage.pageHeader.clickMenuItem("Hoodies & Sweatshirts");
    await homePage.assertTitle("Hoodies & Sweatshirts");
    await productListPage.verifyProductCountMatchesSelection();
    await productListPage.openProduct("Frankie Sweatshirt");
    await productPage.assertTitle("Frankie Sweatshirt");    
    await productPage.pageHeader.assertBasketIsEmpty();
    await productPage.productSize("M");
    await productPage.productColor("White");
    await productPage.fillProductQuantity("2");
    await productPage.addProductToCart();
    await productPage.pageHeader.assertBasketProductCount(2);
    await productPage.pageHeader.openCart();
    await productPage.pageHeader.assertProductInCart("Frankie Sweatshirt");
    await productPage.pageHeader.proceedToCheckout();

    await checkoutPage.fillEmail(shippingDetails.email);
    await checkoutPage.fillFirstName(shippingDetails.firstName);
    await checkoutPage.fillLastName(shippingDetails.lastName);
    await checkoutPage.fillCompany(shippingDetails.company);
    await checkoutPage.fillAddress(shippingDetails.address);
    await checkoutPage.fillCity(shippingDetails.city);
    await checkoutPage.selectCountry("LT");
    await checkoutPage.selectState("Kauno Apskritis");
    await checkoutPage.fillZipCode(shippingDetails.zipCode);
    await checkoutPage.fillPhoneNumber(shippingDetails.phoneNumber);
    await checkoutPage.goToShippingDetails();
    await checkoutPage.completeTheOrder();
    await checkoutPage.assertTitle("Thank you for your purchase!");
  });

  test("Scenario Two: Add, modify, and complete women's clothing ", async ({ page }) => {
    test.setTimeout(120000);
    const homePage = new HomePage(page);
    const productListPage = new ProductListPage(page);
    const productPage = new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.pageHeader.navigateMenuItem("Women");
    await homePage.pageHeader.navigateMenuItem("Bottoms");
    await homePage.pageHeader.clickMenuItem("Pants");
    await productListPage.assertTitle("Pants");
    await productListPage.productLimiterPerPage("36");
    await productListPage.sortBy("Price");
    await productListPage.setSortOrder('asc');
    await productListPage.assertSortOrder('asc');
    await productListPage.selectCheapestProduct();
    await productPage.pageHeader.assertBasketIsEmpty();
    await productPage.productSize("29");
    await productPage.productColor("Black");
    await productPage.fillProductQuantity("1");
    await productPage.addProductToCart();
    await productPage.pageHeader.assertBasketProductCount(1);
    
    await homePage.pageHeader.navigateMenuItem("Women");
    await homePage.pageHeader.clickMenuItem("Tops");
    await productListPage.assertTitle("Tops");
    await productListPage.openProduct("Antonia Racer Tank");
    await productPage.assertTitle("Antonia Racer Tank");
    await productPage.pageHeader.assertBasketProductCount(1);
    await productPage.productSize("M");
    await productPage.productColor("Purple");
    await productPage.fillProductQuantity("2");
    await productPage.addProductToCart();
    await productPage.pageHeader.assertBasketProductCount(3);

    await productPage.goBack();
    await productListPage.assertTitle("Tops");
    await productListPage.openProduct("Prima Compete Bra Top");
    await productPage.assertTitle("Prima Compete Bra Top");
    await productPage.pageHeader.assertBasketProductCount(3);
    await productPage.productSize("S");
    await productPage.productColor("Yellow");
    await productPage.fillProductQuantity("3");
    await productPage.addProductToCart();
    await productPage.pageHeader.assertBasketProductCount(6);

    await productPage.pageHeader.openCart();
    await productPage.pageHeader.removeItem(1);
    await productPage.pageHeader.assertBasketProductCount(4);
    await productPage.pageHeader.proceedToCheckout();

    await checkoutPage.fillEmail(shippingDetails.email);
    await checkoutPage.fillFirstName(shippingDetails.firstName);
    await checkoutPage.fillLastName(shippingDetails.lastName);
    await checkoutPage.fillCompany(shippingDetails.company);
    await checkoutPage.fillAddress(shippingDetails.address);
    await checkoutPage.fillCity(shippingDetails.city);
    await checkoutPage.selectCountry("LT");
    await checkoutPage.selectState("Kauno Apskritis");
    await checkoutPage.fillZipCode(shippingDetails.zipCode);
    await checkoutPage.fillPhoneNumber(shippingDetails.phoneNumber);
    await checkoutPage.goToShippingDetails();

    await homePage.open();
    await homePage.pageHeader.navigateMenuItem("Women");
    await homePage.pageHeader.clickMenuItem("Tops");
    await productListPage.assertTitle("Tops");
    await productListPage.openProduct("Breathe-Easy Tank")
    await productPage.assertTitle("Breathe-Easy Tank");
    await productListPage.openProduct("Ana Running Short"); 
    await productPage.assertTitle("Ana Running Short");
    await productPage.pageHeader.assertBasketProductCount(4);
    await productPage.productSize("28");
    await productPage.productColor("Orange");
    await productPage.fillProductQuantity("1");
    await productPage.addProductToCart();
    await productPage.pageHeader.assertBasketProductCount(5);
    await productPage.pageHeader.openCart();
    await productPage.pageHeader.proceedToCheckout();
    await checkoutPage.goToShippingDetails();
    await checkoutPage.completeTheOrder();
    await checkoutPage.assertTitle("Thank you for your purchase!");
  });
});
