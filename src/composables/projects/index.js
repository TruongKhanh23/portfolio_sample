export async function getProjects() {
  const query = `{
  projectCollection {
    items{
      sys {id}
      title
    date
    category
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
    }
  }
}`;

  const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.VUE_APP_CONTENTFUL_SPACE_ID}`;

  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };

  try {
    const response = await fetch(fetchUrl, fetchOptions).then((response) =>
      response.json()
    );
    console.log(
      "projectCollection.value",
      response.data.projectCollection.items
    );
    return response.data.projectCollection.items;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error);
    throw new Error("Could not receive the data from Contentful!");
  }
}
