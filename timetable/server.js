const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const ROOT_DIR = path.basename(ROOT);
const PORT = process.env.PORT || 8080;
const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.webp': 'image/webp', '.ico': 'image/x-icon', '.txt': 'text/plain',
  '.woff2': 'font/woff2'
};

function resolveUrlPath(urlPath) {
  if (urlPath.startsWith('/' + ROOT_DIR)) {
    urlPath = urlPath.slice(ROOT_DIR.length + 1);
  }
  if (urlPath === '/' || urlPath === '') return '/index.html';
  if (urlPath.endsWith('/')) return urlPath.slice(0, -1) + '/index.html';
  if (!urlPath.includes('.')) return urlPath + '.html';
  return urlPath;
}

http.createServer(function (req, res) {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  urlPath = resolveUrlPath(urlPath);
  const filePath = path.join(ROOT, urlPath);
  if (!filePath.startsWith(ROOT + path.sep) && filePath !== ROOT) {
    res.writeHead(403); res.end('Forbidden'); return;
  }
  fs.stat(filePath, function (err, stat) {
    if (err || !stat.isFile()) {
      const spaPath = path.join(ROOT, 'index.html');
      fs.stat(spaPath, function (err2, stat2) {
        if (err2 || !stat2.isFile()) {
          res.writeHead(404); res.end('Not found'); return;
        }
        res.writeHead(200, {
          'Content-Type': 'text/html',
          'Content-Length': stat2.size,
          'Cache-Control': 'no-store',
          'Service-Worker-Allowed': '/'
        });
        fs.createReadStream(spaPath).pipe(res);
      });
      return;
    }
    const ext = path.extname(filePath);
    const cacheControl = ext === '.html' ? 'no-store' : 'public, max-age=31536000, immutable';
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': cacheControl,
      'Service-Worker-Allowed': '/'
    });
    fs.createReadStream(filePath).pipe(res);
  });
}).listen(PORT, function () {
  console.log('DLZLAB Time running at http://localhost:' + PORT);
});
