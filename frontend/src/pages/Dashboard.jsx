import { useEffect, useState } from "react";
import client from "../api/client";

function Dashboard() {

  // PROJECTS
  const [projects, setProjects] =
    useState([]);

  const [projectName, setProjectName] =
    useState("");


  // MEMBERS
  const [members, setMembers] =
    useState([]);

  const [memberName, setMemberName] =
    useState("");


  // TASKS
  const [tasks, setTasks] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [assignedTo, setAssignedTo] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");


  // DARK MODE
  const [darkMode, setDarkMode] =
    useState(false);


  // LOGOUT
  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/";
  };


  // LOAD TASKS
  const loadTasks = async () => {

    try {

      const res =
        await client.get("/tasks");

      setTasks(res.data);

    } catch (error) {

      console.log(error);

    }
  };


  useEffect(() => {

    loadTasks();

  }, []);


  // ADD PROJECT
  const addProject = () => {

    if (!projectName) {
      alert("Enter project name");
      return;
    }

    const newProject = {
      id: Date.now(),
      name: projectName
    };

    setProjects([
      ...projects,
      newProject
    ]);

    setProjectName("");
  };


  // ADD MEMBER
  const addMember = () => {

    if (!memberName) {
      alert("Enter member name");
      return;
    }

    const newMember = {
      id: Date.now(),
      name: memberName,
      role: "MEMBER"
    };

    setMembers([
      ...members,
      newMember
    ]);

    setMemberName("");
  };


  // ADD TASK
  const addTask = async () => {

    if (
      !title ||
      !description ||
      !assignedTo ||
      !dueDate
    ) {

      alert("Fill all fields");

      return;
    }

    try {

      await client.post(
        "/tasks",
        {
          title,
          description,
          assignedToId:
            Number(assignedTo),
          dueDate
        }
      );

      setTitle("");
      setDescription("");
      setAssignedTo("");
      setDueDate("");

      loadTasks();

    } catch (error) {

      console.log(error);

    }
  };


  // COMPLETE TASK
  const completeTask =
    async (id) => {

      await client.put(
        `/tasks/${id}`
      );

      loadTasks();
    };


  // DELETE TASK
  const deleteTask =
    async (id) => {

      await client.delete(
        `/tasks/${id}`
      );

      loadTasks();
    };


  // STATS
  const completed =
    tasks.filter(
      (task) =>
        task.status === "DONE"
    ).length;

  const pending =
    tasks.filter(
      (task) =>
        task.status === "PENDING"
    ).length;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
          (completed / tasks.length) * 100
        );


  return (

    <div className={
      darkMode
        ? "min-h-screen bg-black text-white"
        : "min-h-screen bg-gray-100"
    }>


      {/* NAVBAR */}

      <div className="bg-gradient-to-r from-pink-500 to-purple-500 p-5 text-white flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Team Task Manager
        </h1>


        <div className="flex gap-4 items-center">

          <span className="font-bold">
            ADMIN
          </span>

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="bg-white text-purple-600 px-5 py-2 rounded-full font-bold"
          >
            {
              darkMode
                ? "Light"
                : "Dark"
            }
          </button>


          <button
            onClick={logout}
            className="bg-white text-purple-600 px-5 py-2 rounded-full font-bold"
          >
            Logout
          </button>

        </div>

      </div>


      <div className="p-5 md:p-10">


        {/* STATS */}

        <div className="grid md:grid-cols-5 gap-6 mb-10">


          <div className="bg-white text-black p-6 rounded-3xl shadow-xl">

            <h2 className="text-2xl font-bold">
              Projects
            </h2>

            <p className="text-5xl text-blue-500 mt-4 font-bold">
              {projects.length}
            </p>

          </div>


          <div className="bg-white text-black p-6 rounded-3xl shadow-xl">

            <h2 className="text-2xl font-bold">
              Tasks
            </h2>

            <p className="text-5xl text-purple-500 mt-4 font-bold">
              {tasks.length}
            </p>

          </div>


          <div className="bg-white text-black p-6 rounded-3xl shadow-xl">

            <h2 className="text-2xl font-bold">
              Members
            </h2>

            <p className="text-5xl text-pink-500 mt-4 font-bold">
              {members.length}
            </p>

          </div>


          <div className="bg-white text-black p-6 rounded-3xl shadow-xl">

            <h2 className="text-2xl font-bold">
              Completed
            </h2>

            <p className="text-5xl text-green-500 mt-4 font-bold">
              {completed}
            </p>

          </div>


          <div className="bg-white text-black p-6 rounded-3xl shadow-xl">

            <h2 className="text-2xl font-bold">
              Pending
            </h2>

            <p className="text-5xl text-red-500 mt-4 font-bold">
              {pending}
            </p>

          </div>

        </div>


        {/* PROGRESS */}

        <div className="bg-white text-black p-8 rounded-3xl shadow-xl mb-10">

          <h2 className="text-3xl font-bold mb-4">
            Progress Tracking
          </h2>

          <div className="w-full bg-gray-200 rounded-full h-6">

            <div
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-6 rounded-full"
              style={{
                width: `${progress}%`
              }}
            ></div>

          </div>

          <p className="mt-4 text-xl font-bold">
            {progress}% Completed
          </p>

        </div>


        {/* PROJECT */}

        <div className="bg-white text-black p-8 rounded-3xl shadow-xl mb-10">

          <h2 className="text-3xl font-bold mb-6">
            Create Project
          </h2>

          <input
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) =>
              setProjectName(e.target.value)
            }
            className="w-full p-3 mb-4 rounded-lg bg-gray-100 outline-none"
          />

          <button
            onClick={addProject}
            className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold"
          >
            Add Project
          </button>

        </div>


        {/* MEMBER */}

        <div className="bg-white text-black p-8 rounded-3xl shadow-xl mb-10">

          <h2 className="text-3xl font-bold mb-6">
            Add Team Member
          </h2>

          <input
            type="text"
            placeholder="Member Name"
            value={memberName}
            onChange={(e) =>
              setMemberName(e.target.value)
            }
            className="w-full p-3 mb-4 rounded-lg bg-gray-100 outline-none"
          />

          <button
            onClick={addMember}
            className="bg-green-500 text-white px-6 py-3 rounded-full font-bold"
          >
            Add Member
          </button>

        </div>


        {/* TASK */}

        <div className="bg-white text-black p-8 rounded-3xl shadow-xl mb-10">

          <h2 className="text-3xl font-bold mb-6">
            Assign Task
          </h2>

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full p-3 mb-4 rounded-lg bg-gray-100 outline-none"
          />

          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            className="w-full p-3 mb-4 rounded-lg bg-gray-100 outline-none"
          />

          <input
            type="number"
            placeholder="Assign To User ID"
            value={assignedTo}
            onChange={(e) =>
              setAssignedTo(e.target.value)
            }
            className="w-full p-3 mb-4 rounded-lg bg-gray-100 outline-none"
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="w-full p-3 mb-4 rounded-lg bg-gray-100 outline-none"
          />

          <button
            onClick={addTask}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-full font-bold"
          >
            Add Task
          </button>

        </div>


        {/* TASK LIST */}

        <div className="bg-white text-black p-8 rounded-3xl shadow-xl">

          <h2 className="text-3xl font-bold mb-6">
            Team Tasks
          </h2>


          {
            tasks.length === 0 ? (

              <p>
                No tasks available
              </p>

            ) : (

              tasks.map((task) => (

                <div
                  key={task.id}
                  className="border-b py-4 flex flex-col md:flex-row justify-between md:items-center gap-4"
                >

                  <div>

                    <h3 className="text-2xl font-bold">
                      {task.title}
                    </h3>

                    <p className="text-gray-500">
                      {task.description}
                    </p>

                    <p className="text-blue-500 font-bold">
                      Assigned To:
                      {task.assignedToId}
                    </p>

                    <p className="text-red-500">
                      Due:
                      {
                        new Date(
                          task.dueDate
                        ).toLocaleDateString()
                      }
                    </p>

                  </div>


                  <div className="flex gap-4 items-center">

                    <span
                      className={
                        task.status === "DONE"
                          ? "text-green-500 font-bold"
                          : "text-red-500 font-bold"
                      }
                    >
                      {task.status}
                    </span>


                    {
                      task.status === "PENDING" && (

                        <button
                          onClick={() =>
                            completeTask(task.id)
                          }
                          className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        >
                          Complete
                        </button>

                      )
                    }


                    <button
                      onClick={() =>
                        deleteTask(task.id)
                      }
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))
            )
          }

        </div>

      </div>

    </div>
  );
}

export default Dashboard;