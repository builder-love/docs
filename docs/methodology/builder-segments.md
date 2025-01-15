---
sidebar_position: 1
---

# Builder segments

Builders are segmented by a variety of characteristics. The primary distinction across builders is developers and researchers. Developers are characteristically define by the existence of a github repository and working code contributions. A researcher is defined by a Discourse profile and activity. 

The developer segment is first characterized by software languages. We segment both developer project repos and developers. 

Repo segmentation criteria:
- Categorize repos by language, where:
  - if any language other than javascript, typescript, html, or css makes up 60% or more of the repo's total bytes, then segment the repo by that language
  - filter out repo url ending in 'token-list', 'assets', 'tokens', or 'chains'
  - filter out project name that is equal to 'gitcoin grants'. The Gitcoin Grants data lists all repos that have been funded by Gitcoin Grants.
