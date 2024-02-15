import React, {useState, useEffect} from 'react';
import {Container, Table, Button, Modal, Form} from 'react-bootstrap';
import {fetchGrades, addGrade, deleteGrade} from './services/gradeService';
import {SortKey, StudentGrade} from './models/StudentGrade';
import {BrowserRouter as Router, Route, Routes, useNavigate} from 'react-router-dom';
import GradeDetail from "./components/GradeDetail";

const App: React.FC = () => {
    const [grades, setGrades] = useState<StudentGrade[]>([]);
    const [show, setShow] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [grade, setGrade] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [sortKey, setSortKey] = useState<SortKey | ''>('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadGrades = async () => {
            const grades = await fetchGrades();
            setGrades(grades);
        };
        loadGrades();
    }, []);

    const handleRowClick = (id: number) => {
        navigate(`/grade/${id}`);
    };

    const sortGrades = (key: SortKey) => {
        let direction = sortDirection;
        if (sortKey === key) {
            direction = sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            direction = 'asc';
        }
        setSortDirection(direction);
        setSortKey(key);

        const sortedGrades = [...grades].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setGrades(sortedGrades);
    };

    const getSortIcon = (key: SortKey) => {
        if (sortKey !== key) {
            return null;
        }
        return sortDirection === 'asc' ? '↑' : '↓';
    };
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newGrade = await addGrade({id: 0, studentName, grade: parseFloat(grade)});
        setGrades([...grades, newGrade]);
        handleClose();
    };

    const handleDelete = async (id: number) => {
        await deleteGrade(id);
        setGrades(grades.filter((grade) => grade.id !== id));
    };

    return (
        <div>
            <Container className="py-5">
                <Routes>
                    <Route path="/" element={
                        <>
                            <Button variant="primary" onClick={handleShow}>
                                Add Grade
                            </Button>

                            <Table striped bordered hover className="mt-3">
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th onClick={() => sortGrades('studentName')}>Student
                                        Name {getSortIcon('studentName')}</th>
                                    <th onClick={() => sortGrades('grade')}>Grade {getSortIcon('grade')}</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {grades.map((grade, index) => (
                                    <tr key={grade.id} onClick={() => handleRowClick(grade.id)}>
                                        <td>{index + 1}</td>
                                        <td>{grade.studentName}</td>
                                        <td>{grade.grade}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleDelete(grade.id)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>

                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Add a New Grade</Modal.Title>
                                </Modal.Header>
                                <Form onSubmit={handleSubmit}>
                                    <Modal.Body>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Student Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter student name"
                                                value={studentName}
                                                onChange={(e) => setStudentName(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Grade</Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter grade"
                                                value={grade}
                                                onChange={(e) => setGrade(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" type="submit">
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                        </>
                    }/>
                    <Route path="/grade/:id" element={<GradeDetail/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
