import { collection, getDocs } from 'firebase/firestore';
import { db } from '@firebase/index';

const getProjects = async () => {
  try {
    const projects = [];
    const projectsRef = collection(db, 'projects');
    const docs = await getDocs(projectsRef);
    docs.forEach((doc) => {
      projects.push({ id: doc.id, ...doc.data() });
    });
    return projects;
  } catch (err) {
    console.log(err);
  }
};

export default async function handler(req, res) {
  const projects = await getProjects();
  res.status(200).json({ projects });
}
