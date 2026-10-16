/**
 * DEMO Bangladesh locations (Division → City/District → Area/Thana) until the backend provides the real list.
 * Delete this file (and the `BangladeshLocations` resolver) once Magento serves `bdLocations`.
 */
export const MOCK_BD_LOCATIONS: Array<{ name: string; cities: Array<{ name: string; areas: string[] }> }> = [
  {
    name: "Dhaka",
    cities: [
      { name: "Dhaka", areas: ["Banani", "Dhanmondi", "Gulshan", "Mirpur", "Mohammadpur", "Motijheel", "Uttara"] },
      { name: "Gazipur", areas: ["Gazipur Sadar", "Kaliakair", "Tongi"] },
      { name: "Narayanganj", areas: ["Fatullah", "Narayanganj Sadar", "Rupganj"] },
      { name: "Tangail", areas: ["Mirzapur", "Tangail Sadar"] },
    ],
  },
  {
    name: "Chattogram",
    cities: [
      { name: "Chattogram", areas: ["Double Mooring", "Halishahar", "Kotwali", "Pahartali", "Panchlaish"] },
      { name: "Cox's Bazar", areas: ["Cox's Bazar Sadar", "Teknaf", "Ukhia"] },
      { name: "Cumilla", areas: ["Cumilla Sadar", "Daudkandi", "Laksam"] },
    ],
  },
  {
    name: "Rajshahi",
    cities: [
      { name: "Rajshahi", areas: ["Boalia", "Motihar", "Rajpara"] },
      { name: "Bogura", areas: ["Bogura Sadar", "Sherpur", "Shibganj"] },
      { name: "Pabna", areas: ["Ishwardi", "Pabna Sadar"] },
    ],
  },
  {
    name: "Khulna",
    cities: [
      { name: "Khulna", areas: ["Khalishpur", "Khulna Sadar", "Sonadanga"] },
      { name: "Jashore", areas: ["Jashore Sadar", "Jhikargachha", "Sharsha"] },
      { name: "Kushtia", areas: ["Kumarkhali", "Kushtia Sadar"] },
    ],
  },
  {
    name: "Barishal",
    cities: [
      { name: "Barishal", areas: ["Bakerganj", "Barishal Sadar"] },
      { name: "Patuakhali", areas: ["Kalapara", "Patuakhali Sadar"] },
    ],
  },
  {
    name: "Sylhet",
    cities: [
      { name: "Sylhet", areas: ["Jalalabad", "Shah Paran", "Sylhet Sadar"] },
      { name: "Moulvibazar", areas: ["Kamalganj", "Moulvibazar Sadar", "Sreemangal"] },
      { name: "Habiganj", areas: ["Habiganj Sadar", "Madhabpur"] },
    ],
  },
  {
    name: "Rangpur",
    cities: [
      { name: "Rangpur", areas: ["Mithapukur", "Rangpur Sadar"] },
      { name: "Dinajpur", areas: ["Birampur", "Dinajpur Sadar"] },
    ],
  },
  {
    name: "Mymensingh",
    cities: [
      { name: "Mymensingh", areas: ["Bhaluka", "Mymensingh Sadar", "Trishal"] },
      { name: "Jamalpur", areas: ["Jamalpur Sadar", "Sarishabari"] },
    ],
  },
];
