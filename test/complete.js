import test from 'tape';
import { getClaimData, riskMitigation } from "../src/index.js";
import {
    correctHash,
    incorrectHash,
} from "../src/constants.js";


test('Load a file from the CID and log result:', async function (t) {
    const data = await getClaimData(correctHash);
    const valid = riskMitigation(data)
    t.ok(valid == true, ': Complete all tests');
})