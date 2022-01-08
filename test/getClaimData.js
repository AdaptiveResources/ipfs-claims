import test from 'tape';
import { getClaimData } from "../src/index.js";
import { correctHash, incorrectHash, goldPrice, tantalumPrice, powvt, devsol } from "../src/constants.js";

// pre-flight check
test('Load a file from the CID and log result:', async function (t) {

    let result = await getClaimData(correctHash);
    console.log("RESULT: ");
    console.log(result);
    console.log("\n");
})

// tests
test('Validate data returned:', async function (t) {
    let result = await getClaimData(correctHash);

    if (result != undefined) {
        t.test('Verify claim composed of more than one element:', function (v) {
            let totalEntries = 0;
            for (const [key, value] of Object.entries(result.purity)) {
                totalEntries++;
            }
            console.log("Total found: ", totalEntries);
            v.ok(totalEntries > 1, ': Number of purities is greater than 1.');
            console.log("\n");
            v.end();
        })

        t.test('Verify the purity percents total less than or equal to 100%:', function (w) {
            let totalPercent = 0;
            for (const [key, value] of Object.entries(result.purity)) {
                let num = value.split("%")[0]
                totalPercent = totalPercent + Number(num)
            }
            console.log("Total Percent Composition: ", totalPercent)
            w.ok(totalPercent <= 100, ': Total purities total less than or equal to 100%.');
            console.log("\n");
            w.end();
        })

        t.test('Validate commodity value and token price:', function (n) {
            console.log(result.commodity)
            console.log("mass: ", result.mass)
            console.log("purity: ", result.purity[result.commodity].split("%")[0])
            if (result.commodity == "Gold (Au)") {
                let m = result.mass;
                let p = result.purity[result.commodity].split("%")[0];
                let mp = m * (p / 100);
                console.log("grams: ", mp)
                let pricePerGramGold = mp * goldPrice;
                console.log("CLAIM VALUE (USD): ", pricePerGramGold);
                let tokenPrice = pricePerGramGold / 10;
                console.log("TOKEN PRICE (xDai): ", tokenPrice);
                n.ok(tokenPrice <= 10000, ': Token price less than 10,000 USD.');
                console.log("\n");
            }
            if (result.commodity == "Tantalum (Ta)" || result.commodity == "Tin (Sn)" || result.commodity == "Cobalt (Co)" || result.commodity == "Mica") {
                let m = result.mass;
                let p = result.purity[result.commodity].split("%")[0];
                let mp = m * (p / 100);
                console.log("grams: ", mp)
                let pricePergramTantalum = mp * tantalumPrice;
                console.log("CLAIM VALUE (USD): ", pricePergramTantalum);
                let tokenPrice = pricePergramTantalum / 10;
                console.log("TOKEN PRICE (xDai): ", tokenPrice);
                n.ok(tokenPrice <= 10000, ': Token price less than 10,000 USD.');
                console.log("\n");
            }
            n.end();
        })

        // Not to be implemented yet, currently only requiring OECD Annex II Risk assessment completion
        /*
        t.test('Require specific cerificates depending on the claims country of origin:', function (r) {
            console.log("certificate: ", result.certification);
            console.log("country :", result.productionLocation.split(",")[0]);
            let cert = result.certification;
            let origin = result.productionLocation.split(",")[0];
            if (origin == "Uganda") {
                r.ok(cert['ICGLR Certificate'], ': Correct certificate.');
            }
            console.log("\n");
            r.end();
        })
        */

        t.test('Is the claim creator pre-approved?', function (r) {
            //console.log(result.associatedAddresses[3][0], result.associatedAddresses[3][1]);
            // if two benes
            if (result.associatedAddresses[3][0] == 'Exporter/ Claim Creator') {
                let creator = result.associatedAddresses[3][1];
                r.ok(creator == powvt || creator == devsol, ': Claim creator is pre-approved.');
                r.end();
            }
            // if one bene
            if (result.associatedAddresses[2][0] == 'Exporter/ Claim Creator') {
                let creator = result.associatedAddresses[2][1];
                r.ok(creator == powvt || creator == devsol, ': Claim creator is pre-approved.');
                r.end();
            }

        })
    }
})
