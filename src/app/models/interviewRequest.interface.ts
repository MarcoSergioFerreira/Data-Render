export interface InterviewRequest {
    image: string,
    candidate: string,
    role: string,
    salary: number,
    last_comms: LastComms,
    sent_by: string,
    status: string,
    archived: boolean
}

export interface LastComms {
    unread: boolean,
    description: string,
    date_time: string
}