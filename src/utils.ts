export const getToken = () =>
  new Promise<string | undefined>((resolve) => {
    setTimeout(() => {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("Authorization="))
        ?.split("=")[1];
      resolve(token);
    }, 100);
  });
