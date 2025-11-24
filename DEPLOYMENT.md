# 🚀 Deployment Guide

This guide demonstrates Claude Code's ability to create comprehensive deployment documentation.

## Quick Start

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/PunkPhilosopher/Spoon-Knife.git
   cd Spoon-Knife
   ```

2. **Serve locally:**

   **Option A: Python (Built-in)**
   ```bash
   # Python 3
   python3 -m http.server 8000

   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Option B: Node.js (http-server)**
   ```bash
   npx http-server -p 8000
   ```

   **Option C: PHP**
   ```bash
   php -S localhost:8000
   ```

3. **Open in browser:**
   ```
   http://localhost:8000
   ```

## Deployment Options

### 1. GitHub Pages (Recommended - Free & Easy)

**Using GitHub Settings:**
1. Go to repository Settings
2. Navigate to Pages section
3. Select source branch (main or your feature branch)
4. Save and wait ~1 minute
5. Access at: `https://punkphilosopher.github.io/Spoon-Knife/`

**Using gh CLI:**
```bash
gh repo edit --enable-pages --pages-branch main
```

### 2. Netlify

**Option A: Drag & Drop**
1. Visit [netlify.com](https://www.netlify.com)
2. Drag the project folder to deploy
3. Get instant live URL

**Option B: CLI Deployment**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir .
```

**Option C: Continuous Deployment**
1. Connect GitHub repository to Netlify
2. Configure build settings:
   - Build command: (none needed)
   - Publish directory: `.`
3. Auto-deploy on every push

### 3. Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**Configuration (`vercel.json`):**
```json
{
  "version": 2,
  "name": "spoon-knife",
  "builds": [
    {
      "src": "*.html",
      "use": "@vercel/static"
    }
  ]
}
```

### 4. Cloudflare Pages

1. Connect GitHub repository
2. Configure build:
   - Framework preset: None
   - Build command: (none)
   - Build output directory: `/`
3. Deploy

### 5. AWS S3 + CloudFront

```bash
# Install AWS CLI
pip install awscli

# Configure AWS credentials
aws configure

# Create S3 bucket
aws s3 mb s3://spoon-knife-demo

# Enable static website hosting
aws s3 website s3://spoon-knife-demo --index-document index.html

# Upload files
aws s3 sync . s3://spoon-knife-demo --acl public-read \
  --exclude ".git/*" --exclude "*.md"

# Optional: Set up CloudFront for CDN
aws cloudfront create-distribution \
  --origin-domain-name spoon-knife-demo.s3.amazonaws.com
```

### 6. Docker (For Complex Setups)

**Dockerfile:**
```dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Build and run:**
```bash
docker build -t spoon-knife .
docker run -p 8080:80 spoon-knife
```

**Docker Compose:**
```yaml
version: '3'
services:
  web:
    image: nginx:alpine
    volumes:
      - .:/usr/share/nginx/html
    ports:
      - "8080:80"
```

## CI/CD Pipeline Examples

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: .
```

### GitLab CI

Create `.gitlab-ci.yml`:

```yaml
pages:
  stage: deploy
  script:
    - mkdir .public
    - cp -r * .public
    - mv .public public
  artifacts:
    paths:
      - public
  only:
    - main
```

## Performance Optimization

### 1. Enable Compression

**Nginx configuration:**
```nginx
gzip on;
gzip_types text/html text/css application/javascript;
gzip_min_length 1000;
```

### 2. Cache Headers

**Apache (.htaccess):**
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/html "access plus 1 hour"
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
</IfModule>
```

**Nginx:**
```nginx
location ~* \.(css|js|gif|jpg|png)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```

### 3. CDN Integration

**Cloudflare:**
- Add site to Cloudflare
- Update nameservers
- Enable "Auto Minify" for HTML, CSS, JS
- Enable "Brotli" compression

## Environment Variables (If Needed)

For future enhancements requiring API keys:

```javascript
// config.js (DO NOT commit this file)
const CONFIG = {
  GITHUB_TOKEN: 'your_token_here',
  API_ENDPOINT: 'https://api.example.com'
};
```

Add to `.gitignore`:
```
config.js
.env
```

## Custom Domain Setup

### GitHub Pages
1. Add `CNAME` file with your domain:
   ```
   demo.example.com
   ```

2. Configure DNS:
   ```
   Type: CNAME
   Name: demo (or www)
   Value: punkphilosopher.github.io
   ```

3. Enable HTTPS in GitHub Pages settings

### Netlify/Vercel
1. Add custom domain in dashboard
2. Update DNS records as instructed
3. SSL automatically provisioned

## Monitoring & Analytics

### Google Analytics

Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Plausible Analytics (Privacy-friendly)

```html
<script defer data-domain="yourdomain.com"
        src="https://plausible.io/js/script.js"></script>
```

## Security Headers

### Recommended Headers

Add to your server configuration:

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline';
X-Frame-Options: SAMEORIGIN
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

## Testing Before Deployment

### 1. Local Testing
```bash
# Test in multiple browsers
# Test responsive design (mobile, tablet, desktop)
# Test dark mode toggle
# Test all interactive features
```

### 2. Lighthouse Audit
```bash
# Install Lighthouse
npm install -g lighthouse

# Run audit
lighthouse http://localhost:8000 --view
```

### 3. Accessibility Testing
```bash
# Install axe-cli
npm install -g @axe-core/cli

# Run accessibility audit
axe http://localhost:8000
```

## Troubleshooting

### Issue: Styles not loading
- Check file paths are correct
- Ensure case sensitivity in filenames
- Verify MIME types are correct

### Issue: GitHub API rate limit
- Implement caching
- Add error handling
- Consider using authenticated requests

### Issue: Dark mode not persisting
- Check localStorage is enabled
- Verify no browser extensions blocking localStorage
- Test in incognito mode

## Rollback Strategy

### Quick Rollback (GitHub Pages)
```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

### Blue-Green Deployment
1. Deploy new version to staging URL
2. Test thoroughly
3. Switch DNS/CDN to new version
4. Keep old version for quick rollback

## Cost Estimates

| Platform | Free Tier | Bandwidth | Custom Domain |
|----------|-----------|-----------|---------------|
| GitHub Pages | ✅ Yes | 100GB/month | ✅ Yes |
| Netlify | ✅ Yes | 100GB/month | ✅ Yes |
| Vercel | ✅ Yes | 100GB/month | ✅ Yes |
| Cloudflare Pages | ✅ Yes | Unlimited | ✅ Yes |
| AWS S3 | ~$0.50/mo | Pay per GB | ✅ Yes |

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify responsive design on mobile
- [ ] Test dark mode toggle
- [ ] Check all interactive features work
- [ ] Test in multiple browsers
- [ ] Verify HTTPS is working
- [ ] Check console for errors
- [ ] Test performance (Lighthouse score)
- [ ] Verify SEO tags are present
- [ ] Set up monitoring/analytics

## Next Steps

After successful deployment:
1. Share the URL
2. Monitor analytics
3. Gather user feedback
4. Plan feature enhancements
5. Set up automated testing
6. Configure monitoring alerts

---

**Generated by Claude Code** - Demonstrating comprehensive deployment knowledge and documentation capabilities.
