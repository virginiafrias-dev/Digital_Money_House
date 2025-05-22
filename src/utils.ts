export const getToken = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("Authorization="))
    ?.split("=")[1];

  return token;
};
