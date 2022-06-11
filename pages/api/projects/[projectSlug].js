import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@firebase/index';

const getProject = async (slug) => {
  try {
    let project = {};
    const projectQuery = query(collection(db, 'projects'), where('slug', '==', slug));
    const docs = await getDocs(projectQuery);
    docs.forEach((doc) => {
      project = { id: doc.id, ...doc.data() };
    });
    return project;
  } catch (err) {
    console.log(err);
  }
};

export default async function handler(req, res) {
  const { projectSlug } = req.query;
  const project = await getProject(projectSlug);
  res.status(200).json({ project });
}
