package org.kafatech.kafatech.controller;

import lombok.RequiredArgsConstructor;
import org.kafatech.kafatech.service.StudentGradeService;
import org.kafatech.kafatech.entity.StudentGrade;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grades")
@RequiredArgsConstructor
public class StudentGradeController {

    private final StudentGradeService service;

    @GetMapping
    public ResponseEntity<List<StudentGrade>> list() {
        return ResponseEntity.ok(service.listAll());
    }

    @PostMapping
    public ResponseEntity<StudentGrade> add(@RequestBody StudentGrade studentGrade) {
        StudentGrade created = service.save(studentGrade);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentGrade> get(@PathVariable Long id) {
        return ResponseEntity.ok(service.get(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
