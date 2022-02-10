import inquirer from "inquirer"
import { getClaimData, riskMitigation } from "../src/index.js"

console.log('Please answer the following to run the tests:');

const questions = [
    {
        type: 'input',
        name: 'claimHash',
        message: 'What is the IPFS hash of the claim token?',
        default: "Qme1kaxuWFMLP1AuMNEMDV9UqeNXmvZydNseZx7N61RCdP",
        validate(value) {
            const pass = value.match(
                /^[a-zA-Z0-9]+$/
            );
            if (pass) {
                return true;
            }

            return 'IPFS hash not valid.';
        },
    },
    {
        type: "confirm",
        name: "visibleData",
        message: "Do you wish to view the claim data?",
        default: true
    },
    {
        type: 'confirm',
        name: 'image',
        message: 'Do you want a link for the claim image?',
        default: true,
    },
    {
        type: 'confirm',
        name: 'riskMitigation',
        message: 'Do you want run the risk mitigation testing?',
        default: true,
    },
    //--------------------------- Boilerplate VVVVVVV ----------------------------
    /*
    {
        type: 'list',
        name: 'size',
        message: 'What size do you need?',
        choices: ['Large', 'Medium', 'Small'],
        filter(val) {
            return val.toLowerCase();
        },
    },
    {
        type: 'input',
        name: 'quantity',
        message: 'How many do you need?',
        validate(value) {
            const valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number';
        },
        filter: Number,
    },
    {
        type: 'expand',
        name: 'toppings',
        message: 'What about the toppings?',
        choices: [
            {
                key: 'p',
                name: 'Pepperoni and cheese',
                value: 'PepperoniCheese',
            },
            {
                key: 'a',
                name: 'All dressed',
                value: 'alldressed',
            },
            {
                key: 'w',
                name: 'Hawaiian',
                value: 'hawaiian',
            },
        ],
    },
    {
        type: 'rawlist',
        name: 'beverage',
        message: 'You also get a free 2L beverage',
        choices: ['Pepsi', '7up', 'Coke'],
    },
    {
        type: 'input',
        name: 'comments',
        message: 'Any comments on your purchase experience?',
        default: 'Nope, all good!',
    },
    {
        type: 'list',
        name: 'prize',
        message: 'For leaving a comment, you get a freebie',
        choices: ['cake', 'fries'],
        when(answers) {
            return answers.comments !== 'Nope, all good!';
        },
    },
    */
];

inquirer.prompt(questions).then(async (answers) => {
    console.log('\nResult:');
    console.log('\nLoading from IPFS, hold tight...');
    try {
        // get claim data
        let data = await getClaimData(answers.claimHash)
        console.log(data)
        // image processing
        if (answers.image == true) {
            if (data.image) {
                console.log("\n\nImage link:")
                console.log(data.image)
            } else {
                console.log("Claim data invalid. Please verify the claim hash.")
            }
        }
        // risk mitigation processing
        if (answers.riskMitigation == true) {
            let result = riskMitigation(data);
            if (result == true) {
                console.log("\n *** Risk mitigation testing passed ***\n\n\n")
            } else {
                console.log("\n XXX This claim does not follow the Adaptive Resources claim creation guidlines XXX")
            }
        }
    } catch (error) {
        console.error("Failed to load the claim data.")
    }

    // Debug
    // View answers:
    //console.log(JSON.stringify(answers, null, '  '));
});