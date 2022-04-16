import test from "tape";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../../src";
import { Logger } from "../../../src/utils/logger";
import { typecheck } from "../../utils/tsc";

const target = "mergeWithAttributes/main";

test(target, async t => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated/mergeWithAttributes";

    t.test(`${target} - generate wsdl client`, async t => {
        await parseAndGenerate(input, outdir);
        t.end();
    });

    t.test(`${target} - check definitions`, async t => {
        t.equal(existsSync(`${outdir}/main/definitions/AskPeat.ts`), true);
        t.equal(existsSync(`${outdir}/main/definitions/AskPeatResponse.ts`), true);
        t.end();
    });

    t.test(`${target} - compile`, async t => {
        await typecheck(`${outdir}/main/index.ts`);
		t.end();
    });

});