import { useEffect, useState } from "react";
import { getCourses } from "../../api/course.api";
import Deletecourse from "./delete-courses";
import EditCourse from "./edit-courses";

interface Course {
  id: number;
  name: string;
  code: string;
  courseunit: number;

  department: {
    name: string;
  };

  level: {
    name: string;
  };

  lecturers: {
    lecturer: {
      user: {
        firstname: string;
        lastname: string;
      };
    };
  }[];
}
interface DisplayCourseProps {
  refresh: boolean;
}

function DisplayCourse({ refresh }: DisplayCourseProps) {
  const [courses, setCourses] = useState<Course[]>([]);

  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const removecourse = (id: number) => {
    setCourses((prev) => prev.filter((course) => course.id !== id));
  };

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const response = await getCourses();

      console.log(JSON.stringify(response.data, null, 2));

      setCourses(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      fetchCourses();
    }, 2000);
    return () => clearTimeout(timer);
  }, [refresh]);

  return (
    <>
      <div className="school-admin-container">
        <div className="school-admin-table">
          {loading ? (
            <div className="skeleton-loader">
              {Array.from({ length: 6 }).map((item, index) => (
                <div key={index} className="skeleton-line" />
              ))}
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>S/N</th>

                  <th>Course Code</th>

                  <th>Course Title</th>

                  <th>Units</th>

                  <th>Department</th>

                  <th>Level</th>

                  <th>Lecturers</th>

                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course) => (
                  <tr key={course.id}>
                    <td>{course.id}</td>

                    <td>{course.code}</td>

                    <td>{course.name}</td>

                    <td>{course.courseunit}</td>

                    <td>{course.department.name}</td>

                    <td>{course.level.name}</td>

                    <td>
                      {course.lecturers
                        .map(
                          (item) =>
                            `${item.lecturer.user.firstname} ${item.lecturer.user.lastname}`,
                        )
                        .join(", ")}
                    </td>

                    <td onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => {
                          setSelectedCourse(course);
                          setEditOpen(true);
                        }}
                      >
                        Edit
                      </button>

                      <Deletecourse
                        id={course.id}
                        fetchcourse={fetchCourses}
                        removecourse={removecourse}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <EditCourse
        open={editOpen}
        closeModal={() => {
          setEditOpen(false);
          setSelectedCourse(null);
        }}
        course={selectedCourse}
        onSuccess={() => {
          fetchCourses();
        }}
      />
    </>
  );
}
export default DisplayCourse;
