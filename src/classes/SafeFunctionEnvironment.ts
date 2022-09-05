export default class SafeFunctionEnvironment {
    // This class is used to create a safe environment for the user to run their code in, without the ability to access the bot's internals and nodejs's internals.
    public static createSafeFunction(s: string): Function {
        s = s.replace(/\\x[0-9a-fA-F]{2}/g, "");
        const imports = s.match(/import/g);
        const requires = s.match(/require|module/g);
        const exports = s.match(/export/g);
        const globals = s.match(/globalThis|global|process/g);
        const _this = s.match(/this/g);
        const _new = s.match(/new/g);
        s = s.replace(/console/g, "");
        if (imports) {
            for (const i of imports) {
                s = s.replace(i, "");
            }
        }
        if (requires) {
            for (const i of requires) {
                s = s.replace(i, "");
            }
        }
        if (exports) {
            for (const i of exports) {
                s = s.replace(i, "");
            }
        }
        if (globals) {
            for (const i of globals) {
                s = s.replace(i, "");
            }
        }
        if (_this) {
            for (const i of _this) {
                s = s.replace(i, "");
            }
        }
        if (_new) {
            for (const i of _new) {
                s = s.replace(i, "");
            }
        }
        return new Function("return " + s)();
    }
}