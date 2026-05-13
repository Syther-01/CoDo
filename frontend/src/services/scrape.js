import puppeteer from "puppeteer";

async function main() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  // Open LeetCode login
  await page.goto("https://leetcode.com/accounts/login/", {
    waitUntil: "networkidle2",
  });

  console.log("LOGIN MANUALLY IN BROWSER");
  console.log("After login, press ENTER here...");

  process.stdin.resume();

  process.stdin.once("data", async () => {
    console.log("Opening problemset...");

    await page.goto("https://leetcode.com/problemset/all/", {
      waitUntil: "networkidle2",
    });

    // Wait for table
    await page.waitForSelector("body");

    console.log("Scrolling...");

    // Scroll multiple times
    for (let i = 0; i < 30; i++) {
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

      await new Promise((r) => setTimeout(r, 2000));

      console.log(`Scroll ${i + 1}`);
    }

    console.log("Extracting problems...");

    const problems = await page.evaluate(() => {
      const links = document.querySelectorAll(
        'a[href^="/problems/"]'
      );

      const arr = [];

      links.forEach((link) => {
        const href = link.getAttribute("href");

        if (!href) return;

        const slug = href.split("/")[2];

        const title = link.innerText.trim();

        if (slug && title) {
          arr.push({
            title,
            slug,
          });
        }
      });

      return arr;
    });

    // Remove duplicates
    const unique = [
      ...new Map(
        problems.map((item) => [item.slug, item])
      ).values(),
    ];

    console.log(unique);

    console.log("TOTAL:", unique.length);
  });
}

main();