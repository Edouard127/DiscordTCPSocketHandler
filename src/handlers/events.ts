import {Client} from 'discord.js';
import { readdirSync } from 'fs'
import 'colors'
export default (client: Client) => {
  const load = async(dirs: string) => {
    const events = readdirSync(`${__dirname}/../events/${dirs}/`).filter((d: string) => d.endsWith("js") );
    for (let file of events) {
        const evt = await import(`../events/${dirs}/${file}`);
        const eName = file.split(".")[0];
        client.on(eName, (...args) => new evt.default(...args));
    }
  };
  ["guild"].forEach((x: string) => load(x));
};


