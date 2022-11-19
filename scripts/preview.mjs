import { createServer } from "http";
import { fileURLToPath, parse } from "url";
import next from "next";
import { launch } from "puppeteer";
import path from "path";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, hostname: "localhost", port: 3000 });
const handle = app.getRequestHandler();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    await app.prepare();
    const server = createServer(async (req, res) => {
        try {
            const parsedUrl = parse(req.url, true);
            const { pathname, query } = parsedUrl;

            if (pathname === "/") {
                await app.render(req, res, "/", query)
            } else {
                await handle(req, res, parsedUrl);
            }
        } catch (err) {
            console.error("Error occurred handling", req.url, err);
            res.statusCode = 500;
            res.end("Internal server error");
        }
    });
    
    server.listen(3000, err => {
        if (err) throw err;
        console.log("Preview server is up. Attempting to grab a screenshot once loaded.");

        (async () => {
            const browser = await launch({
                headless: true,
                args: ["--no-sandbox", "--disable-setuid-sandbox"]
            });
            const browserVersion = await browser.version();
            console.log(`Running Chromium version: ${browserVersion}`);
            const page = await browser.newPage();
            await page.setViewport({
                width: 1920,
                height: 1080
            });
            const res = await page.goto("http://localhost:3000/?location=Denver,CO");
            if (res && res.ok()) {
                await page.waitForSelector("#city-info-slide");
                await page.screenshot({
                    path: path.join(__dirname, "/dist", `${process.argv[2] ?? "latest"}.jpg`),
                    type: "jpeg",
                    quality: 100
                });
            }

            await browser.close();
            console.log("Chromium closed.");
            server.close(() => {
                console.log("Preview server is down.");
                app.close().then(() => console.log("Success"));
            });
        })();
    });
})();