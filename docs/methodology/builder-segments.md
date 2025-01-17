---
sidebar_position: 1
---

# Builder segments

Builders are split into two primary subgroups: developers and researchers. Developers are blockchain accounts with a github repository and working code contributions. Researchers are blockchain accounts with a Discourse profile.

Developers and researchers are further segmented by a variety of characteristics. The developer segment is primarily characterized by software languages. 

Repo segmentation criteria:
- Categorize repos by language, where:
  - Repo is not a token repo (e.g., /assets, /tokens, token-list, etc.)
  - Languages is not equal to JavaScript, TypeScript, CSS, HTML
  - Developer type is not equal to bot
  - The total bytes written for the language is greater than or equal to 25% of all Non-front-end language bytes written
  - Project name is not equal to Gitcoin Grants (Gitcoin Grants repo lists the repos of all grantee recipients)
- Ranking projects within the language segment
  - Normalize the bytes written, language percentage share of the project, stargaze count, contributor count, repo count, and fork count across all projects in the resulting cohort. We use a simple scale between 0-1. 
  - Assign weights to each normalized category, as follows:
    - bytes written: 15%
    - language dominance: 10%
    - stargaze count: 25%
    - contributor count: 20%
    - repo count: 5%
    - fork count: 25% 
  - Rank using final weighted score
  - Filter for top 250 projects
- Assigning categories: Top Project, Leader, In-The-Mix, Laggard:
  - Calculate quartiles for top 250 projects by weighted score
  - Assign labels: Top Project = top quartile; Leader = 3rd quartile; In-The-Mix = 2nd quartile; Laggard = bottom quartile

