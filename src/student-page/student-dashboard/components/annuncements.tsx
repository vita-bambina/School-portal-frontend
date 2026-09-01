import { getcoursematerial } from "../../../api/student.api";
import { useEffect, useState } from "react";
function Announcements() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        setLoading(true);

        const response = await getcoursematerial();

        console.log("STUDENT MATERIALS:", response.data);

        setMaterials(response.data);
      } catch (error) {
        console.log("FAILED TO FETCH MATERIALS:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);
  return (
    <>
      <div className="student-announcement-background">
        {/* RECENT MATERIALS */}
        <div className="student-background">
          <div className="student-body">
            <div className="student-header">
              <p>Recent materials</p>
              <p>View All</p>
            </div>

            {loading ? (
              <p>Loading materials...</p>
            ) : materials.length === 0 ? (
              <p>No course materials yet.</p>
            ) : (
              materials.slice(0, 3).map((item) => (
                <div className="content-one" key={item.id}>
                  <div className="student-avatar-styling">
                    <p>{item.title.slice(0, 2).toUpperCase()}</p>
                  </div>

                  <div className="student-names">
                    <p>{item.title}</p>

                    <p className="student-unit">
                      {item.lecturerCourse.course.code} ·{" "}
                      {item.lecturerCourse.course.name}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ANNOUNCEMENTS */}
        <div className="announcement-background">
          <div className="announcement-body">
            <div className="anouncement-header">
              <p>Announcements</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Announcements;
