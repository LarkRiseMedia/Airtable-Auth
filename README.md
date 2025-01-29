# Airtable API Access Debugging Guide

## 🔍 Purpose
This set of scripts helps diagnose and resolve Airtable API connection issues.

## 🛠 Debugging Scripts

### 1. Environment Variable Checker
**File:** `scripts/airtable-comprehensive-auth-debug.js`

#### Features:
- Validates Airtable Personal Access Token
- Checks Base ID
- Retrieves base metadata
- Identifies potential connection issues

#### Usage:
```bash
npm run airtable-debug
```

### Common Authentication Errors
- 401 (Unauthorized)
- 403 (Forbidden)
- 404 (Not Found)

## 🚨 Troubleshooting Checklist

### Personal Access Token
1. Verify token starts with `pat_`
2. Ensure no extra spaces
3. Check token is not expired
4. Confirm all necessary scopes are selected

### Base Access
- Confirm base is shared with your account
- Verify correct Base ID
- Check table name exactness

## 📋 Debugging Steps

### 1. Token Verification
- Length check
- Prefix validation
- Scope confirmation

### 2. Base Metadata Retrieval
- List all tables in base
- Verify "Content Pipeline" table exists

### 3. Comprehensive Error Analysis
- Detailed error type
- Specific failure reasons
- Actionable suggestions

## 🔧 Potential Fixes
- Regenerate Personal Access Token
- Verify Airtable Account Permissions
- Check Network Connectivity
- Ensure Correct Account is Used

## 📝 Example .env Configuration
```
AIRTABLE_PERSONAL_ACCESS_TOKEN=pat_your_token_here
AIRTABLE_BASE_ID=your_base_id_here
```

## 🤔 Still Having Issues?
- Double-check Airtable account settings
- Verify base sharing permissions
- Contact Airtable support if persistent

---

**Developed by Andrew Wilkinson**

[Meon Valley Web](https://meonvalleyweb.com 'Meon Valley Web Website')
