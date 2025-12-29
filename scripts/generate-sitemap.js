const fs = require('fs');

(async function generateSitemap() {
  const { globby } = await import('globby');
  const pages = await globby([
    'pages/**/*.js',
    '!pages/_*.js',
    '!pages/api',
  ]);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((page) => {
    const path = page
      .replace('pages', '')
      .replace('.js', '')
      .replace('.md', '');
    const route = path === '/index' ? '' : path;
    return `
      <url>
        <loc>${`https://lestercardoz.com${route}`}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `;
  })
  .join('')}
</urlset>
`;

  fs.writeFileSync('public/sitemap.xml', sitemap);
})();
