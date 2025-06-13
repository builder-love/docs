---
sidebar_position: 5
---

# Repo attributes

We use machine learning models to generate development attributes that can be used to better filter, sort, and search the information on the [builder.love](http://builder.love) data platform. For instance, we have labeled all developer tooling repos so that these can be easily searched for within a project repo list. 

## Training data set

The population of development repositories is filtered to remove archived repos, repos without code, repos with only markdown code, and repos without a description or a readme. These repos represent a development sandbox environment and not code that is meant to be used for meaningful use cases. These repos are much less important in our assessment of the legitimacy of projects and contributors.

## Classification implementation

We are currently using one feature table for all classification models. 

The feature dataset is created by searching for a set of keywords within the repo description, as well as the following files (if found):  readme file, package.json, pyproject.toml, pom.xml, build.gradel, build.gradle.kts, go.mod, Cargo.toml, etc. 

The keyword search generates boolean fields. 

We use the boolean fields and other information from the database to train a classification model that can predict if a repo is educational in nature, code scaffolding, or developer tooling. All three models achieved accuracy scores above 75. This means 75% of the classifications made by the models were correct—either true positive or negative. 

We think a false positive i.e., predicting a repo is a developer tooling codebase when it is not, is more costly at this stage than a false negative i.e., failing to classify a developer tooling codebase. For this reason we have not lowered the classification threshold to more aggressively label repos positively. 

In their current state, the models are useful. But they do not perform as well as we would like. We know the real work to improving them is better labeling in our training data—this takes time and a well-thought through framework for making decisions on the margins. 

Further work is needed to explore ways to reduce the need for data labeling. N-shot learning models are designed specifically for this, and will be researched for cost/feasability.

### Education classification

This class of repos exists solely for the purpose of learning and communicating ideas and facts. These repos can be identified using keywords:

- demo
- hackathon
- tutorial
- ‘example’/’examples’ in the repo name
- awesome/awesome collection
- documentation/documents/documentation site
- ‘sample’ in the repo name
- whitepaper
- bootcamp
- interview
- lesson
- quickstart
- educate
- guide
- ‘hello-world’ in repo name
- workshop
- ‘collection of learnings’
- ‘learn solidity’
- ‘starter project’

You can see the labelled data [here](https://docs.google.com/spreadsheets/d/e/2PACX-1vTbKlg5CJYNO3d2lrRbWWUy-71sr-oBApAJxCx2xmV931Y8CDrJ46SwVCUEoOT90LZsPpALVS_QixkE/pubhtml)

The classification model is [here](https://github.com/builder-love/classifications/blob/main/education_attr.py)

Performance:

![Education Model Performance](/img/education_model_performance_snippet_june_2025.png)

This model is especially conservative, which is bringing down its overall accuracy score. We can see this model failed to classify 23 repos out of 36 repos that were labeled as educational in the training dataset. However, it only incorrectly classified eight repos as educational out of 101 repos that were labelled as not educational in the training dataset.  

### Scaffold classification

Repos with code that automatically generates the basic, repeatable steps required to implement technology.

keywords:

- scaffold
- template
- boilerplate

You can see the labelled data [here](https://docs.google.com/spreadsheets/d/e/2PACX-1vShUKZQS6QFJ1SM1efqpFv-tXxbX6LFcJsc_L2MG-NtcXC-e9dGKgkbTSW39Zm6gfLIsUzkiWXa-CVE/pubhtml)

The classification model is [here](https://github.com/builder-love/classifications/blob/main/scaffold_attr.py)

performance:

![Scaffold Model Performance](/img/scaffold_model_performance_snippet_june_2025.png)

The high overall accuracy score of 94 is due to the fact that the model is doing a great job of predicting that a repo is not scaffolding. However, this is an easy task given that their were only 38 positive labels out of 451 negative labels in the training dataset. 

### Developer tooling classification

Developer tooling repos extend functionality. Our basic framework for making decisions about whether or not a repo is developer tooling is as follows:

Pattern:

Is this repository a tool, library, framework, or utility that a developer would use to build, test, analyze, or deploy software more effectively in a general sense, or for a broad category of tasks?

Anti-pattern:

Is the primary purpose of this repository to demonstrate how to use another specific tool, SDK, or product, or to provide an example application for it?

key words:

- A plug in
- an SDK
- CLI
- test suite
- tool/tools/toolkit
- framework
- has a package.json, pyproject.toml, Cargo.toml, or other package manager file
- If a package manager file exists, the ‘name’ field value can be searched via npm, PyPi, or other code distribution API to verify it is a distributable library. This is not implemented yet.

You can see the labelled data [here](https://docs.google.com/spreadsheets/d/e/2PACX-1vSTIjEmhgSpvITvd8BdnttCmGD05bylP9PDZW0WaeahdL0C2Fxfh5dZcd1-EmhbP_M2BJydgA81aKy1/pubhtml)

The classification model is [here](https://github.com/builder-love/classifications/blob/main/dev_tooling_attr.py)

Performance:

![Dev Tooling Model Performance](/img/dev_tooling_model_performance_snippet_june_2025.png)

As you can see, this model uses the education and scaffold predicted values as feature inputs. This model appears to be performing well, and from its higher recall score and low false positive rate (.08). 

## Pipeline architecture

There are two challenges with the pipeline design:

- The features should be updated on some schedule; do we retrain the model when this happens? If so, then we need a process to ensure labels in the training set are also updated. Manually reviewing thousands of labels is tedious work
- Let’s say we update the features and rerun the models on a monthly cadence; how do we ensure there are not wholesale changes to the predictions such that the user experience is poor?