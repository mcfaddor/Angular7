export interface User {
    _id: string;
    firstname: string;
    lastname: string;
    middlename: string;
    birthdate: string;
    
    ShippingAddress: string;
    ShippingCity: string;
    ShippingCountry: string;
    ShippingZip: string;

    BillingAddress: string;
    BillingCity: string;
    BillingCountry: string;
    BillingZip: string;
    
    email: string;
    password: string;
}
