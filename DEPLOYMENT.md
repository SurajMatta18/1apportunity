# Deployment Instructions

## GitHub Pages Setup

To enable GitHub Pages for this repository, follow these steps:

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: [https://github.com/SurajMatta18/1apportunity](https://github.com/SurajMatta18/1apportunity)
2. Click on **Settings** (top navigation bar)
3. In the left sidebar, click on **Pages** (under "Code and automation")
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
5. Click **Save**

### 2. Merge the Pull Request

1. Go to the Pull Request that contains these deployment changes
2. Review the changes (GitHub Actions workflow, .nojekyll file, README updates)
3. Click **Merge pull request**
4. Click **Confirm merge**

### 3. Automatic Deployment

Once the PR is merged to the `main` branch:
- The GitHub Actions workflow will automatically run
- It will deploy your webpage to GitHub Pages
- The deployment takes about 1-2 minutes

### 4. Access Your Live Website

Your website will be available at:
**https://surajmatta18.github.io/1apportunity/**

### 5. Monitor Deployment

You can monitor the deployment status:
1. Go to the **Actions** tab in your repository
2. You'll see the "Deploy to GitHub Pages" workflow running
3. Once it shows a green checkmark ✅, your site is live!

## What Was Added

### Files Created:
- `.github/workflows/deploy.yml` - GitHub Actions workflow for automatic deployment
- `.nojekyll` - Tells GitHub Pages not to use Jekyll processing
- `DEPLOYMENT.md` - This file with deployment instructions

### Files Modified:
- `README.md` - Added live demo link and deployment information

## Deployment Features

✅ **Automatic Deployment**: Every push to `main` triggers a new deployment
✅ **No Build Process**: Static files are deployed directly
✅ **Fast**: Deployment completes in 1-2 minutes
✅ **Manual Trigger**: Can also run workflow manually from Actions tab

## Troubleshooting

### If the workflow doesn't run:
1. Ensure GitHub Pages is enabled with "GitHub Actions" as the source
2. Check the Actions tab for any error messages
3. Verify the workflow file is on the `main` branch

### If the site doesn't load:
1. Wait a few minutes for DNS propagation
2. Clear your browser cache
3. Try accessing in incognito/private mode
4. Check the deployment logs in the Actions tab

### To manually trigger deployment:
1. Go to **Actions** tab
2. Click "Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select `main` branch and click "Run workflow"

## Future Updates

To update the website:
1. Make changes to `index.html`, `styles.css`, or `script.js`
2. Commit and push to `main` branch
3. Deployment happens automatically!

## Need Help?

- Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
- Review the workflow logs in the Actions tab
- Ensure your repository is public (GitHub Pages is free for public repos)
