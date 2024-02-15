import axios from 'axios';
import { StudentGrade } from '../models/StudentGrade';

const API_URL = '/grades';

export const fetchGrades = async (): Promise<StudentGrade[]> => {
    const response = await axios.get<StudentGrade[]>(API_URL);
    return response.data;
};

export const addGrade = async (grade: StudentGrade): Promise<StudentGrade> => {
    const response = await axios.post<StudentGrade>(API_URL, grade);
    return response.data;
};

export const deleteGrade = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};

export const fetchGradeDetail = async (id: string | undefined): Promise<StudentGrade> => {
    const response = await axios.get<StudentGrade>(`${API_URL}/${id}`);
    return response.data;
};
