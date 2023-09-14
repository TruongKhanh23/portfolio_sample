// Projects data.
// Note: Here we are getting data from a js file, but in a different project I'll be fetching these projects from some srt of APIs.

const projects = [
  {
    id: 1,
    header: {
      title: "Sale Online Platform",
      date: "07/09/2023",
      tags: ["Backend", "Frontend", "VueJS", "TailwindCSS"],
    },
    category: "Web Application",
    img: require("@/assets/images/projects/sop/sop_2.png"),
    projectImages: [
      require("@/assets/images/projects/sop/sop_1.png"),
      require("@/assets/images/projects/sop/sop_2.png"),
      require("@/assets/images/projects/sop/sop_3.png"),
    ],
    projectInfo: {
      companyInfos: [
        "Dai-ichi: Dai-ichi Life Vietnam",
        "Services: Website/Portal",
        "Website: <a href='https://e.dai-ichi-life.com.vn' class='hover:underline cursor-pointer' target='_blank'>https://e.dai-ichi-life.com.vn</a>",
        "Phone: N/A",
      ],
      objectivesDetails:
        "Để mang đến trải nghiệm bảo hiểm thuận tiện và tin cậy, vượt bậc trong việc cung cấp dịch vụ bảo hiểm dễ dàng, linh hoạt và tiện lợi.",
      technologies: [
        {
          techs: [
            "VueJS",
            "TailwindCSS",
            "JavaScript",
            "Java",
            "GraphQL",
          ],
        },
      ],
      projectDetails: [
        "Xu hướng số hóa và công nghệ ngày càng thay đổi mọi người tiếp cận và sử dụng dịch vụ. Để mang đến trải nghiệm bảo hiểm thuận tiện và tin cậy, tôi trân trọng giới thiệu tới Anh/Chị nền tảng bảo hiểm trực tuyến mới Dai-ichi ON, một bước tiến vượt bậc trong việc cung cấp dịch vụ bảo hiểm dễ dàng, linh hoạt và tiện lợi",
        "Với nền tảng Bán bảo hiểm trực tuyến Dai-ichi ON, Dai-ichi Life Việt Nam mong muốn mở rộng phạm vi tiếp cận và đáp ứng nhu cầu bảo vệ tài chính của mọi người, khách hàng không còn phải mất thời gian đến các văn phòng hay tư vấn trực tiếp, khách hàng có thể dễ dàng tham gia bảo hiểm 24/7 mọi lúc mọi nơi. Dai-ichi ON giúp khách hàng có cơ hội tự tìm hiểu, trải nghiệm sản phẩm bảo hiểm và tự tin khi tham gia các giải pháp bảo hiểm cao cấp và toàn diện hơn."
      ],
    },
  },
  {
    id: 2,
    header: {
      title: "Postkan Chat App",
      date: "Jul 26, 2020",
      tags: ["Backend", "Frontend", "Mobile", "Android"],
    },
    category: "Mobile Android Application",
    img: require("@/assets/images/projects/chatApp/chatApp_1.png"),
    projectImages: [
      require("@/assets/images/projects/chatApp/chatApp_1.png"),
      require("@/assets/images/projects/chatApp/chatApp_2.png"),
      require("@/assets/images/projects/chatApp/chatApp_3.png"),
      require("@/assets/images/projects/chatApp/chatApp_4.png"),
      require("@/assets/images/projects/chatApp/chatApp_5.png"),
      require("@/assets/images/projects/chatApp/chatApp_6.png"),
      require("@/assets/images/projects/chatApp/chatApp_7.png"),
    ],
    projectInfo: {
      companyInfos: [
        "Personal: Mobile Development Course",
        "Services: Mobile/Android Application",
        "Mobile: N/A",
        "Phone: N/A",
      ],
      objectivesDetails:
        "The Postkan Chatting App developed for learning mobile device programming and providing the solution chat for people easily close together",
      technologies: [
        {
          techs: [
            "Java",
            "Firebase",
          ],
        },
      ],
      projectDetails: [
        "The Postkan Chatting App developed for learning mobile device programming and providing the solution chat for people easily close together.",
        "Non Functional Requirement: Security: Validate the information from user: email, username, password, … Usability: Easy to use, see, close, chat, …Wrong input - only enter it – not completely. Supportability: The PCA operate correctly with all devices that use the android operating system",
        "Technologies: BACK-END with JAVA: Using programming language is JAVA. A popular programming language in: Desktop, Mobile, Web, Games, …. DATABASE with FIREBASE: Build & run successful apps with NoSQL - an approach to database management a wide variety of data models, with high speed, easy to updates fields, friendly, …",
        "Functions: SIGN UP, SIGN IN with Email, Password, SIGN IN with Google Account, FORGOT/ RESET PASSWORD, CHAT LIST – FRIEND LIST, CHAT DETAIL, FEEDBACK, ACCOUNT SETTING, ABOUT US.",
      ],
    },
  },
  {
    id: 3,
    header: {
      title: "APD Website",
      date: "Jul 26, 2020",
      tags: ["Backend", "Frontend"],
    },
    category: "API",
    img: require("@/assets/images/ui-project-1.jpg"),
    projectImages: [
      require("@/assets/images/ui-project-1.jpg"),
      require("@/assets/images/web-project-2.jpg"),
      require("@/assets/images/mobile-project-2.jpg"),
      require("@/assets/images/web-project-2.jpg"),
    ],
    projectInfo: {
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
          techs: [
            "HTML",
            "CSS",
            "JavaScript",
            "Laravel",
            "TailwindCSS",
            "MySql",
          ],
        },
      ],
      projectDetails: [
        "Tens of thousands of Cambodia’s young population enter the labor force each year. Labor force participation among the working age population (15–64 years) increased from 7.7 million in 2009 to 8.3 million in 2015. While the country is endowed with an ample supply of labor, the labor force is still characterized by very low levels of education and skill. The average educational attainment of the current workforce is primary school completion (grade 6) or below—a major barrier to industrial diversification efforts and moving up the value chain. The 2015 Cambodia Socio-Economic Survey found that nearly half (46%) of the labor force have either not completed primary education or never attended school. Less than 7% of workers completed high school (grade 12). There is a pressing need to respond to the growing demand for an adaptable workforce with professional skills and proper workplace behavior. In response, the government has taken steps to reform and strengthen the education and training system, including an enhanced role of the private sector in skills development and providing incentives to enterprises to train their own workforce. The pilot Skills Development Fund (SDF) is an industry-driven workforce development program. The general notion is to build confidence in industry partnership and to engage more strongly with the private sector and their training needs. Firms willing but at times hesitant to further develop their workforce may be supported by the SDF to further invest in workforce development. Motivated private workforce development initiatives and intentions shall be mainly supported by the SDF (which in turn consists of a motivated, skilled, and client-oriented team).",
      ],
    },
  },
  {
    id: 4,
    header: {
      title: "Staff Management",
      date: "Jul 26, 2020",
      tags: ["Backend", "Frontend"],
    },
    category: "Microservice",
    img: require("@/assets/images/ui-project-2.jpg"),
    projectImages: [
      require("@/assets/images/ui-project-1.jpg"),
      require("@/assets/images/web-project-2.jpg"),
      require("@/assets/images/mobile-project-2.jpg"),
      require("@/assets/images/web-project-2.jpg"),
    ],
    projectInfo: {
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
          techs: [
            "HTML",
            "CSS",
            "JavaScript",
            "Laravel",
            "TailwindCSS",
            "MySql",
          ],
        },
      ],
      projectDetails: [
        "Tens of thousands of Cambodia’s young population enter the labor force each year. Labor force participation among the working age population (15–64 years) increased from 7.7 million in 2009 to 8.3 million in 2015. While the country is endowed with an ample supply of labor, the labor force is still characterized by very low levels of education and skill. The average educational attainment of the current workforce is primary school completion (grade 6) or below—a major barrier to industrial diversification efforts and moving up the value chain. The 2015 Cambodia Socio-Economic Survey found that nearly half (46%) of the labor force have either not completed primary education or never attended school. Less than 7% of workers completed high school (grade 12). There is a pressing need to respond to the growing demand for an adaptable workforce with professional skills and proper workplace behavior. In response, the government has taken steps to reform and strengthen the education and training system, including an enhanced role of the private sector in skills development and providing incentives to enterprises to train their own workforce. The pilot Skills Development Fund (SDF) is an industry-driven workforce development program. The general notion is to build confidence in industry partnership and to engage more strongly with the private sector and their training needs. Firms willing but at times hesitant to further develop their workforce may be supported by the SDF to further invest in workforce development. Motivated private workforce development initiatives and intentions shall be mainly supported by the SDF (which in turn consists of a motivated, skilled, and client-oriented team).",
      ],
    },
  },
  {
    id: 5,
    header: {
      title: "SportDate",
      date: "Jul 26, 2020",
      tags: ["Backend", "Frontend"],
    },
    category: "Mobile Application",
    img: require("@/assets/images/mobile-project-1.jpg"),
    projectImages: [
      require("@/assets/images/ui-project-1.jpg"),
      require("@/assets/images/web-project-2.jpg"),
      require("@/assets/images/mobile-project-2.jpg"),
      require("@/assets/images/web-project-2.jpg"),
    ],
    projectInfo: {
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
          techs: [
            "HTML",
            "CSS",
            "JavaScript",
            "Laravel",
            "TailwindCSS",
            "MySql",
          ],
        },
      ],
      projectDetails: [
        "Tens of thousands of Cambodia’s young population enter the labor force each year. Labor force participation among the working age population (15–64 years) increased from 7.7 million in 2009 to 8.3 million in 2015. While the country is endowed with an ample supply of labor, the labor force is still characterized by very low levels of education and skill. The average educational attainment of the current workforce is primary school completion (grade 6) or below—a major barrier to industrial diversification efforts and moving up the value chain. The 2015 Cambodia Socio-Economic Survey found that nearly half (46%) of the labor force have either not completed primary education or never attended school. Less than 7% of workers completed high school (grade 12). There is a pressing need to respond to the growing demand for an adaptable workforce with professional skills and proper workplace behavior. In response, the government has taken steps to reform and strengthen the education and training system, including an enhanced role of the private sector in skills development and providing incentives to enterprises to train their own workforce. The pilot Skills Development Fund (SDF) is an industry-driven workforce development program. The general notion is to build confidence in industry partnership and to engage more strongly with the private sector and their training needs. Firms willing but at times hesitant to further develop their workforce may be supported by the SDF to further invest in workforce development. Motivated private workforce development initiatives and intentions shall be mainly supported by the SDF (which in turn consists of a motivated, skilled, and client-oriented team).",
      ],
    },
  },
  {
    id: 6,
    header: {
      title: "POS Camcyber",
      date: "Jul 26, 2020",
      tags: ["Backend", "Frontend"],
    },
    category: "Web Application",
    img: require("@/assets/images/web-project-1.jpg"),
    projectImages: [
      require("@/assets/images/ui-project-1.jpg"),
      require("@/assets/images/web-project-2.jpg"),
      require("@/assets/images/mobile-project-2.jpg"),
      require("@/assets/images/web-project-2.jpg"),
    ],
    projectInfo: {
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
          techs: [
            "HTML",
            "CSS",
            "JavaScript",
            "Laravel",
            "TailwindCSS",
            "MySql",
          ],
        },
      ],
      projectDetails: [
        "Tens of thousands of Cambodia’s young population enter the labor force each year. Labor force participation among the working age population (15–64 years) increased from 7.7 million in 2009 to 8.3 million in 2015. While the country is endowed with an ample supply of labor, the labor force is still characterized by very low levels of education and skill. The average educational attainment of the current workforce is primary school completion (grade 6) or below—a major barrier to industrial diversification efforts and moving up the value chain. The 2015 Cambodia Socio-Economic Survey found that nearly half (46%) of the labor force have either not completed primary education or never attended school. Less than 7% of workers completed high school (grade 12). There is a pressing need to respond to the growing demand for an adaptable workforce with professional skills and proper workplace behavior. In response, the government has taken steps to reform and strengthen the education and training system, including an enhanced role of the private sector in skills development and providing incentives to enterprises to train their own workforce. The pilot Skills Development Fund (SDF) is an industry-driven workforce development program. The general notion is to build confidence in industry partnership and to engage more strongly with the private sector and their training needs. Firms willing but at times hesitant to further develop their workforce may be supported by the SDF to further invest in workforce development. Motivated private workforce development initiatives and intentions shall be mainly supported by the SDF (which in turn consists of a motivated, skilled, and client-oriented team).",
      ],
    },
  },
  {
    id: 7,
    header: {
      title: "SDF Cambodia",
      date: "Jul 26, 2020",
      tags: ["Backend", "Frontend"],
    },
    category: "Web Application",
    img: require("@/assets/images/web-project-2.jpg"),
    projectImages: [
      require("@/assets/images/ui-project-1.jpg"),
      require("@/assets/images/web-project-2.jpg"),
      require("@/assets/images/mobile-project-2.jpg"),
      require("@/assets/images/web-project-2.jpg"),
    ],
    projectInfo: {
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
          techs: [
            "HTML",
            "CSS",
            "JavaScript",
            "Laravel",
            "TailwindCSS",
            "MySql",
          ],
        },
      ],
      projectDetails: [
        "Tens of thousands of Cambodia’s young population enter the labor force each year. Labor force participation among the working age population (15–64 years) increased from 7.7 million in 2009 to 8.3 million in 2015. While the country is endowed with an ample supply of labor, the labor force is still characterized by very low levels of education and skill. The average educational attainment of the current workforce is primary school completion (grade 6) or below—a major barrier to industrial diversification efforts and moving up the value chain. The 2015 Cambodia Socio-Economic Survey found that nearly half (46%) of the labor force have either not completed primary education or never attended school. Less than 7% of workers completed high school (grade 12). There is a pressing need to respond to the growing demand for an adaptable workforce with professional skills and proper workplace behavior. In response, the government has taken steps to reform and strengthen the education and training system, including an enhanced role of the private sector in skills development and providing incentives to enterprises to train their own workforce. The pilot Skills Development Fund (SDF) is an industry-driven workforce development program. The general notion is to build confidence in industry partnership and to engage more strongly with the private sector and their training needs. Firms willing but at times hesitant to further develop their workforce may be supported by the SDF to further invest in workforce development. Motivated private workforce development initiatives and intentions shall be mainly supported by the SDF (which in turn consists of a motivated, skilled, and client-oriented team).",
      ],
    },
  },  
  {
    id: 8,
    category: "Web Application",
    img: require("@/assets/images/mobile-project-2.jpg"),
    header: {
      title: "SDF Cambodia",
      date: "Jul 26, 2020",
      tags: ["Backend", "Frontend"],
    },
    projectImages: [
      require("@/assets/images/ui-project-1.jpg"),
      require("@/assets/images/web-project-2.jpg"),
      require("@/assets/images/mobile-project-2.jpg"),
      require("@/assets/images/web-project-2.jpg"),
    ],
    projectInfo: {
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
          techs: [
            "HTML",
            "CSS",
            "JavaScript",
            "Laravel",
            "TailwindCSS",
            "MySql",
          ],
        },
      ],
      projectDetails: [
        "Tens of thousands of Cambodia’s young population enter the labor force each year. Labor force participation among the working age population (15–64 years) increased from 7.7 million in 2009 to 8.3 million in 2015. While the country is endowed with an ample supply of labor, the labor force is still characterized by very low levels of education and skill. The average educational attainment of the current workforce is primary school completion (grade 6) or below—a major barrier to industrial diversification efforts and moving up the value chain. The 2015 Cambodia Socio-Economic Survey found that nearly half (46%) of the labor force have either not completed primary education or never attended school. Less than 7% of workers completed high school (grade 12). There is a pressing need to respond to the growing demand for an adaptable workforce with professional skills and proper workplace behavior. In response, the government has taken steps to reform and strengthen the education and training system, including an enhanced role of the private sector in skills development and providing incentives to enterprises to train their own workforce. The pilot Skills Development Fund (SDF) is an industry-driven workforce development program. The general notion is to build confidence in industry partnership and to engage more strongly with the private sector and their training needs. Firms willing but at times hesitant to further develop their workforce may be supported by the SDF to further invest in workforce development. Motivated private workforce development initiatives and intentions shall be mainly supported by the SDF (which in turn consists of a motivated, skilled, and client-oriented team).",
      ],
    },
  },
];

export default projects;
