export enum KpiActions {
    LOADING_KPI_CREATION_OR_FETCHING = "LOADING_KPI_CREATION_OR_FETCHING", 
    KPI_CREATED = "KPI_CREATED",
    KPI_FETCHED = "KPI_FETCHED",
    KPIS_FETCHED = "KPIS_FETCHED",
    KPI_UPDATED = "KPI_UPDATED",
    KPI_ERROR =  "KPI_ERROR",
}


export enum PymeActions {
    LOADING_PYME_CREATION_OR_FETCHING = "LOADING_PYME_CREATION_OR_FETCHING",
    PYME_CREATED = "PYME_CREATED",
    PYME_FETCHED = "PYME_FETCHED",
    PYMES_FETCHED = "PYMES_FETCHED",
    PYME_UPDATED = "PYME_UPDATED",
    PYME_ERROR = "PYME_ERROR",
}

export enum UserActions {
    LOADING_USER_CREATION_OR_FETCHING = "LOADING_USER_CREATION_OR_FETCHING", 
    USER_CREATED = "USER_CREATED",
    USER_FETCHED = "USER_FETCHED",
    USER_UPDATED = "USER_UPDATED",
    USER_ERROR =  "USER_ERROR",
}

export enum NavBarActions {
    OPEN = "OPEN", 
    COLLAPSE = "COLLAPSE",
}

export enum FileUploadActions {
    UPLOAD = "UPLOAD", 
    UPLOADING = "UPLOADING",
}
