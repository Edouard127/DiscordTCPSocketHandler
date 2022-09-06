export enum Packets {
    EXIT = 0x00,
    OK = 0x01,
    HEARTBEAT = 0x02,
    LOGIN = 0x03,
    LOGOUT = 0x04,
    ADD_WORKER = 0x05,
    REMOVE_WORKER = 0x06,
    INFORMATION = 0x07,
    JOB = 0x08,
    CHAT = 0x09,
    BARITONE = 0x0A,
    LAMBDA = 0x0B,
    ERROR = 0x0C,
    LISTENER_ADD = 0x0D,
    LISTENER_REMOVE = 0x0E,
    HIGHWAY_TOOLS = 0x0F,
    SCREENSHOT = 0x10,
    GET_JOBS = 0x11,
    ROTATE = 0x12,
}