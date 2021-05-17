const { bot } = require("./bot");

const getResponseHeaders = () => ({
  "Access-Control-Allow-Origin": "*",
});

exports.index = async (event) => {
  try {
    const body = JSON.parse(event.body);
    console.log(body);

    await bot.handleUpdate(body);

    return {
      statusCode: 200,
      headers: getResponseHeaders(),
      body: JSON.stringify({
        message: "Ok",
      }),
    };
  } catch (err) {
    console.log("Error: ", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      headers: getResponseHeaders(),
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};

exports.setWebhook = async (event) => {
  try {
    let url = `https://${event.headers.Host}/${event.requestContext.stage}/webhook`;

    await bot.telegram.setWebhook(url);

    return {
      statusCode: 200,
      headers: getResponseHeaders(),
      body: JSON.stringify({ url }),
    };
  } catch (err) {
    console.error("Error: ", err);

    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      headers: getResponseHeaders(),
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};
