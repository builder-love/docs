---
sidebar_position: 2
---

# Top Project Score

This section outlines the methodology used to develop a blockchain project score based on GitHub data tracked within our data warehouse. The approach involves ingesting and processing GitHub data, defining characteristics of repository quality and contributor strength, aggregating the values to top level project, and applying a scoring model

## How is weighted score calculated?

The Weighted Score is calculated weekly to rank blockchain projects based on GitHub development activity and community engagement metrics. Here is the process:

1. Data Collection: Gathers both all-time counts and recent (4-week percentage) changes for repo-specific key metrics like Commits, Forks, Stargazers, Contributors, and Watchers. It also includes an originality metric.

2. Any missing values are filled from the previous non-missing value. This is why sometimes the trend apears to be flat.

3. Repo metrics are rolled up to the project level. Some projects, like Ethereum have many sub-ecosystems.

4. Normalization: For each metric, every project's value is compared to all other projects within the same week and scaled to a value between 0 and 1.

5. Weighting: These normalized scores are multiplied by specific weights:

- Major All-Time Metrics (12.5% each): Commits, Forks, Stars, Contributors.
- Major Recent Change Metrics (10% each): 4-week change in Commits, Forks, Stars, Contributors.
- Minor Metrics (2.5% each): All-time Watchers, All-time Originality Ratio, 4-week change in Watchers, 4-week change in Originality Ratio.
6. Summation: The weighted, normalized scores for all metrics are added together to get a final weighted_score between 0 and 1.

7. Index Conversion: The "Weighted Score Index" shown in the chart is simply this weighted_score multiplied by 100.