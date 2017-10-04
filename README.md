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

### Change status
1. Press start button when you starting a task.
    * If a parent of the task is status `new`, it is started automatically.
2. Press done button with the task when you finish a task.
3. Press done button with the story when you finish a story.

## 実装方針とか
* Redmine+backlogsでできない機能や、複数プロジェクトの全体状況把握に役立つ機能は優先。
* 状況確認や作業実施時に行う作業を、Redmineを開かずにできるようにする機能は優先。
* タスクやストーリー、スプリントの作成、編集、移動など、通常作業時にはさほど高頻度でなく、Redmine+backlogsでできる機能は優先度低め
* 自動テストやスタブ、パッケージングの整備は、ある程度使い勝手よくなってからでよさそう。
