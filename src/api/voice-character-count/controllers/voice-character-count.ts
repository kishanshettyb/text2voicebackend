// export default {
//   async getVoiceCharacterCount(ctx) {
//     try {
//       const userId = ctx.params.userId; // Assuming you pass the userId as a parameter
//       const voices = await strapi.query("api::voice.voice").findMany({
//         where: { users_permissions_user: { documentId: userId } },
//       });

//       let totalCharacterCount = 0;
//       voices.forEach((voice) => {
//         totalCharacterCount += voice.character_count;
//       });

//       ctx.body = {
//         totalCharacterCount,
//       };
//     } catch (err) {
//       ctx.body = {
//         error: "An error occurred while fetching the voice character count",
//         details: err instanceof Error ? err.message : "Unknown error",
//       };
//       ctx.status = 500; // Set the HTTP status code to 500 to indicate a server error
//     }
//   },
// };
import _ from "lodash"; // Import lodash

export default {
  async getTotalCharacterCount(ctx) {
    try {
      const userDocumentId = ctx.params.userDocumentId;

      const voices = await strapi.query("api::voice.voice").findMany({
        where: {
          users_permissions_user: {
            documentId: userDocumentId,
          },
        },
      });

      // Use lodash to get unique documentIds
      const uniqueVoices = _.uniqBy(voices, "documentId");

      console.log("Unique Voices Data:", uniqueVoices);

      let totalCharacterCount = 0;
      uniqueVoices.forEach((voice) => {
        if (
          voice.character_count !== null &&
          voice.character_count !== undefined
        ) {
          totalCharacterCount += voice.character_count;
        }
      });

      ctx.body = {
        totalCharacterCount,
      };
    } catch (err) {
      ctx.body = {
        error: "An error occurred while fetching the total character count",
        details: err instanceof Error ? err.message : "Unknown error",
      };
      ctx.status = 500;
    }
  },
};
