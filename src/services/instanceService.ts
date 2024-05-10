import type { Draft } from "@/model/draft"
import type { IntentInstance, IntentModel } from "@/model/model"
import type { CreateInstanceRequest, CreateModelRequest, RequestError, UpdateInstanceRequest } from "@/model/request"

const API_URL = import.meta.env.BACKEND_API_URL || 'http://localhost:8080'

export const getInstance = async (instanceId: number): Promise<IntentInstance | RequestError> => {
    const instance = await fetch(`${API_URL}/instance/${instanceId}`)
    .then(async (response) => {
        if (response.ok) {
            return await response.json() as IntentInstance
        }

        return {
            message: response.statusText,
            status: response.status,
            statusText: response.statusText,
            url: response.url
        } as RequestError
    })
    .catch((error) => {
        console.log(error)

        return {
            message: error.message,
            status: 0,
            statusText: 'Unknown error',
            url: ''
        } as RequestError
    })

    return instance
}

export const updateInstance = async (instanceId: number, update: UpdateInstanceRequest): Promise<IntentInstance | RequestError> => {
    const instance = await fetch(`${API_URL}/instance/${instanceId}`, {
        method: 'PUT',
        body: JSON.stringify(update),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(async (response) => {
        if (response.ok) {
            return await response.json() as IntentInstance
        }

        return {
            message: response.statusText,
            status: response.status,
            statusText: response.statusText,
            url: response.url
        } as RequestError
    })
    .catch((error) => {
        console.log(error)

        return {
            message: error.message,
            status: 0,
            statusText: 'Unknown error',
            url: ''
        } as RequestError
    })

    return instance
}

export const deleteInstance = async (instanceId: number): Promise<Response | RequestError> => {
    const instance = await fetch(`${API_URL}/instance/${instanceId}`, {
        method: 'DELETE'
    })
    .then(async (response) => {
        if (response.ok || response.status === 302) {
            return response
        }

        return response
        // return {
        //     message: response.statusText,
        //     status: response.status,
        //     statusText: response.statusText,
        //     url: response.url
        // } as RequestError
    })
    .catch((error) => {
        console.log(error)

        return {
            message: error.message,
            status: 0,
            statusText: 'Unknown error',
            url: ''
        } as RequestError
    })

    return instance
}

export const createDraft = async (instanceId: Number): Promise<Draft | RequestError> => {
    const newModel = await fetch(`${API_URL}/instance/${instanceId}/drafts`, {
        method: 'POST'
    })
        .then(async (response) => {
            if (response.ok) {
                return await response.json() as Draft
            }

            return {
                message: response.statusText,
                status: response.status,
                statusText: response.statusText,
                url: response.url
            } as RequestError
        })
        .catch((error) => {
            console.log(error)

            return {
                message: error.message,
                status: 0,
                statusText: 'Unknown error',
                url: ''
            } as RequestError
        })

    return newModel
}

export const getInstanceDrafts = async (instanceId: number): Promise<Draft[] | RequestError> => {
    const drafts = await fetch(`${API_URL}/instance/${instanceId}/drafts`)
        .then(async (response) => {
            if (response.ok) {
                return await response.json() as Draft[]
            }

            return {
                message: response.statusText,
                status: response.status,
                statusText: response.statusText,
                url: response.url
            } as RequestError
        })
        .catch((error) => {
            console.log(error)

            return {
                message: error.message,
                status: 0,
                statusText: 'Unknown error',
                url: ''
            } as RequestError
        })

    return drafts
}