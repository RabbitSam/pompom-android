import {writeAsStringAsync, documentDirectory, readAsStringAsync} from "expo-file-system";
import { randomUUID } from "expo-crypto";


export const PROJECT_FILENAME = `${documentDirectory}projects.json`;


export async function createProject(title: string) : Promise<EventResponse> {
    if (!title.length) {
        return new Promise<EventResponse>((resolve, reject) => {
            throw new Error("Title not provided");
        });
    }

    return readAsStringAsync(PROJECT_FILENAME, { encoding: "utf8" })
        .then(output => JSON.parse(output) as Projects)
        .catch(_ => ({} as Projects))
        .then(async projects => {
            const projectId : string = randomUUID();
            const newProject : Project = {
                id: projectId,
                title,
                createdAt: new Date(),
                lastModified: new Date(),
                lastAccessed: new Date(),
                tasks: {
                    completed: [],
                    current: []
                }
            };

            projects[projectId] = newProject;

            try {
                await writeAsStringAsync(PROJECT_FILENAME, JSON.stringify(projects), { encoding: "utf8" });
                const response : EventResponse = {
                    success: true,
                    data: projectId
                };

                return response;

            } catch (e) {
                throw e;
            }
        });
}


export async function getProjects() : Promise<EventResponse> {
    return readAsStringAsync(PROJECT_FILENAME, { encoding: "utf8" })
        .then(output => JSON.parse(output) as Projects)
        .catch(_ => ({} as Projects))
        .then(projects => ({
            success: true,
            data: projects
        }));
}


export async function getProject(projectId: string) : Promise<EventResponse> {
    return readAsStringAsync(PROJECT_FILENAME, { encoding: "utf8" })
        .then(output => JSON.parse(output) as Projects)
        .then(projects => {
            if (projectId in projects) {
                const response : EventResponse = {
                    success: true,
                    data: projects[projectId]
                };

                return response;
            } else {
                throw new Error("Project not found.");
            }
        });
}


export async function editProject(projectId: string, title: string) : Promise<EventResponse> {
    if (!title.length) {
        return new Promise<EventResponse>((resolve, reject) => {
            throw new Error("Title not provided");
        });
    }

    return readAsStringAsync(PROJECT_FILENAME, { encoding: "utf8" })
        .then(output => JSON.parse(output) as Projects)
        .then(async projects => {
            if (projectId in projects) {

                projects[projectId].title = title;
                projects[projectId].lastModified = new Date();

                try {
                    await writeAsStringAsync(PROJECT_FILENAME, JSON.stringify(projects), { encoding: "utf8" });
                    const response : EventResponse = {
                        success: true,
                        data: projectId
                    };

                    return response;

                } catch (e) {
                    throw e;
                }
            } else {
                throw new Error("Project not found.");
            }
        });
}


