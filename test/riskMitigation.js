import test from 'tape';
import { getClaimData } from "../src/index.js";
import { correctHash, incorrectHash, goldPrice, tantalumPrice, powvt, devsol, ugandaRedCross, ugandaCooperative, mubendeHumanRights, kassandaChildrensAid } from "../src/constants.js";

// pre-flight check
test('Load a file from the CID and log result:', async function (t) {
    let result = await getClaimData(correctHash);
    t.ok(
        result.commodity &&
        result.mass &&
        result.purity &&
        result.productId &&
        result.creatorLocation &&
        result.image &&
        result.timestamp &&
        result.supportDirectives['1'] && // at least one support directive
        result.associatedAddresses["Claim Creator"] &&
        result.associatedAddresses["Cooperative"] &&
        result.associatedAddresses["Beneficiaries"], // beneficiaries added to the claim
        ': Data sucessfully loaded, claim recreated for testing'
    );
    console.log("RESULT: ");
    console.log(result);
    console.log("\n");
})

// test 1
test('Validate associated actors in the claim:', async function (t) {
    let result = await getClaimData(correctHash);

    if (result != undefined) {
        t.test('Are beneficiaries in claim pre-approved?', function (v) {
            console.log("Beneficiaries:", result.associatedAddresses["Beneficiaries"].split(","));
            let beneArray = result.associatedAddresses["Beneficiaries"].split(",")
            for (let i = 0; i < beneArray.length; i++) {
                v.ok(beneArray[i] = ugandaRedCross ||
                    beneArray[i] == ugandaCooperative ||
                    beneArray[i] == mubendeHumanRights ||
                    beneArray[i] == kassandaChildrensAid,
                    ': Beneficiary is pre-approved.'
                );
            }
            console.log("\n");
            v.end();
        })

        t.test('Is there one or more support directives recorded in claim?', function (w) {
            console.log(result.supportDirectives)
            w.ok(result.supportDirectives['1'], ': There is one or more support directives.');
            w.end();
        })

        t.test('Is the directive approved for the beneficiary selected?', function (n) {
            console.log(result.supportDirectives)
            n.ok(result.supportDirectives['1'], ': There is one or more support directives.');
            n.end();
        })

    }
})
