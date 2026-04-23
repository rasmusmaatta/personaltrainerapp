export type CustomerData = {
    firstname: string,
    lastname: string,
    streetaddress: string,
    postcode: string,
    city: string,
    email: string,
    phone: string,
    _links: {
        self:{
            href: string;
        },
        customer: {
            href: string;
        },
        trainings: {
            href: string;
        }
    }
}

export type Customer = Omit<CustomerData, "_links">;

export type TrainingData= {
    id: string,
    date: string,
    duration: string,
    activity: string,
    customer: {
        id: number,
        firstname: string,
        lastname: string,
        streetaddress: string,
        postcode: string,
        city: string,
        email: string,
        phone: string
    },
    _links: {
        self:{
            href: string;
        },
        training:{
            href:string;
        },
        customer:{
            href: string;
        }
    }
}

export type Training = Omit<TrainingData, "_links">;