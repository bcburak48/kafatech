import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import {useNavigate, useParams} from 'react-router-dom';
import {StudentGrade} from "../models/StudentGrade";
import {fetchGradeDetail} from "../services/gradeService";

const GradeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [grade, setGrade] = useState<StudentGrade | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(id) {
            const loadGradeDetail = async () => {
                const detail = await fetchGradeDetail(id);
                setGrade(detail);
            };
            loadGradeDetail();
        }
    }, [id]);

    if (!grade) return <div>Loading...</div>;

    return (
        <div>
            <h2>Grade Details</h2>
            <p>Student Name: {grade.studentName}</p>
            <p>Grade: {grade.grade}</p>
            <Button variant="secondary" onClick={() => navigate(-1)}>Geri</Button>
        </div>
    );
};

export default GradeDetail;
