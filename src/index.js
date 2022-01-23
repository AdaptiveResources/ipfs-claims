import fetch from 'node-fetch';
import fs from 'fs';
import {
    correctHash,
    incorrectHash,
    goldPrice,
    tantalumPrice,
    powvt, devsol,
    ugandaRedCross,
    ugandaCooperative,
    mubendeHumanRights,
    kassandaChildrensAid,
    beneApprovalList
} from "../src/constants.js";
import isIPFS from 'is-ipfs'

// risk mitigation functions
/*
#### Claim Tests
1. Is the commodity approved for trading?
2. Verify more than one purity to be submitted.
    - Verify the purity percents total less than or equal to 100%.
3. Verify commodity value and token price is accurate.
    - Is this price less than 10,000 USD?
4. Require claim creator to be pre-approved.
5. Are beneficiaries in claim pre-approved?
    - Is the beneficiary approved to respond to the directives selected?
6. Is one or more risk treatment areas recorded in claim?
7. Is image hash valid?
*/

//purity tests
function purityTest(claimData) {
    // more than one purity
    let totalEntries = 0;
    for (const [key, value] of Object.entries(claimData.purity)) {
        totalEntries++;
    }
    // percents are equal to or less than 100%
    let totalPercent = 0;
    for (const [key, value] of Object.entries(claimData.purity)) {
        let num = value.split("%")[0]
        totalPercent = totalPercent + Number(num)
    }
    if (totalEntries > 1 && totalPercent <= 100) {
        return true
    } else {
        return false
    }
}

// value test
function valueTest(claimData) {
    if (claimData.commodity == "Gold (Au)") {
        let m = claimData.mass;
        let p = claimData.purity[claimData.commodity].split("%")[0];
        let mp = m * (p / 100);
        let pricePerGramGold = mp * goldPrice;
        let tokenPrice = pricePerGramGold / 10;

        if (tokenPrice < 10000) {
            return true;
        } else {
            return false;
        }
    }
    if (claimData.commodity == "Tantalum (Ta)" || claimData.commodity == "Tin (Sn)" || claimData.commodity == "Cobalt (Co)" || claimData.commodity == "Mica") {
        let m = claimData.mass;
        let p = claimData.purity[claimData.commodity].split("%")[0];
        let mp = m * (p / 100);
        let pricePergramTantalum = mp * tantalumPrice;
        let tokenPrice = pricePergramTantalum / 10;

        if (tokenPrice < 10000) {
            return true;
        } else {
            return false;
        }
    }
    else {
        return false
    }
}

// creators pre-approved
function creatorPreApprovedTest(claimData) {
    // if two benes
    if (claimData.associatedAddresses[3][0] == 'Exporter/ Claim Creator') {
        let creator = claimData.associatedAddresses[3][1];
        if (creator == powvt || creator == devsol) {
            return true
        } else {
            return false
        }
    }
    // if one bene
    if (claimData.associatedAddresses[2][0] == 'Exporter/ Claim Creator') {
        let creator = claimData.associatedAddresses[2][1];
        if (creator == powvt || creator == devsol) {
            return true
        } else {
            return false
        }
    }
    else {
        return false
    }
}

// beneficiaries pre-approved
function beneficiaryPreApprovedTest(claimData) {
    let approvalSwitch = false;

    // if 2 beneficiaries
    if (claimData.associatedAddresses[3]) {
        // 1st bene
        let beneArray1 = claimData.associatedAddresses[0]
        if (beneArray1[1] == ugandaRedCross ||
            beneArray1[1] == ugandaCooperative ||
            beneArray1[1] == mubendeHumanRights ||
            beneArray1[1] == kassandaChildrensAid) {
            approvalSwitch = true;
        }

        // 2nd bene
        let beneArray2 = claimData.associatedAddresses[1]
        if (beneArray2[1] == ugandaRedCross ||
            beneArray2[1] == ugandaCooperative ||
            beneArray2[1] == mubendeHumanRights ||
            beneArray2[1] == kassandaChildrensAid) {
            approvalSwitch = true;
        }
    } else {
        //only bene
        let beneArray = claimData.associatedAddresses[0]
        if (beneArray[1] == ugandaRedCross ||
            beneArray[1] == ugandaCooperative ||
            beneArray[1] == mubendeHumanRights ||
            beneArray[1] == kassandaChildrensAid) {
            approvalSwitch = true;
        }
    };

    // has the approval switch been flipped and are there more than 1 risk treatment areas?
    if (approvalSwitch == true && claimData.riskTreatmentAreas[2]) {
        return true;
    } else {
        return false
    }
}

// are the beneficiaries approved for these risk treatment areas?
function beneficiaryRTATest(claimData) {
    let approvalSwitch = false;
    let beneArray = claimData.associatedAddresses
    if (beneArray[3]) {
        // 4 address in array only parse first two.
        for (let i = 0; i < 2; i++) {
            if (beneApprovalList[beneArray[i][1]]) {
                approvalSwitch = true;
            } else {
                approvalSwitch = false;
            }
            //console.log(claimData.riskTreatmentAreas[i][1].split(',')[1].slice(1))
            //console.log(claimData.riskTreatmentAreas[i][1].split(',')[0])
            //console.log(beneApprovalList[beneArray[i][1]])
        }
    } else {
        // 3 address in array only parse first entry.
        if (beneApprovalList[beneArray[0][1]]) {
            approvalSwitch = true;
        } else {
            approvalSwitch = false;
        }
    }

    if (approvalSwitch == true) {
        return true;
    } else {
        return false;
    }
}

// using is-ipfs library, is the hash valid?
function imageHashTest(claimData) {
    //console.log(claimData.image.split('/')[4])
    let result = isIPFS.ipfsUrl(claimData.image);
    if (result == true) {
        return true;
    } else {
        return false;
    }
}

// returns claim data as an object, if all fields filled properly.
// for pre-flight checks
export async function getClaimData(hash) {
    // Beneficiary fetch data
    //let beneArray = await fetchBeneficiaries();
    //console.log(beneArray);

    // Claim Parameters
    let claimHash;
    let commodity;
    let prodID;
    let mass;
    let purity = {};
    let assessment;
    let certification = {};
    let productionLocation;
    let image;
    let timestamp;
    let riskTreatmentAreas = {};
    let associatedAddresses = {};
    // data set
    let claimData = {};

    // get data from ipfs.io
    let res = await fetch('https://ipfs.io/ipfs/' + hash);
    const text = await res.text()

    // Verify the claim returned from fetch is a text file
    if (text["Type"] != 'error') {
        try {
            let splitSpace = text.split('\n')
            // fill claim parameters
            //hash
            claimHash = hash;
            //commodity
            commodity = splitSpace[3].split(":")[1].slice(1);
            //productID
            prodID = splitSpace[5].split(":")[1].valueOf().slice(1);
            //mass
            mass = splitSpace[7].split(":")[1].valueOf().slice(1);
            //purity
            let purityWhole = splitSpace[9].split(":")[1];
            let pure = purityWhole.split(",");
            for (let i = 0; i < pure.length; i++) {
                let element = pure[i].split(")")[0] + ")";
                let percent = pure[i].split(")")[1];
                if (i == 0) {
                    purity[element.slice(2)] = percent;
                } else {
                    purity[element.slice(1)] = percent;
                }

            }
            //Risk Assessment Completed:
            let riskAssessment = splitSpace[11].split(":")[1].slice(1)
            if (riskAssessment == 'Yes') {
                assessment = true;
            } else {
                assessment = false;
            }
            //certification
            let certWhole = splitSpace[13].split(":")[1];
            let cert = certWhole.split(" ");
            let certNum = cert[cert.length - 1];
            let certName;
            if (cert[cert.length - 2]) {
                let certName3 = cert[cert.length - 2];
                certName = certName3;
            }
            if (cert[cert.length - 3]) {
                let certName2 = cert[cert.length - 3];
                if (certName2) {
                    certName = certName2 + " " + certName;
                }
            }
            if (cert[cert.length - 4]) {
                let certName1 = cert[cert.length - 4];
                if (certName1) {
                    certName = certName1 + " " + certName;
                }
            }
            certification[certName] = certNum
            //production location
            productionLocation = splitSpace[15].split(":")[1].slice(1);
            //image
            image = 'https:' + splitSpace[17].split(":")[2]
            //timestamp
            timestamp = (splitSpace[19].split(":")[1] + ":" + splitSpace[19].split(":")[2] + ":" + splitSpace[19].split(":")[3]).slice(1);
            //minesite directives
            if (splitSpace[22].split("-")[1].slice(1) == "Mining Operator/ Cooperative: ") {
                let name = splitSpace[23].split(':')[0].split(',')[0].split("              ")[1];
                let dir = splitSpace[23].split(':')[1].slice(1);
                riskTreatmentAreas[0] = [name, dir];
            }
            if (splitSpace[24].split("-")[1].slice(1) == "Mining Operator/ Cooperative: ") {
                let name = splitSpace[25].split(':')[0].split(',')[0].split("              ")[1];
                let dir = splitSpace[25].split(':')[1].slice(1);
                riskTreatmentAreas[1] = [name, dir];
            }
            if (splitSpace[26]) {
                let name = splitSpace[27].split(':')[0].split(',')[0].split("              ")[1];
                let dir = splitSpace[27].split(":")[1].slice(1);
                riskTreatmentAreas[2] = [name, dir];
            }
            if (splitSpace[28]) {
                let name = splitSpace[28].split('-')[1].split(":")[0].slice(1);
                let dir = splitSpace[28].split('-')[1].split(":")[1];
                riskTreatmentAreas[3] = [name, dir];
            }
            //wallet addresses
            // {1:[name,addres], 2:[name,address], ...}
            // Risk Beneficiary 1
            if (splitSpace[32]) {
                let name1 = splitSpace[32].split(":")[0].split("-")[1].split(",")[0];
                let address1 = splitSpace[32].split(":")[1].slice(1);
                associatedAddresses[0] = [name1, address1]
            }
            // Risk Beneficiary 2
            if (splitSpace[33]) {
                let name1 = splitSpace[33].split(":")[0].split("-")[1].split(",")[0];
                let address1 = splitSpace[33].split(":")[1].slice(1);
                associatedAddresses[1] = [name1, address1]
            }
            // Cooperative
            if (splitSpace[35]) {
                let name1 = splitSpace[35].split(":")[0].split("-")[1].split(",")[0].slice(1);
                let address1 = splitSpace[35].split(":")[1].slice(1);
                associatedAddresses[2] = [name1, address1]
            }
            // Exporter/ Claim Creator
            if (splitSpace[36]) {
                let address1 = splitSpace[36].split(":")[1].slice(1);
                associatedAddresses[3] = ['Exporter/ Claim Creator', address1]
            }

            // return claim data object
            claimData = {
                hash: claimHash,
                commodity: commodity,
                productId: prodID,
                mass: mass,
                purity: purity,
                assessment: assessment,
                certification: certification,
                productionLocation: productionLocation,
                image: image,
                timestamp: timestamp,
                riskTreatmentAreas: riskTreatmentAreas,
                associatedAddresses: associatedAddresses
            }
            // Invalid claim format.
        } catch {
            return {};
        }

        // if claim data complete, then return data in the form of an object and create a local desktop file of the results. 
        if (
            claimData.hash &&
            claimData.commodity &&
            claimData.productId &&
            claimData.mass &&
            claimData.purity &&
            claimData.assessment &&
            claimData.productionLocation &&
            claimData.image &&
            claimData.timestamp &&
            claimData.riskTreatmentAreas &&
            claimData.associatedAddresses
        ) {

            return claimData;

        } else {
            return {};
        }
        // if there is a message with type error that is returned from fetch, trigger console.error
    } else {
        console.error("error")
    }
}

// Pass valid claim data. Will return true if the data passes all tests. Will return false otherwise.
export function riskMitigation(claimData) {
    let p, v, c, b, a, i;
    try {
        p = purityTest(claimData);
        v = valueTest(claimData);
        c = creatorPreApprovedTest(claimData);
        b = beneficiaryPreApprovedTest(claimData);
        a = beneficiaryRTATest(claimData);
        i = imageHashTest(claimData)
    } catch {
        return false
    }
    // if values are returned for are individual test, check that all are true, meaning passing
    if (p, v, c, b, a, i == true) {
        return true
    } else {
        return false
    }
}

// Write results to desktop report (coming in v2)
/*
export function writeToDesktop(claimHash, claimData) {
    fs.writeFile(claimHash + ".txt", claimData, (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(fs.readFileSync(claimHash + ".txt", "utf8"));
        }
    });
}
*/

