export const initialFieldValues = {
  EO_Name1: "",
  EO_Name2: "",
  EO_Address_Name: "",
  EO_Address_StreetOne: "",
  EO_Address_StreetTwo: "",
  EO_Address_City: "",
  EO_Address_PostCode: "",
  EO_CountryReg: "",
  EO_Email: "",
  EO_Phone: "",
  EO_A_Info: "",
  VAT_R: false,
  VAT_N: "",
  TAX_N: "",
  EO_ExciseNumber1: false,
  EO_ExciseNumber2: "",
  OtherEOID_R: false,
  OtherEOID_N_list: "",
  Reg_3RD: false,
  Reg_EOID: "",
  EO_OtherID: "",
  Extensibility: "",
  EO_Type: 0,
};

export const fields = [
  {
    label: "EO Name 1:",
    type: "text",
    id: "EO_Name1",
    placeholder: "Enter EO Name 1",
    name: "EO_Name1",
    required: true,
  },
  {
    label: "EO Name 2:",
    type: "text",
    id: "EO_Name2",
    placeholder: "Enter EO Name 2",
    name: "EO_Name2",
    required: false,
  },
  {
    label: "EO Address Name:",
    type: "text",
    id: "EO_Address_Name",
    placeholder: "Enter EO Address Name",
    name: "EO_Address_Name",
    required: false,
  },
  {
    label: "EO Address Street One:",
    type: "text",
    id: "EO_Address_StreetOne",
    placeholder: "Enter EO Address Street One",
    name: "EO_Address_StreetOne",
    required: true,
  },
  {
    label: "EO Address Street Two:",
    type: "text",
    id: "EO_Address_StreetTwo",
    placeholder: "Enter EO Address Street Two",
    name: "EO_Address_StreetTwo",
    required: false,
  },
  {
    label: "EO Address City:",
    type: "text",
    id: "EO_Address_City",
    placeholder: "Enter EO Address City",
    name: "EO_Address_City",
    required: true,
  },
  {
    label: "EO Address Post Code:",
    type: "text",
    id: "EO_Address_PostCode",
    placeholder: "Enter EO Address Post Code",
    name: "EO_Address_PostCode",
    required: false,
  },
  {
    label: "EO Country Registration:",
    type: "text",
    id: "EO_CountryReg",
    placeholder: "Enter EO Country Registration",
    name: "EO_CountryReg",
    required: true,
    maxLength: 2,
  },
  {
    label: "EO Email:",
    type: "email",
    id: "EO_Email",
    placeholder: "Enter EO Email",
    name: "EO_Email",
    required: true,
  },
  {
    label: "EO Phone:",
    type: "text",
    id: "EO_Phone",
    placeholder: "Enter EO Phone",
    name: "EO_Phone",
    required: true,
  },
  {
    label: "EO Additional Info:",
    type: "text",
    id: "EO_A_Info",
    placeholder: "Enter EO Additional Info",
    name: "EO_A_Info",
    required: false,
  },
  {
    label: "VAT Registered:",
    type: "switch",
    id: "VAT_R",
    name: "VAT_R",
    required: false,
  },
  {
    label: "VAT Number:",
    type: "text",
    id: "VAT_N",
    placeholder: "Enter VAT Number",
    name: "VAT_N",
    required: false,
  },
  {
    label: "Tax Number:",
    type: "text",
    id: "TAX_N",
    placeholder: "Enter Tax Number",
    name: "TAX_N",
    required: false,
  },
  {
    label: "EO Excise Number 1:",
    type: "switch",
    id: "EO_ExciseNumber1",
    name: "EO_ExciseNumber1",
    required: false,
  },
  {
    label: "EO Excise Number 2:",
    type: "text",
    id: "EO_ExciseNumber2",
    placeholder: "Enter EO Excise Number 2",
    name: "EO_ExciseNumber2",
    required: false,
  },
  {
    label: "Other EOID Registered:",
    type: "switch",
    id: "OtherEOID_R",
    name: "OtherEOID_R",
    required: false,
  },
  {
    label: "Other EOID List:",
    type: "text",
    id: "OtherEOID_N_list",
    placeholder: "Enter Other EOID List",
    name: "OtherEOID_N_list",
    required: false,
  },
  {
    label: "Register 3rd Party:",
    type: "switch",
    id: "Reg_3RD",
    name: "Reg_3RD",
    required: false,
  },
  {
    label: "Register EOID:",
    type: "text",
    id: "Reg_EOID",
    placeholder: "Enter Register EOID",
    name: "Reg_EOID",
    required: false,
  },
  {
    label: "EO Other ID:",
    type: "text",
    id: "EO_OtherID",
    placeholder: "Enter EO Other ID",
    name: "EO_OtherID",
    required: false,
  },
  {
    label: "Extensibility:",
    type: "text",
    id: "Extensibility",
    placeholder: "Enter Extensibility",
    name: "Extensibility",
    required: false,
  },
  {
    label: "EO Type:",
    type: "radio",
    id: "EO_Type",
    name: "EO_Type",
    required: true,
    options: [
      { label: "Manufacturer/Importer", value: 1 },
      { label: "External Manufacturer/Importer", value: 2 },
      { label: "Distributor", value: 3 },
      { label: "Retailer", value: 4 },
    ],
  },
];
