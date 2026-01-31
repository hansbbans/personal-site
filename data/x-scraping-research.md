# X (Twitter) Scraping Options for Moltbook

## The Problem
X blocks standard web scrapers. The morning briefing already failed to fetch tweets directly.

---

## Option 1: twitterapi.io ⭐ RECOMMENDED

**Cost:** 100K free credits/month (~3,300 tweets/day)  
**Paid tier:** $29/month for 500K credits  
**Setup:** API key + simple HTTP requests  
**Reliability:** High  
**Rate limits:** Reasonable

### Pros
- Free tier is generous
- JSON response with full tweet data
- No proxy rotation needed
- Handles authentication/session management

### Cons
- Third-party service (dependency risk)
- Rate limits on free tier

### Example Response
```json
{
  "id": "123456789",
  "text": "Tweet content here",
  "author": {
    "username": "handle",
    "name": "Display Name"
  },
  "created_at": "2025-01-31T10:00:00Z",
  "public_metrics": {
    "retweet_count": 42,
    "like_count": 156,
    "reply_count": 12
  }
}
```

### Integration
```bash
# Get user tweets
curl "https://api.twitterapi.io/api/user/tweets?username=handle" \
  -H "X-API-Key: YOUR_API_KEY"

# Search tweets
curl "https://api.twitterapi.io/api/search?query=clawdbot+tip" \
  -H "X-API-Key: YOUR_API_KEY"
```

---

## Option 2: Apify Twitter Scraper

**Cost:** ~$5-20/month (usage-based)  
**Setup:** Apify account + actor configuration  
**Reliability:** High  
**Best for:** Automated scraping workflows

### Pros
- Managed infrastructure
- Built-in proxy rotation
- Schedule-based runs
- Can scrape profiles, searches, replies

### Cons
- More complex setup
- Costs scale with usage
- Requires Apify account

### Use Cases
- Daily scans of specific accounts
- Automated hashtag monitoring
- Scheduled data exports

---

## Option 3: Nitter Instances (FREE)

**Cost:** Free  
**Setup:** Self-host or use public instances  
**Reliability:** Low (often blocked/down)  
**Best for:** Occasional, low-volume scraping

### Pros
- Completely free
- No API keys needed
- Open source

### Cons
- Public instances get blocked constantly
- Self-hosting requires server maintenance
- Unreliable for production use

### Current Working Instances
(As of 2026-01-31 - check https://github.com/zedeus/nitter/wiki/Instances)
- nitter.net (official, often rate-limited)
- Various community instances (ephemeral)

---

## Option 4: X API v2 (Official)

**Cost:** $100/month basic tier  
**Setup:** Developer account + OAuth  
**Reliability:** Highest  
**Best for:** Enterprise/production apps

### Pros
- Official, stable API
- Full feature set
- Good documentation

### Cons
- Expensive ($100/month minimum)
- Complex OAuth flow
- Rate limits even on paid tier

---

## Recommendation for Moltbook

**Start with twitterapi.io**

1. **Sign up:** https://twitterapi.io (free, no credit card)
2. **Get API key** from dashboard
3. **Test with:** Search for "clawdbot tip" or "moltbot config"
4. **Store key in:** OpenClaw config env vars

**Implementation:**
```javascript
// In your self-improvement scan agent
async function scrapeXTips() {
  const queries = [
    'clawdbot config',
    'clawdbot tip',
    'moltbot prompt',
    'AI assistant workflow'
  ];
  
  for (const query of queries) {
    const response = await fetch(
      `https://api.twitterapi.io/api/search?query=${encodeURIComponent(query)}&max_results=10`,
      { headers: { 'X-API-Key': process.env.TWITTER_API_KEY } }
    );
    const data = await response.json();
    // Process and compile tips
  }
}
```

---

## Migration Path

If twitterapi.io stops working:
1. **Immediate fallback:** Apify (similar API, slightly more cost)
2. **Long-term:** X API v2 ($100/month) if Moltbook generates revenue
3. **Nuclear option:** Manual curation + community submissions

---

## Security Notes
- Store API key in OpenClaw config (not in code)
- Use `env.vars.TWITTER_API_KEY` in cron jobs
- Rotate keys if compromised
- Don't commit keys to git