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
}

export {};
