const { Telegraf } = require("telegraf");
const dedent = require("dedent");

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const helpMsg = dedent`
        The bot just repeats anything you say in the chat.
        
        *Command reference:*
        /start - Start bot
        /help - Show this help page
    `;

bot.start((ctx) =>
  ctx.reply(
    `Hello from Lambda, ${
      ctx.from.first_name ? ctx.from.first_name : "friend"
    }! Use /help to view available commands.`
  )
);

bot.help((ctx) => ctx.replyWithMarkdown(helpMsg));

module.exports = {
  bot,
};
