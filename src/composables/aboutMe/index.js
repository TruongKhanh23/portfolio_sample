export function convertAboutMeToLocalizedObjects(inputObject) {
  const outputObjectEn = {
    title: inputObject.title["en-US"],
    description: inputObject.description["en-US"].content,
    githubStars: inputObject.githubStars["en-US"],
    yearsExperience: inputObject.yearsExperience["en-US"],
    positiveFeedback: inputObject.positiveFeedback["en-US"],
    projectsCompleted: inputObject.projectsCompleted["en-US"],
  };

  const outputObjectVi = {
    title: inputObject.title["en-US"],
    description: inputObject.description["vi"].content,
    githubStars: inputObject.githubStars["en-US"],
    yearsExperience: inputObject.yearsExperience["en-US"],
    positiveFeedback: inputObject.positiveFeedback["en-US"],
    projectsCompleted: inputObject.projectsCompleted["en-US"],
  };

  return { en: outputObjectEn, vi: outputObjectVi };
}