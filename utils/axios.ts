import axios from "axios";
const instance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_API_URL}api/`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Rlc3QxLmFsa2h6YW5hLmNvbS9hcGkvbG9naW4iLCJpYXQiOjE3NTM3MDg4MzksImV4cCI6Nzc1MzcwODc3OSwibmJmIjoxNzUzNzA4ODM5LCJqdGkiOiJlWTYzVVBzanU4NWxrRGhWIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.TCCaVMSCMiyKh-cxnxHgg6iAMCc04PZ70ZvtORUFj9w`,
  },
  //   headers: {
  //     "Content-Type": "multipart/form-data",
  //   },
});

// instance.interceptors.request.use(
//   async (config) => {
//     const token = await AsyncStorage.getItem("token");
//     if (token) {
//       config.headers.Authorization = `
//     }
//     return config;
//   },
//   (err) => Promise.reject(err)
// );

export default instance;
