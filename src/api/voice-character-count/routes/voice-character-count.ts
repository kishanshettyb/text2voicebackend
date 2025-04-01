export default {
  routes: [
    {
      method: "GET",
      path: "/total-character-count/:userDocumentId",
      handler: "voice-character-count.getTotalCharacterCount",
    },
  ],
};
