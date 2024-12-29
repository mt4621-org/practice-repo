const { Octokit } = require("@octokit/rest");

// Load environment variables (GITHUB_TOKEN)
require("dotenv").config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function createRepo() {
  const orgName = "mt4621-org"; // Replace with your GitHub organization name
  const repoName = "new-repo-name"; // Replace with your desired repository name
  const repoDescription = "Repository created via GitHub Actions";
  const isPrivate = true; // Set to false for public repositories

  try {
    const response = await octokit.rest.repos.createInOrg({
      org: orgName,
      name: repoName,
      description: repoDescription,
      private: isPrivate,
      auto_init: true,
    });

    console.log(`Repository '${repoName}' created successfully!`);
    console.log(`Repository URL: ${response.data.html_url}`);
  } catch (error) {
    console.error("Error creating repository:", error.message);
    process.exit(1); // Exit with failure
  }
}

// Execute the function
createRepo();
