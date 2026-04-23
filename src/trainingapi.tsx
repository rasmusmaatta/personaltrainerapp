import type { Training } from "./types";

export const fetchTraining = () => {
    return fetch(import.meta.env.VITE_API_URL + "/gettrainings")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching trainings")
            return response.json();
        })
}

export const saveTraining = (training: Training) => {
    return fetch(import.meta.env.VITE_API_URL + "/trainings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(training)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding new training");

            return response.json();
        })
}

export const deleteTraining = (id: string) => {
    return fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings/" + id, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when deleting");

            return response.json();
        })
}