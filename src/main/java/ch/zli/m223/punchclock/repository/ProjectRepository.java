package ch.zli.m223.punchclock.repository;

import ch.zli.m223.punchclock.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
