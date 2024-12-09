export const GetPoints = async (): Promise<number> => {
  const response = await fetch("http://localhost:5053/api/ranking/user", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch points");
  }
  const data = await response.json();
  return data;
};

export default GetPoints;
