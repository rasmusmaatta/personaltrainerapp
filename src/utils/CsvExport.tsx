import type { CustomerData } from "../types";

export const CsvExport = (customers: CustomerData[]) => {

    const headers = ["First Name", "Last Name", "Street Address", "Postcode", "City", "Email", "Phone"];
    
    const rows = customers.map(customer => [
        customer.firstname,
        customer.lastname,
        customer.streetaddress,
        customer.postcode,
        customer.city,
        customer.email,
        customer.phone
    ]);
    
    const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
};

export default CsvExport;