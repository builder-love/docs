---
sidebar_position: 4
---

# Research leaderboard

The research leaderboard is a list of the top researchers in the Ethereum ecosystem.

We score each researcher based on the amount of activity in the ethresear.ch 'top' category. 

The following algorithm filters and ranks researchers:
- Get top 1,000 Discourse topics from ethresear.ch
- Filter out 'system' authors
- Count the number of topics grouped by author. Grouping by author and including all posts within a topic, sum word count, post and reply count, participant count, like count, and view count. 
- Calculate the average topic score for each post in the topic. Calculate the average score for each topic. Then calculate the average topic score, grouping by author.
- Normalize the scores by their relative value compared to the group's range of values
- Assign weights to each normalized value, as follows:
    - topic count: 30%
    - reply count: 15%
    - participant count: 15%
    - like count: 15%
    - view count: 15%
    - topic score: 10%
- Rank researchers by their total score