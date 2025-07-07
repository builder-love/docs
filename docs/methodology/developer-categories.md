---
sidebar_position: 3
---

# Contributor Score

This section outlines the methodology used to develop a contributor score based on GitHub data tracked within our data warehouse. The approach involves ingesting and processing GitHub data, defining characteristics of repository quality and contributor strength, and applying a scoring model.

### 1. Data source and ingestion

* **Primary Data Source:** The analysis exclusively utilizes data obtained from GitHub.
* **API Limitations:**
    * GitHub identifies contributors by the author email address that was logged in at the time of the commit, and attempts to use this email to group contributions by GitHub user (including associated emails).
* **Handling Anonymous Contributions:**
    * For anonymous contributors (where the commit author's email isn't linked to a GitHub account), detailed tracking is limited. GitHub only stores the name and email of the git author.
    * Our approach is to compile statistics for identical username/email combinations to aggregate anonymous activity where possible.
    * As of mid-2025, anonymous contributors constitute more than half of the total unique contributors observed in the dataset.

### 2. Understanding contributor data in forked repositories

A critical aspect of interpreting contributor data is understanding its behavior in forked repositories:

* **Commit History Inheritance:** Forks inherit the complete commit history from their upstream (parent) repository at the time of forking. Subsequent synchronizations merge new upstream commits into the fork.
* **Persistent Authorship:** Git commits permanently store original author metadata. When upstream commits are merged into a fork, the original authorship is retained.
* **Attribution in Forks:** Contributor lists and metrics for a fork reflect all authors of commits present in that fork's history. This includes commits inherited from the upstream repository.
* **Implication:** Users who primarily contributed to an upstream repository will also be listed as contributors to its forks if those commits have been synced. 

### 3. Defining and identifying "strong contributors"

Quantifying "strong" versus "weak" contributors directly from the available data is challenging, as outcomes are not explicitly measured. Our approach is based on a set of initial assumptions that will be continuously tested and refined.

* **Initial Assumptions:** These are starting points and may mislabel contributors to a significant degree:
    * **Commit Activity:** Strong contributors tend to have higher commit counts, contribute to a greater number of repositories, and focus on "top projects." They also exhibit sustained commit activity over longer periods in these top projects.
    * **Community Engagement & Network:** They often have more followers, are followed by other strong contributors, and actively participate in forum/issue discussions and improvement proposals.
    * **Experience & Affiliations:** They may have worked for well-funded companies or those with successful IPOs, and potentially attended top universities.
    * **GitHub Profile & Activity:** Strong contributors are more likely to have non-forked repositories with high star/fork counts, be part of GitHub organizations (sometimes multiple), be sponsored, review code, earn GitHub "achievements," and have merged PRs in top repositories.
    * **Responsiveness:** They might respond to and close issues more quickly.
    * **Longevity:** They generally have a longer history of project contributions.
* **Bot Identification:** Aside from Github labeled bot accounts, accounts with "bot" in their description and that do not follow other accounts are generally considered bots.

Contributors that fork popular repos, and make commits to the fork, associate themselves with the popular repo. Because of this reason, we give more weight to non-forked repo contributions. 

### 4. Describing strong contributors

You can use the builder.love platform to segment contributors across different aspects, including:

* Dominant development language (e.g., Rust, Solidity, Typescript)
* Involvement with data-related work
* Years of experience
* Area of work (e.g., infrastructure, applications, modeling)
* Participation in discussions and research forums
* Employment status

### 5. Measuring repository quality

We score repos and use the results in assessing contributor strength.

The score does not use commit and contributor counts to avoid undeserved inheretance from the upstream parent.
* **Methodology:**
    * A weighted score is calculated for each repository.
    * **50%** of the score is based on **Total All-Time Metrics**:
        * Fork Count: 20%
        * Stargaze Count: 20%
        * Watcher Count: 10%
    * **50%** of the score is based on **One-Month Change Metrics** (percentage change over 4 weeks):
        * Fork Count Change: 20%
        * Stargaze Count Change: 20%
        * Watcher Count Change: 10%
* **Processing Steps:**
    1.  **Data Aggregation (`all_metrics` CTE):** Joins base repository data with various metric sources (total and 4-week change for forks, stargazes, watchers) and determines the latest timestamp for each repository's metrics.
    2.  **Global Timestamp (`metrics_with_overall_max_ts` CTE):** Identifies the single latest timestamp across all repositories to ensure calculations use a consistent data snapshot.
    3.  **Normalization (`normalized_metrics` CTE):** Applies min-max normalization to each of the six core metrics, scaling them to a 0-1 range. Handles potential division-by-zero.
    4.  **Score Calculation (`ranked_projects` CTE):** Calculates the `weighted_score` by multiplying normalized metrics by their predefined weights and summing the results. `COALESCE` treats NULL normalized values as 0.
    5.  **Ranking and Bucketing (`final_ranking` CTE):** Ranks repositories by `weighted_score` and assigns them to quartile buckets (1-4, where 1 is the top quartile).
* **Key Output Columns:** Include repository name, data timestamp, raw and normalized metric counts/changes, the `weighted_score` (0-1 scale and as an index \* 100), `repo_rank`, `quartile_bucket`, and a descriptive `repo_rank_category` (e.g., "Top Repo," "Leader").
* **Source Tables/Refs:** `latest_active_distinct_project_repos`, `latest_project_repos_fork_count`, `latest_project_repos_stargaze_count`, `latest_project_repos_watcher_count`, and their `four_week_change_` counterparts.