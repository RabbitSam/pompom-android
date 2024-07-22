import {writeAsStringAsync, documentDirectory, readAsStringAsync, moveAsync} from "expo-file-system";
import { randomUUID } from "expo-crypto";
import { PROJECT_FILENAME } from "./projectEvents";


export const TASK_FILENAME = `${documentDirectory}tasks.json`;
const TEMP_TASK_FILENAME = `${documentDirectory}tasks-temp.json`

export async function createTask(projectId: string, newTask: Omit<Task, "id">  ) : Promise<EventResponse> {
    if (!newTask.title) {
        return new Promise<EventResponse>((resolve, reject) => {
            throw new Error("Title not provided");
        });
    }

    return readAsStringAsync(TASK_FILENAME, {encoding: "utf8"})
        .then(data => JSON.parse(data) as Tasks)
        .catch(err => ({} as Tasks))
        .then(async tasks => {
            try {
                const projects = await readAsStringAsync(PROJECT_FILENAME, { encoding: "utf8" })
                    .then(data => JSON.parse(data) as Projects);

                if (!(projectId in projects)) {
                    throw new Error("Project does not exist.");
                }

                const taskId = randomUUID();
                tasks[taskId] = {
                    ...newTask,
                    id: taskId
                };

                projects[projectId].tasks.current.push(taskId);

                try {
                    await writeAsStringAsync(TEMP_TASK_FILENAME, JSON.stringify(tasks), { encoding: "utf8" });

                    await writeAsStringAsync(PROJECT_FILENAME, JSON.stringify(projects), { encoding: "utf8" });

                    return moveAsync({from: TEMP_TASK_FILENAME, to: TASK_FILENAME})
                        .then(() => {
                            const res : EventResponse = {
                                success: true,
                                data: taskId
                            };

                            return res;
                        });

                } catch (e) {
                    throw new Error("Couldn't write task.");
                }
            } catch (e) {
                throw new Error("Couldn't open project");
            }
        });
}


export async function editTask(taskId: string, task: Task) : Promise<EventResponse> {
    if (!task.title) {
        return new Promise<EventResponse>((resolve, reject) => {
            throw new Error("Title not provided");
        });
    }

    return readAsStringAsync(TASK_FILENAME, {encoding: "utf8"})
        .then(data => JSON.parse(data) as Tasks)
        .then(async tasks => {
            if (!(taskId in tasks)) {
                throw new Error("Task does not exist.");
            }

            try {
                tasks[taskId] = {
                    ...task,
                };

                try {
                    return writeAsStringAsync(TASK_FILENAME, JSON.stringify(tasks), { encoding: "utf8" })
                        .then(() => {
                            const res : EventResponse = {
                                success: true,
                                data: taskId
                            };

                            return res;
                        });

                } catch (e) {
                    throw new Error("Couldn't write task.");
                }
            } catch (e) {
                throw new Error("Couldn't open project");
            }
        });
}


export async function deleteTask(projectId: string, taskId: string) : Promise<EventResponse> {
    return readAsStringAsync(TASK_FILENAME, {encoding: "utf8"})
        .then(data => JSON.parse(data) as Tasks)
        .then(async tasks => {
            if (!(taskId in tasks)) {
                throw new Error("Task does not exist.");
            }

            try {
                const projects = await readAsStringAsync(PROJECT_FILENAME, { encoding: "utf8" })
                    .then(data => JSON.parse(data) as Projects);

                delete tasks[taskId];

                projects[projectId].tasks.current = projects[projectId].tasks.current.filter(id => id !== taskId);
                projects[projectId].tasks.completed = projects[projectId].tasks.completed.filter(id => id !== taskId);

                try {
                    await writeAsStringAsync(TEMP_TASK_FILENAME, JSON.stringify(tasks), { encoding: "utf8" });

                    await writeAsStringAsync(PROJECT_FILENAME, JSON.stringify(projects), { encoding: "utf8" });

                    return moveAsync({from: TEMP_TASK_FILENAME, to: TASK_FILENAME})
                        .then(() => {
                            const res : EventResponse = {
                                success: true,
                                data: taskId
                            };

                            return res;
                        });

                } catch (e) {
                    throw new Error("Couldn't delete task.");
                }
            } catch (e) {
                throw new Error("Couldn't open project");
            }
        });
}


export async function getTask(taskId: string) : Promise<EventResponse> {
    
    return readAsStringAsync(TASK_FILENAME, {encoding: "utf8"})
        .then(data => JSON.parse(data) as Tasks)
        .then(tasks => {
            if (!(taskId in tasks)) {
                throw new Error("Task does not exist.");
            }

            const res : EventResponse = {
                success: true,
                data: tasks[taskId]
            };

            return res;
        });
}


export async function getTasks(projectId: string) : Promise<EventResponse> {
    return readAsStringAsync(PROJECT_FILENAME, { encoding: "utf8" })
        .then(data => JSON.parse(data) as Projects)
        .then(async projects => {
            if (projectId in projects) {
                try {
                    const tasks = await readAsStringAsync(TASK_FILENAME, { encoding: "utf8" })
                                    .then(data => JSON.parse(data) as Tasks)
                                    .catch(err => ({} as Tasks));
                    
                    const taskIndexesToDelete : {
                        completed: number[],
                        current: number[]
                    } = {
                        completed: [],
                        current: []
                    };

                    const filter = (key: "completed" | "current") => (taskId : string, indx : number) => {
                        if (taskId in tasks) {
                            return true;
                        } else {
                            taskIndexesToDelete[key].push(indx);
                            return false;
                        }
                    };

                    const finalTasks : {
                        completed: Task[],
                        current: Task[]
                    } = {
                        completed: projects[projectId].tasks.completed.filter(filter("completed")).map(taskId => tasks[taskId]),
                        current: projects[projectId].tasks.current.filter(filter("current")).map(taskId => tasks[taskId])
                    };

                    //Side Effect
                    projects[projectId].tasks.completed = projects[projectId].tasks.completed.filter(taskId => !(taskId in taskIndexesToDelete.completed));
                    projects[projectId].tasks.current = projects[projectId].tasks.completed.filter(taskId => !(taskId in taskIndexesToDelete.current));

                    writeAsStringAsync(PROJECT_FILENAME, JSON.stringify(projects), { encoding: "utf8"})
                        .catch(e => console.log("Couldn't delete taskIds."));

                    const res : EventResponse = {
                        success: true,
                        data: finalTasks
                    };

                    return res;

                } catch (e) {
                    throw new Error("Couldn't open tasks file.");
                }

            } else {
                throw new Error("Project does not exist.");
            }
        });
}