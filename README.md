# Vuemine
Redmine Backlog Viewer

## What is this.
A viewer of redmine multiple projects in web browser.

## Environment.
* Google Chrome(latest)
* Redmine 2.x (with Backlogs plugin)

## How to use.
### Prepare.
1. `git clone`
2. open `vuemine.html` by browser.

### View projects
1. Input redmine url. (example: `http://my-redmine-domain/`)
2. Input project ids. (example: `497,498,499`)
    * Project ids should be separated comma(`,`).
3. Input redmine api key.
4. Press `show` button.

### Sprint Operations
* `><`: hide stories in the sprint
* `<>`: show stories in the sprint
* `+`: add story to the sprint
* `reload`: reload the sprint

### Story Operations
* `><`: hide tasks in the story
* `<>`: show tasks in the story
* `*`: edit the story
* `+`: add a new task to the story
* `start`: start the story
* `done`: finish the story

### Task Operations
* `*`: edit the story
* `start`: start the task
    * If a parent of the task is status `new`, it is started automatically
* `done`: finish the task

## 実装方針とか
* Redmine+backlogsでできない機能や、複数プロジェクトの全体状況把握に役立つ機能は優先。
* 状況確認や作業実施時に行う作業を、Redmineを開かずにできるようにする機能は優先。
* タスクやストーリー、スプリントの作成、編集、移動など、通常作業時にはさほど高頻度でなく、Redmine+backlogsでできる機能は優先度低め
* 自動テストやスタブ、パッケージングの整備は、ある程度使い勝手よくなってからでよさそう。
