package ch.zli.m223.punchclock.service;

import ch.zli.m223.punchclock.domain.Project;
import ch.zli.m223.punchclock.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {
    private ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    public Project createProject(Project project) {
        return projectRepository.saveAndFlush(project);
    }

    public List<Project> findAll() {
        return projectRepository.findAll();
    }

    public void deleteProject(long id) { projectRepository.deleteById(id); }

    public Project updateProject(Project project) {
        return projectRepository.save(project);
    }
}
