import fetch from 'node-fetch';
import fs from 'fs';

// function get data
export const getClaimData = async (hash) => {

    // Claim Parameters
    let claimHash;
    let commodity;
    let prodID;
    let mass;
    let purity = {};
    let certification = {};
    let creatorLocation;
    let image;
    let timestamp;
    let supportDirectives = {};
    let associatedAddresses = {};
    // data set
    let claimData = {};

    // get data from IPFS/ Infura
    let res = await fetch('https://ipfs.infura.io:5001/api/v0/cat?arg=' + hash);
    const text = await res.text()

    // Verify the claim returned from fetch is a text file
    if (text["Type"] != 'error') {
        let splitSpace = text.split('\n')
        // fill claim parameters
        //hash
        claimHash = hash;
        //commodity
        commodity = splitSpace[3].split(":")[1].slice(1)
        //productID
        prodID = splitSpace[5].split(":")[1].valueOf().slice(1);
        //mass
        mass = splitSpace[7].split(":")[1].valueOf().slice(1);
        //purity
        let purityWhole = splitSpace[9].split(":")[1];
        let pure = purityWhole.split(",");
        for (let i = 0; i < pure.length; i++) {
            let element = pure[i].split(")")[0] + ")";
            let percent = pure[i].split(")")[1].slice(1);
            if (i == 0) {
                purity[element.slice(2)] = percent;
            } else {
                purity[element.slice(1)] = percent;
            }

        }

        //certification
        let certWhole = splitSpace[11].split(":")[1];
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
        creatorLocation = splitSpace[13].split(":")[1].slice(1);
        //image
        image = 'https:' + splitSpace[15].split(":")[2]
        //timestamp
        timestamp = (splitSpace[17].split(":")[1] + ":" + splitSpace[17].split(":")[2] + ":" + splitSpace[17].split(":")[3]).slice(1);
        //minesite directives
        if (splitSpace[20]) {
            supportDirectives[1] = splitSpace[20].split("          ")[1]
        }
        if (splitSpace[21]) {
            supportDirectives[2] = splitSpace[21].split("          ")[1]
        }
        if (splitSpace[22]) {
            supportDirectives[3] = splitSpace[22].split("          ")[1]
        }
        //wallet addresses
        if (splitSpace[25]) {
            let name1 = splitSpace[25].split(":")[0];
            let name1S = name1.split("          ")[1];
            let address1 = splitSpace[25].split(":")[1].slice(1);
            associatedAddresses[name1S] = address1
        }
        if (splitSpace[26]) {
            let name2 = splitSpace[26].split(":")[0];
            let name2S = name2.split("         ")[1].slice(1);
            let address2 = splitSpace[26].split(":")[1].slice(1);
            associatedAddresses[name2S] = address2
        }
        if (splitSpace[27]) {
            let name3 = splitSpace[27].split(":")[0];
            let name3S = name3.split("         ")[1].slice(1);
            let address3 = splitSpace[27].split(":")[1];
            associatedAddresses[name3S] = address3.slice(1)
        }
        // claim data object
        claimData = {
            hash: claimHash,
            commodity: commodity,
            productId: prodID,
            mass: mass,
            purity: purity,
            certification: certification,
            creatorLocation: creatorLocation,
            image: image,
            timestamp: timestamp,
            supportDirectives: supportDirectives,
            associatedAddresses: associatedAddresses
        }
        // if claim data complete, then return data in the form of an object and create a local desktop file of the results. 
        if (
            claimData.hash &&
            claimData.commodity &&
            claimData.productId &&
            claimData.mass &&
            claimData.purity &&
            claimData.creatorLocation &&
            claimData.image &&
            claimData.timestamp &&
            claimData.supportDirectives &&
            claimData.associatedAddresses) {
            // Write results to desktop report
            fs.writeFile("../Desktop/" + claimHash + ".txt", JSON.stringify(claimData), (err) => {
                if (err)
                    console.log(err);
                else {
                    console.log("\nClaim Data written successfully to user desktop.\n");
                    //console.log("The written has the following contents:");
                    //console.log(fs.readFileSync("../Desktop/" + claimHash + ".txt", "utf8"));
                }
            });

            return claimData
        }

        else {
            console.log("Claim Data is in unusual format.")
        }
        // if there is a message with type error that is returned from fetch, trigger console.error
    } else {
        console.error("Invalid claim hash.")
    }

}

// Write results to desktop report
export const writeToDesktop = (claimHash, claimData) => {
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


