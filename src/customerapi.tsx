import type { Customer } from "./types";


export const fetchCustomer = () => {
    return fetch(import.meta.env.VITE_API_URL + "/customers")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetcing customers");

            return response.json();
        })
}

export const deleteCustomer = (url: string) => {
      return fetch(url, {
            method: "DELETE"
        })
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when deleting a customer");

                return response.json();
            })
    
}

export const saveCustomer = (customer: Customer) => {
    return fetch(import.meta.env.VITE_API_URL + "customers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding new customer");

            return response.json();
        })
}

