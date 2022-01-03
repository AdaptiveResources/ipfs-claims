import test from 'tape';
import { getClaimData } from "../src/index.js";
import {
    correctHash,
    incorrectHash,
    goldPrice,
    tantalumPrice,
    powvt,
    devsol,
    ugandaRedCross,
    ugandaCooperative,
    mubendeHumanRights,
    kassandaChildrensAid
} from "../src/constants.js";

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
        result.riskTreatmentAreas &&
        result.associatedAddresses,
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
            // if 2 beneficiaries
            if (result.associatedAddresses[3]) {
                // 1st bene
                let beneArray1 = result.associatedAddresses[0]
                v.ok(beneArray1[1] = ugandaRedCross ||
                    beneArray1[1] == ugandaCooperative ||
                    beneArray1[1] == mubendeHumanRights ||
                    beneArray1[1] == kassandaChildrensAid,
                    ': Beneficiary is pre-approved.'
                );
                //console.log(result.associatedAddresses[0], beneArray1[1])
                // 2nd bene
                let beneArray2 = result.associatedAddresses[1]
                v.ok(beneArray2[1] = ugandaRedCross ||
                    beneArray2[1] == ugandaCooperative ||
                    beneArray2[1] == mubendeHumanRights ||
                    beneArray2[1] == kassandaChildrensAid,
                    ': Beneficiary is pre-approved.'
                );
                //console.log(result.associatedAddresses[1], beneArray2[1])
            } else {
                //only bene
                let beneArray = result.associatedAddresses[0]
                v.ok(beneArray[1] = ugandaRedCross ||
                    beneArray[1] == ugandaCooperative ||
                    beneArray[1] == mubendeHumanRights ||
                    beneArray[1] == kassandaChildrensAid,
                    ': Beneficiary is pre-approved.'
                );
                //console.log("only: ", beneArray[1])
            };
            console.log("\n");
            v.end();
        })

        t.test('Are one or more risk treatment areas recorded', function (w) {
            //console.log(result.riskTreatmentAreas[2])
            w.ok(result.riskTreatmentAreas[2], ': There is one or more support directives.');
            w.end();
        })

        t.test('Is the risk treatment area approved for the beneficiary selected?', function (n) {
            //console.log(result.riskTreatmentAreas[2])
            n.ok(result.riskTreatmentAreas[2], ': The risk treatment area is approved.');
            n.end();
        })

    } else {
        console.error("Data returned, does not follow Adaptive schema.")
    }
})
