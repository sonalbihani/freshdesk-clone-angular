export interface TicketData{
    id: number,
    subject: string,
    description: string,
    requester_id: number,
    responder_id: number,
    category: number,
    status: number,
    source: number,
    due_by: string | Date,
    created_at: string | Date,
    updated_at: string | Date
}
export interface ContactData{
    id: number,
    name: string,
    email: string,
    company_name: string,
    phone: string,
    created_at: string | Date,
    updated_at: string | Date
}

export interface UserData{
    id: number,
    fname: string,
    lname: string,
    email: string,
    password: string
}

export class GlobalConstants{
    
    public static status = [
    {id: 2, name: "Open"},
    {id: 3, name: "Pending"},
    {id: 4, name: "Resolved"} 
  ]

  public static source = [
    {id: 1, name: "Email"},
    {id: 2, name: "Portal"},
    {id: 3, name: "Phone"},
    {id: 4, name: "Chat"}
  ]
  public static category = [
    {id: 1, name: 'Billing'},
    {id: 2, name: 'Account'},
    {id: 3, name: 'Orders'},
    {id: 4, name: 'Product'},
    {id: 5, name: 'QA'},
    {id: 6, name: 'Sales'}
  ]
}