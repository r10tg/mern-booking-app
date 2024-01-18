const { test, expect } = require('@playwright/test');

import path from "path";

const UI_URL = "http://localhost:5173/"

test.beforeEach(async({page})=>{
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
    })

test('should allow a user to add a hotel',async({page})=>{
        await page.goto(`${UI_URL}add-hotel`)

        await page.locator('[name="name"]').fill('test hotel');
        await page.locator('[name="city"]').fill('test city');
        await page.locator('[name="country"]').fill('test country');
        await page.locator('[name="description"]').fill('hsgdjujivhubjsdjvhbjndjivkbnkdjiflvhkbkndjiflvhkbdjivkhnbdhajlvb');
        await page.locator('[name="pricePerNight"]').fill('100');
        await page.selectOption('select[name="starRating"]','3')
        await page.getByText("Budget").click();
        await page.getByLabel("Free WiFi").check();
        await page.getByLabel("Airport Shuttle").check();
        await page.locator('[name="adultCount"]').fill('02');
        await page.locator('[name="childCount"]').fill('04');
        await page.setInputFiles('[name="imageFiles"]',[
            path.join(__dirname,"files","1.jpg")
        ])
        await page.setInputFiles('[name="imageFiles"]',[
            path.join(__dirname,"files","2.jpg")
        ])

        await page.getByRole('button',{name:'save'}).click();
        await expect(page.getByText("Hotel saved!")).toBeVisible()

    })