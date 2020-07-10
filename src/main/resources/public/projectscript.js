const URL = 'http://localhost:8081';
let projects = [];
let mode = 'create';
let currentProject;

const dateAndTimeToDate = (dateString, timeString) => {
    return new Date(`${dateString}T${timeString}`).toISOString();
};

// API Requests
const createProject = (project) => {
    fetch(`${URL}/projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    }).then((result) => {
        result.json().then((project) => {
            projects.push(project);
            renderProjects();
        });
    });
};

const indexProjects = () => {
    fetch(`${URL}/projects`, {
        method: 'GET'
    }).then((result) => {
        result.json().then((result) => {
            projects = result;
            renderProjects();
        });
    });
    renderProjects();
};

const deleteProject = (id) => {
    fetch(`${URL}/projects/${id}`, {
        method: 'DELETE'
    }).then((result) => {
        indexProjects();
    });
};

const updateProject = (project) => {
    fetch(`${URL}/projects/${project.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(project)
    }).then((result) => {
        result.json().then((project) => {
            projects = projects.map((e) => e.id === project.id ? project : e);
            renderProjects();
        });
    });
}

// Rendering
const resetForm = () => {
    const projectForm = document.querySelector('#projectForm');
    projectForm.reset();
    mode = 'create';
    currentProject = null;
}

const saveForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const project = {};
    project['name'] = formData.get('nameP');
    project['description'] = formData.get('descP');

    if (mode === 'create') {
        createProject(project);
    } else {
        project.id = currentProject.id;
        updateProject(project);
    }
    resetForm();
}

const editProject = (project) => {
    mode = 'edit';
    currentProject = project;

    const projectForm = document.querySelector('#projectForm');
    const nameField = projectForm.querySelector('[name="nameP"]');
    nameField.value = project.name;
    const descField = projectForm.querySelector('[name="descP"]');
    descField.value = project.desc;
}

const createCell = (text) => {
    const cell = document.createElement('td');
    cell.innerText = text;
    return cell;
};

const createActions = (project) => {
    const cell = document.createElement('td');

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => deleteProject(project.id));
    cell.appendChild(deleteButton);

    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => editProject(project));
    cell.appendChild(editButton);

    return cell;
}

const renderProjects = () => {
    const display = document.querySelector('#projectDisplay');
    display.innerHTML = '';
    projects.forEach((project) => {
        const row = document.createElement('tr');
        row.appendChild(createCell(project.id));
        row.appendChild(createCell(project.name));
        row.appendChild(createCell(project.description));
        row.appendChild(createActions(project));
        display.appendChild(row);
    });
};

document.addEventListener('DOMContentLoaded', function(){
    const projectForm = document.querySelector('#projectForm');
    projectForm.addEventListener('submit', saveForm);
    projectForm.addEventListener('reset', resetForm);
    indexProjects();
});
