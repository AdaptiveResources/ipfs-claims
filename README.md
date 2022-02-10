Validate and retrieve Adaptive Claims (AC) token data stored on IPFS.

## Install
```
npm i ipfs-claims
```

## Usage
Library in JS
```
import { getClaimData, riskMitigation } from 'ipfs-claims';

const data = await getClaimData(claimHash);
const result = riskMitigation(data);
console.log(result); // pass = true, fail = false

// write to desktop
const data = await claims.getClaimData(<IPFS hash>);
const report = claim.writeToDesktop(<IPFS hash>, data)
```

From the command line

```
npm start
```

### Exported Functions
- `getClaimData(IPFS_Hash)` 
    - This returns an object with all required fields filled. If the Hash provided to the function does not return proper fields, or unexpected data the function will return an empty object.
- `riskMitigation(data)`
    - This returns true or false if the data passed to the function passes all the tests proving authenticity of the claim. The checks are described below.  


## Testing
For testing, a claim hash should be added to the `constants.js` file of the desired claim token you want to trace.

It is important to run get claim data tests `npm run test-getClaimData` before performing risk management tests `npm run test-riskMitigation`. This way if the first test fails you know there are red flags in the claim token data format. The second script contains more detailed tests on the claim data. Finally, `npm run test-complete` will run the two tests sequentially. 

### Test Scripts
- `getClaimData.js`
- `riskMitigation.js`
- `complete.js`

### Test commands
```
npm run test-getClaimData
npm run test-riskMitigation
npm run test-complete
```

## Current Version
0.2.0 - Command line interface added. Paste in the AC token URI or claim hash. 

### Version Schema
* 0.1.1, initial release
* 0.1.2, updates to beneficiary approvals or other small syntax edits
* 0.2.1, update to risk mitigation functionality or other large functionality edits

## License
* MIT ([LICENSE-MIT](LICENSE-MIT) / http://opensource.org/licenses/MIT)