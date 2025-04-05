import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, fetchTests } from "./DataSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { courses, tests, status, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchCourses()); // Fetch courses
    dispatch(fetchTests()); // Fetch tests
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Courses & Tests</h1>

      <h2>Courses</h2>
      {courses.length === 0 ? <p>No courses found.</p> : (
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>Price: ${course.price}</p>
            </li>
          ))}
        </ul>
      )}

      <h2>Tests</h2>
      {tests.length === 0 ? <p>No tests found.</p> : (
        <ul>
          {tests.map((test) => (
            <li key={test._id}>
              <h3>{test.title}</h3>
              <p>{test.description}</p>
              <p>Passing Score: {test.passingScore}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HomePage;
