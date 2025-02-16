---
sidebar_position: 4
---

# How we handle forks

From the Crypto Ecosystems data, we can see that projects list all of the repos that are used in their work, as well as the repos used in sub projects of their project. 

![top appearing forks](/img/top_appearing_forks.png)

We also see that some repos are widely used across the crypto ecosystem, and that some are forks of other repos.

![top appearing repos](/img/top_appearing_repos.png)

For repos that are widely used across the ecosystem, we run the risk of double counting metadata when we aggregate by top level project. Examples of metadata that are aggregated include stargaze, forks, and contributors.

So, what is the best way to handle aggregated metadata? We could go upstream and aggegrate metadata to the paraent repo, but this would discard work done by the forked repo. So we simply aggregate the metadata by the forked repo. The downside is that forked repo metadata will be aggregated to a project, even if that fork has not deviated from the parent repo. This should not be a concern, since unmodified forks are not likely to have been stared, for instance. 