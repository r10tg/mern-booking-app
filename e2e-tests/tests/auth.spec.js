// @ts-check
const { test, expect } = require('@playwright/test');

const UI_URL = "http://localhost:5173/"

test('should allow user to sigin', async ({ page }) => {
  await page.goto(UI_URL)

  // 

  await page.getByRole("link",{name:"Sign In"}).click()

  await expect(page.getByRole('heading',{name:"Sign In"})).toBeVisible()

  await page.locator("[name=email]").fill("riot@gupta.com");
  await page.locator("[name=password]").fill("ABCdef@123");

  await page.getByRole('button',{name:'Sign In'}).click();

  await expect(page.getByText("Sign in Successfull!!")).toBeVisible();

  await expect(page.getByRole('link',{name:'My Bookings'})).toBeVisible();
  await expect(page.getByRole('link',{name:'My Hotels'})).toBeVisible();
  await expect(page.getByRole('button',{name:'Sign Out'})).toBeVisible();

});

test('should allow user to register', async ({ page }) => {

  const testEmail = `test_email@${Math.floor(Math.random()*50000)+1000}.com`

  await page.goto(UI_URL)

  await page.getByRole('link',{name:'Sign In'}).click();
  await page.getByRole('link',{name:'Create an account here'}).click();

  await expect(page.getByRole('heading',{name: "Create an Account"})).toBeVisible();

  await page.locator('[name=firstName]').fill("test_firstName");
  await page.locator('[name=lastName]').fill("test_lastName");
  await page.locator('[name=email]').fill(testEmail);
  await page.locator('[name=password]').fill("ABCdef@123");
  await page.locator('[name=confirmPassword]').fill("ABCdef@123");

  await page.getByRole('button',{name:"Create Account"}).click();

  await expect(page.getByText("Registration Successfull!!")).toBeVisible();

  await expect(page.getByRole('link',{name:'My Bookings'})).toBeVisible();
  await expect(page.getByRole('link',{name:'My Hotels'})).toBeVisible();
  await expect(page.getByRole('button',{name:'Sign Out'})).toBeVisible();

})

