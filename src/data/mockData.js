export const companies = [
  {
    id: "c1",
    name: "TechCorp",
    location: "New York, USA",
    linkedInProfile: "https://www.linkedin.com/company/techcorp",
    emails: ["contact@techcorp.com"],
    phoneNumbers: ["+1 555-1234"],
    comments: "Focus on AI and Cloud services.",
    communicationPeriodicity: { value: 2, unit: 'days' }, 
    lastCommunications: [
      { type: "LinkedIn Post", date: "2024-12-23", notes: "Shared proposal for Q1 project." },
      { type: "LinkedIn Message", date: "2024-12-25", notes: "Followed up on project requirements." },
    ],
    nextCommunication: { type: "Email", date: "2024-12-27" }, 
    communicationMethods: [
      {
        id: "cm1",
        name: "LinkedIn Post",
        description: "Share a post mentioning the company.",
        sequence: 1,
        mandatory: false,
      },
      {
        id: "cm2",
        name: "LinkedIn Message",
        description: "Send a personalized message via LinkedIn.",
        sequence: 2,
        mandatory: false,
      },
      {
        id: "cm3",
        name: "Email",
        description: "Send an email to the company's contact address.",
        sequence: 3,
        mandatory: false,
      },
      {
        id: "cm4",
        name: "Phone",
        description: "Call me via phone",
        sequence: 4,
        mandatory: false,
      },
    ],
  },
  {
    id: "c2",
    name: "HealthPlus",
    location: "London, UK",
    linkedInProfile: "https://www.linkedin.com/company/healthplus",
    emails: ["info@healthplus.co.uk", "support@healthplus.co.uk"],
    phoneNumbers: ["+44 20 7946 0958"],
    comments: "Specializes in healthcare software solutions.",
    communicationPeriodicity: { value: 2, unit: 'days' }, 
    lastCommunications: [
      { type: "Email", date: "2024-12-27", notes: "Demoed the latest application." },
    ],
    nextCommunication: { type: "Phone Call", date: "2024-12-29" }, // This should be calculated dynamically
    communicationMethods: [
      {
        id: "cm3",
        name: "Email",
        description: "Send an email to the company's contact address.",
        sequence: 1,
        mandatory: true,
      },
      {
        id: "cm4",
        name: "Phone Call",
        description: "Call the company's representative.",
        sequence: 2,
        mandatory: false,
      },
      {
        id: "cm5",
        name: "Visit",
        description: "Visit the company's premises for a meeting.",
        sequence: 3,
        mandatory: false,
      },
    ],
  },
  {
    id: "c3",
    name: "EcoWorld",
    location: "Berlin, Germany",
    linkedInProfile: "https://www.linkedin.com/company/ecoworld",
    emails: ["hello@ecoworld.de"],
    phoneNumbers: ["+49 30 12345678"],
    comments: "Leader in renewable energy solutions.",
    communicationPeriodicity: { value: 1, unit: 'week' }, 
    lastCommunications: [
      { type: "Email", date: "2024-12-20", notes: "Sent product specs for wind turbines." },
      { type: "Phone Call", date: "2024-12-21", notes: "Discussed solar project in Hamburg." },
    ],
    nextCommunication: { type: "Email", date: "2024-12-28" }, // This should be calculated dynamically
    communicationMethods: [
      {
        id: "cm6",
        name: "Webinar",
        description: "Invite to a sustainability webinar.",
        sequence: 1,
        mandatory: false,
      },
      {
        id: "cm3",
        name: "Email",
        description: "Send an email to the company's contact address.",
        sequence: 2,
        mandatory: true,
      },
    ],
  },
  {
    id: "c4",
    name: "FinServe",
    location: "Toronto, Canada",
    linkedInProfile: "https://www.linkedin.com/company/finserve",
    emails: ["support@finserve.ca"],
    phoneNumbers: ["+1 416-555-7890"],
    comments: "Focused on financial technology solutions.",
    communicationPeriodicity: { value: 1, unit: 'month' }, 
    lastCommunications: [
      { type: "Email", date: "2024-12-24", notes: "Provided details on API integration." },
    ],
    nextCommunication: { type: "Phone Call", date: "2024-12-27" }, // This should be calculated dynamically
    communicationMethods: [
      {
        id: "cm7",
        name: "Social Media Campaign",
        description: "Run a joint campaign on social media.",
        sequence: 1,
        mandatory: false,
      },
      {
        id: "cm4",
        name: "Phone Call",
        description: "Call the company's representative.",
        sequence: 2,
        mandatory: true,
      },
    ],
  },
  {
    id: "c5",
    name: "AgriTech",
    location: "Sydney, Australia",
    linkedInProfile: "https://www.linkedin.com/company/agritech",
    emails: ["contact@agritech.au"],
    phoneNumbers: ["+61 2 9876 5432"],
    comments: "Innovative solutions for smart farming.",
    communicationPeriodicity: { value: 10, unit: 'days' }, // Updated structure
    lastCommunications: [
      { type: "Email", date: "2025-01-02", notes: "Shared whitepaper on irrigation systems." },
    ],
    nextCommunication: { type: "Webinar", date: "2025-01-05" }, // This should be calculated dynamically
    communicationMethods: [
      {
        id: "cm6",
        name: "Webinar",
        description: "Invite to a webinar on smart farming.",
        sequence: 1,
        mandatory: true,
      },
      {
        id: "cm3",
        name: "Email",
        description: "Send an email to the company's contact address.",
        sequence: 2,
        mandatory: true,
      },
    ],
  },
];
