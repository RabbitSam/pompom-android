declare global {
    interface TimeState {
        hour: number,
        minute: number,
        second?: number
    }

    interface TimerState {
        pomCount: number,
        pomTime: TimeState,
        breakTime: TimeState,
        longBreakTime: TimeState,
    }

    interface Task {
        id: string,
        title: string,
        timer: TimerState,
        completedAt?: Date | string
    }

    interface Project {
        id: string
        title: string,
        createdAt: Date | string,
        lastModified: Date | string,
        lastAccessed: Date | string,
        tasks: {
            completed: string[],
            current: string[]
        }
    }

    interface Projects {
        [key: string]: Project
    }

    interface Tasks {
        [key: string]: Task
    }

    interface EventResponse {
        success: boolean,
        data: any
    }
}

export {};
