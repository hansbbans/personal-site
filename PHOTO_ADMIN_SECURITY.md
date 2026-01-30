# Photo Admin Security Guide

## ⚠️ SECURITY FIX - January 30, 2025

**CRITICAL:** Hardcoded password vulnerability has been removed.

### What Was Fixed

Previously, the admin password was hardcoded as `'letmein2026'` in the source code. This is a **major security vulnerability** because:

1. Anyone viewing the source code could see the password
2. The password was committed to version control history
3. No way to change the password without modifying code

### New Secure Configuration

The password is now stored in `config.json`, which is:
- ✅ Excluded from Git via `.gitignore`
- ✅ Stored only on your local machine or server
- ✅ Easy to change without touching code
- ✅ Can be different per environment

## Setup Instructions

### 1. Create Your Config File

Copy the example configuration:

```bash
cd personal-site
cp config.example.json config.json
```

### 2. Edit config.json

```json
{
  "adminPassword": "YOUR_STRONG_PASSWORD_HERE",
  "githubToken": "ghp_your_github_token_here",
  "repoOwner": "hansbbans",
  "repoName": "personal-site",
  "imageOptimization": {
    "maxWidth": 1920,
    "jpegQuality": 85,
    "autoOptimize": true
  }
}
```

**IMPORTANT:** 
- Use a strong, unique password
- Never commit `config.json` to Git (it's already in .gitignore)
- Keep your GitHub token secure

### 3. Verify .gitignore

Ensure `.gitignore` contains:

```
config.json
.env
.env.local
```

### 4. Generate a GitHub Token

1. Go to: https://github.com/settings/tokens/new
2. Select scopes: `repo` (full control of private repositories)
3. Generate token
4. Copy token to `config.json`

## What Happens Without config.json?

If `config.json` is missing or invalid, you'll see:
- ❌ Alert: "Configuration error: config.json not found or invalid"
- ❌ Cannot login to admin panel
- ✅ This is **by design** - better to fail securely than use a default password

## Best Practices

### For Production

1. **Never use default passwords**
2. **Use environment variables** for servers:
   - Set `ADMIN_PASSWORD` environment variable
   - Update code to check `process.env.ADMIN_PASSWORD` if available
3. **Rotate credentials** periodically
4. **Use HTTPS** when accessing admin panel
5. **Add IP whitelisting** if possible

### For Development

1. Keep `config.json` in local repo only
2. Use different passwords for dev/prod
3. Don't share your config file

## Deployment Options

### Option 1: Manual Config (Current)

- Copy `config.json` to server manually
- Update values for production environment
- Ensure file permissions are restrictive (chmod 600)

### Option 2: Environment Variables (Recommended)

Update the code to support:

```javascript
const adminPassword = process.env.ADMIN_PASSWORD || 
                      (await loadPasswordFromConfig());
```

Then set environment variables on your server:

```bash
export ADMIN_PASSWORD="your_secure_password"
export GITHUB_TOKEN="ghp_your_token"
```

### Option 3: Secrets Management

For advanced setups:
- AWS Secrets Manager
- HashiCorp Vault
- GitHub Secrets (for GitHub Actions)

## Checking Your Security

Run this checklist:

- [ ] `config.json` is NOT in Git history
- [ ] `config.json` is in `.gitignore`
- [ ] Admin password is strong (16+ characters, mixed case, numbers, symbols)
- [ ] GitHub token has minimal required permissions
- [ ] Admin panel is accessed over HTTPS
- [ ] Different passwords for dev/staging/production

## If You Committed config.json Previously

If you accidentally committed `config.json` with secrets:

1. **Rotate credentials immediately**
   - Change GitHub token
   - Change admin password

2. **Remove from Git history:**

```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch config.json" \
  --prune-empty --tag-name-filter cat -- --all

git push origin --force --all
```

Or use `git-filter-repo` (recommended):

```bash
git filter-repo --path config.json --invert-paths
```

3. **Notify team members** to re-clone repository

## Questions?

- Check: `config.example.json` for reference
- The password is checked client-side for this simple implementation
- For production, consider server-side authentication with session tokens
