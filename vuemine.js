let stub = {
    projects: [
        {
            id: 1,
            url: "http://example.com/backlogs/1",
            title: "project A",
            sprints:[
                {
                    id: 1,
                    title: "sprint1",
                    start: "2017-8-1",
                    end: "2017-9-1",
                    stories:[
                        {
                            id: 1, url: "http://example.com/0", number: 0, title: "foo", status: "running",
                            tasks: [
                                {
                                    id: 1, url: "http://example.com/1", number: 1, title: "hoge", status: "running" },
                                {
                                    id: 2, url: "http://example.com/2", number: 2, title: "piyo", status: "new" },
                                { id: 3, url: "http://example.com/3", number: 3, title: "fuga", status: "done" }]},
                        {
                            id: 2,url: "http://example.com/0", number: 0, title: "bar", status: "running",
                            tasks: [
                                { id: 4, url: "http://example.com/1", number: 1, title: "hoge", status: "done" },
                                { id: 5, url: "http://example.com/2", number: 2, title: "piyo", status: "review" },
                                { id: 6, url: "http://example.com/3", number: 3, title: "fuga", status: "feedback" }]}
                    ]},
                {
                    id: 2,
                    title: "sprint2",
                    start: "2017-8-1",
                    end: "2017-9-1",
                    stories:[
                        {
                            id: 3, url: "http://example.com/0", number: 0, title: "foo", status: "running",
                            tasks: [
                                { id: 7, url: "http://example.com/1", number: 1, title: "hoge", status: "reject" },
                                { id: 8, url: "http://example.com/2", number: 2, title: "piyo", status: "running" },
                                { id: 9, url: "http://example.com/3", number: 3, title: "fuga", status: "running" }]},
                        {
                            id: 4, url: "http://example.com/0", number: 0, title: "bar", status: "running",
                            tasks: [
                                { id: 10, url: "http://example.com/1", number: 1, title: "hoge", status: "running" },
                                { id: 11, url: "http://example.com/2", number: 2, title: "piyo", status: "running" },
                                { id: 12, url: "http://example.com/3", number: 3, title: "fuga", status: "running" }]}
                    ]}
            ]},
        {
            id: 2,
            url: "http://example.com/backlogs/2",
            title: "project B",
            sprints:[
                {
                    id: 3,
                    title: "sprint3",
                    start: "2017-8-1",
                    end: "2017-9-1",
                    stories:[
                        {
                            id: 5, url: "http://example.com/0", number: 0, title: "foo", status: "running",
                            tasks: [
                                { id: 13, url: "http://example.com/1", number: 1, title: "hoge", status: "running" },
                                { id: 14, url: "http://example.com/2", number: 2, title: "piyo", status: "running" },
                                { id: 15, url: "http://example.com/3", number: 3, title: "fuga", status: "running" }]},
                        {
                            id: 6, url: "http://example.com/0", number: 0, title: "bar", status: "running",
                            tasks: [
                                { id: 16, url: "http://example.com/1", number: 1, title: "hoge", status: "running" },
                                { id: 17, url: "http://example.com/2", number: 2, title: "piyo", status: "running" },
                                { id: 18, url: "http://example.com/3", number: 3, title: "fuga", status: "running" }]}
                    ]},
                {
                    id: 4,
                    title: "sprint4",
                    start: "2017-8-1",
                    end: "2017-9-1",
                    stories:[
                        {
                            id: 7, url: "http://example.com/0", number: 0, title: "foo", status: "running",
                            tasks: [
                                { id: 19, url: "http://example.com/1", number: 1, title: "hoge", status: "running" },
                                { id: 20, url: "http://example.com/2", number: 2, title: "piyo", status: "running" },
                                { id: 21, url: "http://example.com/3", number: 3, title: "fuga", status: "running" }]},
                        {
                            id: 8,url: "http://example.com/0", number: 0, title: "bar", status: "running",
                            tasks: [
                                { id: 22, url: "http://example.com/1", number: 1, title: "hoge", status: "running" },
                                { id: 23, url: "http://example.com/2", number: 2, title: "piyo", status: "running" },
                                { id: 24, url: "http://example.com/3", number: 3, title: "fuga", status: "running" }]}
                    ]}
            ]}]};


let statuses = {
    'new': {'id': 1, 'name': 'new', 'label': '新規'},
    'running': {'id': 2, 'name': 'running', 'label': '進行中'},
    'done': {'id': 5, 'name': 'done', 'label': '終了'}
};

function copy(str){
    // add temporary DOM node
    let node = document.createElement('div');
    node.textContent = str;
    document.body.appendChild(node);

    // copy
    let range = document.createRange();
    range.selectNode(node);
    let selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');

    // remove selection and node
    selection.removeAllRanges();
    document.body.removeChild(node);
}

function parse_query(query){
    // TODO: query stringのparseをもうすこしまともにする
    try{
        return {
            project_ids: /project_ids=([^&]*)/.exec(query)[1],
            api_key: /api_key=([^&]*)/.exec(query)[1],
            root_url: /root_url=([^&]*)/.exec(query)[1]
        };
    }catch(ex){
        return {
            project_ids: null,
            api_key: null,
            root_url: null
        };
    }
}


function build_sprints_url(api_key, root_url, project_id){
    return `${root_url}projects/${project_id}/versions.json?key=${api_key}&limit=100`;
}

function build_stories_url(api_key, root_url, project_id, sprint_id){
    return `${root_url}projects/${project_id}/issues.json?key=${api_key}&limit=100&backlogs_issue_type=story&fixed_version_id=${sprint_id}&status_id=*`;
}

function build_tasks_url(api_key, root_url, project_id, sprint_id ){
    return `${root_url}projects/${project_id}/issues.json?key=${api_key}&limit=100&backlogs_issue_type=task&fixed_version_id=${sprint_id}&status_id=*`;
}

function build_backlog_page_url(root_url, project_id){
    return `${root_url}rb/master_backlog/${project_id}`;
}

function build_project_url(api_key, root_url, project_id){
    return `${root_url}projects/${project_id}.json?key=${api_key}`;
}

function build_issue_page_url(root_url, issue_id){
    return `${root_url}issues/${issue_id}`;
}

function build_issue_url(api_key, root_url, issue_id){
    return `${build_issue_page_url(root_url, issue_id)}.json?key=${api_key}`;
}

function build_current_user_url(api_key, root_url){
    return `${root_url}users/current.json?key=${api_key}`;
}

function fetch_current_user(settings, callback) {
    let url = build_current_user_url(settings.api_key, settings.root_url);
    axios.get(url).then(response => {
        console.log('user');
        console.log(response);
        callback(response.data.user);
    });
};

function convert_status(status){
    let translated = ((japanese_name) => {
        switch(japanese_name){
        case '新規':
            return "new";
        case '進行中':
            return "running";
        case 'レビュー':
            return "review";
        case 'フィードバック':
            return "feedback";
        case '終了':
            return "done";
        case '却下':
            return "reject";
        default:
            return "";
        }})(status.name);
    return { 'id': status.id, 'name': translated, 'label': status.name };
}

function issue_is_startable(status){
    switch(status.name){
    case 'new':
        return true;
    default:
        return false;
    }
}

function issue_is_doneable(status){
    switch(status.name){
    case 'running':
    case 'review':
    case 'feedback':
        return true;
    default:
        return false;
    }
}

function issue_update_status(settings, issue, new_status, body){
    let url = build_issue_url(settings.api_key, settings.root_url, issue.id);
    axios.put(url, body).then(response => {
        console.log('issue updated.');
        console.log(response);
        issue.status = new_status;
    });
}

function issue_start(issue, settings){
    console.log('issue start');
    console.log(issue);
    let body = {
        'issue': {
            'status_id': statuses.running.id
        }
    };
    issue_update_status(settings, issue, statuses.running, body);
}

function issue_start_with_assign_to_me(issue, settings){
    console.log('issue start(with assign to me)');
    console.log(issue);
    fetch_current_user(settings, (user) => {
        let body = {
            'issue': {
                'status_id': statuses.running.id,
                'assigned_to_id': user.id
            }
        };
        issue_update_status(settings, issue, statuses.running, body);
    });
}

function task_start(task, settings){
    let story = task.parent;
    console.log('task start');
    console.log(task);
    console.log(story);
    // start task
    issue_start_with_assign_to_me(task, settings);
    // start parent story if not started
    if(story.status.name != 'new'){ return; }
    issue_start(story, settings);
}

function issue_done(issue, settings){
    console.log('issue done');
    console.log(issue);
    let body = {
        'issue': {
            'status_id': statuses.done.id
        }
    };
    issue_update_status(settings, issue, statuses.done, body);
}

function sum(arr){
    if(arr.length == 0){ return 0; }
    let result = arr.map(x => x || 0).reduce((prev, current, i, arr) => prev + current);
    return result;
}

function remaining_hours(issue){
    if(issue.is_finished()){
        return 0;
    }
    if(issue.tasks){
        return sum(issue.tasks.map((x)=>x.remaining_hours()));
    }
    return issue.estimated_hours;
}

function is_finished(status){
    switch(status.name){
    case 'done':
    case 'reject':
        return true;
    default:
        return false;
    }
}

function new_task(){
    let self = {
        id: null,
        number: null,
        title:null,
        status: statuses.new,
        url: null,
        parent_id: null,
        parent: null,
        estimated_hours: 0,
        is_editing: false,
        remaining_hours: ()=>remaining_hours(self),
        is_startable: ()=>issue_is_startable(self.status),
        is_doneable: ()=>issue_is_doneable(self.status),
        start: (settings)=>{
            if(self.parent_id){ task_start(self, settings); }
            else { issue_start(self, settings); }
        },
        done: (settings)=>issue_done(self, settings),
        is_finished: ()=>is_finished(self.status)
    };
    return self;
}

function add_task(story){
    let task = new_task();
    Object.assign(task, {
        is_editing: true
    });
    story.tasks.push(task);
}

function issue_json_to_task_or_story(root_url, issue){
    let status = convert_status(issue.status);
    let task = new_task();
    Object.assign(task, {
        id: issue.id,
        number: issue.id,
        title: issue.subject,
        status: status,
        url: build_issue_page_url(root_url, issue.id),
        parent_id: issue.parent ? issue.parent.id : null,
        parent: null,
        estimated_hours: issue.estimated_hours || 0,
        is_editing: false
    });
    return task;
}

function group_tasks_by_story(stories, tasks){
    let story_tasks = {};
    tasks.forEach(task=>{
        var arr = story_tasks[task.parent_id];
        if(!arr){ arr = story_tasks[task.parent_id] = []; }
        arr.push(task);
    });
    stories.forEach(story=>{
        var tasks = story_tasks[story.id];
        if(!tasks){ tasks = []; }
        story["tasks"] = tasks;
        tasks.forEach(task=>{ task.parent = story; });
    });
}

function fetch_stories(settings, project_id, sprint_id, callback){
    let stories_url = build_stories_url(settings.api_key, settings.root_url, project_id, sprint_id);
    let tasks_url = build_tasks_url(settings.api_key, settings.root_url, project_id, sprint_id);
    axios.all([
        axios.get(stories_url),
        axios.get(tasks_url)])
        .then(axios.spread((res_stories, res_tasks) => {
            console.log("stories");
            console.log(res_stories);
            console.log("tasks");
            console.log(res_tasks);
            let stories = res_stories.data.issues.map(x => issue_json_to_task_or_story(settings.root_url, x));
            let tasks = res_tasks.data.issues.map(x => issue_json_to_task_or_story(settings.root_url, x));
            group_tasks_by_story(stories, tasks);
            callback(stories);
        }));
}

function version_json_to_sprint(sprint){
    let self = {
        id: sprint.id,
        title: sprint.name,
        start: new Date(sprint.created_on),
        end: new Date(sprint.due_date),
        stories: [],
        remaining_hours: ()=> sum(self.stories.map((x) => x.remaining_hours()))
    };
    return self;
}

function fetch_sprints(settings, project_id, callback){
    let url = build_sprints_url(settings.api_key, settings.root_url, project_id);
    axios.get(url).then(response => {
        console.log("versions");
        console.log(response);
        let sprints = response.data.versions
            .filter(sprint => sprint.status == "open")
            .map(version_json_to_sprint);
        callback(sprints);
    });
}

function fetch_project(settings, project_id, callback){
    let url = build_project_url(settings.api_key, settings.root_url, project_id);
    axios.get(url).then(response => {
        console.log("project");
        console.log(response);
        callback(response.data.project.name);
    });
}

function build_project_summary(root_url, project_id){
    return {
        id: project_id,
        title: "",
        url: build_backlog_page_url(root_url, project_id),
        sprints: []
    };
}

function build_projects(root_url, project_ids){
    return project_ids.split(',').map(id => build_project_summary(root_url, id));
}
