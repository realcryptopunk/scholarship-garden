import React, { useState, useMemo } from 'react';

// Job listings data - curated for environmental, nonprofit, GIS roles
const jobs = [
  // Environmental/Conservation
  {
    id: 1,
    title: "Stewardship Associate",
    organization: "NYC Parks",
    location: "New York, NY",
    salary: "$45,000 - $55,000",
    type: "Full-time",
    categories: ["Conservation", "Stewardship"],
    description: "Work with Natural Areas teams to plant, cultivate, and maintain native wetland grasses, shrubs, and trees. Control invasive species and assist with environmental monitoring.",
    url: "https://www.nycgovparks.org/opportunities/jobs",
    matchScore: 5,
    posted: "Recently"
  },
  {
    id: 2,
    title: "Natural Areas Crew Leader",
    organization: "NYC Parks",
    location: "New York, NY",
    salary: "$50,000 - $60,000",
    type: "Full-time",
    categories: ["Conservation", "Stewardship"],
    description: "Lead restoration crews in maintaining natural areas including wetlands, forests, and meadows. Supervise volunteers and coordinate stewardship events.",
    url: "https://www.nycgovparks.org/opportunities/jobs",
    matchScore: 5,
    posted: "Recently"
  },
  {
    id: 3,
    title: "Wetlands Project Coordinator",
    organization: "NYC DEP",
    location: "New York, NY",
    salary: "$55,000 - $70,000",
    type: "Full-time",
    categories: ["Conservation", "Environmental"],
    description: "Coordinate wetland restoration and monitoring projects. Work with community partners on environmental education and outreach programs.",
    url: "https://cityjobs.nyc.gov",
    matchScore: 5,
    posted: "Check website"
  },
  {
    id: 4,
    title: "Conservation Technician",
    organization: "NYSDEC",
    location: "New York State",
    salary: "$40,000 - $50,000",
    type: "Full-time",
    categories: ["Conservation", "Environmental"],
    description: "Support environmental conservation efforts including habitat restoration, wildlife monitoring, and invasive species management.",
    url: "https://dec.ny.gov/about/employment",
    matchScore: 5,
    posted: "Check website"
  },
  {
    id: 5,
    title: "Wildlife Field Associate",
    organization: "NYC Parks",
    location: "New York, NY",
    salary: "$42,000 - $52,000",
    type: "Full-time",
    categories: ["Conservation", "Research"],
    description: "Conduct wildlife surveys, habitat assessments, and ecological monitoring. Requires degree in environmental science, ecology, or wildlife biology.",
    url: "https://www.nycgovparks.org/opportunities/jobs",
    matchScore: 5,
    posted: "Recently"
  },
  {
    id: 6,
    title: "Tree Census Associate",
    organization: "NYC Parks Forestry",
    location: "New York, NY",
    salary: "$18 - $22/hour",
    type: "Seasonal",
    categories: ["Conservation", "Environmental"],
    description: "Collect data on NYC's 800,000+ trees. Train volunteers on data collection, tree identification, and mobile app usage for the city's 4th tree census.",
    url: "https://www.nycgovparks.org/opportunities/jobs",
    matchScore: 4,
    posted: "Summer 2025"
  },
  // GIS/Planning
  {
    id: 7,
    title: "GIS Specialist",
    organization: "City of New York",
    location: "Brooklyn, NY",
    salary: "$55,000 - $75,000",
    type: "Full-time",
    categories: ["GIS", "Planning"],
    description: "Create maps and develop custom templates for geospatial data. Work with Esri Enterprise and ArcGIS Online applications.",
    url: "https://cityjobs.nyc.gov/job/gis-specialist-in-brooklyn-jid-29252",
    matchScore: 5,
    posted: "Active"
  },
  {
    id: 8,
    title: "GIS Editor",
    organization: "NYC Department of City Planning",
    location: "New York, NY",
    salary: "$50,000 - $65,000",
    type: "Full-time",
    categories: ["GIS", "Planning"],
    description: "Edit and maintain geospatial databases. Create maps and visualizations for urban planning projects and public presentations.",
    url: "https://cityjobs.nyc.gov",
    matchScore: 5,
    posted: "Check website"
  },
  {
    id: 9,
    title: "Urban Planner",
    organization: "NYC Department of City Planning",
    location: "New York, NY",
    salary: "$60,000 - $85,000",
    type: "Full-time",
    categories: ["Planning", "GIS"],
    description: "Assist with land use planning, zoning analysis, and community engagement. Prepare reports and maps for public review.",
    url: "https://cityjobs.nyc.gov",
    matchScore: 5,
    posted: "Check website"
  },
  {
    id: 10,
    title: "Community Planner",
    organization: "NYC Housing Authority",
    location: "New York, NY",
    salary: "$55,000 - $70,000",
    type: "Full-time",
    categories: ["Planning", "Community"],
    description: "Work with NYCHA residents on community development projects. Coordinate planning initiatives and public engagement.",
    url: "https://cityjobs.nyc.gov",
    matchScore: 4,
    posted: "Check website"
  },
  {
    id: 11,
    title: "Survey Technician",
    organization: "Various",
    location: "New York, NY",
    salary: "$45,000 - $60,000",
    type: "Full-time",
    categories: ["GIS", "Planning"],
    description: "Conduct land surveys and collect geospatial data. Support planning and engineering projects with accurate measurements.",
    url: "https://www.indeed.com/q-survey-technician-l-new-york-jobs.html",
    matchScore: 4,
    posted: "Multiple openings"
  },
  // Nonprofit Development & Operations
  {
    id: 12,
    title: "Development Associate",
    organization: "92nd Street Y",
    location: "New York, NY",
    salary: "$50,000 - $60,000",
    type: "Full-time",
    categories: ["Development", "Nonprofit"],
    description: "Support foundation and corporate philanthropy. 1-3 years experience in development office preferred. Manage donor relations and grant tracking.",
    url: "https://www.indeed.com/q-nonprofit-development-associate-l-new-york,-ny-jobs.html",
    matchScore: 4,
    posted: "Active"
  },
  {
    id: 13,
    title: "Grants and Operations Associate",
    organization: "Rockefeller Family Fund",
    location: "New York, NY",
    salary: "$55,000 - $70,000",
    type: "Full-time",
    categories: ["Development", "Operations"],
    description: "Coordinate grant administration and operational support. Work with program staff on funding initiatives and reporting.",
    url: "https://philanthropynewyork.org/jobs",
    matchScore: 5,
    posted: "January 2026"
  },
  {
    id: 14,
    title: "Grant Writer",
    organization: "Various Environmental Nonprofits",
    location: "New York, NY",
    salary: "$50,000 - $70,000",
    type: "Full-time",
    categories: ["Development", "Nonprofit"],
    description: "Research funding opportunities and write compelling grant proposals. Track deadlines and maintain relationships with funders.",
    url: "https://www.idealist.org/en/development-fundraising-jobs-new-york-ny",
    matchScore: 4,
    posted: "Multiple openings"
  },
  {
    id: 15,
    title: "Development Assistant",
    organization: "Westchester Land Trust",
    location: "Westchester, NY",
    salary: "$45,000 - $55,000",
    type: "Full-time",
    categories: ["Development", "Conservation"],
    description: "Support fundraising operations for land conservation organization. Assist with donor communications and event coordination.",
    url: "https://nonprofitwestchester.mcjobboard.net/",
    matchScore: 5,
    posted: "Active"
  },
  {
    id: 16,
    title: "Operations Associate",
    organization: "Environmental Defense Fund",
    location: "New York, NY",
    salary: "$50,000 - $65,000",
    type: "Full-time",
    categories: ["Operations", "Environmental"],
    description: "Support daily operations of environmental nonprofit. Coordinate logistics, manage administrative processes, and assist program teams.",
    url: "https://www.edf.org/jobs",
    matchScore: 4,
    posted: "Check website"
  },
  {
    id: 17,
    title: "Program and Operations Coordinator",
    organization: "Various",
    location: "New York, NY",
    salary: "$48,000 - $60,000",
    type: "Full-time",
    categories: ["Operations", "Nonprofit"],
    description: "Coordinate program logistics and operational activities. Support team with scheduling, communications, and project management.",
    url: "https://www.idealist.org",
    matchScore: 4,
    posted: "Multiple openings"
  },
  // Education & Outreach
  {
    id: 18,
    title: "Environmental Education Coordinator",
    organization: "GrowNYC",
    location: "New York, NY",
    salary: "$45,000 - $55,000",
    type: "Full-time",
    categories: ["Education", "Environmental"],
    description: "Develop and deliver environmental education programs. Work with schools and community groups on sustainability initiatives.",
    url: "https://www.grownyc.org/careers",
    matchScore: 5,
    posted: "Check website"
  },
  {
    id: 19,
    title: "Seasonal Educator",
    organization: "NYC Parks",
    location: "New York, NY",
    salary: "$18 - $25/hour",
    type: "Seasonal",
    categories: ["Education", "Environmental"],
    description: "Lead environmental education programs in NYC parks. Teach visitors about local ecology, wildlife, and conservation.",
    url: "https://www.nycgovparks.org/opportunities/jobs",
    matchScore: 4,
    posted: "Seasonal"
  },
  {
    id: 20,
    title: "Community Engagement Manager",
    organization: "Riverside Park Conservancy",
    location: "New York, NY",
    salary: "$55,000 - $70,000",
    type: "Full-time",
    categories: ["Community", "Education"],
    description: "Manage community outreach and volunteer programs. Coordinate events and build partnerships with local organizations.",
    url: "https://riversideparknyc.org/work-with-us/",
    matchScore: 4,
    posted: "Check website"
  },
  {
    id: 21,
    title: "Volunteer Programs Coordinator",
    organization: "Central Park Conservancy",
    location: "New York, NY",
    salary: "$48,000 - $58,000",
    type: "Full-time",
    categories: ["Community", "Stewardship"],
    description: "Recruit, train, and manage volunteers for park stewardship programs. Organize volunteer events and track participation.",
    url: "https://www.centralparknyc.org/careers",
    matchScore: 4,
    posted: "Check website"
  },
  // Urban Agriculture
  {
    id: 22,
    title: "Farm Operations Apprentice",
    organization: "GrowNYC",
    location: "New York, NY",
    salary: "$15 - $18/hour",
    type: "Seasonal",
    categories: ["Agriculture", "Environmental"],
    description: "Learn urban farming techniques while supporting farm operations. Work on soil preparation, planting, harvesting, and farmers market sales.",
    url: "https://www.grownyc.org/careers",
    matchScore: 4,
    posted: "Spring 2026"
  },
  {
    id: 23,
    title: "Urban Farms Assistant",
    organization: "Services For The Underserved",
    location: "New York, NY",
    salary: "$40,000 - $48,000",
    type: "Full-time",
    categories: ["Agriculture", "Community"],
    description: "Support urban farm program operations. Assist with farming, gardening, and community programming at multiple sites.",
    url: "https://www.sus.org/careers",
    matchScore: 4,
    posted: "Check website"
  },
  {
    id: 24,
    title: "Garden Programs Coordinator",
    organization: "Harlem Grown",
    location: "Harlem, NY",
    salary: "$45,000 - $55,000",
    type: "Full-time",
    categories: ["Agriculture", "Education"],
    description: "Coordinate programming across 13 urban agricultural sites. Lead youth education and community engagement initiatives.",
    url: "https://www.harlemgrown.org/careers",
    matchScore: 5,
    posted: "Check website"
  },
  // Research & Analysis
  {
    id: 25,
    title: "Research Assistant",
    organization: "Various Universities",
    location: "New York, NY",
    salary: "$40,000 - $55,000",
    type: "Full-time",
    categories: ["Research", "Environmental"],
    description: "Support environmental research projects. Collect and analyze data, assist with field work, and help prepare publications.",
    url: "https://www.indeed.com/q-research-assistant-environmental-l-new-york-jobs.html",
    matchScore: 4,
    posted: "Multiple openings"
  },
  {
    id: 26,
    title: "Energy Analyst",
    organization: "NYC Mayor's Office",
    location: "New York, NY",
    salary: "$55,000 - $75,000",
    type: "Full-time",
    categories: ["Environmental", "Research"],
    description: "Analyze energy usage data and support city sustainability initiatives. Work on climate action planning and emissions tracking.",
    url: "https://cityjobs.nyc.gov",
    matchScore: 4,
    posted: "Check website"
  },
  {
    id: 27,
    title: "Climate Adaptation Specialist",
    organization: "NYC Mayor's Office of Climate & Environmental Justice",
    location: "New York, NY",
    salary: "$60,000 - $80,000",
    type: "Full-time",
    categories: ["Environmental", "Planning"],
    description: "Support climate resilience planning and adaptation strategies. Work with communities on environmental justice initiatives.",
    url: "https://cityjobs.nyc.gov",
    matchScore: 5,
    posted: "Check website"
  },
  // Events & Administration
  {
    id: 28,
    title: "Events Coordinator",
    organization: "Various Environmental Nonprofits",
    location: "New York, NY",
    salary: "$45,000 - $55,000",
    type: "Full-time",
    categories: ["Events", "Nonprofit"],
    description: "Plan and execute fundraising events, galas, and community gatherings. Manage logistics, vendors, and volunteer coordination.",
    url: "https://www.idealist.org",
    matchScore: 3,
    posted: "Multiple openings"
  },
  {
    id: 29,
    title: "Administrative Assistant",
    organization: "Land Trust Alliance",
    location: "New York, NY",
    salary: "$42,000 - $52,000",
    type: "Full-time",
    categories: ["Operations", "Conservation"],
    description: "Provide administrative support for conservation organization. Manage calendars, correspondence, and office operations.",
    url: "https://landtrustalliance.org/job-board",
    matchScore: 3,
    posted: "Check website"
  },
  {
    id: 30,
    title: "NYCHA Programs Associate",
    organization: "NYC Housing Authority",
    location: "New York, NY",
    salary: "$48,000 - $60,000",
    type: "Full-time",
    categories: ["Community", "Operations"],
    description: "Support resident programs and community initiatives at NYCHA developments. Coordinate services and partnerships.",
    url: "https://cityjobs.nyc.gov",
    matchScore: 4,
    posted: "Check website"
  },
  // Land Trust & Conservation Organizations
  {
    id: 31,
    title: "CLT Coordinator",
    organization: "The Flats (NYCCLI)",
    location: "New York, NY",
    salary: "$50,000 - $65,000",
    type: "Full-time",
    categories: ["Community", "Planning"],
    description: "Work with residents and partners on community land trust development. Coordinate with legal and technical advisors.",
    url: "https://nyccli.org/jobs/",
    matchScore: 4,
    posted: "Active"
  },
  {
    id: 32,
    title: "Monitoring Crew Member",
    organization: "Various Land Trusts",
    location: "New York State",
    salary: "$18 - $22/hour",
    type: "Seasonal",
    categories: ["Conservation", "Stewardship"],
    description: "Monitor protected lands and conservation easements. Document conditions, identify issues, and report findings.",
    url: "https://www.conservationjobboard.com/new-york",
    matchScore: 4,
    posted: "Seasonal"
  },
  // Additional Opportunities
  {
    id: 33,
    title: "Communications Associate",
    organization: "Environmental Nonprofits",
    location: "New York, NY",
    salary: "$48,000 - $60,000",
    type: "Full-time",
    categories: ["Nonprofit", "Operations"],
    description: "Support communications and marketing efforts. Create content, manage social media, and coordinate outreach campaigns.",
    url: "https://www.idealist.org",
    matchScore: 3,
    posted: "Multiple openings"
  },
  {
    id: 34,
    title: "Gift Processing Associate",
    organization: "Various Nonprofits",
    location: "New York, NY",
    salary: "$42,000 - $50,000",
    type: "Full-time",
    categories: ["Development", "Operations"],
    description: "Process donations and maintain donor database. Generate reports and support fundraising operations.",
    url: "https://www.idealist.org",
    matchScore: 3,
    posted: "Multiple openings"
  },
  {
    id: 35,
    title: "Special Campaigns Assistant",
    organization: "Environmental Nonprofits",
    location: "New York, NY",
    salary: "$45,000 - $55,000",
    type: "Full-time",
    categories: ["Development", "Nonprofit"],
    description: "Support special fundraising campaigns and initiatives. Assist with donor outreach and campaign coordination.",
    url: "https://www.idealist.org",
    matchScore: 3,
    posted: "Multiple openings"
  }
];

// Job categories
const jobCategories = [
  "All",
  "Conservation",
  "Stewardship",
  "GIS",
  "Planning",
  "Environmental",
  "Development",
  "Operations",
  "Nonprofit",
  "Education",
  "Community",
  "Agriculture",
  "Research",
  "Events"
];

// Scholarship data compiled from research
const scholarships = [
  // Ukrainian Heritage
  {
    id: 1,
    name: "Vovk Foundation Scholarship",
    organization: "UNWLA",
    amount: "$4,000",
    deadline: "June 1",
    categories: ["Ukrainian Heritage"],
    eligibility: "Ukrainian descent, 3.5+ GPA, completed freshman year",
    description: "For students of Ukrainian descent in tech, engineering, arts, and humanities. Open to undergrad, graduate, and post-graduate students.",
    url: "https://unwla.org/projects/vovk-scholarship/",
    matchScore: 5
  },
  {
    id: 2,
    name: "UNA Science/Accounting Scholarship",
    organization: "Ukrainian National Association",
    amount: "$2,500",
    deadline: "June 1",
    categories: ["Ukrainian Heritage", "STEM"],
    eligibility: "Ukrainian heritage, studying sciences or accounting",
    description: "For students of Ukrainian heritage excelling in sciences or accounting fields.",
    url: "https://unainc.org/scholarships/",
    matchScore: 4
  },
  {
    id: 3,
    name: "UNA General Scholarship",
    organization: "Ukrainian National Association",
    amount: "$1,000",
    deadline: "June 1",
    categories: ["Ukrainian Heritage"],
    eligibility: "Ukrainian heritage, full-time student",
    description: "For students of Ukrainian heritage excelling in their studies.",
    url: "https://unainc.org/scholarships/",
    matchScore: 4
  },
  {
    id: 4,
    name: "Kotur Trust Scholarship",
    organization: "Eugene R. and Elinor R. Kotur Trust",
    amount: "Varies",
    deadline: "Varies",
    categories: ["Ukrainian Heritage"],
    eligibility: "Ukrainian ancestry, enrolled at specified colleges",
    description: "Financial assistance to undergraduate and graduate students of Ukrainian ancestry.",
    url: "https://bigfuture.collegeboard.org/scholarships/eugene-r-and-elinor-r-kotur-trust-scholarship",
    matchScore: 4
  },

  // Jewish Heritage
  {
    id: 5,
    name: "Jewish-Ukrainian Graduate Scholarship",
    organization: "Bold.org",
    amount: "$2,500",
    deadline: "February 28, 2026",
    categories: ["Jewish Heritage", "Ukrainian Heritage"],
    eligibility: "Jewish, born in another country, graduate student",
    description: "Supports Jewish-Ukrainian students completing graduate degrees. Perfect match for dual heritage!",
    url: "https://bold.org/scholarships/",
    matchScore: 5
  },
  {
    id: 6,
    name: "Lilly E. Reiser Graduate Student Award",
    organization: "Hillel International",
    amount: "Varies",
    deadline: "Varies",
    categories: ["Jewish Heritage"],
    eligibility: "Jewish student attending graduate school, demonstrated community impact",
    description: "For Jewish students demonstrating academic excellence and community involvement.",
    url: "https://www.hillel.org/scholarships/",
    matchScore: 4
  },
  {
    id: 7,
    name: "Paul & Daisy Soros Fellowship",
    organization: "Soros Foundation",
    amount: "Up to $90,000",
    deadline: "October (annual)",
    categories: ["Immigrant/Refugee", "Jewish Heritage"],
    eligibility: "New Americans (immigrants, refugees, first-gen)",
    description: "Prestigious fellowship providing up to $90,000 for two years of graduate study. For immigrants and children of immigrants.",
    url: "https://www.pdsoros.org/",
    matchScore: 5
  },
  {
    id: 8,
    name: "JFCS Educational Grants",
    organization: "Jewish Family and Children's Services",
    amount: "Varies",
    deadline: "Rolling",
    categories: ["Jewish Heritage"],
    eligibility: "Jewish students pursuing higher education",
    description: "Loans and grants to help Jewish students achieve educational and vocational goals.",
    url: "https://jelf.org/resources/",
    matchScore: 3
  },

  // Geography/GIS
  {
    id: 9,
    name: "USGIF Scholarship Program",
    organization: "US Geospatial Intelligence Foundation",
    amount: "$3,000 - $15,000",
    deadline: "Spring 2026",
    categories: ["GIS/Geography"],
    eligibility: "Studying geospatial, GIS, geography, or related fields",
    description: "Multiple awards for students in geospatial sciences. General awards start at $3,000; sponsored awards up to $15,000.",
    url: "https://usgif.org/usgif-scholarship-program/",
    matchScore: 5
  },
  {
    id: 10,
    name: "Robert N. Colwell Memorial Fellowship",
    organization: "ASPRS",
    amount: "$5,500",
    deadline: "November 1",
    categories: ["GIS/Geography", "Environmental"],
    eligibility: "Graduate/post-doctoral students in remote sensing or GIS",
    description: "For graduate or post-doctoral students excelling in remote sensing or GIS technologies.",
    url: "https://www.asprs.org/",
    matchScore: 5
  },
  {
    id: 11,
    name: "CaGIS Master's Scholarship Award",
    organization: "Cartography and Geographic Information Society",
    amount: "$1,000",
    deadline: "April 30",
    categories: ["GIS/Geography"],
    eligibility: "Master's students doing cartography/GIScience research",
    description: "For Master's students conducting research in cartography or GIScience.",
    url: "https://cartogis.org/",
    matchScore: 5
  },
  {
    id: 12,
    name: "CaGIS Doctoral Scholarship Award",
    organization: "Cartography and Geographic Information Society",
    amount: "$1,500",
    deadline: "April 30",
    categories: ["GIS/Geography"],
    eligibility: "Doctoral students in cartography/GIScience",
    description: "For doctoral students conducting research in cartography or GIScience.",
    url: "https://cartogis.org/",
    matchScore: 4
  },
  {
    id: 13,
    name: "AAG Cartography Research Grant",
    organization: "Association of American Geographers",
    amount: "Up to $500",
    deadline: "March 1, 2026",
    categories: ["GIS/Geography"],
    eligibility: "Master's students in cartography",
    description: "Funds cartography research costs including equipment, travel, and materials.",
    url: "https://www.aag.org/",
    matchScore: 4
  },
  {
    id: 14,
    name: "Messina-Stanley Graduate Scholarship",
    organization: "University of Illinois",
    amount: "Varies",
    deadline: "Varies",
    categories: ["GIS/Geography", "Environmental"],
    eligibility: "Geography & GIS graduate student, medical or environmental geography research",
    description: "For Geography & GIS graduate students whose research involves medical or environmental geography.",
    url: "https://ggis.illinois.edu/academics/scholarships-geography-gis-students",
    matchScore: 5
  },
  {
    id: 15,
    name: "GSA Graduate Student Grants",
    organization: "Geological Society of America",
    amount: "~$2,688 average",
    deadline: "February 18, 2026",
    categories: ["GIS/Geography", "Environmental"],
    eligibility: "Graduate students in geological sciences",
    description: "Research grants for graduate students. About $900,000 awarded annually to 350+ students.",
    url: "https://www.geosociety.org/GSA/GSA/grants/home.aspx",
    matchScore: 4
  },
  {
    id: 16,
    name: "SCGIS Global Scholarship",
    organization: "Society for Conservation GIS",
    amount: "Training + Conference",
    deadline: "Spring",
    categories: ["GIS/Geography", "Environmental", "Sustainability"],
    eligibility: "Conservation GIS students",
    description: "Provides training plus Esri UC and SCGIS conference attendance for conservation GIS students.",
    url: "https://www.scgis.org/",
    matchScore: 5
  },

  // Environmental/Sustainability
  {
    id: 17,
    name: "Harvard Environmental Fellows Program",
    organization: "Harvard University",
    amount: "$90,000/year",
    deadline: "Fall 2025",
    categories: ["Environmental", "Sustainability"],
    eligibility: "Doctorate or terminal degree (awarded 2022-2026)",
    description: "Prestigious postdoctoral fellowship. Includes $90K salary, health insurance, relocation, and travel allowance.",
    url: "https://www.environment.harvard.edu/environmental-fellows-program",
    matchScore: 5
  },
  {
    id: 18,
    name: "EDF Project Management Fellowship",
    organization: "Environmental Defense Fund",
    amount: "Full-time paid",
    deadline: "Rolling",
    categories: ["Environmental", "Sustainability"],
    eligibility: "Recent graduates (undergrad, graduate, or doctoral)",
    description: "One-year fellowship working on environmental projects. Includes project management certification.",
    url: "https://www.edf.org/environmental-careers/fellowships",
    matchScore: 5
  },
  {
    id: 19,
    name: "Green Fellows Program",
    organization: "Green Institute",
    amount: "Certificate + $1,000 prize",
    deadline: "2025",
    categories: ["Environmental", "Sustainability"],
    eligibility: "Young professionals, students, recent graduates",
    description: "Fully funded virtual fellowship on global sustainability challenges. Network with experts worldwide.",
    url: "https://weadapt.org/",
    matchScore: 4
  },
  {
    id: 20,
    name: "Gloria Barron Wilderness Society Scholarship",
    organization: "Wilderness Society",
    amount: "$10,000",
    deadline: "Varies",
    categories: ["Environmental", "Sustainability"],
    eligibility: "Graduate student in natural resources management, law, or policy",
    description: "Supports research on wilderness establishment, protection, or management.",
    url: "https://www.wilderness.org/",
    matchScore: 5
  },
  {
    id: 21,
    name: "Echoing Green Fellowship",
    organization: "Echoing Green Foundation",
    amount: "$60,000 + benefits",
    deadline: "Varies",
    categories: ["Sustainability", "Environmental"],
    eligibility: "Social entrepreneurs starting innovative public service projects",
    description: "Two-year award for social entrepreneurs. Includes health benefits and connectivity stipend.",
    url: "https://echoinggreen.org/",
    matchScore: 4
  },
  {
    id: 22,
    name: "beVisioneers Fellowship",
    organization: "beVisioneers",
    amount: "Full program (no cost)",
    deadline: "Rolling",
    categories: ["Sustainability", "Environmental"],
    eligibility: "Ages 16-28 with planet-positive project ideas",
    description: "One-year hybrid fellowship providing training and resources for sustainability innovators.",
    url: "https://www.bevisioneers.world/",
    matchScore: 4
  },
  {
    id: 23,
    name: "USDN EDI Fellowship",
    organization: "Urban Sustainability Directors Network",
    amount: "Living wage + benefits",
    deadline: "Annual",
    categories: ["Sustainability", "Environmental"],
    eligibility: "College students to mid-career professionals",
    description: "12-week summer fellowship in local government sustainability. Includes mentorship and networking.",
    url: "https://www.usdn.org/",
    matchScore: 4
  },

  // Women in STEM
  {
    id: 24,
    name: "MPOWER Women in STEM Scholarship",
    organization: "MPOWER Financing",
    amount: "$1,000 - $5,000",
    deadline: "January 31, 2026",
    categories: ["Women in STEM"],
    eligibility: "Female international/DACA students in STEM",
    description: "Three awards ($5K, $2K, $1K) for women in STEM studying in US or Canada.",
    url: "https://www.mpowerfinancing.com/scholarships/women-in-stem",
    matchScore: 5
  },
  {
    id: 25,
    name: "BHW Women in STEM Scholarship",
    organization: "BHW Group",
    amount: "$3,000",
    deadline: "April 15",
    categories: ["Women in STEM"],
    eligibility: "Female undergrad/graduate students in STEM",
    description: "For women pursuing degrees in science, technology, engineering, or mathematics.",
    url: "https://thebhwgroup.com/scholarship",
    matchScore: 5
  },
  {
    id: 26,
    name: "Zonta International Women in STEM",
    organization: "Zonta International",
    amount: "$5,000",
    deadline: "Varies",
    categories: ["Women in STEM"],
    eligibility: "Women pursuing STEM degrees (sophomores and beyond)",
    description: "For women pursuing degrees in STEM fields. Open to graduate students.",
    url: "https://www.zonta.org/",
    matchScore: 5
  },
  {
    id: 27,
    name: "Science Ambassador Scholarship",
    organization: "Cards Against Humanity",
    amount: "Full Tuition",
    deadline: "December",
    categories: ["Women in STEM"],
    eligibility: "Women pursuing STEM degrees",
    description: "Full-tuition scholarship. Submit a video explaining a STEM topic you're passionate about.",
    url: "https://www.scienceambassadorscholarship.org/",
    matchScore: 4
  },
  {
    id: 28,
    name: "ABC Humane Wildlife Scholarship",
    organization: "ABC Humane Wildlife",
    amount: "$1,000",
    deadline: "Varies",
    categories: ["Women in STEM", "Environmental"],
    eligibility: "Women in biodiversity, environmental science, or animal conservation",
    description: "For women focused on biodiversity, environmental science, or animal conservation.",
    url: "https://abcwildlife.com/scholarship/",
    matchScore: 5
  },
  {
    id: 29,
    name: "AWIS Kirsten R. Lorentzen Award",
    organization: "Association for Women in Science",
    amount: "$2,000",
    deadline: "February 2026",
    categories: ["Women in STEM", "GIS/Geography"],
    eligibility: "Women in physics or geoscience",
    description: "For women students in physics and geoscience fields.",
    url: "https://awis.org/",
    matchScore: 5
  },

  // Additional Ukrainian Heritage
  {
    id: 30,
    name: "Harvard Ukrainian Summer Institute (HUSI)",
    organization: "Harvard Ukrainian Research Institute",
    amount: "Full Tuition + Room/Board",
    deadline: "February 12, 2026",
    categories: ["Ukrainian Heritage"],
    eligibility: "Students interested in Ukrainian studies",
    description: "Full scholarships covering tuition plus room and board for summer program (June 22 - August 7, 2026). Intensive Ukrainian language and culture studies.",
    url: "https://huri.harvard.edu/husi",
    matchScore: 5
  },
  {
    id: 31,
    name: "Bridge4Students Scholarship",
    organization: "Bridge4Students",
    amount: "$1,000 - $10,000",
    deadline: "Rolling",
    categories: ["Ukrainian Heritage", "Immigrant/Refugee"],
    eligibility: "Ukrainian students or those disrupted by conflict",
    description: "Merit-based and emergency funding for students disrupted by conflict. Includes Bridge Grants for urgent needs and Merit-Based Scholarships for tuition.",
    url: "https://www.bridge4students.org",
    matchScore: 5
  },
  {
    id: 32,
    name: "Ukrainian Federal Credit Union Scholarship",
    organization: "Ukrainian Federal Credit Union",
    amount: "$500 - $1,500",
    deadline: "Varies",
    categories: ["Ukrainian Heritage"],
    eligibility: "High school seniors or current college students",
    description: "Scholarship program in collaboration with NY Credit Union Association for Ukrainian community members.",
    url: "https://ukrainianfcu.org/about-us/scholarships/",
    matchScore: 4
  },
  {
    id: 33,
    name: "UNA Political Science Scholarship",
    organization: "Ukrainian National Association",
    amount: "$2,000",
    deadline: "June 1",
    categories: ["Ukrainian Heritage"],
    eligibility: "Full-time political science students of Ukrainian heritage",
    description: "For full-time undergraduate students studying political science at an accredited college or university in the US or Canada.",
    url: "https://unainc.org/scholarships/",
    matchScore: 4
  },

  // Additional Jewish Heritage
  {
    id: 34,
    name: "HIAS Scholarship",
    organization: "HIAS (Hebrew Immigrant Aid Society)",
    amount: "$7,500",
    deadline: "March 1, 2026",
    categories: ["Jewish Heritage", "Immigrant/Refugee"],
    eligibility: "Refugee or asylee background, Jewish community connection",
    description: "For students who came to the US as refugees or asylees, or whose parents did. Strong academic record required.",
    url: "https://www.hias.org/hias-scholarship",
    matchScore: 5
  },
  {
    id: 35,
    name: "JCC Graduate Scholarship",
    organization: "Jewish Community Centers of North America",
    amount: "Up to $10,000/year",
    deadline: "Varies",
    categories: ["Jewish Heritage"],
    eligibility: "Graduate students pursuing nonprofit management, education, or Jewish studies",
    description: "For graduate students in nonprofit management, early childhood education, health/physical education, or Jewish studies. Must work at a JCC during school.",
    url: "https://www.jcca.org/",
    matchScore: 4
  },
  {
    id: 36,
    name: "Hebrew Free Loan Society Scholarship",
    organization: "Hebrew Free Loan Society / UJA",
    amount: "Varies",
    deadline: "Rolling",
    categories: ["Jewish Heritage"],
    eligibility: "Jewish students pursuing undergraduate, graduate, or professional education",
    description: "Interest-free loans and scholarships for Jewish students. Funded by UJA-Federation of New York.",
    url: "https://hflsny.org/",
    matchScore: 4
  },
  {
    id: 37,
    name: "Marcus Center Fellowship",
    organization: "Jacob Rader Marcus Center of the American Jewish Archives",
    amount: "Research Stipend",
    deadline: "Varies",
    categories: ["Jewish Heritage"],
    eligibility: "Graduate students or scholars in Jewish studies",
    description: "Month-long fellowships for research and writing at the American Jewish Archives in Cincinnati. Covers transportation and living expenses.",
    url: "https://americanjewisharchives.org/",
    matchScore: 3
  },
  {
    id: 38,
    name: "Kaplun Essay Contest",
    organization: "Kaplun Foundation",
    amount: "$1,800",
    deadline: "March 12, 2026",
    categories: ["Jewish Heritage"],
    eligibility: "Jewish high school juniors and seniors",
    description: "Essay contest on topics related to Jewish heritage and values.",
    url: "https://kfrg.org/",
    matchScore: 3
  },

  // Additional GIS/Geography
  {
    id: 39,
    name: "Abraham Anson Memorial Scholarship",
    organization: "ASPRS",
    amount: "$2,000",
    deadline: "November 1",
    categories: ["GIS/Geography"],
    eligibility: "Students pursuing careers in geospatial information and mapping",
    description: "Encourages students who want to follow a career in research or education related to geospatial information and mapping.",
    url: "https://www.asprs.org/",
    matchScore: 5
  },
  {
    id: 40,
    name: "UT Dallas GIS Scholarship",
    organization: "University of Texas at Dallas / Pioneer Natural Resources",
    amount: "Varies",
    deadline: "Varies",
    categories: ["GIS/Geography"],
    eligibility: "Students pursuing GIS education (domestic and international)",
    description: "Multiple scholarship opportunities for outstanding students pursuing GIS education and research. Options for both domestic and international students.",
    url: "https://epps.utdallas.edu/",
    matchScore: 4
  },
  {
    id: 41,
    name: "MAGIP GIS Scholarship",
    organization: "Montana Association of Geographic Information Professionals",
    amount: "$1,000",
    deadline: "Varies",
    categories: ["GIS/Geography"],
    eligibility: "Undergraduate or first-year graduate students studying GIS in Montana",
    description: "Three $1,000 scholarships for students doing geospatially-related projects or research at Montana institutions.",
    url: "https://www.magip.org/Scholarships",
    matchScore: 3
  },
  {
    id: 42,
    name: "Zuuring-MAGIP Graduate GIS Scholarship",
    organization: "University of Montana / MAGIP",
    amount: "Varies",
    deadline: "Varies",
    categories: ["GIS/Geography"],
    eligibility: "First-year graduate students using GIS in thesis/dissertation",
    description: "For graduate students working on projects that incorporate GIS sciences and technologies as a significant part of their thesis or dissertation research.",
    url: "https://www.magip.org/Scholarships",
    matchScore: 4
  },

  // Additional Women in STEM/Environmental
  {
    id: 43,
    name: "Nancy Foster Scholarship",
    organization: "NOAA",
    amount: "Up to $42,000/year",
    deadline: "Varies",
    categories: ["Women in STEM", "Environmental"],
    eligibility: "Women and minorities in oceanography, marine biology, or maritime archaeology",
    description: "Supports independent graduate-level studies with preference given to women and minority students. Must be U.S. citizen.",
    url: "https://fosterscholars.noaa.gov/",
    matchScore: 5
  },
  {
    id: 44,
    name: "Study.com Women in Environmental Science Scholarship",
    organization: "Study.com",
    amount: "$1,000",
    deadline: "Rolling",
    categories: ["Women in STEM", "Environmental"],
    eligibility: "Female students pursuing environmental science degrees",
    description: "For any female student pursuing an undergraduate or graduate degree in environmental science. Online application.",
    url: "https://study.com/resources/women-in-environmental-science-scholarship",
    matchScore: 5
  },
  {
    id: 45,
    name: "Tacuna Systems Women in STEM Scholarship",
    organization: "Tacuna Systems",
    amount: "$1,000",
    deadline: "Annual",
    categories: ["Women in STEM"],
    eligibility: "Women pursuing STEM degrees in US or Canada",
    description: "Two scholarships awarded annually - one for US student and one for Canadian student pursuing STEM education.",
    url: "https://tacunasystems.com/scholarship/",
    matchScore: 4
  },
  {
    id: 46,
    name: "EPA STAR Fellowship",
    organization: "Environmental Protection Agency",
    amount: "~$27,000/year + stipend",
    deadline: "Varies",
    categories: ["Environmental", "Sustainability"],
    eligibility: "Master's and PhD students conducting environmental research",
    description: "Fellowships for graduate students conducting environmental research. Covers tuition and fees plus monthly stipend.",
    url: "https://www.epa.gov/research-fellowships",
    matchScore: 5
  },
  {
    id: 47,
    name: "Environmental Research & Education Foundation Scholarship",
    organization: "EREF",
    amount: "$3,500 - $12,000",
    deadline: "Varies",
    categories: ["Environmental", "Sustainability"],
    eligibility: "Students in environmental fields",
    description: "Multiple scholarships for students pursuing careers in solid waste management and environmental sustainability.",
    url: "https://erefdn.org/scholarships/",
    matchScore: 4
  },
  {
    id: 48,
    name: "AGU Student Grants",
    organization: "American Geophysical Union",
    amount: "Varies",
    deadline: "Varies",
    categories: ["Environmental", "GIS/Geography"],
    eligibility: "Students and early-career scientists in Earth sciences",
    description: "Grants and scholarships to support students completing research and advancing their education in Earth and space sciences.",
    url: "https://www.agu.org/",
    matchScore: 4
  }
];

const categories = [
  "All",
  "Ukrainian Heritage",
  "Jewish Heritage",
  "GIS/Geography",
  "Environmental",
  "Sustainability",
  "Women in STEM",
  "Immigrant/Refugee"
];

// Cute SVG icons
const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    <polyline points="15 3 21 3 21 9"/>
    <line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" className={`w-5 h-5 transition-all duration-300 ${filled ? 'scale-125' : ''}`} fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

// Decorative floating elements - nature themed
const FloatingElements = () => {
  const elements = ['🌿', '🍃', '🌲', '🌳', '🍀', '🌱', '🪴', '🌾', '🍂', '🌴'];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float text-2xl opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${20 + Math.random() * 15}s`,
          }}
        >
          {elements[i % elements.length]}
        </div>
      ))}
    </div>
  );
};

// Match score indicator (growing tree stages)
const MatchIndicator = ({ score }) => {
  const growth = ['🌱', '🌿', '🪴', '🌳', '🌲'];
  return (
    <div className="flex gap-1 items-center">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-lg transition-all duration-300 ${i < score ? 'opacity-100 scale-110' : 'opacity-30 scale-90 grayscale'}`}
        >
          {growth[i]}
        </span>
      ))}
    </div>
  );
};

// Category badge with nature-inspired colors and emojis
const CategoryBadge = ({ category }) => {
  const config = {
    "Ukrainian Heritage": { colors: "bg-amber-50 text-amber-700 border-amber-300", emoji: "🌻" },
    "Jewish Heritage": { colors: "bg-sky-50 text-sky-700 border-sky-300", emoji: "✡️" },
    "GIS/Geography": { colors: "bg-violet-50 text-violet-700 border-violet-300", emoji: "🗺️" },
    "Environmental": { colors: "bg-emerald-50 text-emerald-700 border-emerald-300", emoji: "🌲" },
    "Sustainability": { colors: "bg-teal-50 text-teal-700 border-teal-300", emoji: "♻️" },
    "Women in STEM": { colors: "bg-rose-50 text-rose-700 border-rose-300", emoji: "🔬" },
    "Immigrant/Refugee": { colors: "bg-orange-50 text-orange-700 border-orange-300", emoji: "🌍" },
    "STEM": { colors: "bg-indigo-50 text-indigo-700 border-indigo-300", emoji: "🧬" }
  };

  const { colors, emoji } = config[category] || { colors: 'bg-stone-50 text-stone-700 border-stone-300', emoji: '📚' };

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border-2 ${colors} flex items-center gap-1`}>
      <span>{emoji}</span>
      <span>{category}</span>
    </span>
  );
};

// Job category badge with nature-inspired colors
const JobCategoryBadge = ({ category }) => {
  const config = {
    "Conservation": { colors: "bg-emerald-50 text-emerald-700 border-emerald-300", emoji: "🌲" },
    "Stewardship": { colors: "bg-green-50 text-green-700 border-green-300", emoji: "🌿" },
    "GIS": { colors: "bg-violet-50 text-violet-700 border-violet-300", emoji: "🗺️" },
    "Planning": { colors: "bg-blue-50 text-blue-700 border-blue-300", emoji: "📐" },
    "Environmental": { colors: "bg-teal-50 text-teal-700 border-teal-300", emoji: "🌍" },
    "Development": { colors: "bg-amber-50 text-amber-700 border-amber-300", emoji: "💰" },
    "Operations": { colors: "bg-slate-50 text-slate-700 border-slate-300", emoji: "⚙️" },
    "Nonprofit": { colors: "bg-rose-50 text-rose-700 border-rose-300", emoji: "💚" },
    "Education": { colors: "bg-purple-50 text-purple-700 border-purple-300", emoji: "📚" },
    "Community": { colors: "bg-orange-50 text-orange-700 border-orange-300", emoji: "🤝" },
    "Agriculture": { colors: "bg-lime-50 text-lime-700 border-lime-300", emoji: "🌱" },
    "Research": { colors: "bg-cyan-50 text-cyan-700 border-cyan-300", emoji: "🔬" },
    "Events": { colors: "bg-pink-50 text-pink-700 border-pink-300", emoji: "🎉" }
  };

  const { colors, emoji } = config[category] || { colors: 'bg-stone-50 text-stone-700 border-stone-300', emoji: '💼' };

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border-2 ${colors} flex items-center gap-1`}>
      <span>{emoji}</span>
      <span>{category}</span>
    </span>
  );
};

// Job card - nature/tree themed
const JobCard = ({ job, isFavorite, onToggleFavorite }) => {
  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-teal-100 shadow-lg shadow-teal-100/30 hover:shadow-xl hover:shadow-teal-200/50 hover:border-teal-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Top accent bar - job gradient */}
      <div className="h-2 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500" />

      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-teal-600 transition-colors">
              {job.title} 💼
            </h3>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <span>🏢</span> {job.organization}
            </p>
            <p className="text-sm text-gray-400 mt-0.5 flex items-center gap-1">
              <span>📍</span> {job.location}
            </p>
          </div>
          <button
            onClick={() => onToggleFavorite(job.id)}
            className={`p-2.5 rounded-full transition-all duration-300 ${isFavorite ? 'text-rose-500 bg-rose-100 animate-pulse' : 'text-gray-300 hover:text-rose-400 hover:bg-rose-50'}`}
          >
            <HeartIcon filled={isFavorite} />
          </button>
        </div>

        {/* Match score */}
        <div className="flex items-center gap-2 mb-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-full px-3 py-1.5 w-fit">
          <span className="text-xs font-semibold text-teal-600">Match:</span>
          <MatchIndicator score={job.matchScore} />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {job.categories.map(cat => (
            <JobCategoryBadge key={cat} category={cat} />
          ))}
        </div>

        {/* Job type badge */}
        <div className="mb-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            job.type === 'Full-time' ? 'bg-green-100 text-green-700' :
            job.type === 'Seasonal' ? 'bg-amber-100 text-amber-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {job.type}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Salary and posted - nature boxes */}
        <div className="flex items-stretch gap-3 mb-4">
          <div className="flex-1 bg-gradient-to-br from-teal-50 to-cyan-100 rounded-2xl p-3 border-2 border-teal-200">
            <p className="text-xs text-teal-600 font-medium mb-1">💵 Salary</p>
            <p className="text-lg font-bold text-teal-700">{job.salary}</p>
          </div>
          <div className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-3 border-2 border-blue-200">
            <p className="text-xs text-blue-600 font-medium mb-1">📅 Posted</p>
            <p className="text-lg font-bold text-blue-700">{job.posted}</p>
          </div>
        </div>

        {/* Apply button - job gradient */}
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 hover:from-teal-600 hover:via-cyan-600 hover:to-blue-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-teal-200 hover:shadow-xl hover:shadow-cyan-300 hover:scale-[1.02]"
        >
          <span>🔗 View Job</span>
          <ExternalLinkIcon />
        </a>
      </div>
    </div>
  );
};

// Scholarship card - nature/tree themed
const ScholarshipCard = ({ scholarship, isFavorite, onToggleFavorite }) => {
  return (
    <div className="group bg-white/90 backdrop-blur-sm rounded-3xl border-2 border-emerald-100 shadow-lg shadow-emerald-100/30 hover:shadow-xl hover:shadow-green-200/50 hover:border-green-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Top accent bar - forest gradient */}
      <div className="h-2 bg-gradient-to-r from-emerald-400 via-green-500 to-teal-500" />

      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start gap-3 mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-lg leading-tight group-hover:text-emerald-600 transition-colors">
              {scholarship.name} 🌿
            </h3>
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
              <span>🏛️</span> {scholarship.organization}
            </p>
          </div>
          <button
            onClick={() => onToggleFavorite(scholarship.id)}
            className={`p-2.5 rounded-full transition-all duration-300 ${isFavorite ? 'text-rose-500 bg-rose-100 animate-pulse' : 'text-gray-300 hover:text-rose-400 hover:bg-rose-50'}`}
          >
            <HeartIcon filled={isFavorite} />
          </button>
        </div>

        {/* Match score */}
        <div className="flex items-center gap-2 mb-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full px-3 py-1.5 w-fit">
          <span className="text-xs font-semibold text-emerald-600">Growth:</span>
          <MatchIndicator score={scholarship.matchScore} />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {scholarship.categories.map(cat => (
            <CategoryBadge key={cat} category={cat} />
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {scholarship.description}
        </p>

        {/* Amount and deadline - nature boxes */}
        <div className="flex items-stretch gap-3 mb-4">
          <div className="flex-1 bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-3 border-2 border-emerald-200">
            <p className="text-xs text-emerald-600 font-medium mb-1">🌱 Award</p>
            <p className="text-xl font-bold text-emerald-700">{scholarship.amount}</p>
          </div>
          <div className="flex-1 bg-gradient-to-br from-amber-50 to-yellow-100 rounded-2xl p-3 border-2 border-amber-200">
            <p className="text-xs text-amber-600 font-medium mb-1">🍂 Deadline</p>
            <p className="text-lg font-bold text-amber-700">{scholarship.deadline}</p>
          </div>
        </div>

        {/* Eligibility */}
        <div className="p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl border-2 border-teal-100 mb-4">
          <p className="text-xs font-semibold text-teal-600 mb-1 flex items-center gap-1">
            <span>🌍</span> Who Can Apply
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">{scholarship.eligibility}</p>
        </div>

        {/* Apply button - nature gradient */}
        <a
          href={scholarship.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 hover:from-emerald-600 hover:via-green-600 hover:to-teal-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-green-300 hover:scale-[1.02]"
        >
          <span>🌳 Apply Now</span>
          <ExternalLinkIcon />
        </a>
      </div>
    </div>
  );
};

// Main App
export default function ScholarshipAggregator() {
  const [activeTab, setActiveTab] = useState('scholarships'); // 'scholarships' or 'jobs'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedJobCategory, setSelectedJobCategory] = useState('All');
  const [favorites, setFavorites] = useState(new Set());
  const [jobFavorites, setJobFavorites] = useState(new Set());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [sortBy, setSortBy] = useState('match');

  const toggleFavorite = (id) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const toggleJobFavorite = (id) => {
    setJobFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  const filteredScholarships = useMemo(() => {
    let result = scholarships;

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(s => s.categories.includes(selectedCategory));
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.organization.toLowerCase().includes(query) ||
        s.description.toLowerCase().includes(query) ||
        s.categories.some(c => c.toLowerCase().includes(query))
      );
    }

    // Filter favorites
    if (showFavoritesOnly) {
      result = result.filter(s => favorites.has(s.id));
    }

    // Sort
    if (sortBy === 'match') {
      result = [...result].sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'amount') {
      result = [...result].sort((a, b) => {
        const getAmount = (str) => {
          const match = str.match(/\$?([\d,]+)/);
          return match ? parseInt(match[1].replace(',', '')) : 0;
        };
        return getAmount(b.amount) - getAmount(a.amount);
      });
    }

    return result;
  }, [searchQuery, selectedCategory, showFavoritesOnly, favorites, sortBy]);

  const filteredJobs = useMemo(() => {
    let result = jobs;

    // Filter by category
    if (selectedJobCategory !== 'All') {
      result = result.filter(j => j.categories.includes(selectedJobCategory));
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(j =>
        j.title.toLowerCase().includes(query) ||
        j.organization.toLowerCase().includes(query) ||
        j.description.toLowerCase().includes(query) ||
        j.location.toLowerCase().includes(query) ||
        j.categories.some(c => c.toLowerCase().includes(query))
      );
    }

    // Filter favorites
    if (showFavoritesOnly) {
      result = result.filter(j => jobFavorites.has(j.id));
    }

    // Sort
    if (sortBy === 'match') {
      result = [...result].sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'salary') {
      result = [...result].sort((a, b) => {
        const getSalary = (str) => {
          const match = str.match(/\$?([\d,]+)/);
          return match ? parseInt(match[1].replace(',', '')) : 0;
        };
        return getSalary(b.salary) - getSalary(a.salary);
      });
    }

    return result;
  }, [searchQuery, selectedJobCategory, showFavoritesOnly, jobFavorites, sortBy]);

  const totalAmount = useMemo(() => {
    let total = 0;
    filteredScholarships.forEach(s => {
      const match = s.amount.match(/\$?([\d,]+)/);
      if (match) total += parseInt(match[1].replace(',', ''));
    });
    return total.toLocaleString();
  }, [filteredScholarships]);

  // Reset filters when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery('');
    setShowFavoritesOnly(false);
    setSortBy('match');
    if (tab === 'scholarships') {
      setSelectedCategory('All');
    } else {
      setSelectedJobCategory('All');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative">
      <FloatingElements />

      {/* Custom styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-15px) rotate(5deg); }
          50% { transform: translateY(-5px) rotate(-3deg); }
          75% { transform: translateY(-20px) rotate(8deg); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-float { animation: float 20s ease-in-out infinite; }
        .animate-sway { animation: sway 4s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Header - forest/nature gradient */}
      <header className="relative z-10 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="p-3 bg-white/20 rounded-2xl animate-sway">
              <span className="text-3xl">🌳</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Mariya's Scholarship & Job Garden</h1>
              <p className="text-emerald-100 mt-1 text-lg">
                🌿 Curated opportunities for Ukrainian-Jewish students in Geography, GIS & Environmental Sciences 🌍
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mt-6 mb-6">
            <button
              onClick={() => handleTabChange('scholarships')}
              className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'scholarships'
                  ? 'bg-white text-emerald-600 shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
              }`}
            >
              🎓 Scholarships
            </button>
            <button
              onClick={() => handleTabChange('jobs')}
              className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all duration-300 ${
                activeTab === 'jobs'
                  ? 'bg-white text-teal-600 shadow-lg scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
              }`}
            >
              💼 Jobs
            </button>
          </div>

          {/* Stats - nature cards */}
          <div className="flex flex-wrap gap-4">
            {activeTab === 'scholarships' ? (
              <>
                <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/30">
                  <p className="text-emerald-100 text-xs font-medium">🎓 Total Scholarships</p>
                  <p className="text-3xl font-bold">{scholarships.length}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/30">
                  <p className="text-emerald-100 text-xs font-medium">🔍 Showing</p>
                  <p className="text-3xl font-bold">{filteredScholarships.length}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/30">
                  <p className="text-emerald-100 text-xs font-medium">💰 Potential</p>
                  <p className="text-3xl font-bold">${totalAmount}+</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/30">
                  <p className="text-emerald-100 text-xs font-medium">🌱 Saved</p>
                  <p className="text-3xl font-bold">{favorites.size}</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/30">
                  <p className="text-emerald-100 text-xs font-medium">💼 Total Jobs</p>
                  <p className="text-3xl font-bold">{jobs.length}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/30">
                  <p className="text-emerald-100 text-xs font-medium">🔍 Showing</p>
                  <p className="text-3xl font-bold">{filteredJobs.length}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/30">
                  <p className="text-emerald-100 text-xs font-medium">🏢 Organizations</p>
                  <p className="text-3xl font-bold">{new Set(jobs.map(j => j.organization)).size}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/30">
                  <p className="text-emerald-100 text-xs font-medium">🌱 Saved</p>
                  <p className="text-3xl font-bold">{jobFavorites.size}</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Nature wave decoration */}
        <svg className="absolute bottom-0 left-0 w-full h-8 text-emerald-50" preserveAspectRatio="none" viewBox="0 0 1200 40">
          <path fill="currentColor" d="M0,40 C150,30 300,40 450,25 C600,10 750,35 900,20 C1050,5 1150,30 1200,25 L1200,40 L0,40 Z"/>
        </svg>
      </header>

      {/* Filters - nature version */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className={`bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border-2 p-6 ${
          activeTab === 'scholarships'
            ? 'shadow-emerald-100/50 border-emerald-100'
            : 'shadow-teal-100/50 border-teal-100'
        }`}>
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder={activeTab === 'scholarships' ? "🔍 Search scholarships..." : "🔍 Search jobs..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-3.5 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all text-gray-700 font-medium ${
                  activeTab === 'scholarships'
                    ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200 focus:ring-emerald-200 focus:border-emerald-400 placeholder-emerald-400'
                    : 'bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200 focus:ring-teal-200 focus:border-teal-400 placeholder-teal-400'
                }`}
              />
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              {activeTab === 'scholarships' ? (
                categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                      selectedCategory === cat
                        ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-200 scale-105'
                        : 'bg-white text-emerald-600 hover:bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-300 hover:scale-105'
                    }`}
                  >
                    {cat === 'All' ? '🌲 All' : cat}
                  </button>
                ))
              ) : (
                jobCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedJobCategory(cat)}
                    className={`px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                      selectedJobCategory === cat
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-200 scale-105'
                        : 'bg-white text-teal-600 hover:bg-teal-50 border-2 border-teal-200 hover:border-teal-300 hover:scale-105'
                    }`}
                  >
                    {cat === 'All' ? '💼 All' : cat}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Secondary filters */}
          <div className={`flex flex-wrap items-center gap-4 mt-5 pt-5 border-t-2 ${
            activeTab === 'scholarships' ? 'border-emerald-100' : 'border-teal-100'
          }`}>
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                showFavoritesOnly
                  ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg shadow-rose-200'
                  : 'bg-white text-rose-500 hover:bg-rose-50 border-2 border-rose-200 hover:border-rose-300'
              }`}
            >
              <HeartIcon filled={showFavoritesOnly} />
              <span>🌷 My Favorites</span>
            </button>

            <div className={`flex items-center gap-3 px-4 py-2 rounded-2xl border-2 ${
              activeTab === 'scholarships'
                ? 'bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200'
                : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
            }`}>
              <span className={`text-sm font-medium ${activeTab === 'scholarships' ? 'text-teal-600' : 'text-blue-600'}`}>🍃 Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-3 py-1.5 bg-white border-2 rounded-xl text-sm focus:outline-none focus:ring-2 font-medium cursor-pointer ${
                  activeTab === 'scholarships'
                    ? 'border-teal-200 focus:ring-teal-300 text-teal-700'
                    : 'border-blue-200 focus:ring-blue-300 text-blue-700'
                }`}
              >
                <option value="match">🌳 Best Match</option>
                {activeTab === 'scholarships' ? (
                  <option value="amount">💰 Highest Amount</option>
                ) : (
                  <option value="salary">💵 Highest Salary</option>
                )}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 pb-16">
        {activeTab === 'scholarships' ? (
          // Scholarships view
          filteredScholarships.length === 0 ? (
            <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border-2 border-emerald-100 shadow-lg">
              <div className="text-7xl mb-4 animate-sway">🌱</div>
              <h3 className="text-2xl font-bold text-emerald-600 mb-3">No scholarships found yet!</h3>
              <p className="text-gray-500 text-lg">Try adjusting your filters or search terms 🍃</p>
              <p className="text-emerald-400 mt-2">Your perfect opportunity is growing somewhere! 🌿</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredScholarships.map(scholarship => (
                <ScholarshipCard
                  key={scholarship.id}
                  scholarship={scholarship}
                  isFavorite={favorites.has(scholarship.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          )
        ) : (
          // Jobs view
          filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-3xl border-2 border-teal-100 shadow-lg">
              <div className="text-7xl mb-4 animate-sway">💼</div>
              <h3 className="text-2xl font-bold text-teal-600 mb-3">No jobs found yet!</h3>
              <p className="text-gray-500 text-lg">Try adjusting your filters or search terms 🍃</p>
              <p className="text-teal-400 mt-2">Your perfect job is out there! 🌿</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  isFavorite={jobFavorites.has(job.id)}
                  onToggleFavorite={toggleJobFavorite}
                />
              ))}
            </div>
          )
        )}
      </main>

      {/* Footer - nature version */}
      <footer className="relative z-10 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 text-lg">
            <span>🌿</span>
            <span>Made with</span>
            <span className="text-2xl animate-pulse">💚</span>
            <span>for Mariya's scholarship journey</span>
            <span>🌿</span>
          </div>
          <p className="text-emerald-100 text-sm mt-3">
            🍃 Last updated: January 2026 • Always verify deadlines on official websites 🍃
          </p>
          <div className="mt-4 flex justify-center gap-2 text-2xl">
            <span className="animate-sway" style={{animationDelay: '0s'}}>🌲</span>
            <span className="animate-sway" style={{animationDelay: '0.3s'}}>🌳</span>
            <span className="animate-sway" style={{animationDelay: '0.6s'}}>🌴</span>
            <span className="animate-sway" style={{animationDelay: '0.9s'}}>🌿</span>
            <span className="animate-sway" style={{animationDelay: '1.2s'}}>🍀</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
