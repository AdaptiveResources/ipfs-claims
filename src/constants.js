// Test claims
export const correctHash = 'Qme1kaxuWFMLP1AuMNEMDV9UqeNXmvZydNseZx7N61RCdP';
export const incorrectHash = 'QmZE6UqKuRSf7qKFDoECYcKCSSTgRGMjcUYczVwnfsmw8';

// Current price of commodities
export const goldPrice = 57.44; // USD/gram
export const tantalumPrice = 246.32; // USD/kg

// Pre-approved claim creators
export const powvt = 0x9E67029403675Ee18777Ed38F9C1C5c75F7B34f2;
export const devsol = 0xa2AcD5D2546aC9857Ec6C92A63d7256861f0Fe62;

// Pre-approved beneficiaries
export const ugandaRedCross = 0x7Fd8898fBf22Ba18A50c0Cb2F8394a15A182a07d;
export const ugandaCooperative = 0xF08E19B6f75686f48189601Ac138032EBBd997f2;
export const mubendeHumanRights = 0x45d99d2d592C6DB94efba7E3FDe39C18e46d2f4C;
export const kassandaChildrensAid = 0xBDAfE5F72AbF62048C2D5c7Dc33f59FC921D83fb;

// Complete list of all risk treatment areas:
const allTreatmentAreas = [
    { // 0
        value: 'General',
        label: 'General',
        children: [
            {
                value: ' Due Diligence',
                label: 'Due Diligence',
            },
            {
                value: ' Traceability',
                label: 'Traceability',
            },
        ],
    },
    { // 1
        value: 'Business Practices',
        label: 'Business Practices',
        children: [
            {
                value: ' Ensure there is no bribery or effort to conceal or disguise the origin of minerals. ',
                label: 'Ensure there is no bribery or effort to conceal or disguise the origin of minerals. ',
            },
            {
                value: ' In mineral extraction, trade, handling, transport and export, ensure there is no offering, promising, giving, accepting or demanding any bribes. ',
                label: 'In mineral extraction, trade, handling, transport and export, ensure there is no offering, promising, giving, accepting or demanding any bribes. '
            },
            {
                value: ' Avoid production being subjected to illegal taxation or extortion of money or minerals by non-state armed groups.',
                label: 'Avoid production being subjected to illegal taxation or extortion of money or minerals by non-state armed groups.'
            },
            {
                value: ' Establish mechanism to ensure there is no risk of money laundering.',
                label: 'Establish mechanism to ensure there is no risk of money laundering.'
            }
        ]
    },
    { // 2
        value: 'Management Practices',
        label: 'Management Practices',
        children: [
            {
                value: ' Create a designated point of contact for complaints. ',
                label: 'Create a designated point of contact for complaints.  ',
            },
            {
                value: ' Create an established and clear grievance procedure to address complaints and grievances. ',
                label: 'Create an established and clear grievance procedure to address complaints and grievances. '
            },
            {
                value: ' Creation of formal decision-making structures and mechanisms.',
                label: 'Creation of formal decision-making structures and mechanisms.'
            },
            {
                value: ' General legal support related to formalization.',
                label: 'General legal support related to formalization.'
            },
            {
                value: ' Support to legal requirements related to mineral extraction.',
                label: 'Support to legal requirements related to mineral extraction.'
            },
            {
                value: ' Support the Minamata Convention on Mercury to “reduce, and where feasible eliminate, the use of mercury”.',
                label: 'Support the Minamata Convention on Mercury to “reduce, and where feasible eliminate, the use of mercury”.'
            }
        ]
    },
    { // 3
        value: 'Mine Waste and Wastewater',
        label: 'Mine Waste and Wastewater',
        children: [
            {
                value: ' Efforts to avoid serious contamination of water bodies with suspended solids and/or chemicals and/or fuel residues.',
                label: 'Efforts to avoid serious contamination of water bodies with suspended solids and/or chemicals and/or fuel residues. ',
            }
        ]
    },
    { // 4
        value: 'Occupational Health and Safety',
        label: 'Occupational Health and Safety',
        children: [
            {
                value: ' Interventions towards elimination of amalgam burning in residential areas.',
                label: 'Interventions towards elimination of amalgam burning in residential areas. ',
            },
            {
                value: ' Interventions towards elimination of open burning of amalgam or processed amalgam.',
                label: 'Interventions towards elimination of open burning of amalgam or processed amalgam. ',
            },
            {
                value: ' Interventions towards elimination of cyanide leaching in sediments, ore, or tailings to which mercury had been added, without first removing the mercury.',
                label: 'Interventions towards elimination of cyanide leaching in sediments, ore, or tailings to which mercury had been added, without first removing the mercury. ',
            },
            {
                value: ' Interventions towards elimination of whole ore amalgamation.',
                label: 'Interventions towards elimination of whole ore amalgamation. ',
            },
            {
                value: ' Aquisitition and use of personal protective equipment (PPE) at work.',
                label: 'Aquisitition and use of personal protective equipment (PPE) at work. ',
            },
            {
                value: ' Implementation of basic mining safety rules or safety policy for its members.',
                label: 'Implementation of basic mining safety rules or safety policy for its members.',
            }
        ]
    },
    { // 5
        value: 'Serious Human Rights Abuses',
        label: 'Serious Human Rights Abuses',
        children: [
            {
                value: ' Interventions to eradicate all forms of child labour directly or indirectly related to mining, among persons under the age of 18.',
                label: 'Interventions to eradicate all forms of child labour directly or indirectly related to mining, among persons under the age of 18.',
            },
            {
                value: ' Interventions to improve labor practices.',
                label: 'Interventions to improve labor practices.',
            },
            {
                value: ' Creation and Implementation of Human Rights Policy aligned with Universal Declaration of Human Rights.',
                label: 'Creation and Implementation of Human Rights Policy aligned with Universal Declaration of Human Rights.',
            },
            {
                value: ' Support for Worker pay and living wages',
                label: 'Support for Worker pay and living wages',
            },
            {
                value: ' Intervention to ensure the suppy chain is not linked to any other gross human rights abuses.',
                label: 'Intervention to ensure the suppy chain is not linked to any other gross human rights abuses.',
            },
            {
                value: ' Interventions to protect women or any individual in situation of vulnerability, against sexual violence and harassment at the workplace.',
                label: 'Interventions to protect women or any individual in situation of vulnerability, against sexual violence and harassment at the workplace.',
            },
            {
                value: ' Interventions to respect the rights of women, in particular towards reducing any gender-based restrictions of access to mineral resources.',
                label: 'Interventions to respect the rights of women, in particular towards reducing any gender-based restrictions of access to mineral resources.',
            },
        ]
    },
    { // 6
        value: 'Societal Welfare & Community Rights',
        label: 'Societal Welfare & Community Rights',
        children: [
            {
                value: ' Establish mechanism to disclose payments of taxes, fees, and royalties in accordance with the Extractive Industry Transparency Initiative.',
                label: 'Establish mechanism to disclose payments of taxes, fees, and royalties in accordance with the Extractive Industry Transparency Initiative.',
            },
            {
                value: ' Establish mechanism to ensure all taxes, fees, and royalties related to mineral extraction, trade, and export are paid.',
                label: 'Establish mechanism to ensure all taxes, fees, and royalties related to mineral extraction, trade, and export are paid.',
            },
            {
                value: ' Interventions towards being accepted and/or integrated into existing communities.',
                label: 'Interventions towards being accepted and/or integrated into existing communities.',
            },
            {
                value: ' Establish mechanism to does not knowingly hire individuals or units of security forces that are known to have been responsible for gross human rights abuses',
                label: 'Establish mechanism to does not knowingly hire individuals or units of security forces that are known to have been responsible for gross human rights abuses',
            },
            {
                value: ' Establish mechanism to minimize adverse impacts associated with the presence of public or private security forces on their mine site(s).',
                label: 'Establish mechanism to minimize adverse impacts associated with the presence of public or private security forces on their mine site(s).',
            },
            {
                value: ' Establish mechanism to protect the mine site or transportation routes from interference with legitimate extraction and trade.',
                label: 'Establish mechanism to protect the mine site or transportation routes from interference with legitimate extraction and trade.',
            },
            {
                value: ' Establish mechanism to eliminate public or private security forces that illegally tax, extort, or control its mine site, internal supply chain, or point(s) of sale.',
                label: 'Establish mechanism to eliminate public or private security forces that illegally tax, extort, or control its mine site, internal supply chain, or point(s) of sale.',
            },
        ]
    },
    { // 7
        value: 'Use of Natural Resources',
        label: 'Use of Natural Resources',
        children: [
            {
                value: ' Coordination with local inhabitants who require the same resource for agriculture, fishing, use of forest products, eco-tourism, or animal husbandry.',
                label: 'Coordination with local inhabitants who require the same resource for agriculture, fishing, use of forest products, eco-tourism, or animal husbandry.',
            },
            {
                value: ' Coordination with and or support of Protected Area Authorities.',
                label: 'Coordination with and or support of Protected Area Authorities.',
            },
            {
                value: ' Use of water resources and water bodies in coordination with other water users.',
                label: 'Use of water resources and water bodies in coordination with other water users.',
            },
        ]
    }

]

// Beneficiary Approvals
export const beneApprovalList =
{
    // Mubende Human Rights, Mubenda, Uganda
    '0x45d99d2d592C6DB94efba7E3FDe39C18e46d2f4C': [allTreatmentAreas[0], allTreatmentAreas[4], allTreatmentAreas[5], allTreatmentAreas[6]], // 0,4,5,6

    // Red Cross, Kampala, Uganda
    '0x7Fd8898fBf22Ba18A50c0Cb2F8394a15A182a07d': [allTreatmentAreas[0], allTreatmentAreas[4], allTreatmentAreas[5], allTreatmentAreas[6]], // 0,4,5,6,

    // Kassanda Children's Aid, Kassanda District, Uganda 
    '0xBDAfE5F72AbF62048C2D5c7Dc33f59FC921D83fb': [allTreatmentAreas[0], allTreatmentAreas[4], allTreatmentAreas[5], allTreatmentAreas[6]], // 0,4,5,6,

    // Centre For Law and Peace, Uganda
    '0x97617C3EB10B4C63271c920Ac4b144263E41943A': [allTreatmentAreas[0], allTreatmentAreas[1], allTreatmentAreas[2], allTreatmentAreas[4]], // 0,1,2,4

    // DevSol
    '0xa2AcD5D2546aC9857Ec6C92A63d7256861f0Fe62': [allTreatmentAreas[0], allTreatmentAreas[3], allTreatmentAreas[4], allTreatmentAreas[7]], // 0,2,4,7

    // Rwanda Woman Network
    '0x527bCd873D494F715F0ebCA880DF5a5e4B3FBE24': [allTreatmentAreas[0], allTreatmentAreas[4], allTreatmentAreas[5], allTreatmentAreas[6]], // 0,4,5,6,

}


// Cooperative Approvals
export const CSOApprovalList = allTreatmentAreas;

// // Exporter/ Claim Creator Approvals
export const exporterApprovalList = allTreatmentAreas;