# Working with the backlog
This project uses Github Projects for ScrumBan like project management.

## Overview on GH Projects
Our Projects looks something like this:
![backlog-tabs.png](/documentation/images/backlog-guide/backlog-tabs.png)

Let's breakdown what each tab is for:

----------------
### Overview
This one is just to manage all the issues. This is not useful most of the time.

----------------
### Story list

This one contains all User Stories organized in Sprints and sorted by priority. 

This one is good when you are adding new User Stories or checking out/refining current ones.

----------------
### Sprint Stories
This one is for your current User Stories. Here you can see who are working on which features and which Stories are in Sprint backlog/In progress/Done.

This one is good for staying up to date on User Story progress and helps you focus on the high priority Stories.

----------------
### Task list
This one contains all Tasks organized in Sprints and sorted by priority.

This one is not that useful but it can help you see your teams velocity when comparing multiple sprints.

----------------
### Current Tasks
This one is probably the most important one to maintain and pay attention to. It shows the current sprints tasks progress.

This one is useful for:
- Seeing what you are working on
- Choosing which task to do next
- Keeping you in the loop for sprint progress

----------------
### Ehdotukset seuraavalle sprintille
This one is for those User Stories that are going to be suggested for the next Sprint.

This is useful for making it clear what Stories your team suggesting for the next Sprint. Of course this might change during the PO meeting if they have other plans.

## Adding User Stories/Tasks
There is multiple ways to add an issue into GH Projects. This guide will only show one way. You can always look through the GH [Projects Docs](https://docs.github.com/en/issues) to find out more.

### Creating an issue
I like to Start with a User Story(same steps work for a task):
1. Navigate to the *Story list/(Task list)* tab
2. At the bottom There should be a plus:
![backlog-plus-bar.png](/documentation/images/backlog-guide/backlog-plus-bar.png)
    - You can add User Stories/Tasks under specific Sprints so be careful to add to the correct one.
3. Type # and choose the kurssiesitieto-ohtuprojekti Projects:
![backlog-plus-choose-projects.png](/documentation/images/backlog-guide/backlog-plus-choose-projects.png)

4. Choose *Create new issue*
![backlog-plus-new-issue.png](/documentation/images/backlog-guide/backlog-plus-new-issue.png)
5. Add Title, Description and Labels. These can be modified later if need be.
   - Add at least a Title and User Story/Task Label
![backlog-plus-issue-creation.png](/documentation/images/backlog-guide/backlog-plus-issue-creation.png)
6. Create the issue.
7. Click the issue open to add the final tags to it.
8. On the right edge there is all kinds of tags. You can add: size, priority, status and Assignees.
    - You can also modify everything. Maybe the sprint is wrong or you want to add more labels. Add more tasks or rename the issue.

### Creating task out of the checkbox list in your User Story
Now your User Story should look something like this:
![backlog-story-open.png](/documentation/images/backlog-guide/backlog-story-open.png)

1. Click the User Story issue number to open it in the full view.
2. Hover over the checkbox text and click the circle that appers to create the issue:
![backlog-story-create-task-issue.png](/documentation/images/backlog-guide/backlog-story-create-task-issue.png)
3. Open the task issue
4. Add the task to the GH Projects instance. This can be done by selecting it on the right under Projects. There is only one option.
5. Add all the neccessary tags and description
   - task/User Story, Sprint, Size, Priority, Status
6. Repeate for all checkboxes to create all the tasks

And there we go. You have created your User story and all the tasks that go with it.

## Best practices
- Use DEEP.
- If you can split a User Story/task into smaller clear pieces, it probably should be split.
- Prioritize User Stories and also tasks.
- Use comments. Don't just Assign your self and 5 days later mark it complete. Communication is key.
- Maintain maintain maintain.
