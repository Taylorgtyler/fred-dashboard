export type GDPData = {
    DATE: string;
    GDPC1: number;
}

export type URData = {
    DATE: string;
    UNRATE: number;
}

export type GDPPCData = {
    DATE: string;
    A939RX0Q048SBEA: number;
}

export type LFPRData = {
    DATE: string;
    CIVPART: number;
}

export type FFERData = {
    DATE: string;
    DFF: number;
}

export type RMPIData = {
    DATE: string;
    MEPAINUSA672N: number;
}

export interface DataItem {
    [key: string]: string | number;
}

export interface FilterState {
    startDate: string;
    endDate: string;
    setDateRange: (startDate: string, endDate: string) => void;
    resetFilters: () => void;
}