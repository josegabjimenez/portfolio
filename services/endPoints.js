const API = process.env.NEXT_PUBLIC_API_URL;

const endPoints = {
  projects: {
    get: `${API}/projects`,
  },
};

export default endPoints;
