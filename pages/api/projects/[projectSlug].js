import { collection, query, where, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@firebase/index';

/**
 * Get all the information of a given array of id's from a specific collection.
 * @param {string} collection
 * @param {Array} ids
 * @returns Array
 */
const readIds = async (collection, ids) => {
  const reads = ids.map((id) => {
    const docRef = doc(db, collection, id);
    return getDoc(docRef);
  });
  const docs = await Promise.all(reads);
  return docs.map((doc) => doc.data());
};

/**
 * Function to get a specific project from the firebase database
 * @param {string} slug
 * @returns Object
 */
const getProject = async (slug) => {
  try {
    let project = {};
    const projectQuery = query(collection(db, 'projects'), where('slug', '==', slug));
    const docs = await getDocs(projectQuery);
    // Get data from first document
    docs.forEach((doc) => {
      project = { id: doc.id, ...doc.data() };
    });
    // Populate technologies array
    const technologies = await readIds('technologies', project.technologies);
    const projectPopulated = { ...project, technologies };
    return projectPopulated;
  } catch (err) {
    console.log(err);
  }
};

export default async function handler(req, res) {
  const { projectSlug } = req.query;
  const project = await getProject(projectSlug);
  res.status(200).json({ project });
}

export { getProject };
