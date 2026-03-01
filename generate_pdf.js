import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
    try {
        console.log("Launching puppeteer...");
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        // Load the HTML file
        const htmlPath = path.resolve(__dirname, 'brochure.html');
        console.log(`Loading ${htmlPath}...`);
        await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
        
        // Output PDF
        const outputPath = path.resolve(__dirname, 'Preshio_Company_Profile.pdf');
        await page.pdf({
            path: outputPath,
            format: 'A4',
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 }
        });
        
        console.log(`PDF successfully generated at: ${outputPath}`);
        await browser.close();
    } catch (error) {
        console.error("Error generating PDF:", error);
    }
})();
