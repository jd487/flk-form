export type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  isPrimary: boolean;
};

export const FIELD_MAPPINGS = [
  {
    name: "firstName",
    placeholder: "First Name",
    type: "text",
    required: true,
  },
  { name: "lastName", placeholder: "Last Name", type: "text", required: true },
  {
    name: "phoneNumber",
    placeholder: "Phone Number",
    type: "text",
    required: true,
  },
  { name: "email", placeholder: "Email", type: "email", required: true },
];
