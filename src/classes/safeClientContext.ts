import {EmbedBuilder, Interaction, InteractionResponse, Message} from "discord.js";
import {Context} from "../interfaces/application/Context";

export default class SafeClientContext {
    private readonly _ctx: SafeContext;
    public get ctx(): SafeContext {
        return this._ctx;
    }
    constructor(ctx: Context<Interaction>) {
        this._ctx = {
            channelId: ctx.channelId,
            guildId: ctx.guildId,
            reply: (content: string | { content?: string, embeds?: EmbedBuilder[] }) => {
                if (typeof content === "string") {
                    return ctx.isRepliable() && ctx.reply({content: content})
                }
                if (content.content) {
                    return ctx.isRepliable() && ctx.reply({content: content.content})
                }
                if (content.embeds) {
                    return ctx.isRepliable() && ctx.reply({embeds: content.embeds})
                }
                if (content.content && content.embeds) {
                    return ctx.isRepliable() && ctx.reply({content: content.content, embeds: content.embeds})
                }
            },
            channel: {
                ...ctx.channel && {
                    ...ctx.isChatInputCommand() && {
                        send: (content: string | { content?: string, embeds?: EmbedBuilder[] }) => {
                            if (typeof content === "string") {
                                return ctx.channel!!.send({content: content})
                            }
                            if (content.content) {
                                return ctx.channel!!.send({content: content.content})
                            }
                            if (content.embeds) {
                                return ctx.channel!!.send({embeds: content.embeds})
                            }
                            if (content.content && content.embeds) {
                                return ctx.channel!!.send({content: content.content, embeds: content.embeds})
                            }
                        }
                    }
                }
            },
            editReply: (content: string | { content?: string, embeds?: EmbedBuilder[] }) => {
                if (typeof content === "string") {
                    return ctx.isRepliable() && ctx.editReply({content: content})
                }
                if (content.content) {
                    return ctx.isRepliable() && ctx.editReply({content: content.content})
                }
                if (content.embeds) {
                    return ctx.isRepliable() && ctx.editReply({embeds: content.embeds})
                }
                if (content.content && content.embeds) {
                    return ctx.isRepliable() && ctx.editReply({content: content.content, embeds: content.embeds})
                }
            }
        }

    }
}
type SafeContext = {
    channelId: string | null;
    guildId: string | null;
    channel?: {
        send?: (content: string | { content?: string, embeds?: EmbedBuilder[] }) => false | Promise<Message> | undefined;
    }
    editReply: (content: string | { content?: string, embeds?: EmbedBuilder[] }) => false | Promise<Message> | undefined;
    reply: (content: string | { content?: string, embeds?: EmbedBuilder[] }) => false | Promise<void> | Promise<InteractionResponse> | undefined;
}


