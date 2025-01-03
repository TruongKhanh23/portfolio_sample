export async function getProjects(locale = "vi") {
  const query = `{
  projectCollection (locale: "${locale}") {
    items{
      sys {id}
      title
    date
    category
    demo
    tags
    thumbnail {
      fileName
      url
    }
    projectImagesCollection {
      items {
        fileName
        url
      }
    }
    customerInfomations {
      json
    }
    objectivesDetails {
      json
    }
    technologies
    projectDetails {
      json
    }
    socialNetwork
    }
  }
}`;

  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${window.envConfig.CONTENTFUL_SPACE_ID}/environments/${window.envConfig.ENVIRONMENT}`;

  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${window.envConfig.CONTENTFUL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(fetchUrl, fetchOptions).then((response) =>
      response.json()
    );

    return response.data.projectCollection.items;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    throw new Error("Could not receive the data from Contentful!");
  }
}

export async function getProjectById(id, locale = "vi") {
  const query = `{
    projectCollection (locale: "${locale}", where: { sys: { id: "${id}" } }) {
      items {
        sys { id }
        title
        date
        category
        tags
        thumbnail {
          fileName
          url
        }
        projectImagesCollection {
          items {
            fileName
            url
          }
        }
        customerInfomations {
          json
        }
        objectivesDetails {
          json
        }
        technologies
        projectDetails {
          json
        }
        socialNetwork
      }
    }
  }`;

  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${window.envConfig.CONTENTFUL_SPACE_ID}/environments/${window.envConfig.ENVIRONMENT}`;

  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${window.envConfig.CONTENTFUL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(fetchUrl, fetchOptions).then((response) =>
      response.json()
    );
    const items = response.data.projectCollection.items;
    if (items.length > 0) {
      return convertSingleProjectStructure(items[0]);
    } else {
      throw new Error(`Project with id "${id}" not found`);
    }
  } catch (error) {
    console.error("Error fetching project by id from Contentful:", error);
    throw new Error("Could not receive the project data from Contentful!");
  }
}

export function convertSingleProjectStructure(project) {
  const convertProject = {
    id: project.sys.id,
    header: {
      title: project.title,
      date: project.date,
      tags: project.tags,
      demo: project.demo,
    },
    category: project.category,
    img: project.thumbnail,
    projectImages: project.projectImagesCollection.items,
    projectInfo: {
      companyInfos: project.customerInfomations.json.content,
      objectivesDetails: project.objectivesDetails.json.content,
      technologies: project.technologies,
      projectDetails: project.projectDetails.json.content,
      socialNetwork: project.socialNetwork,
    },
  };
  console.log("convertProjectStructure", convertProject);

  return convertProject;
}

export function convertProjectStructure(projects) {
  const convertProjects = [];
  for (const project of projects) {
    convertProjects.push({
      id: project.sys.id,
      header: {
        title: project.title,
        date: project.date,
        tags: project.tags,
        demo: project.demo,
      },
      category: project.category,
      img: project.thumbnail,
      projectImages: project.projectImagesCollection.items,
      projectInfo: {
        companyInfos: project.customerInfomations.json.content,
        objectivesDetails: project.objectivesDetails.json.content,
        technologies: project.technologies,
        projectDetails: project.projectDetails.json.content,
        socialNetwork: project.socialNetwork,
      },
    });
  }
  return convertProjects;
}
