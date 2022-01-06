import fetch from 'node-fetch';
import fs from 'fs';
import { correctHash, incorrectHash, goldPrice, tantalumPrice, powvt, devsol, ugandaRedCross, ugandaCooperative, mubendeHumanRights, kassandaChildrensAid } from "../src/constants.js";


// risk mitigation functions

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
        if (tokenPrice <= 10000) {
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
        if (tokenPrice <= 10000) {
            return true;
        } else {
            return false;
        }
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


// returns claim data as an object
export async function getClaimData(hash) {
    // Claim Parameters
    let claimHash;
    let commodity;
    let prodID;
    let mass;
    let purity = {};
    let assessment;
    let certification = {};
    let creatorLocation;
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
            //creator location
            creatorLocation = splitSpace[15].split(":")[1].slice(1);
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
                creatorLocation: creatorLocation,
                image: image,
                timestamp: timestamp,
                riskTreatmentAreas: riskTreatmentAreas,
                associatedAddresses: associatedAddresses
            }
            // Invalid claim format.
        } catch {
            console.error("Claim Data is in unusual format.")
        }

        // if claim data complete, then return data in the form of an object and create a local desktop file of the results. 
        if (
            claimData.hash &&
            claimData.commodity &&
            claimData.productId &&
            claimData.mass &&
            claimData.purity &&
            claimData.assessment &&
            claimData.creatorLocation &&
            claimData.image &&
            claimData.timestamp &&
            claimData.riskTreatmentAreas &&
            claimData.associatedAddresses
        ) {

            return claimData

        } else {
            console.log("Claim Data is in unusual format.")
        }
        // if there is a message with type error that is returned from fetch, trigger console.error
    } else {
        console.error("error")
    }
}

// Pass valid claim data. Will return true if the data passes all tests. Will return false otherwise.
export function riskMitigation(claimData) {
    const p = purityTest(claimData);
    const v = valueTest(claimData);
    const c = creatorPreApprovedTest(claimData);
    const b = beneficiaryPreApprovedTest(claimData);
    //const r = rtaTest(claimData);

    if (p, v, c, b == true) {
        return true
    } else {
        return false
    }
}

// Write results to desktop report
export function writeToDesktop(claimHash, claimData) {
    /*
    fs.readdir(folderPath, (err, files) => {
        files.forEach(file => {
            console.log(file);
        });
    });
    */
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


