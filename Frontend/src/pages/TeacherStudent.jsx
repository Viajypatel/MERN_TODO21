import React,{useState} from 'react'
import RoleSelector from "../component/RoleSelector"
import TeacherDashboard from "./TeacherDashboard";
import StudentDashboard from "./StudentDashboard";

const TeacherStudent = () => {
  const [role, setRole] = useState(null);

  if (!role) return <RoleSelector setRole={setRole} />;
  if (role === "teacher") return <TeacherDashboard />;
  if (role === "student") return <StudentDashboard />;
  return (
    <div>
      
    </div>
  )
}

export default TeacherStudent
