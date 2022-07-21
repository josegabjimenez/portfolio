import { collection, getDocs } from 'firebase/firestore';
import { db } from '@firebase/index';

const getSkills = async () => {
  const skills = [];
  const technologiesRef = collection(db, 'technologies');
  const docs = await getDocs(technologiesRef);
  docs.forEach((doc) => {
    const data = doc.data();
    if (data.is_skill) {
      skills.push({ id: doc.id, ...data });
    }
  });
  return skills;
};

export default async function handler(req, res) {
  const skills = await getSkills();
  res.status(200).json({ skills });
}

export { getSkills };
