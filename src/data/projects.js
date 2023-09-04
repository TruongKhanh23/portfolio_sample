// Projects data.
// Note: Here we are getting data from a js file, but in a different project I'll be fetching these projects from some srt of APIs.

const projects = [
  {
    id: 1,
    title: "SDF Cambodia",
    date: "Jul 26, 2020",
    category: "Web Application",
    tags: "Backend/Frontend",
    img: require("@/assets/images/web-project-2.jpg"),
    projectImages: [
      require("@/assets/images/ui-project-1.jpg"),
      require("@/assets/images/web-project-2.jpg"),
      require("@/assets/images/mobile-project-2.jpg"),
      require("@/assets/images/web-project-2.jpg"),
    ],
    companyInfos: [
      "MEF: Ministry of Economy and Finance",
      "Services: Website/Portal",
      "Website: <a class='hover:underline cursor-pointer'>http://www.sdfcambodia.org/kh/home</a>",
      "Phone: N/A",
    ],
    objectivesDetails:
      "To be the most trusted financing platform for sustainable and demand-driven skill development.",
    technologies: [
      {
        techs: ["HTML", "CSS", "JavaScript", "Laravel", "TailwindCSS", "MySql"],
      },
    ],
    projectDetails: [
      "Tens of thousands of Cambodia’s young population enter the labor force each year. Labor force participation among the working age population (15–64 years) increased from 7.7 million in 2009 to 8.3 million in 2015. While the country is endowed with an ample supply of labor, the labor force is still characterized by very low levels of education and skill. The average educational attainment of the current workforce is primary school completion (grade 6) or below—a major barrier to industrial diversification efforts and moving up the value chain. The 2015 Cambodia Socio-Economic Survey found that nearly half (46%) of the labor force have either not completed primary education or never attended school. Less than 7% of workers completed high school (grade 12). There is a pressing need to respond to the growing demand for an adaptable workforce with professional skills and proper workplace behavior. In response, the government has taken steps to reform and strengthen the education and training system, including an enhanced role of the private sector in skills development and providing incentives to enterprises to train their own workforce. The pilot Skills Development Fund (SDF) is an industry-driven workforce development program. The general notion is to build confidence in industry partnership and to engage more strongly with the private sector and their training needs. Firms willing but at times hesitant to further develop their workforce may be supported by the SDF to further invest in workforce development. Motivated private workforce development initiatives and intentions shall be mainly supported by the SDF (which in turn consists of a motivated, skilled, and client-oriented team).",
    ],
  },
  {
    id: 2,
    title: "SAHAKA",
    category: "Web Application",
    img: require("@/assets/images/mobile-project-2.jpg"),
  },
  {
    id: 3,
    title: "APD Website",
    category: "API",
    img: require("@/assets/images/ui-project-1.jpg"),
  },
  {
    id: 4,
    title: "Staff Management",
    category: "Microservice",
    img: require("@/assets/images/ui-project-2.jpg"),
  },
  {
    id: 5,
    title: "SportDate",
    category: "Mobile Application",
    img: require("@/assets/images/mobile-project-1.jpg"),
  },
  {
    id: 6,
    title: "POS Camcyber",
    category: "Web Application",
    img: require("@/assets/images/web-project-1.jpg"),
  },
];

export default projects;
