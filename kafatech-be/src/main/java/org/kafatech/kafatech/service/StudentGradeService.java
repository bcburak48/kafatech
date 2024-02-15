package org.kafatech.kafatech.service;

import lombok.RequiredArgsConstructor;
import org.kafatech.kafatech.entity.StudentGrade;
import org.kafatech.kafatech.repository.StudentGradeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentGradeService {

    private final StudentGradeRepository repository;

    public List<StudentGrade> listAll() {
        return repository.findAll();
    }

    public StudentGrade save(StudentGrade studentGrade) {
        return repository.save(studentGrade);
    }

    public StudentGrade get(Long id) {
        return repository.findById(id).orElseThrow(() -> new RuntimeException("Grade not found."));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
