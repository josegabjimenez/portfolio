const API = process.env.NEXT_PUBLIC_API_URL;

const endPoints = {
  projects: {
    getAll: `${API}/projects`,
    get: (id) => `${API}/projects/${id}`,
  },
};

export default endPoints;
