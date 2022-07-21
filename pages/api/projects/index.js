import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
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
 * Get all the projects from the firebase database
 * @returns Array
 */
const getProjects = async () => {
  try {
    const projects = [];
    const projectsRef = collection(db, 'projects');
    const docs = await getDocs(projectsRef);
    docs.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    // Populate technologies array
    const projectsPopulated = await Promise.all(
      projects.map(async (project) => {
        const { technologies } = project;
        const technologiesPopulated = await readIds('technologies', technologies);
        return { ...project, technologies: technologiesPopulated };
      })
    );
    return projectsPopulated;
  } catch (err) {
    console.log(err);
  }
};

export default async function handler(req, res) {
  const projects = await getProjects();
  res.status(200).json({ projects });
}

export { getProjects };
