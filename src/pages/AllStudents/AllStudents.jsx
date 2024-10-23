import {
  Badge,
  Button,
  Card,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableBody,
  MultiSelectBox,
  MultiSelectBoxItem,
  TextInput,
} from "@tremor/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import studentData from "../../data/allStudents.json";

const AllStudents = () => {
  const [students, setStudents] = useState(studentData); // State to manage students
  const [selectedNames, setSelectedNames] = useState([]);
  const [editStudentId, setEditStudentId] = useState(null); // To track which student is being edited
  const [editFormData, setEditFormData] = useState({}); // Form data for the student being edited

  const isStudentSelected = (student) =>
    selectedNames.includes(student.studentId) || selectedNames.length === 0;

  // Handle Delete Student
  const handleDelete = (studentId) => {
    const updatedStudents = students.filter(
      (student) => student.studentId !== studentId
    );
    setStudents(updatedStudents);
  };

  // Handle Edit Mode Toggle
  const handleEdit = (student) => {
    setEditStudentId(student.studentId);
    setEditFormData(student); // Pre-fill the form with existing data
  };

  // Handle Edit Form Changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Save Edited Student
  const handleSaveEdit = () => {
    const updatedStudents = students.map((student) =>
      student.studentId === editStudentId ? editFormData : student
    );
    setStudents(updatedStudents);
    setEditStudentId(null); // Exit edit mode
  };

  return (
    <div className="h-full w-full bg-gray-50 px-3 py-5 xl:px-20 xl:py-12">
      <header className="ie-as-header flex w-full justify-between">
        <h3 className="text-xl font-semibold text-gray-900">All Students</h3>
        <div className="flex gap-4">
          <button className="hidden h-9 rounded border border-gray-300 bg-white px-8 text-base font-medium text-gray-700 sm:block">
            Export
          </button>
        </div>
      </header>
      <div className="ie-as-content mt-5">
        <Card shadow={false}>
          <MultiSelectBox
            onValueChange={(value) => setSelectedNames(value)}
            placeholder="Select by ID..."
            maxWidth="max-w-xs"
          >
            {students.map((item) => (
              <MultiSelectBoxItem
                key={item.studentId}
                value={item.studentId}
                text={
                  item.studentId +
                  " : " +
                  item.studentFirstName +
                  " " +
                  item.studentMiddleLastName
                }
              />
            ))}
          </MultiSelectBox>
          <Table marginTop="mt-6">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Student ID</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Class / Section</TableHeaderCell>
                <TableHeaderCell>Date of Admission</TableHeaderCell>
                <TableHeaderCell>Guardian's Name</TableHeaderCell>
                <TableHeaderCell>Guardian's Phone</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {students
                .filter((item) => isStudentSelected(item))
                .map((item) => (
                  <TableRow key={item.studentId}>
                    <TableCell>
                      <Badge text={item.studentId} size="xs" color="sky" />
                    </TableCell>
                    {/* If the current row is in edit mode, render editable fields */}
                    {editStudentId === item.studentId ? (
                      <>
                        <TableCell>
                          <TextInput
                            value={editFormData.studentFirstName}
                            name="studentFirstName"
                            onChange={handleFormChange}
                          />
                        </TableCell>
                        <TableCell>
                          <TextInput
                            value={editFormData.classEnrolled}
                            name="classEnrolled"
                            onChange={handleFormChange}
                          />
                        </TableCell>
                        <TableCell>
                          <TextInput
                            value={editFormData.dateOfAdmission}
                            name="dateOfAdmission"
                            onChange={handleFormChange}
                          />
                        </TableCell>
                        <TableCell>
                          <TextInput
                            value={editFormData.guardianFullName}
                            name="guardianFullName"
                            onChange={handleFormChange}
                          />
                        </TableCell>
                        <TableCell>
                          <TextInput
                            value={editFormData.guardianPhone}
                            name="guardianPhone"
                            onChange={handleFormChange}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            text="Save"
                            color="green"
                            size="xs"
                            onClick={handleSaveEdit}
                          />
                          <Button
                            text="Cancel"
                            color="red"
                            size="xs"
                            onClick={() => setEditStudentId(null)}
                          />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>
                          {item.studentFirstName +
                            " " +
                            item.studentMiddleLastName}
                        </TableCell>
                        <TableCell>
                          {item.classEnrolled + " / " + item.sectionAssigned}
                        </TableCell>
                        <TableCell>{item.dateOfAdmission}</TableCell>
                        <TableCell>{item.guardianFullName}</TableCell>
                        <TableCell>{item.guardianPhone}</TableCell>
                        <TableCell>
                          <button
                            className="bg-white text-red-500 border border-red-500 py-[3px] px-3 rounded-full text-xs"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </button>
                          <button
                            className="bg-white text-red-500 border border-red-500 py-[3px] px-3 rounded-full text-xs ml-2"
                            onClick={() => handleDelete(item.studentId)}
                          >
                            Delete
                          </button>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default AllStudents;
