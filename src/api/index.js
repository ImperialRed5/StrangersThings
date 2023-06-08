export const COHORT_NAME = "2303-FTB-ET-WEB-PT";
export const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}/`;

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${BASE_URL}posts`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
